"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
              Sustainable E-Waste Management
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Recycle Electronics, <span className="text-emerald-500">Reward the Planet</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our community of eco-conscious individuals and organizations to manage e-waste responsibly while
              earning rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=800"
                alt="E-waste recycling"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-emerald-500 p-4 shadow-lg">
              <Recycle className="h-16 w-16 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-emerald-100/20 blur-3xl dark:bg-emerald-900/20"></div>
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-100/20 blur-3xl dark:bg-emerald-900/20"></div>
    </section>
  )
}
