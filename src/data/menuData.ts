/**
 * @file menuData.ts
 * @description Product catalog and menu items for BrewCraft Coffee Roasters.
 * Each item contains structured metadata that feeds both the visual UI and
 * the Schema.org Product / ItemList JSON-LD structured data.
 */

export interface MenuItem {
  id: string;
  sku: string;
  name: string;
  category: 'Whole Bean' | 'Cold Brew' | 'Traditional Filter' | 'Brew Bar';
  price: number; // in INR (₹)
  currency: 'INR';
  description: string;
  origin: string;
  elevation: string;
  process: string;
  roastLevel: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  tastingNotes: string[];
  inStock: boolean;
  weightOrVolume: string;
  imageAlt: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'kaveri-reserve-filter-blend',
    sku: 'BCR-KV-001',
    name: 'Kaveri Reserve Specialty Filter Blend',
    category: 'Traditional Filter',
    price: 480,
    currency: 'INR',
    description:
      'Our signature Chennai filter coffee blend featuring 80% washed Arabica from the Shevaroy Hills and 20% premium roasted Jamnagar chicory for dense crema and rich body.',
    origin: 'Shevaroy Hills, Tamil Nadu & Jamnagar',
    elevation: '1,420m',
    process: 'Washed Arabica + Slow-roasted Chicory',
    roastLevel: 'Medium-Dark',
    tastingNotes: ['Dark Jaggery', 'Caramelized Hazelnut', 'Malt'],
    inStock: true,
    weightOrVolume: '250g',
    imageAlt: 'Kaveri Reserve artisanal filter coffee blend package with freshly roasted beans',
  },
  {
    id: 'shevaroys-estate-microlot',
    sku: 'BCR-SH-046',
    name: 'Shevaroys Microlot 46 Single Origin',
    category: 'Whole Bean',
    price: 620,
    currency: 'INR',
    description:
      'High-altitude estate Arabica grown under silver oak and jackfruit shade canopy. Exceptional floral aroma with bright stone fruit clarity in pour-over extractions.',
    origin: 'Yercaud, Shevaroy Hills, Tamil Nadu',
    elevation: '1,480m',
    process: 'Washed, Patio Dried',
    roastLevel: 'Light',
    tastingNotes: ['Orange Blossom', 'Ripe Apricot', 'Cane Sugar'],
    inStock: true,
    weightOrVolume: '250g',
    imageAlt: 'Shevaroys Microlot 46 light roast whole bean single origin coffee bag',
  },
  {
    id: 'baba-budangiri-red-honey',
    sku: 'BCR-BB-108',
    name: 'Baba Budangiri Red Honey Heritage Arabica',
    category: 'Whole Bean',
    price: 590,
    currency: 'INR',
    description:
      'Sourced from the historic birthplace of Indian coffee in Chikmagalur. Pulped natural process preserves natural fruit mucilage for syrupy body and milk chocolate sweetness.',
    origin: 'Chikmagalur, Western Ghats, Karnataka',
    elevation: '1,350m',
    process: 'Red Honey (Semi-Washed)',
    roastLevel: 'Medium',
    tastingNotes: ['Milk Chocolate', 'Dried Black Fig', 'Roasted Almond'],
    inStock: true,
    weightOrVolume: '250g',
    imageAlt: 'Baba Budangiri red honey processed medium roast coffee whole beans',
  },
  {
    id: 'monsooned-malabar-aa',
    sku: 'BCR-MM-009',
    name: 'Monsooned Malabar AA Aged Roast',
    category: 'Whole Bean',
    price: 540,
    currency: 'INR',
    description:
      'Naturally exposed to coastal monsoon winds on the Malabar coast, producing oversized golden beans with very low acidity and a velvety, heavy mouthfeel.',
    origin: 'Malabar Coast, Kerala / Karnataka',
    elevation: '1,100m',
    process: 'Monsooned Dry Process',
    roastLevel: 'Medium-Dark',
    tastingNotes: ['Earthy Cedar', 'Dark Cocoa', 'Cardamom Spice'],
    inStock: true,
    weightOrVolume: '250g',
    imageAlt: 'Monsooned Malabar AA specialty aged whole beans',
  },
  {
    id: 'slow-steeped-cascara-cold-brew',
    sku: 'BCR-CB-004',
    name: '24-Hour Cascara Nitro Cold Brew',
    category: 'Cold Brew',
    price: 240,
    currency: 'INR',
    description:
      'Single-origin Arabica steeped cold for 24 hours infused with sun-dried organic coffee cherry skins (cascara), charged with micro-nitrogen bubbles.',
    origin: 'Araku Valley & Shevaroy Estates',
    elevation: '1,200m',
    process: 'Cold Immersion Steep',
    roastLevel: 'Medium-Light',
    tastingNotes: ['Hibiscus Tea', 'Dark Cherry', 'Honeyed Lemon'],
    inStock: true,
    weightOrVolume: '300ml Bottle',
    imageAlt: 'Bottle of 24-hour nitro cascara cold brew with condensation drops',
  },
  {
    id: 'artisanal-pour-over-flight',
    sku: 'BCR-PF-007',
    name: 'Brew Bar Terroir Tasting Flight',
    category: 'Brew Bar',
    price: 360,
    currency: 'INR',
    description:
      'Curated table-side tasting experience of three distinct Indian coffee terroirs brewed on Hario V60 drippers with precision mineral-adjusted water.',
    origin: 'Tamil Nadu, Karnataka & Andhra Pradesh',
    elevation: '1,200m - 1,500m',
    process: 'Various (Washed, Honey, Natural)',
    roastLevel: 'Light',
    tastingNotes: ['Floral', 'Stone Fruit', 'Dark Cocoa'],
    inStock: true,
    weightOrVolume: '3 x 100ml Servings',
    imageAlt: 'Three ceramic tasting cups on a teak wood board with pour-over carafes',
  },
];
