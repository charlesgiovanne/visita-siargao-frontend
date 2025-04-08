// Theme constants for consistent styling across the application

// Color gradients
export const gradients = {
  primary: {
    background: 'bg-gradient-to-r from-green-500 to-cyan-500',
    hover: 'hover:from-green-600 hover:to-cyan-600',
    text: 'bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent',
    light: 'bg-gradient-to-r from-green-50 to-cyan-50',
    lightHover: 'hover:from-green-100 hover:to-cyan-100',
    medium: 'bg-gradient-to-r from-green-100 to-cyan-100',
  },
};

// Common component styles
export const componentStyles = {
  card: {
    base: 'border border-cyan-100',
    hover: 'hover:shadow-lg transition-all duration-300',
    interactive: 'h-full overflow-hidden transition-all hover:shadow-lg hover:scale-105 duration-300 cursor-pointer border border-green-100',
  },
  button: {
    primary: `${gradients.primary.background} ${gradients.primary.hover} text-white`,
    outline: `border-cyan-200 ${gradients.primary.light} ${gradients.primary.lightHover}`,
  },
  headings: {
    gradient: gradients.primary.text,
  },
};

// Image URLs
export const imageUrls = {
  hero: {
    discover: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=3474&auto=format&fit=crop',
    activities: 'https://images.unsplash.com/photo-1574317610454-fbd58ad2d36d?q=80&w=3312&auto=format&fit=crop',
    culture: 'https://images.unsplash.com/photo-1551339725-b00b6d9247d8?q=80&w=2070&auto=format&fit=crop',
    events: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=3024&auto=format&fit=crop',
    guide: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=3174&auto=format&fit=crop',
    contact: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=3024&auto=format&fit=crop',
    profile: 'https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?q=80&w=3087&auto=format&fit=crop',
  },
  default: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=3474&auto=format&fit=crop',
};

// API configuration
export const apiConfig = {
  baseUrl: 'https://visita-siargao-backend.onrender.com/api',
  mediaUrl: 'https://visita-siargao-backend.onrender.com'
};

// Social media links
export const socialLinks = {
  instagram: {
    name: 'Instagram',
    href: 'https://instagram.com',
    iconName: 'Instagram'
  },
  facebook: {
    name: 'Facebook',
    href: 'https://facebook.com',
    iconName: 'Facebook'
  },
  twitter: {
    name: 'Twitter',
    href: 'https://twitter.com',
    iconName: 'Twitter'
  }
};
