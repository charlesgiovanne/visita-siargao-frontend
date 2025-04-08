import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import AuthModal from '@/components/auth/AuthModal';

interface FavoriteButtonProps {
  destinationId: string;
  title: string;
  className?: string;
}

const FavoriteButton = ({ destinationId, title, className }: FavoriteButtonProps) => {
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite, isLoading } = useFavorites();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const isFav = isFavorite('destination', parseInt(destinationId, 10));

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from propagating to parent elements
    e.preventDefault(); // Prevent default link behavior
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    await toggleFavorite({
      item_type: 'destination',
      item_id: parseInt(destinationId, 10),
      title: title
    });
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <Button
        variant={isFav ? "default" : "outline"}
        size="icon"
        onClick={handleToggleFavorite}
        disabled={isLoading}
        className={`${className} ${isFav ? "bg-red-500 hover:bg-red-600 border-red-500" : "hover:border-red-200"}`}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`h-5 w-5 ${isFav ? "fill-white stroke-white" : "stroke-red-500 hover:fill-red-100"}`} />
      </Button>
      
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onOpenChange={handleAuthModalClose}
          defaultTab="login"
          onSuccess={handleAuthModalClose}
        />
      )}
    </>
  );
};

export default FavoriteButton;
