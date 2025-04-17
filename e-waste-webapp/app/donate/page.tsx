"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2, Gift, Laptop, Phone, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const donationFormSchema = z.object({
  itemType: z.string({
    required_error: "Please select an item type.",
  }),
  itemName: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  condition: z.string({
    required_error: "Please select the condition of your item.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not be longer than 500 characters.",
    }),
  images: z.any().optional(),
  pickupDate: z.date({
    required_error: "Please select a pickup date.",
  }),
  pickupTimeSlot: z.string({
    required_error: "Please select a pickup time slot.",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
  city: z.string().min(2, {
    message: "Please enter a valid city.",
  }),
  state: z.string().min(2, {
    message: "Please enter a valid state.",
  }),
  zipCode: z.string().min(5, {
    message: "Please enter a valid ZIP code.",
  }),
  donationType: z.enum(["ngo", "recycling"], {
    required_error: "Please select a donation type.",
  }),
  ngoPreference: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

export default function DonatePage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof donationFormSchema>>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      description: "",
      termsAccepted: false,
    },
  })

  function onSubmit(values: z.infer<typeof donationFormSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      console.log(values)
    }, 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Simulate image upload
    const newImages = Array.from(files).map((file) => {
      return URL.createObjectURL(file)
    })

    setUploadedImages([...uploadedImages, ...newImages])
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Donation Scheduled!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your donation. We've scheduled a pickup for your items.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Pickup Details</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div>
                <h3 className="font-medium">Date & Time</h3>
                <p className="text-muted-foreground">
                  {format(form.getValues("pickupDate"), "MMMM d, yyyy")} - {form.getValues("pickupTimeSlot")}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">
                  {form.getValues("address")}, {form.getValues("city")}, {form.getValues("state")}{" "}
                  {form.getValues("zipCode")}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Item</h3>
                <p className="text-muted-foreground">
                  {form.getValues("itemName")} ({form.getValues("itemType")})
                </p>
              </div>
              <div>
                <h3 className="font-medium">Donation Type</h3>
                <p className="text-muted-foreground">
                  {form.getValues("donationType") === "ngo" ? "NGO Donation" : "Recycling"}
                  {form.getValues("donationType") === "ngo" &&
                    form.getValues("ngoPreference") &&
                    ` - ${form.getValues("ngoPreference")}`}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" onClick={() => (window.location.href = "/dashboard")}>
                Go to Dashboard
              </Button>
              <Button variant="outline" className="w-full" onClick={() => window.print()}>
                Print Receipt
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Donate Electronics</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Donate your working electronics to those in need or recycle non-working items responsibly. We'll schedule a
          free pickup at your convenience.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Donation Form</CardTitle>
              <CardDescription>
                Fill out the details below to schedule a pickup for your electronic items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div
                      className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 1 ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      1
                    </div>
                    <span className="ml-2 font-medium">Item Details</span>
                  </div>
                  <div className="h-0.5 w-12 bg-muted self-center"></div>
                  <div className="flex items-center">
                    <div
                      className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 2 ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      2
                    </div>
                    <span className="ml-2 font-medium">Pickup Details</span>
                  </div>
                  <div className="h-0.5 w-12 bg-muted self-center"></div>
                  <div className="flex items-center">
                    <div
                      className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 3 ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      3
                    </div>
                    <span className="ml-2 font-medium">Donation Type</span>
                  </div>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="itemType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select item type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="laptop">Laptop</SelectItem>
                                <SelectItem value="desktop">Desktop Computer</SelectItem>
                                <SelectItem value="tablet">Tablet</SelectItem>
                                <SelectItem value="smartphone">Smartphone</SelectItem>
                                <SelectItem value="monitor">Monitor</SelectItem>
                                <SelectItem value="printer">Printer</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="itemName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Name/Model</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Dell XPS 13, iPhone 12" {...field} />
                            </FormControl>
                            <FormDescription>Please provide the specific name or model of your item.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="condition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Condition</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="like-new">Like New</SelectItem>
                                <SelectItem value="excellent">Excellent</SelectItem>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="fair">Fair</SelectItem>
                                <SelectItem value="non-working">Non-Working</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe your item, including any defects or issues."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Include details about the item's age, any accessories included, and its current working
                              condition.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div>
                        <FormLabel>Images (Optional)</FormLabel>
                        <div className="mt-2">
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="image-upload"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 5MB)</p>
                              </div>
                              <input
                                id="image-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                              />
                            </label>
                          </div>
                        </div>
                        {uploadedImages.length > 0 && (
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            {uploadedImages.map((image, index) => (
                              <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`Uploaded image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <Button type="button" onClick={() => setStep(2)}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="pickupDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Pickup Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setDate(new Date().getDate() + 1)) ||
                                    date > new Date(new Date().setDate(new Date().getDate() + 30))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Select a date for pickup (available dates are within the next 30 days).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pickupTimeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pickup Time Slot</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="9am-12pm">Morning (9AM - 12PM)</SelectItem>
                                <SelectItem value="12pm-3pm">Afternoon (12PM - 3PM)</SelectItem>
                                <SelectItem value="3pm-6pm">Evening (3PM - 6PM)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Street address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="ZIP Code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>
                          Previous Step
                        </Button>
                        <Button type="button" onClick={() => setStep(3)}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="donationType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Donation Type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-3 space-y-0">
                                  <RadioGroupItem value="ngo" id="ngo" />
                                  <div className="flex flex-col">
                                    <label
                                      htmlFor="ngo"
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      Donate to NGO
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      Donate working electronics to non-profit organizations that provide technology to
                                      those in need.
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 space-y-0">
                                  <RadioGroupItem value="recycling" id="recycling" />
                                  <div className="flex flex-col">
                                    <label
                                      htmlFor="recycling"
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      Recycle
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      Recycle non-working or outdated electronics responsibly through our certified
                                      recycling partners.
                                    </p>
                                  </div>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("donationType") === "ngo" && (
                        <FormField
                          control={form.control}
                          name="ngoPreference"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>NGO Preference (Optional)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an NGO (optional)" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="digital-empowerment">Digital Empowerment Foundation</SelectItem>
                                  <SelectItem value="tech-for-all">Tech For All</SelectItem>
                                  <SelectItem value="connect-humanity">Connect Humanity</SelectItem>
                                  <SelectItem value="schools-first">Schools First Initiative</SelectItem>
                                  <SelectItem value="no-preference">No Preference</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                You can select a specific NGO or let us choose based on current needs.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I agree to the terms and conditions</FormLabel>
                              <FormDescription>
                                By checking this box, you agree to our{" "}
                                <a href="#" className="text-green-600 hover:underline">
                                  Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-green-600 hover:underline">
                                  Privacy Policy
                                </a>
                                .
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep(2)}>
                          Previous Step
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Schedule Pickup"}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-green-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Fill the Form</h3>
                    <p className="text-sm text-muted-foreground">
                      Provide details about your electronic item and your preferred pickup time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-green-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Schedule Pickup</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll confirm your pickup time and send you a confirmation email with details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-green-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Pickup Day</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will arrive during your selected time slot to collect your items.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-green-600">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Track Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive updates on how your donation is making a difference or how your e-waste was recycled.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Donate?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <Gift className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Support Communities</h3>
                    <p className="text-sm text-muted-foreground">
                      Your donated electronics help bridge the digital divide for underserved communities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <Laptop className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Extend Device Lifespan</h3>
                    <p className="text-sm text-muted-foreground">
                      Give your electronics a second life instead of letting them collect dust.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Responsible Recycling</h3>
                    <p className="text-sm text-muted-foreground">
                      Non-working items are recycled properly, preventing harmful materials from entering landfills.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have any questions about donating your electronics, our team is here to help.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
