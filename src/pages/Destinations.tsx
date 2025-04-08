import { useEffect, useState } from "react";
import HeroSection from "@/components/Hero";
import DestinationCard, { DestinationCardProps } from "@/components/DestinationCard";
import { Destination, exploreApi } from "@/lib/api";
import { Loader2 } from "lucide-react";

const Destinations = () => {
  const [destinations, setDestinations] = useState<DestinationCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await exploreApi.getDestinations();
        const destinationData = response.data.map((dest: Destination) => ({
          id: dest.id.toString(),
          title: dest.title,
          image: dest.image,
          shortDescription: dest.short_description,
          categories: dest.categories.map(cat => cat.name),
          locationName: dest.location_name || undefined,
          location: dest.maps_link ? "View on map" : "Siargao Island",
          bestTime: "Year round",
        }));
        setDestinations(destinationData);
        setError(null);
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("Failed to load destinations. Using sample data instead.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection
        title="Destinations"
        subtitle="Explore the most breathtaking locations across Siargao Island"
        imageUrl="/images/jake-irish-61OONDO7nrU-unsplash.jpg"
      />

      <section className="py-16 w-full">
        <div className="container mx-auto px-4 w-full max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              Must-Visit Places in Siargao
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the hidden gems and popular attractions that make Siargao a tropical paradise.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
              <span className="ml-2 text-lg text-gray-700">Loading destinations...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} {...destination} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
