"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, Phone, Globe, ArrowRight, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface RecyclingCenter {
  id: string
  name: string
  address: string
  distance: string
  hours: string
  phone: string
  website: string
  accepts: string[]
  rating: number
  image: string
}

export default function RecyclingCentersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const recyclingCenters: RecyclingCenter[] = [
    {
      id: "1",
      name: "Green Earth Recycling Hub",
      address: "123 Eco Park Road, Greenville",
      distance: "2.5 km",
      hours: "Mon-Sat: 8AM-6PM",
      phone: "+1 (555) 123-4567",
      website: "greenearthrecycle.com",
      accepts: ["Electronics", "Batteries", "Plastics", "Metals"],
      rating: 4.8,
      image: "/recycling-center-1.jpg"
    },
    {
      id: "2",
      name: "EcoTech Disposal Center",
      address: "456 Sustainability Blvd, Ecotown",
      distance: "5.1 km",
      hours: "Tue-Sun: 9AM-5PM",
      phone: "+1 (555) 987-6543",
      website: "ecotechdisposal.com",
      accepts: ["Electronics", "Appliances", "Hazardous Waste"],
      rating: 4.5,
      image: "/recycling-center-2.jpg"
    },
    {
      id: "3",
      name: "Urban Renewal Recycling",
      address: "789 Greenway Street, Eco City",
      distance: "7.3 km",
      hours: "Mon-Fri: 7AM-7PM, Sat: 9AM-4PM",
      phone: "+1 (555) 456-7890",
      website: "urbanrenewal.org",
      accepts: ["Electronics", "Paper", "Glass", "Textiles"],
      rating: 4.2,
      image: "/recycling-center-3.jpg"
    },
    {
      id: "4",
      name: "Future Planet E-Waste",
      address: "321 Circular Economy Ave, Sustainville",
      distance: "10.2 km",
      hours: "Wed-Sun: 10AM-4PM",
      phone: "+1 (555) 321-6547",
      website: "futureplanetewaste.com",
      accepts: ["Electronics", "Batteries", "Light Bulbs"],
      rating: 4.7,
      image: "/recycling-center-4.jpg"
    }
  ]

  const filteredCenters = recyclingCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         center.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || 
                         center.accepts.some(item => item.toLowerCase().includes(selectedFilter))
    return matchesSearch && matchesFilter
  })

  const acceptedMaterials = [
    { id: "all", name: "All Materials" },
    { id: "electronics", name: "Electronics" },
    { id: "batteries", name: "Batteries" },
    { id: "plastics", name: "Plastics" },
    { id: "metals", name: "Metals" },
    { id: "hazardous", name: "Hazardous Waste" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Recycling Centers</h1>
        <p className="text-muted-foreground mt-1">
          Find nearby locations to responsibly dispose of your e-waste
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {acceptedMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.length > 0 ? (
          filteredCenters.map((center) => (
            <Card key={center.id} className="hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-t-lg overflow-hidden">
                {/* Placeholder for center image */}
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{center.name}</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{center.rating}</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{center.distance} away</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{center.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-blue-600 hover:underline">
                      <a href={`https://${center.website}`} target="_blank" rel="noopener noreferrer">
                        {center.website}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Accepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {center.accepts.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <Button className="w-full gap-2">
                  Get Directions <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No centers found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Map Placeholder */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Centers Map View</CardTitle>
        </CardHeader>
        <CardContent className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-muted-foreground">Interactive map would display here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}