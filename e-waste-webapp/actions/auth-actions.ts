"use server"

import { cookies } from "next/headers"

// In a real application, these would interact with a database
// and use proper password hashing

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "organization"
}

// Mock user database
const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Organization User",
    email: "org@example.com",
    role: "organization",
  },
  {
    id: "3",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
  },
]

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simple validation
  if (!email || !password) {
    return { success: false, message: "Email and password are required" }
  }

  // Find user (in a real app, this would check against a database)
  const user = users.find((u) => u.email === email)

  // In a real app, you would verify the password hash here
  if (!user) {
    return { success: false, message: "Invalid credentials" }
  }

  // Set cookies for authentication
  // In a real app, you would use JWT or another secure token method
  cookies().set("auth-token", `token-${user.id}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  cookies().set("user-name", user.name, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  cookies().set("user-role", user.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return {
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Simple validation
  if (!name || !email || !password) {
    return { success: false, message: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" }
  }

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return { success: false, message: "User with this email already exists" }
  }

  // In a real app, you would create the user in the database here
  const newUser: User = {
    id: `${users.length + 1}`,
    name,
    email,
    role: "user",
  }

  // Add user to mock database
  users.push(newUser)

  // Set cookies for authentication
  cookies().set("auth-token", `token-${newUser.id}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  cookies().set("user-name", newUser.name, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  cookies().set("user-role", newUser.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return {
    success: true,
    message: "Registration successful",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  }
}

export async function logout() {
  // Clear authentication cookies
  cookies().delete("auth-token")
  cookies().delete("user-name")
  cookies().delete("user-role")

  return { success: true, message: "Logout successful" }
}

export async function getUserInfo() {
  const token = cookies().get("auth-token")?.value
  const userName = cookies().get("user-name")?.value
  const userRole = cookies().get("user-role")?.value

  if (!token || !userName || !userRole) {
    return { isLoggedIn: false }
  }

  // In a real app, you would verify the token and get user info from the database
  const userId = token.replace("token-", "")
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return { isLoggedIn: false }
  }

  return {
    isLoggedIn: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}
