import { createContext } from "react"

import type { User } from "../../types"

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)