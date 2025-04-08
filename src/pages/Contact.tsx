import { useState } from "react";
import HeroSection from "@/components/Hero";
import SubscribeForm from "@/components/SubscribeForm";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { Loader2 } from "lucide-react";

const faqs = [
  {
    question: "What is the best time to visit Siargao?",
    answer: "The best time to visit Siargao is during the dry season from March to October. For surfers, September to November offers the best waves. December to February is the rainy season, which might affect some outdoor activities."
  },
  {
    question: "How do I get to Siargao Island?",
    answer: "You can reach Siargao by flying to Sayak Airport (IAO) from Manila or Cebu. Alternatively, you can take a ferry from Surigao City to Dapa Port on Siargao Island."
  },
  {
    question: "Do I need to know how to surf to enjoy Siargao?",
    answer: "Not at all! While Siargao is famous for surfing, there are plenty of other activities to enjoy, including island hopping, visiting rock pools, exploring mangrove forests, and simply relaxing on beautiful beaches."
  },
  {
    question: "What accommodation options are available?",
    answer: "Siargao offers a range of accommodations from budget hostels to luxury resorts. Most are concentrated in General Luna, but you'll find options throughout the island."
  },
  {
    question: "Is it safe to travel to Siargao?",
    answer: "Yes, Siargao is generally safe for tourists. As with any destination, it's advisable to take normal precautions with your belongings and be aware of your surroundings."
  },
  {
    question: "How do I get around the island?",
    answer: "The most common way to get around is by renting a motorcycle or scooter. Habal-habal (motorcycle taxis) and tricycles are also available. For group tours, vans can be hired."
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await authApi.sendContact(formData);
      toast.success("Your message has been sent successfully!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast.error("Failed to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <HeroSection
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries or travel assistance"
        imageUrl="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=3024&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about visiting Siargao? Fill out the form below and we'll get back to you as soon as possible. 
                <span className="font-medium">You can contact us without subscribing to our newsletter.</span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-medium rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>

            <div>
              <SubscribeForm 
                title="Newsletter (Optional)"
                description="Subscribe to receive updates about events, new destinations, and special offers. This is completely optional and separate from your contact message."
              />

              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Find Us</h3>
                <address className="not-italic text-gray-600">
                  <p>Siargao Tourism Office</p>
                  <p>General Luna, Siargao Island</p>
                  <p>Surigao del Norte, Philippines</p>
                  <p className="mt-4">Phone: +63 912 345 6789</p>
                  <p>Email: info@visitasiargao.com</p>
                </address>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
