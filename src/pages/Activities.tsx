import { useState, useEffect } from "react";
import HeroSection from "@/components/Hero";
import ActivityCard, { ActivityCardProps } from "@/components/ActivityCard";
import { Activity, exploreApi } from "@/lib/api";
import { Loader2 } from "lucide-react";

const Activities = () => {
  const [activities, setActivities] = useState<ActivityCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await exploreApi.getActivities();
        
        // Transform API data to match our component props
        const activityData = response.data.map((activity: Activity) => ({
          id: activity.id.toString(),
          title: activity.title,
          image: activity.image,
          shortDescription: activity.short_description,
          // Use the new duration field from API if available, otherwise extract from description
          duration: activity.duration || extractDuration(activity.long_description, activity.tips),
          difficulty: extractDifficulty(activity.long_description, activity.tips),
          groupSize: extractGroupSize(activity.long_description, activity.tips),
        }));
        
        setActivities(activityData);
        setError(null);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load activities. Using sample data instead.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Helper functions to extract information from descriptions
  const extractDuration = (description: string, tips: string): string => {
    // Try to find duration information in the text
    const durationMatch = (description + " " + tips).match(/\b(\d+[-\s]?\d*\s?(hour|hr|minute|min|day))s?\b/i);
    return durationMatch ? durationMatch[0] : "Varies";
  };

  const extractDifficulty = (description: string, tips: string): string => {
    // Try to find difficulty level in the text
    const difficultyMatch = (description + " " + tips).match(/\b(beginner|intermediate|advanced|easy|moderate|difficult|all levels)\b/i);
    return difficultyMatch ? difficultyMatch[0].charAt(0).toUpperCase() + difficultyMatch[0].slice(1) : "All levels";
  };

  const extractGroupSize = (description: string, tips: string): string => {
    // Try to find group size information in the text
    const groupMatch = (description + " " + tips).match(/\b(individual|group|family|couple|\d+\s?people|small group|large group)\b/i);
    return groupMatch ? groupMatch[0].charAt(0).toUpperCase() + groupMatch[0].slice(1) : "Any size";
  };

  return (
    <div>
      <HeroSection
        title="Activities"
        subtitle="Exciting adventures and experiences waiting for you in Siargao"
        imageUrl="/images/activity-header.jpg"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              Experiences You Can't Miss
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From thrilling adventures to peaceful explorations, Siargao offers activities for every traveler.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
              <span className="ml-2 text-lg text-gray-700">Loading activities...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Activities;
