import { Leaf, Recycle, Award, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About E-Wise</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          We're on a mission to revolutionize e-waste management through technology, community engagement, and
          sustainable practices.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2025, E-Wise began with a simple idea: make e-waste recycling accessible, rewarding, and
            educational for everyone. What started as a small community initiative has grown into a comprehensive
            platform serving individuals, organizations, and the planet.
          </p>
          <p className="text-muted-foreground mb-4">
            Our team of environmental scientists, tech innovators, and community organizers work together to create
            solutions that make a real impact on the growing e-waste crisis.
          </p>
          <Button className="mt-4">Meet Our Team</Button>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Team working on e-waste recycling"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-green-200/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-green-600">50+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Tons of e-waste properly recycled</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-green-200/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-green-600">10K+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Active users on our platform</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-green-200/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-green-600">200+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Partner organizations and NGOs</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-green-200/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-green-600">30%</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Reduction in local e-waste landfill</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card/50 backdrop-blur-sm border-green-200/50">
            <CardHeader>
              <Leaf className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Sustainability First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every decision we make is guided by environmental impact. We're committed to creating circular solutions
                that benefit the planet.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-green-200/50">
            <CardHeader>
              <Recycle className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We leverage technology to solve complex environmental challenges, making recycling more efficient,
                accessible, and impactful.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-green-200/50">
            <CardHeader>
              <Award className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Community Empowerment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in rewarding positive actions and building a community of environmentally conscious
                individuals and organizations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Shield className="h-16 w-16 text-green-600 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Commitment to Transparency</h2>
            <p className="text-muted-foreground mb-4">
              We believe in full transparency about where your e-waste goes and how it's processed. Every item tracked
              through our platform comes with detailed recycling information, and we only partner with certified
              recyclers who meet our strict environmental standards.
            </p>
            <Button variant="outline">View Our Certifications</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
