
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BACKEND_URL } from '@/config-global';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Ingrese las credenciales');

        const response = await fetch(`${BACKEND_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        });

        
        if (response.status === 403) throw new Error('Email o contraseña incorrectos');
        if (response.status === 404) throw new Error('Servicio no disponible');
        if (response.status === 500) throw new Error('Error al conectar con el servidor');

        const data = await response.json();


        return data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.user = token as any;
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 2592000,
  },
  pages: {
    signIn: '/login',
  },
};

export default authOptions;

// 60 * 60 * 24 * 30, // 30 days
