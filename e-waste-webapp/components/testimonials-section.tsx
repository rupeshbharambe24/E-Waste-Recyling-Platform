"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "EcoRecycle has made it incredibly easy for our company to manage e-waste responsibly. The pickup scheduling and tracking features are seamless.",
    author: "Sarah Johnson",
    role: "Sustainability Manager, TechCorp",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    quote:
      "I love the rewards system! It's satisfying to see how my small contributions add up to make a real environmental impact.",
    author: "Michael Chen",
    role: "Regular User",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    quote:
      "The educational resources have been eye-opening for our students. We've integrated EcoRecycle into our environmental science curriculum.",
    author: "Dr. Priya Patel",
    role: "University Professor",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from individuals and organizations who are making a difference with EcoRecycle.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                      <AvatarFallback>
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
