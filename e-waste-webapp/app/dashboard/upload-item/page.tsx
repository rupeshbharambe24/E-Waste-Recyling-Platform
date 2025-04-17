"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Cpu, Loader2, Upload, X } from "lucide-react"

export default function UploadItemPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [detectedItem, setDetectedItem] = useState<any | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        setIsUploading(false)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setDetectedItem({
        name: "Smartphone",
        type: "Electronics",
        condition: "Used",
        estimatedValue: 45,
        recyclableComponents: ["Battery", "Screen", "Circuit Board", "Plastic Casing"],
        environmentalImpact: "Medium",
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const resetUpload = () => {
    setUploadedImage(null)
    setDetectedItem(null)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Upload E-Waste Item</h1>
        <p className="text-muted-foreground mt-2">
          Upload an image of your e-waste item for AI-powered identification and valuation.
        </p>
      </div>

      <Tabs defaultValue="ai-detection" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-detection">AI Detection</TabsTrigger>
          <TabsTrigger value="manual-entry">Manual Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-detection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Item Detection</CardTitle>
              <CardDescription>
                Upload an image of your e-waste item and our AI will identify it and estimate its value.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!uploadedImage ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 5MB)</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm z-10"
                      onClick={resetUpload}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="rounded-lg overflow-hidden border">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded e-waste item"
                        className="w-full h-64 object-contain"
                      />
                    </div>
                  </div>

                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mb-4" />
                      <p className="text-center font-medium">Analyzing your item...</p>
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        Our AI is identifying the item type, condition, and estimated value.
                      </p>
                    </div>
                  ) : detectedItem ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border p-6 bg-muted/30"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Cpu className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{detectedItem.name}</h3>
                          <p className="text-sm text-muted-foreground">{detectedItem.type}</p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Item Details</h4>
                          <ul className="space-y-2">
                            <li className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Condition:</span>
                              <span>{detectedItem.condition}</span>
                            </li>
                            <li className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Environmental Impact:</span>
                              <span>{detectedItem.environmentalImpact}</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Recyclable Components</h4>
                          <ul className="space-y-1">
                            {detectedItem.recyclableComponents.map((component: string, index: number) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                {component}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5 text-emerald-500" />
                          <span className="font-medium">Estimated Value</span>
                        </div>
                        <div className="text-xl font-bold">{detectedItem.estimatedValue} Coins</div>
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              {detectedItem && (
                <>
                  <Button variant="outline" onClick={resetUpload}>
                    Upload Another Item
                  </Button>
                  <Button>Schedule Pickup</Button>
                </>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="manual-entry">
          <Card>
            <CardHeader>
              <CardTitle>Manual Item Entry</CardTitle>
              <CardDescription>
                Manually enter details about your e-waste item if you prefer not to upload an image.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item Name</Label>
                <Input id="item-name" placeholder="e.g., Smartphone, Laptop, Printer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-category">Category</Label>
                <Select>
                  <SelectTrigger id="item-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer">Computer/Laptop</SelectItem>
                    <SelectItem value="mobile">Mobile Phone</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="tv">TV/Monitor</SelectItem>
                    <SelectItem value="printer">Printer</SelectItem>
                    <SelectItem value="battery">Batteries</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand (Optional)</Label>
                <Input id="brand" placeholder="e.g., Apple, Samsung, HP" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model (Optional)</Label>
                <Input id="model" placeholder="e.g., iPhone 11, Galaxy S20" />
              </div>

              <div className="space-y-2">
                <Label>Condition</Label>
                <RadioGroup defaultValue="used" className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="working" id="condition-working" />
                    <Label htmlFor="condition-working" className="font-normal">
                      Working
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partially-working" id="condition-partially" />
                    <Label htmlFor="condition-partially" className="font-normal">
                      Partially Working
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-working" id="condition-not" />
                    <Label htmlFor="condition-not" className="font-normal">
                      Not Working
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the item, its condition, and any other relevant information"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Images (Optional)</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="manual-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 5MB)</p>
                    </div>
                    <input id="manual-file" type="file" className="hidden" accept="image/*" multiple />
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Submit Item</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
