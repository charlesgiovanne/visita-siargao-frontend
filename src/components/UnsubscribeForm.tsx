import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface UnsubscribeFormProps {
  buttonText?: string;
  buttonVariant?: "link" | "default";
  buttonClassName?: string;
}

const UnsubscribeForm = ({ 
  buttonText = "Unsubscribe",
  buttonVariant = "link",
  buttonClassName = "text-xs text-gray-500 hover:text-gray-700"
}: UnsubscribeFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await authApi.unsubscribeByEmail(email);
      
      // Check if the response indicates success
      if (response && response.status >= 200 && response.status < 300) {
        toast.success("You have been successfully unsubscribed from our newsletter.");
        setEmail("");
        setOpen(false);
      } else {
        // Handle unexpected response
        toast.error("Failed to unsubscribe. Please try again later.");
      }
    } catch (error: any) {
      console.error("Error unsubscribing:", error);
      
      // Check if the error is because the email is not subscribed
      if (error.response?.status === 404) {
        toast.info("This email is not currently subscribed to our newsletter.");
        setEmail("");
        setOpen(false);
      } else {
        toast.error("Failed to unsubscribe. Please check your email and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant as any} 
          className={buttonClassName}
          size="sm"
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl">Unsubscribe from Newsletter</DialogTitle>
          <DialogDescription className="mt-2">
            We're sorry to see you go. Please enter your email address to unsubscribe from our newsletter.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Unsubscribe"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UnsubscribeForm;
