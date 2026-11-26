// src/components/seo/schema.ts

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BrewCraft Coffee",
    "url": "https://brewcraftcoffee.in",
    "logo": "https://brewcraftcoffee.in/logo.png",
    "sameAs": [
      "https://www.instagram.com/brewcraftcoffee"
    ]
  };
}

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CoffeeShop",
    "name": "BrewCraft Coffee",
    "telephone": "+91-98765-43210",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gandhipuram, Coimbatore",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "postalCode": "641012",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "22:00"
    }
  };
}