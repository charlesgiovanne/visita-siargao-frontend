import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatImageUrl } from "@/lib/utils";

export interface CultureCardProps {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  origin?: string;
  location?: string;
}

const CultureCard = ({
  id,
  title,
  image,
  shortDescription,
}: CultureCardProps) => {
  return (
    <Link to={`/details/culture/${id}`} className="block h-full">
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
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50">
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CultureCard;
