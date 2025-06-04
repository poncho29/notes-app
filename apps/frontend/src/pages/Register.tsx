import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { useAuth } from "../hooks"

import { signUpSchema } from "../schema";

type SignUpFormValues = z.infer<typeof signUpSchema>;

export const Register = () => {
  const { signUp, isAuthenticated } = useAuth()

  const navigate = useNavigate()

  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const {
    register, 
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  
  const onSubmit = async (data: SignUpFormValues) => {
    setAuthError("")

    const { name, email, password } = data
    const resp =await signUp(name, email, password)

    if (!resp) {
      setAuthError("Error al crear la cuenta")
      return
    }

    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear una cuenta</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre
              </label>
              <input
                {...register("name")}
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
                autoComplete="name"
                className="input rounded-t-md"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                {...register("email")}
                id="email-address"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                className="input"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                autoComplete="new-password"
                className="input rounded-b-md"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
          </div>

          {authError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{ authError }</span>
            </div>
          )}

          <div>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
              {isSubmitting ? "Cargando..." : "Registrarse"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

