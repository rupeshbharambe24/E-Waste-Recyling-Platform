"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, Award, Coins } from "lucide-react"
import { useAuth } from "@/contexts/auth-provider"

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Profile Info */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader className="items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">{user?.name}</CardTitle>
              <p className="text-muted-foreground text-center">{user?.role}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
                  <Coins className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Eco Points</p>
                  <p className="font-medium">1,250</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
                  <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recycling Level</p>
                  <p className="font-medium">Eco Warrior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <MapPin className="h-4 w-4" />
                View Recycling Centers
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Award className="h-4 w-4" />
                Redeem Rewards
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Pickup
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={user?.name || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ""} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Not provided" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Not provided" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recycling Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Total Donations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">156 kg</p>
                  <p className="text-sm text-muted-foreground">E-Waste Recycled</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Active Rewards</p>
                </div>
              </div>
              <Separator className="my-4" />
              <h3 className="font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50 mt-1">
                    <Recycle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Laptop Recycled</p>
                    <p className="text-sm text-muted-foreground">2 days ago • +50 points</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50 mt-1">
                    <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">Reward Claimed</p>
                    <p className="text-sm text-muted-foreground">1 week ago • Eco Kit</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}