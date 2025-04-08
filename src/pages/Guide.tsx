import HeroSection from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Compass, Utensils, Wallet, Umbrella, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Guide = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("essentials");
  const [isOpen, setIsOpen] = useState(false);

  const tabOptions = [
    { value: "essentials", label: "Essentials", icon: <AlertCircle className="h-4 w-4" /> },
    { value: "transportation", label: "Getting Around", icon: <Compass className="h-4 w-4" /> },
    { value: "accommodation", label: "Accommodation", icon: <MapPin className="h-4 w-4" /> },
    { value: "food", label: "Food & Dining", icon: <Utensils className="h-4 w-4" /> },
    { value: "budget", label: "Budget", icon: <Wallet className="h-4 w-4" /> },
    { value: "tips", label: "Travel Tips", icon: <Umbrella className="h-4 w-4" /> },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsOpen(false);
  };

  return (
    <div>
      <HeroSection
        title="Travel Guide"
        subtitle="Essential information for planning your Siargao adventure"
        imageUrl="https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=3174&auto=format&fit=crop"
      />

      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              Plan Your Trip
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know before visiting Siargao Island.
            </p>
          </div>

          {isMobile ? (
            <div className="max-w-4xl mx-auto">
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-full border rounded-md mb-4"
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between p-4 h-auto"
                  >
                    <span className="flex items-center gap-2">
                      {tabOptions.find(tab => tab.value === activeTab)?.icon}
                      {tabOptions.find(tab => tab.value === activeTab)?.label}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-2">
                  <div className="flex flex-col space-y-1">
                    {tabOptions.map((tab) => (
                      <Button
                        key={tab.value}
                        variant="ghost"
                        className={`justify-start ${activeTab === tab.value ? "bg-muted font-medium" : ""}`}
                        onClick={() => handleTabChange(tab.value)}
                      >
                        <span className="flex items-center gap-2">
                          {tab.icon}
                          {tab.label}
                        </span>
                      </Button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Mobile tab content */}
              {tabOptions.map((tab) => (
                <div key={tab.value} className={activeTab === tab.value ? "block" : "hidden"}>
                  <TabContent tabValue={tab.value} />
                </div>
              ))}
            </div>
          ) : (
            <Tabs defaultValue="essentials" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 p-1 overflow-visible !h-auto">
                <TabsTrigger value="essentials" className="px-3 py-2 h-full whitespace-normal text-center">Essentials</TabsTrigger>
                <TabsTrigger value="transportation" className="px-3 py-2 h-full whitespace-normal text-center">Getting Around</TabsTrigger>
                <TabsTrigger value="accommodation" className="px-3 py-2 h-full whitespace-normal text-center">Accommodation</TabsTrigger>
                <TabsTrigger value="food" className="px-3 py-2 h-full whitespace-normal text-center">Food & Dining</TabsTrigger>
                <TabsTrigger value="budget" className="px-3 py-2 h-full whitespace-normal text-center">Budget</TabsTrigger>
                <TabsTrigger value="tips" className="px-3 py-2 h-full whitespace-normal text-center">Travel Tips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="essentials" className="mt-6">
                <TabContent tabValue="essentials" />
              </TabsContent>
              
              <TabsContent value="transportation" className="mt-6">
                <TabContent tabValue="transportation" />
              </TabsContent>
              
              <TabsContent value="accommodation" className="mt-6">
                <TabContent tabValue="accommodation" />
              </TabsContent>
              
              <TabsContent value="food" className="mt-6">
                <TabContent tabValue="food" />
              </TabsContent>
              
              <TabsContent value="budget" className="mt-6">
                <TabContent tabValue="budget" />
              </TabsContent>
              
              <TabsContent value="tips" className="mt-6">
                <TabContent tabValue="tips" />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </div>
  );
};

// Extract tab content into a separate component for reuse
const TabContent = ({ tabValue }: { tabValue: string }) => {
  switch (tabValue) {
    case "essentials":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" /> Travel Essentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">Documents</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Valid passport (with at least 6 months validity)</li>
              <li>Return ticket</li>
              <li>Travel insurance (recommended)</li>
            </ul>
            
            <h3 className="font-semibold mt-4">What to Pack</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Lightweight, breathable clothing</li>
              <li>Swimwear and beach essentials</li>
              <li>Sunscreen, hat, and sunglasses</li>
              <li>Insect repellent</li>
              <li>Waterproof phone case</li>
              <li>Basic first aid kit</li>
              <li>Reef-safe sunscreen</li>
            </ul>
            
            <h3 className="font-semibold mt-4">Best Time to Visit</h3>
            <p className="text-gray-600">
              The best time to visit Siargao is during the dry season from March to October. 
              For surfers, September to November offers the best waves with offshore winds.
            </p>
          </CardContent>
        </Card>
      );
    case "transportation":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-5 w-5" /> Getting Around
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">Getting to Siargao</h3>
            <p className="text-gray-600">
              Fly to Sayak Airport (IAO) from Manila or Cebu. Alternatively, take a ferry from Surigao City.
            </p>
            
            <h3 className="font-semibold mt-4">Local Transportation</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Motorcycle rentals: ₱400-600 per day</li>
              <li>Habal-habal (motorcycle taxi): ₱20-150 depending on distance</li>
              <li>Tricycles: Available for short distances</li>
              <li>Van rentals: For group tours around the island</li>
              <li>Boats: For island hopping and trips to surf spots</li>
            </ul>
            
            <h3 className="font-semibold mt-4">Navigation Tips</h3>
            <p className="text-gray-600">
              Download offline maps before your trip. Most accommodations can arrange transportation 
              and tour services. Roads are generally good but can be narrow in some areas.
            </p>
          </CardContent>
        </Card>
      );
    case "accommodation":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" /> Accommodation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">Where to Stay</h3>
            <p className="text-gray-600">
              Most accommodations are concentrated in General Luna, close to Cloud 9 and other surf spots.
            </p>
            
            <h3 className="font-semibold mt-4">Types of Accommodation</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Budget hostels: ₱500-1,000 per night</li>
              <li>Mid-range hotels and guesthouses: ₱1,500-3,000 per night</li>
              <li>Luxury resorts and villas: ₱5,000+ per night</li>
              <li>Beachfront bungalows and cottages</li>
              <li>Surf camps with lessons included</li>
            </ul>
            
            <h3 className="font-semibold mt-4">Booking Tips</h3>
            <p className="text-gray-600">
              Book in advance during peak season (July-November). Many places offer discounts for 
              longer stays. Check if your accommodation offers airport transfers or motorbike rentals.
            </p>
          </CardContent>
        </Card>
      );
    case "food":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" /> Food & Dining
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">Local Cuisine</h3>
            <p className="text-gray-600">
              Siargao offers a mix of Filipino cuisine and international options, with an emphasis on fresh seafood.
            </p>
            
            <h3 className="font-semibold mt-4">Popular Dining Areas</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Tourism Road in General Luna: Cafes, restaurants, and bars</li>
              <li>Cloud 9 area: Surf-inspired eateries and beachfront dining</li>
              <li>Local markets: For authentic Filipino food and fresh produce</li>
            </ul>
            
            <h3 className="font-semibold mt-4">Must-Try Dishes</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Kinilaw (Filipino ceviche)</li>
              <li>Fresh grilled seafood</li>
              <li>Siargao pizza (various specialty pizzerias)</li>
              <li>Coconut-based dishes</li>
              <li>Smoothie bowls and health-focused cuisine</li>
            </ul>
          </CardContent>
        </Card>
      );
    case "budget":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" /> Budget Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">Daily Budget Estimates</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Budget traveler: ₱1,500-2,500 per day</li>
              <li>Mid-range traveler: ₱3,000-5,000 per day</li>
              <li>Luxury traveler: ₱8,000+ per day</li>
            </ul>
            
            <h3 className="font-semibold mt-4">Typical Costs</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Meals: ₱150-500 per meal</li>
              <li>Surf lesson: ₱500-1,500 (group vs. private)</li>
              <li>Surf board rental: ₱200-500 per hour</li>
              <li>Island hopping tour: ₱1,000-1,500 per person</li>
              <li>Entrance fees: ₱50-300 per attraction</li>
            </ul>
            
            <h3 className="font-semibold mt-4">Money Tips</h3>
            <p className="text-gray-600">
              ATMs are limited on the island, so bring enough cash. Some establishments accept 
              cards, but cash is preferred. Negotiate prices for tours and activities, especially in groups.
            </p>
          </CardContent>
        </Card>
      );
    case "tips":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Umbrella className="h-5 w-5" /> Travel Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">Health & Safety</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Bring basic medications and first aid supplies</li>
              <li>Stay hydrated and use sun protection</li>
              <li>Be careful when swimming in unfamiliar areas</li>
              <li>Wear a helmet when riding motorcycles</li>
              <li>Follow local safety instructions when surfing</li>
            </ul>
            
            <h3 className="font-semibold mt-4">Cultural Etiquette</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Respect local customs and traditions</li>
              <li>Dress modestly when visiting villages and churches</li>
              <li>Ask permission before taking photos of locals</li>
              <li>Learn basic Filipino phrases</li>
            </ul>
            
            <h3 className="font-semibold mt-4">Eco-Friendly Travel</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Use reef-safe sunscreen</li>
              <li>Avoid single-use plastics</li>
              <li>Participate in beach clean-ups</li>
              <li>Support eco-friendly businesses and tours</li>
              <li>Conserve water (it's a precious resource on the island)</li>
            </ul>
          </CardContent>
        </Card>
      );
    default:
      return null;
  }
};

export default Guide;
