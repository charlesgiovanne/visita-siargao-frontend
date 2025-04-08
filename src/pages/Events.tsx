import { useState, useEffect } from "react";
import HeroSection from "@/components/Hero";
import EventCard, { EventCardProps } from "@/components/EventCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Event, eventsApi } from "@/lib/api";
import { Loader2 } from "lucide-react";

const months = [
  "all",
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const Events = () => {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [events, setEvents] = useState<(EventCardProps & { month: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // If a specific month is selected, use the filter endpoint
        const response = selectedMonth !== 'all' 
          ? await eventsApi.getEventsByMonth(selectedMonth)
          : await eventsApi.getEvents();
        
        // Transform API data to match our component props
        const eventData = response.data.map((event: Event) => {
          // Format the date for display
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          
          // Get the month name from the date object instead of relying on the API
          const monthName = eventDate.toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
          
          return {
            id: event.id.toString(),
            title: event.title,
            image: event.image,
            date: formattedDate,
            month: monthName, // Use the extracted month name
            location: "Siargao Island",
            time: "TBD", // This info might not be available in the API
          };
        });
        
        setEvents(eventData);
        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedMonth]); // Re-fetch when month filter changes

  const filteredEvents = selectedMonth === "all"
    ? events
    : events.filter(event => event.month === selectedMonth);

  return (
    <div>
      <HeroSection
        title="Events & Festivals"
        subtitle="Stay updated with the latest happenings in Siargao Island"
        imageUrl="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=3024&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Discover what's happening in Siargao throughout the year.
            </p>

            <div className="flex justify-center items-center mb-12">
              <div className="w-full max-w-xs">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full text-center">
                    <SelectValue placeholder="Filter by month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month.charAt(0).toUpperCase() + month.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
              <span className="ml-2 text-lg text-gray-700">Loading events...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  id={event.id} 
                  title={event.title} 
                  image={event.image} 
                  date={event.date} 
                  location={event.location}
                  time={event.time}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No events found for this month. Please check back later!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
