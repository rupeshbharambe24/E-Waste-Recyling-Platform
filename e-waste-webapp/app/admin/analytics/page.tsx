"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Sample data for charts
const monthlyCollectionData = [
  { name: "Jan", amount: 65, users: 120 },
  { name: "Feb", amount: 59, users: 132 },
  { name: "Mar", amount: 80, users: 145 },
  { name: "Apr", amount: 81, users: 160 },
  { name: "May", amount: 56, users: 187 },
  { name: "Jun", amount: 55, users: 193 },
  { name: "Jul", amount: 40, users: 210 },
  { name: "Aug", amount: 70, users: 215 },
  { name: "Sep", amount: 90, users: 234 },
  { name: "Oct", amount: 110, users: 256 },
  { name: "Nov", amount: 95, users: 278 },
  { name: "Dec", amount: 75, users: 294 },
]

const wasteTypeData = [
  { name: "Computers", value: 35 },
  { name: "Phones", value: 25 },
  { name: "Appliances", value: 20 },
  { name: "Batteries", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534"]

const environmentalImpactData = [
  { name: "Week 1", carbon: 120, water: 240, landfill: 80 },
  { name: "Week 2", carbon: 132, water: 250, landfill: 89 },
  { name: "Week 3", carbon: 101, water: 190, landfill: 75 },
  { name: "Week 4", carbon: 134, water: 270, landfill: 90 },
  { name: "Week 5", carbon: 90, water: 180, landfill: 65 },
  { name: "Week 6", carbon: 230, water: 340, landfill: 166 },
  { name: "Week 7", carbon: 210, water: 300, landfill: 153 },
  { name: "Week 8", carbon: 220, water: 320, landfill: 164 },
  { name: "Week 9", carbon: 205, water: 290, landfill: 145 },
  { name: "Week 10", carbon: 190, water: 280, landfill: 140 },
  { name: "Week 11", carbon: 207, water: 310, landfill: 152 },
  { name: "Week 12", carbon: 222, water: 315, landfill: 168 },
]

const locationData = [
  { name: "New York", value: 35 },
  { name: "Los Angeles", value: 25 },
  { name: "Chicago", value: 18 },
  { name: "Houston", value: 15 },
  { name: "Phoenix", value: 12 },
  { name: "Philadelphia", value: 10 },
  { name: "San Antonio", value: 8 },
  { name: "San Diego", value: 7 },
  { name: "Dallas", value: 6 },
  { name: "San Jose", value: 5 },
]

const materialRecoveryData = [
  { name: "Gold", amount: 0.5, value: 25000 },
  { name: "Silver", amount: 5.2, value: 3500 },
  { name: "Copper", amount: 18.7, value: 1200 },
  { name: "Aluminum", amount: 25.3, value: 800 },
  { name: "Plastic", amount: 45.8, value: 400 },
  { name: "Glass", amount: 12.6, value: 200 },
  { name: "Other", amount: 8.9, value: 150 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is admin
  if (user?.role !== "admin") {
    // If not in browser environment, return null
    if (typeof window === "undefined") {
      return null
    }
    
    // If in browser, redirect to login
    toast({
      title: "Access denied",
      description: "You don't have permission to view this page.",
      variant: "destructive",
    })
    router.push("/login")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights.
          </p>
        </div>
      </div>

      {/* Let's create the QR code scanning component: */}

\
