import { useState, type FormEvent } from "react"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks"


export const Login = () => {
  const { signIn, isAuthenticated } = useAuth()
  
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const res =await signIn(email, password)

    if (!res) {
      setError("Credenciales inválidas")
      setIsLoading(false)
      return
    }
    
    setIsLoading(false)
    navigate("/dashboard")
  }

  if (isAuthenticated) {
    navigate("/dashboard")
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input rounded-t-md"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input rounded-b-md"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="btn btn-primary w-full">
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

