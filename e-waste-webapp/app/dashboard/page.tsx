"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Award, BarChart3, Calendar, Coins, Leaf, MapPin, Recycle, Truck, Upload } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, Rupesh! Here's an overview of your e-waste management activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/schedule-pickup">
              Schedule Pickup
              <Truck className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/upload-item">
              Upload Item
              <Upload className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Coins Earned</CardTitle>
              <Coins className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Recycled</CardTitle>
              <Recycle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
              <Leaf className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125 kg</div>
              <p className="text-xs text-muted-foreground">Equivalent to 5 trees planted</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
              <Award className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#42</div>
              <p className="text-xs text-muted-foreground">Top 10% in your area</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Pickups</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="rewards">Rewards Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Pickups</CardTitle>
              <CardDescription>You have 2 scheduled pickups in the next 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Old Laptop and Peripherals</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        Tomorrow, 10:00 AM - 12:00 PM
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Old Smartphone Collection</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        Friday, 2:00 PM - 4:00 PM
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/schedule-pickup">
                  Schedule New Pickup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent e-waste management activities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Earned 150 Coins</p>
                    <p className="text-sm text-muted-foreground">For recycling an old printer</p>
                  </div>
                  <div className="text-sm text-muted-foreground">2 days ago</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Pickup Completed</p>
                    <p className="text-sm text-muted-foreground">3 items collected from your location</p>
                  </div>
                  <div className="text-sm text-muted-foreground">5 days ago</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Item Uploaded</p>
                    <p className="text-sm text-muted-foreground">Old keyboard identified by AI</p>
                  </div>
                  <div className="text-sm text-muted-foreground">1 week ago</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New Location Added</p>
                    <p className="text-sm text-muted-foreground">Home address updated</p>
                  </div>
                  <div className="text-sm text-muted-foreground">2 weeks ago</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rewards Progress</CardTitle>
              <CardDescription>Track your progress towards the next reward tier.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium">Silver Recycler</span>
                  </div>
                  <span className="text-sm">750 / 1000 points</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">250 more points to reach Gold Recycler status</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Available Rewards</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Coins className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h5 className="font-medium">$10 Gift Card</h5>
                        <p className="text-sm text-muted-foreground">500 coins</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h5 className="font-medium">Plant a Tree</h5>
                        <p className="text-sm text-muted-foreground">300 coins</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/redeem">
                  View All Rewards
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
            <CardDescription>Your contribution to environmental sustainability.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border bg-muted/50 flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Top contributors in your area.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-sm font-bold text-emerald-700">1</span>
                </div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Sarah M.</p>
                  <p className="text-sm text-muted-foreground">2,450 points</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-sm font-bold text-emerald-700">2</span>
                </div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>RJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Robert J.</p>
                  <p className="text-sm text-muted-foreground">2,120 points</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-sm font-bold text-emerald-700">3</span>
                </div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Amelia K.</p>
                  <p className="text-sm text-muted-foreground">1,890 points</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-sm font-bold text-emerald-700">42</span>
                </div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">You</p>
                  <p className="text-sm text-muted-foreground">1,250 points</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Full Leaderboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
