"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, SlidersHorizontal, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"

// Sample product data
const products = [
  {
    id: 1,
    name: "Refurbished Laptop",
    description: "Dell XPS 13, 16GB RAM, 512GB SSD, excellent condition",
    price: 599,
    condition: "Excellent",
    category: "Laptops",
    image: "/placeholder.svg?height=200&width=300",
    type: "sell",
    location: "New York, NY",
    distance: 5,
  },
  {
    id: 2,
    name: "Used Smartphone",
    description: "iPhone 12, 128GB, battery health 89%, minor scratches",
    price: 349,
    condition: "Good",
    category: "Phones",
    image: "/placeholder.svg?height=200&width=300",
    type: "sell",
    location: "Boston, MA",
    distance: 12,
  },
  {
    id: 3,
    name: "Gaming Console",
    description: "PlayStation 5, includes 2 controllers and 3 games",
    price: 450,
    condition: "Like New",
    category: "Gaming",
    image: "/placeholder.svg?height=200&width=300",
    type: "sell",
    location: "Chicago, IL",
    distance: 8,
  },
  {
    id: 4,
    name: "Wireless Headphones",
    description: "Sony WH-1000XM4, noise cancelling, with case",
    price: 180,
    condition: "Good",
    category: "Audio",
    image: "/placeholder.svg?height=200&width=300",
    type: "sell",
    location: "Seattle, WA",
    distance: 15,
  },
  {
    id: 5,
    name: "Tablet",
    description: "iPad Air 4th Gen, 64GB, WiFi, Space Gray",
    price: 320,
    condition: "Excellent",
    category: "Tablets",
    image: "/placeholder.svg?height=200&width=300",
    type: "sell",
    location: "Austin, TX",
    distance: 3,
  },
  {
    id: 6,
    name: "Computer Monitor",
    description: "27-inch 4K Dell UltraSharp, minimal use",
    price: 0,
    condition: "Like New",
    category: "Monitors",
    image: "/placeholder.svg?height=200&width=300",
    type: "donate",
    location: "San Francisco, CA",
    distance: 7,
  },
  {
    id: 7,
    name: "Wireless Keyboard",
    description: "Logitech MX Keys, backlit, multi-device",
    price: 0,
    condition: "Good",
    category: "Accessories",
    image: "/placeholder.svg?height=200&width=300",
    type: "donate",
    location: "Denver, CO",
    distance: 10,
  },
  {
    id: 8,
    name: "External Hard Drive",
    description: "WD 2TB, USB-C, barely used",
    price: 0,
    condition: "Excellent",
    category: "Storage",
    image: "/placeholder.svg?height=200&width=300",
    type: "donate",
    location: "Miami, FL",
    distance: 20,
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [maxDistance, setMaxDistance] = useState(50)
  const [activeTab, setActiveTab] = useState("buy")
  const [showFilters, setShowFilters] = useState(false)

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    // Filter by search term
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by category
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    // Filter by condition
    const matchesCondition = selectedCondition === "all" || product.condition === selectedCondition

    // Filter by distance
    const matchesDistance = product.distance <= maxDistance

    // Filter by tab (buy/sell/donate)
    const matchesTab =
      (activeTab === "buy" && product.type === "sell") || (activeTab === "donate" && product.type === "donate")

    return matchesSearch && matchesCategory && matchesCondition && matchesDistance && matchesTab
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">E-Waste Marketplace</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Buy, sell, or donate used electronics. Give devices a second life and reduce e-waste.
        </p>
      </div>

      <Tabs defaultValue="buy" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="buy">Buy & Sell</TabsTrigger>
          <TabsTrigger value="donate">Donate & Request</TabsTrigger>
        </TabsList>
        <TabsContent value="buy" className="mt-6">
          <p className="text-center text-muted-foreground mb-6">
            Browse pre-owned electronics for sale from verified sellers. All items are tested and in working condition.
          </p>
        </TabsContent>
        <TabsContent value="donate" className="mt-6">
          <p className="text-center text-muted-foreground mb-6">
            Find electronics available for donation or request specific items for your organization or personal use.
          </p>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for electronics..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="md:w-auto w-full" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button className="md:w-auto w-full">{activeTab === "buy" ? "Sell an Item" : "Donate an Item"}</Button>
      </div>

      {showFilters && (
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-green-200/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filter Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Laptops">Laptops</SelectItem>
                    <SelectItem value="Phones">Phones</SelectItem>
                    <SelectItem value="Tablets">Tablets</SelectItem>
                    <SelectItem value="Gaming">Gaming</SelectItem>
                    <SelectItem value="Audio">Audio</SelectItem>
                    <SelectItem value="Monitors">Monitors</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Storage">Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Condition</label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Maximum Distance: {maxDistance} miles</label>
                <Slider
                  value={[maxDistance]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => setMaxDistance(value[0])}
                  className="py-4"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all")
                setSelectedCondition("all")
                setMaxDistance(50)
                setSearchTerm("")
              }}
            >
              Reset Filters
            </Button>
            <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </CardFooter>
        </Card>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="relative h-48 w-full">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                {product.type === "donate" && <Badge className="absolute top-2 left-2 bg-green-600">Free</Badge>}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  {product.type === "sell" ? (
                    <p className="font-semibold">${product.price}</p>
                  ) : (
                    <p className="font-semibold text-green-600">For Donation</p>
                  )}
                  <Badge variant="outline">{product.condition}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {product.location} • {product.distance} miles away
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {product.type === "sell" ? (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      View Details
                    </>
                  ) : (
                    <>Request Item</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Button variant="outline" className="mx-auto">
          Load More Items
        </Button>
      </div>
    </div>
  )
}
