/**
 * @file blogData.ts
 * @description Educational blog articles detailing specialty coffee culture in India.
 * Includes structured metadata for Article and FAQPage Schema.org markup,
 * along with internal linking relationships to menu products.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string; // ISO 8601 YYYY-MM-DD
  modifiedDate: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    bio: string;
  };
  category: string;
  heroImage: string;
  imageAlt: string;
  excerpt: string;
  content: {
    heading: string;
    paragraphs: string[];
    calloutText?: string;
  }[];
  relatedMenuIds: string[]; // Internal linking to menu items
  relatedPostSlugs: string[]; // Internal linking to other articles
  faqs: FAQItem[]; // For visible rendering AND FAQPage JSON-LD schema
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'art-of-south-indian-filter-coffee',
    title: 'The Art of South Indian Filter Coffee: Decoction Science & Tradition',
    metaDescription:
      'Discover the physics of traditional South Indian brass filter decoction, the ideal chicory ratio, and how to achieve the signature frothy meter-coffee foam.',
    publishDate: '2026-09-18',
    modifiedDate: '2026-10-10',
    readingTime: '6 min read',
    author: {
      name: 'Venkatesh Subramanian',
      role: 'Head of Roasting & Sensory Education',
      bio: 'Q-Grader certified roaster with 14 years studying South Indian coffee terroirs and traditional decoction extraction thermodynamics.',
    },
    category: 'Brewing Guides',
    heroImage: '/src/assets/images/menu_specialty_filter_coffee_1792125504272.jpg',
    imageAlt: 'South Indian artisanal filter coffee poured between traditional brass dabarah and tumbler',
    excerpt:
      'From the precise perforation geometry of brass filters to the thermal retention of a dabarah tumbler, South Indian filter coffee is both an architectural masterpiece and a sensory ritual.',
    content: [
      {
        heading: 'Why Brass Filter Percolation Differs from Espresso & Pour-Over',
        paragraphs: [
          'Unlike high-pressure espresso extraction (9 bars over 25 seconds) or gravity pour-over drip (2 to 3 minutes), South Indian filter coffee relies on slow gravity-driven percolation through a tightly compacted coffee bed inside a perforated two-tier brass vessel.',
          'Water gently permeates the tamped coffee grounds at 92°C to 94°C over 12 to 18 minutes. This slow hydraulic dwell time allows deep extraction of polysaccharides, oils, and aromatic melanoidins, resulting in a thick, concentrated syrup known as "decoction".',
        ],
        calloutText:
          'Pro tip: Never press down with maximum force on the umbrella tamper disc. A firm 1.5kg resting pressure is sufficient to create an even extraction bed without choking percolation.',
      },
      {
        heading: 'The Role of High-Grown Chicory: Myth vs Chemistry',
        paragraphs: [
          'Chicory (inulin-rich roasted root of Cichorium intybus) was originally popularized during wartime coffee shortages, but in South India it evolved into an intentional gastronomic element. High-quality roasted chicory contains caramelised sugars and high soluble fiber that heighten viscosity, soften raw caffeine bitterness, and extend mouthfeel.',
          'At BrewCraft, our Kaveri Reserve Filter Blend pairs 80% washed Arabica from Shevaroys with 20% slow-roasted Jamnagar chicory. This ratio produces a dense decoction that holds up against rich whole milk without losing delicate floral estate characteristics.',
        ],
      },
      {
        heading: 'Achieving the Perfect Froth: The Physics of "Meter Coffee"',
        paragraphs: [
          'The dramatic theatrical pour between the dabarah (shallow rimmed bowl) and tumbler (tall beaker) is not merely performative. Aerating the heated mixture from a height of one meter forces ambient micro-bubbles into milk proteins, emulsifying natural fats and tempering the brew to the ideal drinking temperature of 62°C.',
          'When preparing at home, warm fresh A2 whole milk to a gentle simmer (do not boil aggressively), mix 40ml of first-pull decoction with 120ml hot milk, and pour across arms twice for velvet-fine froth.',
        ],
      },
    ],
    relatedMenuIds: ['kaveri-reserve-filter-blend', 'shevaroys-estate-microlot'],
    relatedPostSlugs: [
      'single-origin-estates-shevaroys-chikmagalur',
      'home-pourover-water-temperature-grind-guide',
    ],
    faqs: [
      {
        question: 'What is the optimal coffee-to-chicory ratio for traditional South Indian filter coffee?',
        answer:
          'Specialty coffee experts recommend an 80:20 or 85:15 Arabica-to-chicory ratio. 80% Arabica preserves the delicate chocolate and berry notes of the bean, while 20% roasted chicory provides essential body, deep color, and stable micro-froth.',
      },
      {
        question: 'How long should a traditional South Indian coffee decoction take to drip?',
        answer:
          'A properly calibrated decoction takes between 12 and 18 minutes to extract. If it drips in under 5 minutes, your grind size is too coarse or tamping was too loose; if it exceeds 25 minutes, the grind is too fine or the filter holes are clogged.',
      },
      {
        question: 'Can I reuse the coffee grounds inside the brass filter for a second brew?',
        answer:
          'Yes, this is known as the "second decoction". While lighter and slightly more astringent than the rich first pull, blending first and second pulls is traditional in many Chennai households to achieve balanced strength across morning cups.',
      },
    ],
  },
  {
    slug: 'single-origin-estates-shevaroys-chikmagalur',
    title: 'Single-Origin Estates of South India: Shevaroys vs Chikmagalur Terroir',
    metaDescription:
      'Explore South Indian specialty coffee terroirs. Compare the high-altitude floral acidity of Shevaroy Hills with the chocolaty heritage richness of Chikmagalur.',
    publishDate: '2026-08-29',
    modifiedDate: '2026-10-02',
    readingTime: '7 min read',
    author: {
      name: 'Ananya Raghavan',
      role: 'Green Coffee Sourcing Director',
      bio: 'Agronomist and direct-trade buyer visiting shade-grown bio-reserve coffee estates across Tamil Nadu and Karnataka every harvest season.',
    },
    category: 'Origins & Terroir',
    heroImage: '/src/assets/images/craft_roasting_process_1792125504464.jpg',
    imageAlt: 'Specialty coffee drum roaster roasting single-origin Arabica beans from Chikmagalur estates',
    excerpt:
      'South India is one of the world’s rare regions where 100% of coffee is shade-grown beneath a multi-tiered rainforest canopy. Here is how altitude, soil composition, and native flora shape the cup.',
    content: [
      {
        heading: 'The Shevaroys: High Altitude & Citrus Clarity',
        paragraphs: [
          'Rising dramatically above the Salem plains of Tamil Nadu, the Shevaroy Hills (ranging from 1,300m to 1,600m) feature lateritic red loamy soil enriched by organic leaf mulch from native silver oak, rosewood, and jackfruit trees.',
          'The microclimate here experiences brisk nocturnal temperatures and gentle afternoon mists. This slows down cherry maturation by nearly 25 days compared to lower valleys, resulting in higher sugar density and vibrant citric acidity reminiscent of orange blossoms and yellow plums.',
        ],
        calloutText:
          'Our Shevaroys Microlot 46 is harvested exclusively from select east-facing parcels that receive morning sun followed by afternoon shade.',
      },
      {
        heading: 'Chikmagalur & Baba Budangiri: Heritage & Sweet Chocolate Notes',
        paragraphs: [
          'Chikmagalur holds legendary significance as the birthplace of Indian coffee, where Sufi saint Baba Budan smuggled seven raw coffee seeds from Mocha in the 17th century. The soils are deep volcanic loam, shielded by dense evergreen rainforest canopy.',
          'Coffees from Baba Budangiri consistently showcase low perceived acidity, lush viscous mouthfeel, and prominent notes of dark cocoa, roasted pecans, and dried black fig. They shine brilliantly in medium roasts and milk-based extractions.',
        ],
      },
      {
        heading: 'The Ecological Miracle of Two-Tier Shade Farming',
        paragraphs: [
          'Unlike monoculture sun-grown plantations seen in South America, Indian shade-grown estates host over 50 species of birds, wild hornbills, flying squirrels, and pollinators. Shade trees protect fragile Arabica shrubs from extreme monsoon deluges and summer sun scorch.',
          'This biodiversity contributes to resilient organic root systems that absorb diverse micronutrients, creating the distinctive rounded body that makes Indian specialty coffees globally celebrated.',
        ],
      },
    ],
    relatedMenuIds: ['shevaroys-estate-microlot', 'baba-budangiri-red-honey', 'monsooned-malabar-aa'],
    relatedPostSlugs: [
      'art-of-south-indian-filter-coffee',
      'home-pourover-water-temperature-grind-guide',
    ],
    faqs: [
      {
        question: 'Why are Indian coffees almost always shade-grown under jungle trees?',
        answer:
          'Indian coffee cultivation developed in the biodiversity-rich Western and Eastern Ghats where intense monsoon rains and direct tropical sun require a protective multi-tiered forest canopy. This natural agroforestry shields the crops, supports wildlife, and extends cherry ripening time.',
      },
      {
        question: 'What is the tasting difference between Shevaroys and Chikmagalur coffees?',
        answer:
          'Shevaroys coffees tend to have higher elevation brightness with notes of citrus, orange blossom, and stone fruit, making them splendid for pour-overs. Chikmagalur coffees feature heavier body with deep chocolate, nutty, and dried fruit profiles ideal for espresso and filter brews.',
      },
      {
        question: 'How do processing methods (Washed vs Honey vs Natural) affect Indian beans?',
        answer:
          'Washed processing highlights the pure terroir and sparkling acidity of the seed; Red Honey processing retains sticky fruit sugars for syrupy sweetness; while dry Naturals produce ripe berry sweetness and wine-like complexity.',
      },
    ],
  },
  {
    slug: 'home-pourover-water-temperature-grind-guide',
    title: 'Mastering Home Pour-Over: Water Temperature & Grind Calibration Guide',
    metaDescription:
      'Learn how to brew coffee at home with V60 or Chemex. Master TDS water chemistry, brew ratios, bloom degassing, and grind size calibration.',
    publishDate: '2026-07-14',
    modifiedDate: '2026-09-30',
    readingTime: '5 min read',
    author: {
      name: 'Venkatesh Subramanian',
      role: 'Head of Roasting & Sensory Education',
      bio: 'Certified barista trainer who has calibrated brewing bars for national barista championship contenders.',
    },
    category: 'Brewing Guides',
    heroImage: '/src/assets/images/blog_coffee_brewing_1792125505375.jpg',
    imageAlt: 'Barista pouring hot water from a gooseneck kettle into a glass V60 coffee dripper',
    excerpt:
      'Achieving sweet, balanced pour-over extractions is 70% science and 30% muscle memory. We break down the four critical extraction variables: water mineral balance, temperature curves, grind distribution, and agitation.',
    content: [
      {
        heading: 'The 1:16 Golden Ratio & Scale Calibration',
        paragraphs: [
          'Consistency begins with weight, not volume. Scoops are unreliable because coffee density changes drastically between a dense high-altitude light roast (like our Shevaroys) and an expanded dark roast.',
          'Start with a 1:16 brew ratio: 15 grams of freshly ground coffee to 240 grams of water. Use a digital scale accurate to 0.1g with an integrated timer to control your flow rate.',
        ],
        calloutText:
          'Always rinse your paper filter with 100ml hot water before adding grounds to flush away residual papery wood taste and preheat the glass brewer.',
      },
      {
        heading: 'Water Chemistry: The Invisible Ingredient (98% of your cup)',
        paragraphs: [
          'If your water tastes flat or metallic, your coffee will too. In Chennai, municipal borewell water often has elevated Total Dissolved Solids (TDS > 500 ppm), which chokes out delicate aromatic acids.',
          'For peak extraction, brew with water having a TDS between 100 and 150 ppm, with balanced magnesium (which bonds to bright fruit acids) and calcium (which highlights sweet chocolate bases). Bottled natural spring water or properly mineral-reconstituted RO water yields stunning cup clarity.',
        ],
      },
      {
        heading: 'Water Temperature & Pouring Technique',
        paragraphs: [
          'For light-roast specialty coffees, maintain water temperature between 93°C and 95°C (wait 45 seconds after a rolling boil). For medium and darker roasts, lower to 88°C–91°C to avoid over-extracting bitter astringent polyphenols.',
          'Start with a 45-second bloom using 45g of water (3x dry coffee weight). Observe the carbon dioxide bubbles escape. Then execute two concentric circular pours of 100g and 95g, keeping your gooseneck kettle spout low to minimise turbulent slurry agitation.',
        ],
      },
    ],
    relatedMenuIds: ['shevaroys-estate-microlot', 'artisanal-pour-over-flight'],
    relatedPostSlugs: [
      'art-of-south-indian-filter-coffee',
      'single-origin-estates-shevaroys-chikmagalur',
    ],
    faqs: [
      {
        question: 'What grind size should I use for a Hario V60 dripper?',
        answer:
          'Use a medium-fine grind resembling kosher sea salt or coarse sand. If the total brew drawdown time is under 2 minutes, grind slightly finer; if the water stalls past 3:30 minutes, coarsen your grind.',
      },
      {
        question: 'Why is the coffee "bloom" phase essential in pour-over?',
        answer:
          'Freshly roasted coffee traps carbon dioxide inside the cellular structure of the bean. The bloom (initial 45-second saturation with 3x water) releases this gas, allowing subsequent brew water to penetrate the coffee grounds without being repelled by bubbling CO2.',
      },
      {
        question: 'Does boiling water burn coffee grounds?',
        answer:
          'Water at 100°C does not burn coffee (which was roasted at 200°C+), but it can over-extract astringent bitter tannins and chlorogenic acids. Letting water cool slightly to 92°C–94°C produces a cleaner, sweeter balance.',
      },
    ],
  },
];
