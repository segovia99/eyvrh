"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User, UserPlus, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("JorgeAdonai21@gmail.com")
  const [password, setPassword] = useState("****************")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // En un caso real, aquí iría la lógica de autenticación
    // Por ahora, simplemente redirigimos al dashboard
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-800">
      <div className="w-full max-w-md bg-white rounded-3xl p-12 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-teal-800 text-lg font-normal">
              Correo Electrónico.
            </Label>
            <div className="flex items-center border-b-2 border-teal-800 py-2">
              <User className="h-5 w-5 text-teal-800 mr-3 flex-shrink-0" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-teal-800 text-lg font-normal">
              Contraseña.
            </Label>
            <div className="flex items-center border-b-2 border-teal-800 py-2">
              <Lock className="h-5 w-5 text-teal-800 mr-3 flex-shrink-0" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-base"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-teal-800 hover:bg-teal-700 text-white rounded-full py-6 text-base"
            >
              <User className="mr-2 h-5 w-5" />
              Iniciar Sesión
            </Button>
            <Button
              type="button"
              className="flex-1 bg-teal-800 hover:bg-teal-700 text-white rounded-full py-6 text-base"
              onClick={() => router.push("/registro")}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Crear usuario
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
