import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Email inválido").min(1, "El email es obligatorio"),
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
})

export const signUpSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido").min(1, "El email es obligatorio"),
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
})
