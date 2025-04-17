"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  Coins,
  FileText,
  Gift,
  Home,
  Leaf,
  LogOut,
  QrCode,
  Settings,
  ShoppingCart,
  Truck,
  Upload,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GreenThemeSelector } from "@/components/green-theme-selector"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Schedule Pickup",
    icon: Truck,
    href: "/dashboard/schedule-pickup",
  },
  {
    title: "Upload Item",
    icon: Upload,
    href: "/dashboard/upload-item",
  },
  {
    title: "Rewards",
    icon: Coins,
    href: "/rewards",
  },
  {
    title: "Marketplace",
    icon: ShoppingCart,
    href: "/marketplace",
  },
  {
    title: "Educational Modules",
    icon: FileText,
    href: "/education",
  },
  {
    title: "Scan QR Code",
    icon: QrCode,
    href: "/rewards",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="flex items-center justify-between p-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-emerald-500" />
              <span className="font-bold text-xl">E-Wise</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.slice(0, 5).map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Features</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.slice(5).map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">Rupesh Bharambe</span>
                <span className="text-xs text-muted-foreground">rbtech44@gmail.com</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <GreenThemeSelector />
              <ThemeToggle />
              <Button variant="outline" size="icon" className="ml-auto">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <Link href="/profile">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </Button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
      </div>
    </SidebarProvider>
  )
}
