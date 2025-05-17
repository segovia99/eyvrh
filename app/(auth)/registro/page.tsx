"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegistroPage() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // En un caso real, aquí iría la lógica de registro
    // Por ahora, simplemente redirigimos al login
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-800">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-teal-800 mb-6">Crear Nuevo Usuario</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-teal-800 text-lg">
              Nombre Completo
            </Label>
            <div className="flex items-center border-b-2 border-teal-800 py-2">
              <User className="h-5 w-5 text-teal-800 mr-3 flex-shrink-0" />
              <input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese su nombre completo"
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-teal-800 text-lg">
              Correo Electrónico
            </Label>
            <div className="flex items-center border-b-2 border-teal-800 py-2">
              <Mail className="h-5 w-5 text-teal-800 mr-3 flex-shrink-0" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su correo electrónico"
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-teal-800 text-lg">
              Contraseña
            </Label>
            <div className="flex items-center border-b-2 border-teal-800 py-2">
              <Lock className="h-5 w-5 text-teal-800 mr-3 flex-shrink-0" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Cree una contraseña segura"
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-teal-800 text-lg">
              Confirmar Contraseña
            </Label>
            <div className="flex items-center border-b-2 border-teal-800 py-2">
              <Lock className="h-5 w-5 text-teal-800 mr-3 flex-shrink-0" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme su contraseña"
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-base"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-teal-800 text-teal-800 hover:bg-teal-50 rounded-full py-6"
              onClick={() => router.push("/login")}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Volver
            </Button>
            <Button type="submit" className="flex-1 bg-teal-800 hover:bg-teal-700 text-white rounded-full py-6">
              Registrarse
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
