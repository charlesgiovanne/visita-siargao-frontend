import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonUrl?: string;
  buttonText?: string;
}

const HeroSection = ({
  title,
  subtitle,
  imageUrl,
  buttonUrl,
  buttonText,
}: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setIsLoaded(true);
  }, [imageUrl]);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>
      <div className="relative h-full flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl animate-fade-in delay-100">
            {subtitle}
          </p>
        )}
        {buttonText && buttonUrl && (
          <Button asChild size="lg" className="animate-fade-in delay-200 hover:scale-105 transition-transform">
            <Link to={buttonUrl} className="flex items-center gap-2">
              {buttonText} <ArrowRight size={16} />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
