import { useEffect, useState, type ReactNode } from "react"

import { useLocation, useNavigate } from "react-router-dom"

import { AuthContext } from "./AuthContext"

import { getUser, login, register } from "../../services"

import type { User } from "../../types"

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem("note-app-token"))
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)

  useEffect(() => {
    const currentPath = location.pathname
    const isPublicRoute = ["/login", "/register"].includes(currentPath)

    if (isPublicRoute && isAuthenticated) {
      navigate("/dashboard")
      return
    }

    if (!token) {
      logout()
      return
    }

    if (token && !user && !isPublicRoute) {
      fetchUser()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user])

  const fetchUser = async () => {
    const response = await getUser()
    if (!response) {
      logout();
      return null;
    }

    setUser(response)
  }

  const signIn = async (email: string, password: string) => {
    const response = await login({ email, password })

    if (!response) {
      logout();
      return false;
    }

    const { token, user } = response

    localStorage.setItem("note-app-token", token)
    setToken(token)
    setUser(user)
    setIsAuthenticated(true)
    return true
  }

  const signUp = async (name: string, email: string, password: string) => {
    const response = await register({ name, email, password })

    if (!response) {
      logout();
      return false;
    }

    const { token, user } = response

    localStorage.setItem("note-app-token", token)
    setToken(token)
    setUser(user)
    setIsAuthenticated(true)
    return true
  }

  const logout = () => {
    localStorage.removeItem("note-app-token")
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    token,
    isAuthenticated,
    signIn,
    signUp,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
