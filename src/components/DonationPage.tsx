import { useState } from "react";
import { Coffee, Heart, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import alexPortrait from "@/assets/alex-exists-portrait.jpg";

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customCoffees, setCustomCoffees] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const coffeePrice = 5;
  const presetAmounts = [5, 15, 25];

  const calculateTotal = () => {
    if (selectedAmount !== null) {
      return selectedAmount;
    }
    const coffeeCount = parseInt(customCoffees) || 0;
    return coffeeCount * coffeePrice;
  };

  const getCoffeeCount = () => {
    const total = calculateTotal();
    return Math.max(1, total / coffeePrice);
  };

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomCoffees("");
  };

  const handleCustomChange = (value: string) => {
    setCustomCoffees(value);
    setSelectedAmount(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-secondary/20 to-background pointer-events-none" />
      
      <div className="relative z-10 container max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <img
              src={alexPortrait}
              alt="Alex Exists"
              className="w-24 h-24 rounded-full mx-auto border-4 border-primary/50 shadow-2xl animate-glow-pulse"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-hot-pink to-neon-green bg-clip-text text-transparent">
            Buy me a Coffee
          </h1>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            If you dig the vibes, show some love. Every bit helps fuel the music.
          </p>
        </div>

        {/* Coffee Selection Card */}
        <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center justify-center mb-6 space-x-3">
            <Coffee className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">×</span>
            
            <div className="flex space-x-2">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  size="lg"
                  className={`rounded-full w-14 h-14 text-lg font-bold transition-all duration-300 ${
                    selectedAmount === amount 
                      ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                      : "hover:scale-105 hover:border-primary/50"
                  }`}
                  onClick={() => handlePresetClick(amount)}
                >
                  {amount / coffeePrice}
                </Button>
              ))}
              
              <div className="relative">
                <Input
                  type="number"
                  placeholder="∞"
                  value={customCoffees}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  className="w-14 h-14 text-center text-lg font-bold rounded-full border-2 focus:border-primary/50 bg-background/50"
                  min="1"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {getCoffeeCount()} coffee{getCoffeeCount() !== 1 ? 's' : ''} = ${calculateTotal()}
            </p>
          </div>
        </Card>

        {/* Personal Message Card */}
        <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Name or @yoursocial"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>
            
            <div>
              <Textarea
                placeholder="Say something nice..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors resize-none"
              />
            </div>
          </div>
        </Card>

        {/* Support Button */}
        <Button 
          size="lg" 
          className="w-full text-xl font-bold py-6 bg-gradient-to-r from-primary via-hot-pink to-neon-green hover:scale-105 transition-all duration-300 shadow-2xl animate-gradient-shift"
          style={{ backgroundSize: '200% 200%' }}
        >
          <Heart className="mr-2 h-5 w-5" />
          Support ${calculateTotal()}
        </Button>

        {/* Help Text */}
        <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
          <HelpCircle className="w-3 h-3 mr-1" />
          <span>No account needed</span>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            This is a personal donation page. No goods or services are being provided in exchange.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;