"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Mail, Bell, Lock, Shield, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-provider"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Settings Navigation */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="p-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                Account Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Privacy
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-600">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings Content */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={user?.email || ""} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Update Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive app notifications</p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promotional">Promotional Offers</Label>
                  <p className="text-sm text-muted-foreground">Receive special offers</p>
                </div>
                <Switch id="promotional" />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Change Password</Label>
                <div className="space-y-4">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch id="two-factor" />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Delete Account</Label>
                <p className="text-sm text-muted-foreground">
                  Permanently remove your account and all associated data
                </p>
              </div>
              <Button variant="destructive">Delete My Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}