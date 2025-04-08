import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import UnsubscribeForm from "./UnsubscribeForm";

interface SubscribeFormProps {
  title?: string;
  description?: string;
}

const SubscribeForm = ({ 
  title = "Stay Updated", 
  description = "Subscribe to our newsletter for the latest updates and events."
}: SubscribeFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // First try to subscribe normally
      try {
        await authApi.subscribe(email);
        toast.success("Thank you for subscribing!");
        setEmail("");
        return; // Exit early if successful
      } catch (subscribeError: any) {
        // If error is not about already being subscribed, try to resubscribe
        if (subscribeError.response?.data?.detail !== "Email already subscribed") {
          // Try to resubscribe (for previously unsubscribed users)
          await authApi.resubscribe(email);
          toast.success("Welcome back! Your subscription has been reactivated.");
          setEmail("");
          return; // Exit early if successful
        } else {
          // User is already subscribed
          toast.info("You're already subscribed to our newsletter!");
          setEmail("");
          return; // Exit early
        }
      }
    } catch (error: any) {
      console.error("Error with subscription:", error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-lg p-6 border">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">
        {description}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 focus:border-green-500"
        />
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1" 
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe Now"
          )}
        </Button>
        <div className="flex justify-center mt-2">
          <UnsubscribeForm buttonText="Unsubscribe from newsletter" buttonVariant="link" buttonClassName="text-xs text-gray-500 hover:text-gray-700" />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          You can unsubscribe at any time and resubscribe whenever you want. We respect your privacy.
        </p>
      </form>
    </div>
  );
};

export default SubscribeForm;
