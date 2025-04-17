"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@tremor/react"
import { Globe, LandPlot, Leaf, Recycle, TrendingUp } from "lucide-react"

// Types for chart data
interface ChartDataPoint {
  name: string;
  value: number;
}

interface YearlyDataPoint {
  year: string;
  eWaste: number;
  recycled: number;
}

interface EnvironmentalImpact {
  category: string;
  impact: number;
}

interface MaterialValue {
  material: string;
  value: number;
  unit: string;
}

const wasteByRegion: ChartDataPoint[] = [
  { name: "Asia", value: 24.9 },
  { name: "Americas", value: 13.1 },
  { name: "Europe", value: 12 },
  { name: "Africa", value: 2.9 },
  { name: "Oceania", value: 0.7 },
]

// Reformatted recycling data for stacked bar chart
const recyclingData = [
  {
    category: "Recycling",
    "Properly Recycled": 17.4,
    "Informally Processed": 50,
    "Landfilled": 22.3,
    "Incinerated": 10.3
  }
]

const yearlyTrend: YearlyDataPoint[] = [
  { year: "2019", eWaste: 53.6, recycled: 9.3 },
  { year: "2020", eWaste: 57.4, recycled: 10.0 },
  { year: "2021", eWaste: 61.3, recycled: 10.8 },
  { year: "2022", eWaste: 65.4, recycled: 11.7 },
  { year: "2023", eWaste: 69.7, recycled: 12.5 },
]

const environmentalImpact: EnvironmentalImpact[] = [
  { category: "CO2 Emissions", impact: 98 },
  { category: "Toxic Leakage", impact: 45 },
  { category: "Resource Waste", impact: 82 },
]

const valuableMaterials: MaterialValue[] = [
  { material: "Gold", value: 0.018, unit: "g per phone" },
  { material: "Silver", value: 0.34, unit: "g per phone" },
  { material: "Copper", value: 12.5, unit: "g per phone" },
  { material: "Palladium", value: 0.008, unit: "g per phone" },
]

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">E-Waste Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Global statistics and environmental impact of electronic waste
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Global E-Waste (2023)</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">69.7 Mt</div>
            <p className="text-xs text-muted-foreground mt-1">
              +7.5% from 2022
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17.4%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Only 12.1 Mt properly recycled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Value in Waste</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$62B</div>
            <p className="text-xs text-muted-foreground mt-1">
              Recoverable materials
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toxic Impact</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98 Mt CO2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Equivalent emissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Global E-Waste Generation by Region (2023)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              className="h-80"
              data={wasteByRegion}
              index="name"
              categories={["value"]}
              colors={["emerald"]}
              valueFormatter={(value) => `${value} Mt`}
              yAxisWidth={48}
              showAnimation={true}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>E-Waste Disposition Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              className="h-80"
              data={recyclingData}
              index="category"
              categories={["Properly Recycled", "Informally Processed", "Landfilled", "Incinerated"]}
              colors={["emerald", "amber", "rose", "violet"]}
              valueFormatter={(value) => `${value}%`}
              yAxisWidth={48}
              showAnimation={true}
              stack={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Yearly E-Waste Growth vs Recycling</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              className="h-80"
              data={yearlyTrend}
              index="year"
              categories={["eWaste", "recycled"]}
              colors={["rose", "emerald"]}
              valueFormatter={(value) => `${value} Mt`}
              yAxisWidth={48}
              showAnimation={true}
              stack={false}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              className="h-80"
              data={environmentalImpact}
              index="category"
              categories={["impact"]}
              colors={["amber"]}
              valueFormatter={(value) => `${value} Mt`}
              yAxisWidth={48}
              showAnimation={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Valuable Materials in Small Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {valuableMaterials.map((item) => (
                <div key={item.material} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <LandPlot className="h-4 w-4 mr-2 text-amber-600" />
                    <span>{item.material}</span>
                  </div>
                  <span className="font-medium">
                    {item.value} {item.unit}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Key Environmental Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 list-disc pl-5">
              <li>E-waste accounts for 70% of toxic waste in landfills</li>
              <li>Recycling 1 million laptops saves energy for 3,500 homes</li>
              <li>Mobile phones contain 5-10x more gold than gold ore</li>
              <li>Improper recycling causes 50 Mt of CO2 emissions annually</li>
              <li>Only 12 countries have comprehensive e-waste legislation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}