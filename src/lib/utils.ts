import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Product data has mixed capitalization across sources — normalize each
// feature bullet to a consistent, capitalized sentence fragment for display.
export const formatFeature = (feature: string) => {
  const trimmed = feature.trim().replace(/\.$/, '');
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};
