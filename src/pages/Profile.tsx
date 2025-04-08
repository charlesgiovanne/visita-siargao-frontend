import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import HeroSection from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Trash2, MapPin, User, Mail, Settings } from "lucide-react";
import { navigationUtils } from "@/lib/api";

const Profile = () => {
  const { user, logout } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState("favorites");

  // If not logged in, redirect to home
  if (!user) {
    navigationUtils.redirectToHome();
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigationUtils.redirectToHome();
  };

  const handleViewDestination = (id: number) => {
    navigationUtils.redirectToDestination(id);
  };

  const handleRemoveFavorite = async (id: number) => {
    await toggleFavorite({
      item_type: 'destination',
      item_id: id
    });
  };

  // Filter only destination favorites
  const destinationFavorites = favorites.filter(fav => fav.destination);

  return (
    <div>
      <HeroSection
        title="My Profile"
        subtitle="Manage your account and saved destinations"
        imageUrl="https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?q=80&w=3087&auto=format&fit=crop"
      />

      <section className="py-16 bg-gradient-to-b from-white to-cyan-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-1/3">
              <Card className="border border-cyan-100 shadow-md shadow-cyan-100/20">
                <CardHeader className="pb-2">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-center gradient-text">{user.username}</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-1 mt-1">
                    <Mail className="h-3 w-3" /> {user.email}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex items-center gap-2 justify-center p-2 bg-cyan-50 rounded-md">
                    <MapPin className="h-4 w-4 text-cyan-500" />
                    <span className="text-gray-700">
                      {destinationFavorites.length} saved destination{destinationFavorites.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-cyan-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-300" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Log Out
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:w-2/3">
              <Tabs 
                defaultValue="favorites" 
                className="w-full" 
                onValueChange={setActiveTab} 
                value={activeTab}
              >
                <TabsList className="w-full mb-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 p-1">
                  <TabsTrigger 
                    value="favorites" 
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                  >
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" /> Account Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="favorites" className="space-y-6">
                  {destinationFavorites.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-cyan-100">
                      <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-muted-foreground mb-4">You haven't saved any favorites yet.</p>
                      <Button 
                        onClick={() => navigationUtils.redirectToDestinations()} 
                        className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600"
                      >
                        Explore Destinations
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {destinationFavorites.map((favorite) => (
                        <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-cyan-100 group">
                          <div 
                            className="h-48 bg-cover bg-center relative group-hover:opacity-90 transition-all duration-300" 
                            style={{ backgroundImage: `url(${favorite.destination_details?.image})` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300" 
                              onClick={() => favorite.destination !== undefined && handleRemoveFavorite(favorite.destination)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardHeader>
                            <CardTitle className="gradient-text">{favorite.destination_details?.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-cyan-500" />
                              {favorite.destination_details?.short_description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {favorite.destination_details?.short_description}
                            </p>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button 
                              variant="outline" 
                              className="w-full border-cyan-200 hover:bg-gradient-to-r hover:from-green-500 hover:to-cyan-500 hover:text-white hover:border-transparent transition-all duration-300" 
                              onClick={() => favorite.destination !== undefined && handleViewDestination(favorite.destination)}
                            >
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card className="border border-cyan-100 shadow-sm">
                    <CardHeader>
                      <CardTitle className="gradient-text">Account Settings</CardTitle>
                      <CardDescription>Manage your account information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center py-6 text-muted-foreground">
                        Account settings coming soon!
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
