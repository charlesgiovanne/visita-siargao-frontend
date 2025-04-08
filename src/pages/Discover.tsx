
import HeroSection from "@/components/Hero";
import Map from "@/components/Map";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Discover = () => {
  return (
    <div>
      <HeroSection
        title="Discover Siargao"
        subtitle="Explore the beauty and wonders of the Philippines' surfing paradise"
        imageUrl="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=3474&auto=format&fit=crop"
      />

      <section className="py-16 bg-gradient-to-br from-white to-cyan-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              About Siargao Island
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Siargao is more than just a surfing destination; it's a way of life. 
              With its laid-back atmosphere, welcoming locals, and stunning natural beauty, 
              the island offers a perfect escape from the busy modern world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="p-6 rounded-lg bg-gradient-to-br from-white/80 to-cyan-50/80 backdrop-blur-sm shadow-sm">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">The Surfing Capital</h3>
              <p className="text-gray-600 mb-4">
                Siargao has earned its reputation as the "Surfing Capital of the Philippines" 
                for good reason. The island's premier wave, Cloud 9, consistently ranks among 
                the top surf spots in the world, attracting professional surfers from around the globe.
              </p>
              <p className="text-gray-600 mb-4">
                But Siargao isn't just for pros—the island offers waves for all skill levels, 
                with plenty of surf schools and instructors ready to help beginners catch their first wave.
              </p>
              <p className="text-gray-600">
                Beyond Cloud 9, other notable surf spots include Jacking Horse, Stimpy's, Rock Island, 
                Cemetery, and Pacifico, each offering different wave conditions suitable for 
                various surfing abilities.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <Map />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="backdrop-blur-md bg-gradient-to-br from-white/75 to-pink-50/50 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">Geography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Siargao is a tear-drop shaped island covering approximately 437 square kilometers. 
                  It's located in the province of Surigao del Norte in the northeastern region of Mindanao, 
                  facing the Philippine Sea to the east.
                </p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-gradient-to-br from-white/75 to-amber-50/50 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Climate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Siargao enjoys a tropical climate with two seasons: the dry season (March to October) 
                  and the wet season (November to February). The best time to visit is during the dry 
                  season when surf conditions are optimal and rainfall is minimal.
                </p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-gradient-to-br from-white/75 to-green-50/50 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Biodiversity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The island is home to diverse ecosystems, including coral reefs, mangrove forests, 
                  seagrass beds, and terrestrial forests. These habitats support a wide variety of 
                  marine and terrestrial species, many of which are endemic to the Philippines.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-green-50/80 to-cyan-50/80 rounded-lg p-8 shadow-md backdrop-blur-md border border-white/20">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent text-center">
              Welcome to Siargao Island
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-lg text-gray-600 mb-6">
                  Siargao is a tear-drop shaped island in the Philippine Sea, located 800 kilometers southeast of Manila. Known as the "Surfing Capital of the Philippines," Siargao has gained international recognition for its perfect waves and laid-back island lifestyle.
                </p>
                <p className="text-lg text-gray-600">
                  Beyond surfing, the island offers pristine white beaches, crystal-clear lagoons, enchanting rock pools, and a vibrant ecosystem of coral reefs and mangrove forests. Whether you're an adventure seeker or simply looking to unwind, Siargao promises an unforgettable tropical experience.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-white/70 to-amber-50/70 backdrop-blur-md rounded-lg p-6 border shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">Natural Beauty</h4>
                  <p className="text-gray-600">
                    Explore the untouched beauty of Siargao, from lush mangrove forests to hidden lagoons and pristine beaches.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white/70 to-blue-50/70 backdrop-blur-md rounded-lg p-6 border shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Surf Paradise</h4>
                  <p className="text-gray-600">
                    Experience world-class surfing at Cloud 9 and other renowned surf breaks suitable for all skill levels.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white/70 to-green-50/70 backdrop-blur-md rounded-lg p-6 border shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Island Culture</h4>
                  <p className="text-gray-600">
                    Immerse yourself in the rich culture and warm hospitality of the Siargao locals and their traditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discover;
