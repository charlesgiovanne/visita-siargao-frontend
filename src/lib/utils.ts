import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { apiConfig } from "./theme"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats an image URL to ensure it has the proper base URL
 * If the URL starts with http or https, it's returned as is
 * Otherwise, it's prefixed with the API media URL
 */
export function formatImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  
  // If it's already an absolute URL (starts with http:// or https://), return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a path that starts with /media/, make sure it's properly formatted
  if (imageUrl.startsWith('/media/')) {
    return `${apiConfig.mediaUrl}${imageUrl}`;
  }
  
  // If it's a path that starts with media/, add a slash
  if (imageUrl.startsWith('media/')) {
    return `${apiConfig.mediaUrl}/${imageUrl}`;
  }
  
  // If it's a relative URL starting with a slash, append it to the media URL
  if (imageUrl.startsWith('/')) {
    return `${apiConfig.mediaUrl}${imageUrl}`;
  }
  
  // Otherwise, assume it's a relative path and add the media path
  return `${apiConfig.mediaUrl}/media/${imageUrl}`;
}
