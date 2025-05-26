"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, UserPlus, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password){
      setError("Ingrese email y contraseña");
      setIsLoading(false);
      return;
    } 
    setError(null);
    setIsLoading(true);

    try {
      
      const responseNextAuth = await signIn("credentials", {
        email,
        password,
         redirect: false,
        // callbackUrl: "/",
      });

      
      // toast.promise(responseNextAuth, {
      //   loading: 'Iniciando sesión...',
      //   success: (data) => {
      //     router.push('/');
      //     return 'Bienvenido';
      //   },
      //   error: 'Credenciales inválidas. Por favor, intente de nuevo.',
      // });

      if (responseNextAuth?.error) {
        setError(responseNextAuth?.error);
        setIsLoading(false);
        toast.error(responseNextAuth?.error);
      }

      if(responseNextAuth?.ok) {  
        router.push("/");
      }

      // console.log(responseNextAuth?.error);
    } catch (error: any) {
      console.error("Login error:", error);
      setError(
        error?.message || "Error al iniciar sesión. Verifique sus credenciales."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-800">
      <div className="w-full max-w-md bg-white rounded-3xl p-12 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-teal-800 text-lg font-normal"
            >
              Correo Electrónico.
            </Label>
            <div className="flex items-center border-b-2 border-teal-800 py-2">
              <User className="h-5 w-5 text-teal-800 mr-3 flex-shrink-0" />
              <input
                id="email"
                type="email"
                placeholder="Ingrese email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-teal-800 text-lg font-normal"
            >
              Contraseña.
            </Label>
            <div className="flex items-center border-b-2 border-teal-800 py-2">
              <Lock className="h-5 w-5 text-teal-800 mr-3 flex-shrink-0" />
              <input
                id="password"
                type="password"
                placeholder="Ingrese contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-base"
              />
            </div>
          </div>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-teal-800 hover:bg-teal-700 text-white rounded-full py-6 text-base"
              disabled={isLoading}
            >
              <User className="mr-2 h-5 w-5" />
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
            <Button
              type="button"
              className="flex-1 bg-teal-800 hover:bg-teal-700 text-white rounded-full py-6 text-base"
              onClick={() => router.push("/registro")}
              disabled={isLoading}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Crear usuario
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
