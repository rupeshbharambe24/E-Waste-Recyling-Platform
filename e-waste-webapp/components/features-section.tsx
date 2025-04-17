"use client"

import { motion } from "framer-motion"
import { Calendar, Coins, Cpu, Leaf, MapPin, QrCode, Recycle, Truck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Calendar,
    title: "Schedule Pickups",
    description: "Easily schedule e-waste pickups from your location with our convenient scheduling system.",
  },
  {
    icon: Coins,
    title: "Earn Rewards",
    description: "Get rewarded for your contributions with our gamified rewards system and redeem for exciting perks.",
  },
  {
    icon: Cpu,
    title: "AI Item Detection",
    description: "Our AI technology identifies your e-waste items and estimates their recycling value instantly.",
  },
  {
    icon: Truck,
    title: "Doorstep Collection",
    description: "Enjoy hassle-free doorstep collection of your e-waste items by our trained professionals.",
  },
  {
    icon: QrCode,
    title: "Smart Bin Integration",
    description: "Scan QR codes on our smart bins to log your contributions and earn rewards automatically.",
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "Track your pickup requests in real-time with our integrated mapping and location services.",
  },
  {
    icon: Leaf,
    title: "Environmental Impact",
    description: "Monitor your personal environmental impact through detailed analytics and reports.",
  },
  {
    icon: Recycle,
    title: "Certified Recycling",
    description: "All e-waste is processed through certified recycling partners ensuring responsible disposal.",
  },
]

export function FeaturesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Smart E-Waste Management Features</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform offers a comprehensive suite of features designed to make e-waste management easy, rewarding,
            and impactful.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-emerald-500 mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
