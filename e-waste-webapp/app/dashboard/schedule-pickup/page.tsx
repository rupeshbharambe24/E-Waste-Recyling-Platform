"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Check, ChevronRight, ChevronLeft, MapPin, Package, Recycle, Upload } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface FormData {
  address: string
  city: string
  zipCode: string
  wasteType: string
  itemCount: string
  description: string
  date: Date | null
  timeSlot: string
  images: File[]
}

export default function PickupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    address: "",
    city: "",
    zipCode: "",
    wasteType: "",
    itemCount: "",
    description: "",
    date: null,
    timeSlot: "",
    images: []
  })

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM"
  ]

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Get user data from your auth context or wherever it's stored
      const userData = {
        name: "Customer Name", // Replace with actual user data
        phone: "CustomerPhoneNumber" // Replace with actual user data
      };
  
      // Send data to your backend
      const response = await fetch('/api/schedule-pickup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup_date: formData.date?.toISOString().split('T')[0],
          time_slot: formData.timeSlot,
          address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
          waste_type: formData.wasteType,
          item_count: formData.itemCount,
          customer_name: userData.name,
          customer_contact: userData.phone
        }),
      });
  
      const result = await response.json();
      
      if (response.ok) {
        setStep(4); // Move to confirmation step
      } else {
        throw new Error(result.error || 'Failed to schedule pickup');
      }
    } catch (error) {
      console.error('Error scheduling pickup:', error);
      // Show error to user
    }
  };
  
  const handleChange = (field: keyof FormData, value: string | Date | null) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData({
        ...formData,
        images: [...formData.images, ...files]
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule E-Waste Pickup</h1>
          <p className="text-muted-foreground mt-1">Let us collect your electronic waste for proper recycling</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === i 
                      ? 'bg-green-600 text-white' 
                      : step > i 
                        ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' 
                        : 'bg-gray-200 text-gray-500 dark:bg-gray-800'
                  }`}
                >
                  {step > i ? <Check className="h-5 w-5" /> : i}
                </div>
                <div className="text-xs mt-2 text-center">
                  {i === 1 && "Details"}
                  {i === 2 && "Schedule"}
                  {i === 3 && "Review"}
                  {i === 4 && "Confirmation"}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-green-600 transition-all duration-300"
              style={{ width: `${(step - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Waste Details */}
        {step === 1 && (
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-5 w-5 text-green-600 dark:text-green-400" />
                E-Waste Details
              </CardTitle>
              <CardDescription>Tell us about the electronic waste you want to recycle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Green Street" 
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    placeholder="Eco City" 
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input 
                  id="zipCode" 
                  placeholder="12345" 
                  value={formData.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wasteType">Type of E-Waste</Label>
                <Select 
                  value={formData.wasteType}
                  onValueChange={(value) => handleChange("wasteType", value)}
                >
                  <SelectTrigger id="wasteType">
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computers">Computers & Laptops</SelectItem>
                    <SelectItem value="phones">Mobile Phones & Tablets</SelectItem>
                    <SelectItem value="appliances">Small Appliances</SelectItem>
                    <SelectItem value="batteries">Batteries</SelectItem>
                    <SelectItem value="other">Other Electronics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemCount">Number of Items</Label>
                <Input 
                  id="itemCount" 
                  type="number" 
                  placeholder="1" 
                  min="1"
                  value={formData.itemCount}
                  onChange={(e) => handleChange("itemCount", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Please provide details about the items you want to recycle" 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Images (Optional)</Label>
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="dropzone-file" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or JPEG (MAX. 5MB)
                      </p>
                    </div>
                    <input 
                      id="dropzone-file" 
                      type="file" 
                      className="hidden" 
                      multiple 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                {formData.images.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                    {formData.images.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext}>
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Schedule Pickup */}
        {step === 2 && (
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                Schedule Pickup
              </CardTitle>
              <CardDescription>Choose a date and time for your e-waste collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Pickup Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date || undefined}
                      onSelect={(date) => handleChange("date", date)}
                      initialFocus
                      disabled={(date) => date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 30))}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeSlot">Time Slot</Label>
                <Select 
                  value={formData.timeSlot}
                  onValueChange={(value) => handleChange("timeSlot", value)}
                >
                  <SelectTrigger id="timeSlot">
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext}>
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Review Information */}
        {step === 3 && (
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                Review Your Information
              </CardTitle>
              <CardDescription>Please verify all details before submitting your pickup request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Collection Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p>{formData.address}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">City</p>
                    <p>{formData.city}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ZIP Code</p>
                    <p>{formData.zipCode}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">E-Waste Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="capitalize">{formData.wasteType.replace(/_/g, ' ')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Number of Items</p>
                    <p>{formData.itemCount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p>{formData.description || "None provided"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Pickup Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p>{formData.date ? format(formData.date, "PPP") : "Not selected"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Time Slot</p>
                    <p>{formData.timeSlot || "Not selected"}</p>
                  </div>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Uploaded Images</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="border rounded-md p-2">
                        <p className="text-sm truncate max-w-[100px]">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleSubmit}>
                Submit Request
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card className="border-green-200 dark:border-green-800 text-center">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="mt-4">Pickup Scheduled Successfully!</CardTitle>
              <CardDescription>
                Thank you for recycling your e-waste responsibly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-green-50 dark:bg-green-900/50 p-4">
                <h3 className="font-medium">Your Pickup Details</h3>
                <p className="mt-2 text-sm">
                  We'll collect your e-waste on <strong>{formData.date && format(formData.date, "PPP")}</strong> between <strong>{formData.timeSlot}</strong>
                </p>
                <p className="mt-2 text-sm">
                  A confirmation has been sent to your email.
                </p>
              </div>
              <div className="flex justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <p>{formData.address}, {formData.city}, {formData.zipCode}</p>
              </div>
              <div className="flex justify-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <p>{formData.itemCount} {formData.wasteType.replace(/_/g, ' ')} item(s)</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full">View Pickup Details</Button>
              <Button variant="outline" className="w-full">
                Schedule Another Pickup
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}