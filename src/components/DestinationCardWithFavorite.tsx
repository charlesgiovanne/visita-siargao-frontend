import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import { formatImageUrl } from "@/lib/utils";

export interface DestinationCardProps {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  categories: string[];
  rating: number;
  location: string;
}

const DestinationCardWithFavorite = ({
  id,
  title,
  image,
  shortDescription,
  categories,
  rating,
  location,
}: DestinationCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="relative">
        <img
          src={formatImageUrl(image)}
          alt={title}
          className="w-full h-52 object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <FavoriteButton 
            destinationId={id}
            title={title}
            className="rounded-full shadow-md"
          />
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{shortDescription}</p>

        <div className="flex items-center gap-1 mb-1">
          <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
          <span className="font-medium">{rating}</span>
        </div>
        
        <div className="text-sm text-gray-500">
          <p> 📍 {location}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link
          to={`/details/destination/${id}`}
          className="text-sm font-medium bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent hover:opacity-80"
        >
          View Details →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DestinationCardWithFavorite;
