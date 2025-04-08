import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Destinations from "./pages/Destinations";
import Activities from "./pages/Activities";
import Culture from "./pages/Culture";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Guide from "./pages/Guide";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FavoritesProvider>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="discover" element={<Discover />} />
                <Route path="destinations" element={<Destinations />} />
                <Route path="activities" element={<Activities />} />
                <Route path="culture" element={<Culture />} />
                <Route path="events" element={<Events />} />
                <Route path="contact" element={<Contact />} />
                <Route path="guide" element={<Guide />} />
                <Route path="details/:type/:id" element={<Details />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/favorites" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
