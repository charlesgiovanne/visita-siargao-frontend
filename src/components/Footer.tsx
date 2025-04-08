import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import UnsubscribeForm from "./UnsubscribeForm";
import { socialLinks } from "@/lib/theme";

// Define the type for social link items
type SocialLinkItem = {
  name: string;
  href: string;
  iconName: string;
};

const Footer = () => {
  // Map of icon components
  const socialIcons = {
    Instagram: <Instagram size={20} />,
    Facebook: <Facebook size={20} />,
    Twitter: <Twitter size={20} />
  };

  return (
    <footer className="border-t backdrop-blur-lg bg-white/75">
      <div className="container mx-auto px-4 py-8 pl-12 md:pl-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Visita Siargao</h3>
            <p className="text-sm text-gray-600">
              Discover the beauty of Siargao Island, Philippines. Your guide to the surfing capital of the Philippines.
            </p>
            <div className="mt-4 flex space-x-4">
              {Object.entries(socialLinks).map(([key, link]: [string, SocialLinkItem]) => (
                <a key={key} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  {socialIcons[link.iconName as keyof typeof socialIcons]}
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/discover" className="hover:text-gray-900 transition-colors">Discover</Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-gray-900 transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/activities" className="hover:text-gray-900 transition-colors">Activities</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-gray-900 transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/eats" className="hover:text-gray-900 transition-colors">Eats</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-600">
              <p>Tourism Office</p>
              <p>Siargao Island, Surigao del Norte</p>
              <p>Philippines</p>
              <p className="mt-2">Email: <a href="mailto:visitasiargao@gmail.com" className="hover:text-gray-900 transition-colors">visitasiargao@gmail.com</a></p>
              <p>Phone: <a href="tel:+639123456789" className="hover:text-gray-900 transition-colors">+63 967 024 1285</a></p>
            </address>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Visita Siargao. All rights reserved.</p>
          <div className="mt-2">
            <UnsubscribeForm buttonText="Unsubscribe from newsletter" buttonVariant="link" buttonClassName="text-xs text-gray-500 hover:text-gray-700" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
