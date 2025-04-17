"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "user" | "admin" | "organization"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  points?: number
  organizationName?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ecorecycle_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Mock users for demo purposes
  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "user@example.com",
      password: "password",
      role: "user" as UserRole,
      points: 1250,
    },
    {
      id: "2",
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin" as UserRole,
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "org@example.com",
      password: "org123",
      role: "organization" as UserRole,
      organizationName: "EcoTech Solutions",
    },
  ]

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (!foundUser) {
      setIsLoading(false)
      throw new Error("Invalid email or password")
    }

    // Remove password before storing
    const { password: _, ...userWithoutPassword } = foundUser

    // Store user in state and localStorage
    setUser(userWithoutPassword)
    localStorage.setItem("ecorecycle_user", JSON.stringify(userWithoutPassword))
    setIsLoading(false)
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const userExists = mockUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())

    if (userExists) {
      setIsLoading(false)
      throw new Error("User with this email already exists")
    }

    // Create new user
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      role,
      points: 0,
    }

    // Store user in state and localStorage
    setUser(newUser)
    localStorage.setItem("ecorecycle_user", JSON.stringify(newUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ecorecycle_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
