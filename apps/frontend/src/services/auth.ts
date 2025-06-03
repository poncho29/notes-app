import api from "../lib/axios"

import type { CreateUser, LoginResponse, User } from "../types"

export const login = async (body: { email: string; password: string }): Promise<LoginResponse | null> => {
  try {
    const response = await api.post("/auth/login", body)
    return response.data
  } catch (error) {
    console.error("Error loging user:", error)
    return null
  }
}

export const register = async (body: CreateUser): Promise<LoginResponse | null> => {
  try {
    const response = await api.post("/auth/register", body)
    return response.data
  } catch (error) {
    console.error("Error register user:", error)
    return null
  }
}

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/user")
    return response.data
  } catch (error) {
    console.error("Error fetching user data:", error)
    return null
  }
}