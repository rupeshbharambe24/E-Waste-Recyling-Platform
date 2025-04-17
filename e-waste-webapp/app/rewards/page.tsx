"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { QrCode, Gift, Coins, AlertTriangle, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

interface Offer {
  id: string
  title: string
  description: string
  coinsRequired: number
  image: string
  validUntil?: string
}

interface RewardCoin {
  id: string
  x: number
  y: number
  rotation: number
  scale: number
  delay: number
}

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<'offers' | 'myCoins'>('offers')
  const [showRedeemDialog, setShowRedeemDialog] = useState(false)
  const [redeemMethod, setRedeemMethod] = useState<'code' | 'qr' | null>(null)
  const [redeemCode, setRedeemCode] = useState('')
  const [coins, setCoins] = useState(1250)
  const [showCoinAnimation, setShowCoinAnimation] = useState(false)
  const [animatedCoins, setAnimatedCoins] = useState<RewardCoin[]>([])
  const [earnedAmount, setEarnedAmount] = useState(0)
  const [scanSuccess, setScanSuccess] = useState(false)

  const offers: Offer[] = [
    {
      id: '1',
      title: 'Amazon Gift Card',
      description: '$10 Amazon gift card',
      coinsRequired: 1000,
      image: '/amazon-card.jpg'
    },
    {
      id: '2',
      title: 'Starbucks Coffee',
      description: 'Free tall coffee',
      coinsRequired: 500,
      image: '/starbucks.jpg'
    },
    {
      id: '3',
      title: 'Plant a Tree',
      description: 'We plant a tree in your name',
      coinsRequired: 800,
      image: '/tree.jpg'
    },
    {
      id: '4',
      title: 'Recycling Kit',
      description: 'Home recycling starter kit',
      coinsRequired: 1500,
      image: '/kit.jpg',
      validUntil: '2023-12-31'
    }
  ]

  const handleRedeemClick = () => {
    setShowRedeemDialog(true)
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate the code with your backend
    const randomCoins = Math.floor(Math.random() * 200) + 50
    triggerCoinAnimation(randomCoins)
    setRedeemCode('')
    setScanSuccess(true)
    setTimeout(() => {
      setScanSuccess(false)
      setShowRedeemDialog(false)
    }, 2000)
  }

  const triggerCoinAnimation = (amount: number) => {
    setEarnedAmount(amount)
    setShowCoinAnimation(true)
    
    // Generate random coins for animation
    const newCoins = Array.from({ length: 15 }, (_, i) => ({
      id: `coin-${i}`,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random(),
      delay: Math.random() * 0.5
    }))
    
    setAnimatedCoins(newCoins)
    
    // Update total coins after animation
    setTimeout(() => {
      setCoins(prev => prev + amount)
      setShowCoinAnimation(false)
    }, 2000)
  }

  const simulateQRScan = () => {
    // In a real app, this would use a QR scanner
    const randomCoins = Math.floor(Math.random() * 300) + 100
    triggerCoinAnimation(randomCoins)
    setScanSuccess(true)
    setTimeout(() => {
      setScanSuccess(false)
      setShowRedeemDialog(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">E-Waste Rewards</h1>
          <p className="text-muted-foreground mt-1">
            Earn coins by recycling and redeem exciting offers
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 px-4 py-3 rounded-lg">
          <Coins className="h-5 w-5 text-yellow-500" />
          <span className="font-bold">{coins}</span>
          <span className="text-muted-foreground">coins</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'offers' ? 'border-b-2 border-green-600 text-green-600' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('offers')}
        >
          Available Offers
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'myCoins' ? 'border-b-2 border-green-600 text-green-600' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('myCoins')}
        >
          My Coins
        </button>
      </div>

      {/* Instructions Alert */}
      <Alert variant="default" className="mb-8 bg-blue-50 dark:bg-blue-900/30 border-blue-200">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Instructions</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>Only scan the QR code after properly disposing your e-waste in our bins</li>
            <li>Make sure the e-waste is clean and free of personal data</li>
            <li>Different e-waste categories earn different coin amounts</li>
            <li>Fraudulent scans may result in account suspension</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Offers Grid */}
      {activeTab === 'offers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <Gift className="h-12 w-12 text-gray-400" />
                </div>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{offer.coinsRequired}</span>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={coins < offer.coinsRequired}
                    onClick={() => coins >= offer.coinsRequired && setCoins(coins - offer.coinsRequired)}
                  >
                    {coins >= offer.coinsRequired ? 'Redeem' : 'Need more coins'}
                  </Button>
                </div>
              </CardContent>
              {offer.validUntil && (
                <CardFooter className="text-xs text-muted-foreground">
                  Valid until {offer.validUntil}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* My Coins Section */}
      {activeTab === 'myCoins' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Earn More Coins</CardTitle>
              <CardDescription>
                Recycle your e-waste to earn coins that can be redeemed for rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleRedeemClick} className="gap-2">
                <QrCode className="h-4 w-4" />
                Scan Bin QR Code
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <QrCode className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">QR Scan Reward</p>
                      <p className="text-sm text-muted-foreground">Today, 10:42 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <Coins className="h-4 w-4" />
                    <span>+150</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Gift className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium">Amazon Gift Card</p>
                      <p className="text-sm text-muted-foreground">Yesterday, 3:15 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-rose-600">
                    <Coins className="h-4 w-4" />
                    <span>-1000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Redeem Dialog */}
      <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
        <DialogContent className="sm:max-w-[425px]">
          {!redeemMethod ? (
            <>
              <DialogHeader>
                <DialogTitle>Redeem Coins</DialogTitle>
                <DialogDescription>
                  Choose how you want to redeem coins for your e-waste recycling
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button 
                  variant="outline" 
                  className="h-24 flex-col gap-2"
                  onClick={() => setRedeemMethod('qr')}
                >
                  <QrCode className="h-8 w-8" />
                  <span>Scan Bin QR Code</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex-col gap-2"
                  onClick={() => setRedeemMethod('code')}
                >
                  <span className="text-xl">1234</span>
                  <span>Enter Manual Code</span>
                </Button>
              </div>
            </>
          ) : redeemMethod === 'code' ? (
            <>
              <DialogHeader>
                <DialogTitle>Enter Redemption Code</DialogTitle>
                <DialogDescription>
                  The code can be found on our e-waste bins or your receipt
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCodeSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">
                      Code
                    </Label>
                    <Input
                      id="code"
                      value={redeemCode}
                      onChange={(e) => setRedeemCode(e.target.value)}
                      className="col-span-3"
                      placeholder="Enter 6-digit code"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Scan Bin QR Code</DialogTitle>
                <DialogDescription>
                  Point your camera at the QR code on our e-waste bin
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center py-8">
                <div className="relative">
                  {/* QR Scanner Placeholder */}
                  <div className="h-64 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                  
                  {/* Scanner Frame */}
                  <div className="absolute inset-0 border-4 border-green-500 rounded-lg pointer-events-none" style={{
                    margin: '2rem',
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                  }} />
                </div>
                <Button 
                  onClick={simulateQRScan}
                  className="mt-6"
                >
                  Simulate Scan (Demo)
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Coin Animation */}
      <AnimatePresence>
        {showCoinAnimation && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="relative w-full h-full">
              {animatedCoins.map((coin) => (
                <motion.div
                  key={coin.id}
                  initial={{ 
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0
                  }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, coin.scale, coin.scale, 0],
                    x: coin.x,
                    y: coin.y,
                    rotate: coin.rotation
                  }}
                  transition={{
                    duration: 2,
                    delay: coin.delay,
                    ease: "easeOut"
                  }}
                  className="absolute text-yellow-500"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                >
                  <Coins className="h-8 w-8" />
                </motion.div>
              ))}
              
              {/* Earned Amount Display */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
              >
                <Coins className="h-6 w-6" />
                <span className="font-bold text-xl">+{earnedAmount}</span>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Scan Success Dialog */}
      <Dialog open={scanSuccess} onOpenChange={setScanSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500" />
              </motion.div>
            </div>
            <DialogTitle className="text-center mt-4">Success!</DialogTitle>
            <DialogDescription className="text-center">
              You earned <span className="font-bold text-green-600">{earnedAmount} coins</span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setScanSuccess(false)}>Continue</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}