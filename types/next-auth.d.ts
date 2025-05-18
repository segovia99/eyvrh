import 'next-auth';


interface roles {
  authority: string;
}


declare module 'next-auth' {
  interface Session {
    user: {
      UserId: number;
      Usuario: string;
      Message: string;
      token: string;
      Role: roles[];
    };
  }
}
