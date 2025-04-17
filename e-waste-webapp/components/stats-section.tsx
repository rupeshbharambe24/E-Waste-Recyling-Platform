"use client"

import { motion } from "framer-motion"
import { Battery, Cpu, Leaf, Users } from "lucide-react"

const stats = [
  {
    icon: Battery,
    value: "15,000+",
    label: "E-Waste Items Collected",
    description: "Electronic items diverted from landfills",
  },
  {
    icon: Users,
    value: "5,000+",
    label: "Active Users",
    description: "Growing community of eco-conscious individuals",
  },
  {
    icon: Leaf,
    value: "250+",
    label: "Tons CO₂ Saved",
    description: "Reduction in carbon emissions through recycling",
  },
  {
    icon: Cpu,
    value: "98%",
    label: "Recycling Rate",
    description: "Of collected materials properly recycled or reused",
  },
]

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Impact</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Together, we're making a significant difference in reducing e-waste and protecting our environment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border shadow-sm"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                <stat.icon className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-lg font-medium mb-2">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
