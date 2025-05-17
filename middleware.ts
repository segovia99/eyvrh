import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  
  const path = request.nextUrl.pathname

  
  if (path === "/login" || path === "/registro") {
    return NextResponse.next()
  }

  // Simulamos verificación de autenticación (en un caso real, verificaríamos tokens, cookies, etc.)
  const isAuthenticated = true // Cambiar a true para simular usuario autenticado

  // Si no está autenticado y no está en una ruta pública, redirigir a login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// rutas que queremos que pasen por el middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
