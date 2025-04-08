import { useState, useEffect } from "react";
import HeroSection from "@/components/Hero";
import CultureCard, { CultureCardProps } from "@/components/CultureCard";
import { Culture as CultureType, exploreApi } from "@/lib/api";
import { Loader2 } from "lucide-react";

const Culture = () => {
  const [cultureItems, setCultureItems] = useState<CultureCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCultures = async () => {
      try {
        setLoading(true);
        const response = await exploreApi.getCultures();
        
        // Transform API data to match our component props
        const cultureData = response.data.map((culture: CultureType) => ({
          id: culture.id.toString(),
          title: culture.title,
          image: culture.image,
          shortDescription: culture.short_description,
        }));
        
        setCultureItems(cultureData);
        setError(null);
      } catch (err) {
        console.error("Error fetching culture data:", err);
        setError("Failed to load culture data. Please try again later.");
        setCultureItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCultures();
  }, []);

  return (
    <div>
      <HeroSection
        title="Culture & Traditions"
        subtitle="Discover the rich cultural heritage and traditions of Siargao Island"
        imageUrl="/images/culture-header.jpg"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              Experience Siargao's Culture
            </h2>
            <p className="text-gray-600">
              Beyond its stunning beaches and world-class surf spots, Siargao offers a rich cultural tapestry waiting to be explored. 
              Immerse yourself in local traditions, taste authentic cuisine, and connect with the warm-hearted islanders who call this paradise home.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-green-500" />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cultureItems.map((item) => (
                <CultureCard key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Culture;
