import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, CalendarDays, Loader2 } from "lucide-react";
import Map from "@/components/Map";
import { exploreApi, eventsApi, Destination, Activity, Culture, Event } from "@/lib/api";

const Details = () => {
  const { type, id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        let response;
        let formattedData;

        switch (type) {
          case "destination":
            response = await exploreApi.getDestination(Number(id));
            const destination: Destination = response.data;
            formattedData = {
              title: destination.title,
              image: destination.image,
              shortDescription: destination.short_description,
              longDescription: destination.long_description,
              categories: destination.categories.map(cat => cat.name),
              locationName: destination.location_name,
              mapsLink: destination.maps_link,
              coordinates: {
                lat: 9.8482, // Default Siargao coordinates if no specific location
                lng: 126.0458,
              },
            };
            break;

          case "activity":
            response = await exploreApi.getActivity(Number(id));
            const activity: Activity = response.data;
            formattedData = {
              title: activity.title,
              image: activity.image,
              shortDescription: activity.short_description,
              longDescription: activity.long_description,
              tips: activity.tips,
              duration: activity.duration,
              coordinates: {
                lat: 9.8482, // Default Siargao coordinates
                lng: 126.0458,
              },
            };
            break;

          case "culture":
            response = await exploreApi.getCulture(Number(id));
            const culture: Culture = response.data;
            formattedData = {
              title: culture.title,
              image: culture.image,
              shortDescription: culture.short_description,
              longDescription: culture.long_description,
              coordinates: {
                lat: 9.8482, // Default Siargao coordinates
                lng: 126.0458,
              },
            };
            break;

          case "event":
            response = await eventsApi.getEvent(Number(id));
            const event: Event = response.data;
            // Format the date for display
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
            
            formattedData = {
              title: event.title,
              image: event.image,
              date: formattedDate,
              description: event.description,
              coordinates: {
                lat: 9.8482, // Default Siargao coordinates
                lng: 126.0458,
              },
            };
            break;

          default:
            setError("Invalid content type");
            formattedData = null;
        }

        setData(formattedData);
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to load details. Please try again later.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mb-4" />
          <p className="text-lg text-gray-700">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Error Loading Data</h1>
        <p className="text-red-500 mb-6">{error}</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
        <p className="text-gray-600 mb-6">The {type} you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  const renderContent = () => {
    switch (type) {
      case "destination":
      case "culture":
        return (
          <div className="prose prose-lg max-w-none">
            <p>{data.longDescription}</p>
            {data.mapsLink && (
              <div className="mt-4">
                <a 
                  href={data.mapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:text-cyan-800 flex items-center"
                >
                  <MapPin className="mr-2" size={16} />
                  View on Google Maps
                </a>
              </div>
            )}
          </div>
        );
      case "activity":
        return (
          <div>
            <div className="prose prose-lg max-w-none mb-6">
              <p>{data.longDescription}</p>
            </div>
            {data.tips && (
              <div className="bg-amber-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Tips</h3>
                <p className="text-gray-700">{data.tips}</p>
              </div>
            )}
            {data.duration && (
              <div className="bg-amber-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Duration</h3>
                <p className="text-gray-700">{data.duration}</p>
              </div>
            )}
          </div>
        );
      case "event":
        return (
          <div>
            <div className="flex items-center text-gray-600 mb-6">
              <CalendarDays className="mr-2" />
              <span>{data.date}</span>
            </div>
            <div className="prose prose-lg max-w-none">
              <p>{data.description}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        className="relative h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
          <p className="text-xl max-w-3xl mx-auto">{data.shortDescription}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md">
          {renderContent()}

          <div className="border-t pt-8 mt-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <MapPin /> Location
            </h2>
            {data.locationName && (
              <p className="text-lg mb-4">{data.locationName}</p>
            )}
            <Map location={data.coordinates} mapsLink={data.mapsLink} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
