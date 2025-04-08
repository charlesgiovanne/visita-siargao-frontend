import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import { formatImageUrl } from "@/lib/utils";

export interface DestinationCardProps {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  categories: string[];
  location?: string;
  locationName?: string;
}

const DestinationCard = ({
  id,
  title,
  image,
  shortDescription,
  categories,
  location,
  locationName,
}: DestinationCardProps) => {
  return (
    <div className="h-full">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:scale-105 duration-300 cursor-pointer border border-green-100">
        <div className="relative h-48 overflow-hidden">
          <img
            src={formatImageUrl(image)}
            alt={title}
            className="w-full h-full object-cover transition-all hover:scale-105 duration-500"
          />
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton 
              destinationId={id}
              title={title}
              className="rounded-full shadow-md bg-white/80 backdrop-blur-sm hover:bg-white/100 border-0 w-9 h-9 transition-all duration-300"
            />
          </div>
        </div>
        <Link to={`/details/destination/${id}`}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="bg-gradient-to-r from-green-100 to-cyan-100">
                  {category}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-3">{shortDescription}</CardDescription>
            
            {(locationName || location) && (
              <div className="space-y-2 mt-4 text-sm">
                {locationName && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin size={16} />
                    <span>{locationName}</span>
                  </div>
                )}
                
                {location && !locationName && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin size={16} />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-gradient-to-r from-green-50 to-cyan-50 hover:from-green-100 hover:to-cyan-100">
              View Details
            </Button>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default DestinationCard;
