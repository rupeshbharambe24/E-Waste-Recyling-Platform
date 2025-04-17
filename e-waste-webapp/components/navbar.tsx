"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GreenThemeSelector } from "@/components/green-theme-selector"
import { useAuth } from "@/contexts/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, ChevronDown } from "lucide-react"

export function Navbar() {
  const { user, isLoggedIn, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">E-Wise</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/marketplace" className="text-sm font-medium hover:text-green-600 transition-colors">
              Marketplace
            </Link>
            <Link href="/education" className="text-sm font-medium hover:text-green-600 transition-colors">
              Education
            </Link>
            <Link href="/donate" className="text-sm font-medium hover:text-green-600 transition-colors">
              Donate
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="text-sm font-medium hover:text-green-600 transition-colors">
                  Dashboard
                </Link>
                <Link href="/rewards" className="text-sm font-medium hover:text-green-600 transition-colors">
                  Rewards
                </Link>
              </>
            )}
            {isLoggedIn && user?.role === "admin" && (
              <Link href="/admin/dashboard" className="text-sm font-medium hover:text-green-600 transition-colors">
                Admin
              </Link>
            )}
            {isLoggedIn && user?.role === "organization" && (
              <Link
                href="/organization/dashboard"
                className="text-sm font-medium hover:text-green-600 transition-colors"
              >
                Organization
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <GreenThemeSelector />
          <ThemeToggle />

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/rewards">Rewards</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="default" className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
