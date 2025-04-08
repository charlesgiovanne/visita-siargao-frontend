import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock} from "lucide-react";
import { formatImageUrl } from "@/lib/utils";

export interface ActivityCardProps {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  duration?: string;
}

const ActivityCard = ({
  id,
  title,
  image,
  shortDescription,
  duration,
}: ActivityCardProps) => {
  return (
    <Link to={`/details/activity/${id}`} className="block h-full">
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
          <CardDescription className="mb-3">{shortDescription}</CardDescription>
          
          {(duration) && (
            <div className="space-y-2 mt-4 text-sm">
              {duration && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock size={16} />
                  <span>{duration}</span>
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
      </Card>
    </Link>
  );
};

export default ActivityCard;
