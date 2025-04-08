import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { exploreApi } from '../lib/api';

// Custom toast function with black description text
const customToast = {
  success: (title: string, options?: { description?: string }) => {
    toast.success(title, {
      ...options,
      className: 'black-description-toast',
    });
  },
  error: (title: string, options?: { description?: string }) => {
    toast.error(title, {
      ...options,
      className: 'black-description-toast',
    });
  }
};

// Types for favorites
interface FavoriteItem {
  id: number;
  destination?: number;
  activity?: number;
  culture?: number;
  created_at: string;
  destination_details?: {
    id: number;
    title: string;
    image: string;
    short_description: string;
    // other fields...
  };
  activity_details?: {
    id: number;
    title: string;
    image: string;
    short_description: string;
    // other fields...
  };
  culture_details?: {
    id: number;
    title: string;
    image: string;
    short_description: string;
    // other fields...
  };
}

interface ToggleFavoriteParams {
  item_type: 'destination' | 'activity' | 'culture';
  item_id: number;
  title?: string; // For toast message
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  isLoading: boolean;
  toggleFavorite: (params: ToggleFavoriteParams) => Promise<void>;
  isFavorite: (itemType: string, itemId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  // Fetch favorites
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      if (!isAuthenticated) return [];
      const response = await exploreApi.getFavorites();
      return response.data;
    },
    enabled: isAuthenticated,
  });

  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async ({ item_type, item_id }: ToggleFavoriteParams) => {
      const response = await exploreApi.toggleFavorite({ item_type, item_id });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate favorites query to refetch
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      
      // Also invalidate the specific item type list to update UI
      queryClient.invalidateQueries({ queryKey: [`${variables.item_type}s`] });
      
      // Show success message
      const action = data.status === 'added' ? 'Added to' : 'Removed from';
      customToast.success(`${action} favorites`, {
        description: variables.title ? `${variables.title} has been ${data.status === 'added' ? 'added to' : 'removed from'} your favorites` : undefined,
      });
    },
    onError: () => {
      customToast.error('Failed to update favorite', {
        description: 'Please try again later',
      });
    },
  });

  // Check if an item is in favorites
  const isFavorite = (itemType: string, itemId: number): boolean => {
    if (!favorites.length) return false;
    
    return favorites.some((fav: FavoriteItem) => {
      if (itemType === 'destination' && fav.destination === itemId) return true;
      if (itemType === 'activity' && fav.activity === itemId) return true;
      if (itemType === 'culture' && fav.culture === itemId) return true;
      return false;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        toggleFavorite: toggleFavoriteMutation.mutateAsync,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
