"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Video, FileText, Award, Clock, Play } from "lucide-react"
import Image from "next/image"

export default function EducationPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">E-Waste Education Center</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Learn about e-waste management, recycling processes, and how you can make a difference through our
          comprehensive educational resources.
        </p>
      </div>

      <Tabs defaultValue="videos" className="mb-12">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="guides">Guides & Articles</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                {activeVideo ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={activeVideo}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <div className="text-center p-4">
                      <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Select a video to watch</p>
                    </div>
                  </div>
                )}
              </div>
              {activeVideo && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {videoTutorials.find((v) => v.videoUrl === activeVideo)?.title || "Selected Video"}
                  </h3>
                  <p className="text-muted-foreground">
                    {videoTutorials.find((v) => v.videoUrl === activeVideo)?.description || ""}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Video Tutorials</h2>
              {videoTutorials.map((video, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all ${activeVideo === video.videoUrl ? "border-green-500 bg-green-50/50 dark:bg-green-950/20" : "hover:border-green-200"}`}
                  onClick={() => setActiveVideo(video.videoUrl)}
                >
                  <CardContent className="p-4 flex gap-4">
                    <div className="relative h-24 w-40 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{video.description}</p>
                      <div className="flex items-center mt-2">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{video.duration}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {video.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{guide.title}</CardTitle>
                    <Badge variant="outline">{guide.category}</Badge>
                  </div>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-1" />
                    {guide.readTime} min read
                  </div>
                  <Button variant="ghost" size="sm">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
              <div className="space-y-6">
                {courses.map((course, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription className="mt-2">{course.description}</CardDescription>
                        </div>
                        <Badge>{course.level}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{course.modules} Modules</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{course.duration}</span>
                        </div>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{course.progress}%</span>
                      </div>

                      <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value="modules">
                          <AccordionTrigger>View Course Modules</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {course.modulesList.map((module, idx) => (
                                <li key={idx} className="flex items-center justify-between py-2 border-b">
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium">{module.title}</span>
                                  </div>
                                  <Badge variant={module.completed ? "default" : "outline"}>
                                    {module.completed ? "Completed" : "Pending"}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">{course.progress > 0 ? "Continue Course" : "Start Course"}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-green-600" />
                    Certification Programs
                  </CardTitle>
                  <CardDescription>Complete courses to earn certificates in e-waste management</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                          <cert.icon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{cert.title}</h4>
                          <p className="text-sm text-muted-foreground">{cert.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Certifications
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Button variant="link" className="p-0 h-auto text-green-600">
                        E-Waste Management Guidelines PDF
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-green-600">
                        Recycling Process Infographic
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-green-600">
                        Environmental Impact Calculator
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-green-600">
                        E-Waste Regulations by Country
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const videoTutorials = [
  {
    title: "Understanding E-Waste: The Basics",
    description: "Learn about what constitutes e-waste and why proper disposal is crucial for our environment.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "8:24",
    category: "Basics",
  },
  {
    title: "How to Prepare Your Electronics for Recycling",
    description:
      "Step-by-step guide on how to prepare your devices for recycling, including data wiping and disassembly.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "12:05",
    category: "How-to",
  },
  {
    title: "Inside an E-Waste Recycling Facility",
    description: "Take a tour inside a modern e-waste recycling facility and see how electronics are processed.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "15:30",
    category: "Behind the Scenes",
  },
  {
    title: "The Environmental Impact of E-Waste",
    description:
      "Understand the environmental consequences of improper e-waste disposal and the benefits of recycling.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "10:15",
    category: "Environmental",
  },
  {
    title: "E-Waste Management for Businesses",
    description: "Best practices for businesses to manage their electronic waste responsibly and efficiently.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "18:42",
    category: "Business",
  },
]

const guides = [
  {
    title: "Complete Guide to E-Waste Recycling",
    description: "Everything you need to know about recycling electronic waste properly.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Comprehensive",
    readTime: 12,
  },
  {
    title: "Data Security When Recycling Devices",
    description: "How to ensure your personal data is completely wiped before recycling electronics.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Security",
    readTime: 8,
  },
  {
    title: "E-Waste Regulations Around the World",
    description: "A comparison of e-waste management laws and regulations across different countries.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Regulations",
    readTime: 15,
  },
  {
    title: "DIY Electronics Repair Basics",
    description: "Simple repairs you can do at home to extend the life of your electronic devices.",
    image: "/placeholder.svg?height=200&width=300",
    category: "DIY",
    readTime: 10,
  },
  {
    title: "Upcycling Old Electronics: Creative Projects",
    description: "Turn your old electronics into useful and decorative items with these creative ideas.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Upcycling",
    readTime: 7,
  },
  {
    title: "Sustainable Electronics: Buying Guide",
    description: "How to choose environmentally friendly electronics and reduce your e-waste footprint.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Shopping",
    readTime: 9,
  },
]

const courses = [
  {
    title: "E-Waste Management Fundamentals",
    description: "A comprehensive introduction to e-waste management principles and practices.",
    level: "Beginner",
    modules: 8,
    duration: "4 weeks",
    progress: 65,
    modulesList: [
      { title: "Introduction to E-Waste", completed: true },
      { title: "Environmental Impact Assessment", completed: true },
      { title: "Regulatory Frameworks", completed: true },
      { title: "Collection Systems", completed: true },
      { title: "Processing Technologies", completed: true },
      { title: "Data Security in E-Waste", completed: false },
      { title: "Business Models in Recycling", completed: false },
      { title: "Future Trends", completed: false },
    ],
  },
  {
    title: "Sustainable Electronics Design",
    description: "Learn how electronics are designed for sustainability and reduced environmental impact.",
    level: "Intermediate",
    modules: 6,
    duration: "3 weeks",
    progress: 0,
    modulesList: [
      { title: "Principles of Sustainable Design", completed: false },
      { title: "Material Selection", completed: false },
      { title: "Energy Efficiency", completed: false },
      { title: "Design for Disassembly", completed: false },
      { title: "Lifecycle Assessment", completed: false },
      { title: "Case Studies", completed: false },
    ],
  },
]

const certifications = [
  {
    title: "Certified E-Waste Manager",
    description: "Professional certification for e-waste management specialists",
    icon: Award,
  },
  {
    title: "Sustainable Electronics Specialist",
    description: "Learn about eco-friendly electronics and circular economy principles",
    icon: BookOpen,
  },
  {
    title: "E-Waste Compliance Officer",
    description: "Understand regulations and compliance requirements for e-waste",
    icon: FileText,
  },
]
