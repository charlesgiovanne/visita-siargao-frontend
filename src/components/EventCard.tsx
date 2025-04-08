import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { formatImageUrl } from "@/lib/utils";

export interface EventCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  location?: string;
  time?: string;
}

const EventCard = ({
  id,
  title,
  image,
  date,
  location,
  time,
}: EventCardProps) => {
  return (
    <Link to={`/details/event/${id}`} className="block h-full">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:scale-105 duration-300 cursor-pointer border border-green-100">
        <div className="h-48 overflow-hidden">
          <img
            src={formatImageUrl(image)}
            alt={title}
            className="w-full h-full object-cover transition-all hover:scale-105 duration-500"
          />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays size={16} className="text-green-500" />
              <span>{date}</span>
            </div>
            
            {location && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-cyan-500" />
                <span>{location}</span>
              </div>
            )}
            
            {time && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-blue-500" />
                <span>{time}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full bg-gradient-to-r from-green-50 to-cyan-50 hover:from-green-100 hover:to-cyan-100">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
