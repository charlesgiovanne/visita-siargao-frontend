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
    if (!email) return;
    
    setLoading(true);
    
    try {
      // Make the API call
      await authApi.unsubscribeByEmail(email);
      
      // Only show success message and close dialog on success
      toast.success("Successfully unsubscribed from newsletter", { 
        id: "unsubscribe-success",
        duration: 3000
      });
      
      // Reset form and close dialog
      setEmail("");
      setOpen(false);
    } catch (error: any) {
      console.error("Unsubscribe error:", error);
      
      // Handle specific error cases
      if (error.response?.status === 404) {
        toast.info("This email is not currently subscribed", { 
          id: "unsubscribe-info",
          duration: 3000
        });
        setEmail("");
        setOpen(false);
      } else {
        toast.error("Could not process your request", { 
          id: "unsubscribe-error",
          duration: 3000
        });
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
