"use client"

import { useState, useEffect } from "react"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const greenThemes = [
  { name: "Emerald", value: "emerald" },
  { name: "Forest", value: "forest" },
  { name: "Mint", value: "mint" },
  { name: "Lime", value: "lime" },
  { name: "Sage", value: "sage" },
]

export function GreenThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState("emerald")

  useEffect(() => {
    // Get the saved theme from localStorage or use default
    const savedTheme = localStorage.getItem("green-theme") || "emerald"
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute("data-green-theme", savedTheme)
  }, [])

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme)
    localStorage.setItem("green-theme", theme)
    document.documentElement.setAttribute("data-green-theme", theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select green theme</span>
          <span
            className="absolute bottom-0 right-0 h-2 w-2 rounded-full"
            style={{
              backgroundColor:
                currentTheme === "emerald"
                  ? "#10b981"
                  : currentTheme === "forest"
                    ? "#047857"
                    : currentTheme === "mint"
                      ? "#a7f3d0"
                      : currentTheme === "lime"
                        ? "#84cc16"
                        : "#84cc16", // sage
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {greenThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => changeTheme(theme.value)}
            className="flex items-center gap-2"
          >
            <span
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor:
                  theme.value === "emerald"
                    ? "#10b981"
                    : theme.value === "forest"
                      ? "#047857"
                      : theme.value === "mint"
                        ? "#a7f3d0"
                        : theme.value === "lime"
                          ? "#84cc16"
                          : "#84cc16", // sage
              }}
            />
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
