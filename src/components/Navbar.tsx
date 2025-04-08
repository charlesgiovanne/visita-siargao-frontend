import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import UserMenu from "./UserMenu";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Handle scroll effect for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // Combined style for navigation links using the new CSS classes
  const navLinkStyle = cn(
    navigationMenuTriggerStyle(),
    "gradient-text nav-link",
    "transition-all duration-300"
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled || !isHomePage ? "backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-cyan-100" : "",
        className
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-semibold gradient-text"
        >
          Visita Siargao
        </Link>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <UserMenu />
          <button 
            className="bg-transparent text-cyan-600 hover:text-cyan-800 transition-all duration-500 ease-in-out"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>


        {/* Desktop Navigation - Using custom gradient classes */}
        <div className="hidden md:flex md:items-center md:justify-between md:flex-1 md:pl-10">
          <div className="flex-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/discover" 
                      className={navLinkStyle}
                    >
                      Discover
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn("bg-transparent gradient-text nav-link")}
                  >
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[200px]">
                      {[
                        { name: "Destinations", path: "/destinations" },
                        { name: "Activities", path: "/activities" },
                        { name: "Culture", path: "/culture" },
                      ].map(({ name, path }) => (
                        <NavigationMenuLink key={path} asChild>
                          <Link
                            to={path}
                            className={cn(
                              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
                              "gradient-text-reverse nav-link"
                            )}
                          >
                            {name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/guide" 
                      className={navLinkStyle}
                    >
                      Guide
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/events" 
                      className={navLinkStyle}
                    >
                      Events
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/contact" 
                      className={navLinkStyle}
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* User Menu */}
          <div className="ml-4">
            <UserMenu />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg md:hidden p-4 border-b border-cyan-100 shadow-lg max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              {[
                { name: "Discover", path: "/discover" },
                { name: "Guide", path: "/guide" },
                { name: "Events", path: "/events" },
                { name: "Contact", path: "/contact" },
              ].map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-accent/50 nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="gradient-text">{name}</span>
                </Link>
              ))}

              {/* Dropdown in Mobile */}
              <div className="mt-2 border-t border-cyan-100 pt-4">
                <span className="px-3 py-2 font-medium gradient-text-reverse">Explore</span>
                <div className="mt-2 pl-3 border-l-2 border-cyan-200">
                  {[
                    { name: "Destinations", path: "/destinations" },
                    { name: "Activities", path: "/activities" },
                    { name: "Culture", path: "/culture" },
                  ].map(({ name, path }) => (
                    <Link
                      key={path}
                      to={path}
                      className="block px-3 py-2 text-sm transition-colors rounded-md hover:bg-accent/50 nav-link"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="gradient-text">{name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Profile Links in Mobile */}
              <div className="mt-2 border-t border-cyan-100 pt-4">
                <span className="px-3 py-2 font-medium gradient-text-reverse">Account</span>
                <div className="mt-2 pl-3 border-l-2 border-cyan-200">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-sm transition-colors rounded-md hover:bg-accent/50 nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="gradient-text">Profile</span>
                  </Link>
                  <Link
                    to="/profile/favorites"
                    className="block px-3 py-2 text-sm transition-colors rounded-md hover:bg-accent/50 nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="gradient-text">Favorites</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
