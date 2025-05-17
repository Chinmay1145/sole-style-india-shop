
export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  images: string[];
  colors: { name: string; value: string }[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  isOnSale?: boolean;
  gender: 'men' | 'women' | 'unisex';
  tags: string[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Air Max Ultra",
    brand: "Nike",
    category: "Running",
    price: 7999,
    originalPrice: 9999,
    description: "Experience ultimate comfort with Nike's Air Max Ultra. These lightweight running shoes feature advanced cushioning technology for a smooth ride.",
    features: [
      "Mesh upper for breathability",
      "Air-Sole unit for lightweight cushioning",
      "Rubber outsole for durability and traction",
      "Padded collar for comfort",
      "Reflective details for visibility in low light"
    ],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop"
    ],
    colors: [
      { name: "Red", value: "#FF5A5F" },
      { name: "Blue", value: "#2563EB" },
      { name: "White", value: "#FFFFFF" }
    ],
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.5,
    reviews: 128,
    isNew: true,
    isFeatured: true,
    gender: "unisex",
    tags: ["running", "lightweight", "cushioned"]
  },
  {
    id: 2,
    name: "Classic Suede",
    brand: "Puma",
    category: "Casual",
    price: 5999,
    description: "The iconic Puma Suede reinvented with modern comfort features while maintaining its classic look.",
    features: [
      "Premium suede upper",
      "Cushioned midsole for comfort",
      "Rubber outsole for grip",
      "Signature Puma Formstrip",
      "Padded collar for added comfort"
    ],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1374&auto=format&fit=crop"
    ],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Grey", value: "#6B7280" },
      { name: "Navy", value: "#1E40AF" }
    ],
    sizes: ["6", "7", "8", "9", "10", "11"],
    rating: 4.2,
    reviews: 86,
    isPopular: true,
    gender: "unisex",
    tags: ["casual", "suede", "retro"]
  },
  {
    id: 3,
    name: "Ultraboost Pro",
    brand: "Adidas",
    category: "Running",
    price: 8499,
    originalPrice: 9999,
    description: "Designed for serious runners, the Ultraboost Pro combines responsive cushioning with energy return technology for an unmatched running experience.",
    features: [
      "Primeknit+ upper for adaptable support",
      "Boost midsole for responsive cushioning",
      "Continental™ Rubber outsole for extraordinary grip",
      "Torsion system for midfoot integrity",
      "Molded heel counter for natural fit"
    ],
    images: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1431&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1412&auto=format&fit=crop"
    ],
    colors: [
      { name: "Core Black", value: "#000000" },
      { name: "Cloud White", value: "#FFFFFF" },
      { name: "Signal Orange", value: "#FB923C" }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.8,
    reviews: 234,
    isFeatured: true,
    isOnSale: true,
    gender: "unisex",
    tags: ["running", "responsive", "comfort"]
  },
  {
    id: 4,
    name: "Classic Leather",
    brand: "Reebok",
    category: "Casual",
    price: 4999,
    description: "A timeless silhouette with premium leather upper for everyday style and comfort.",
    features: [
      "Full-grain leather upper for comfort and support",
      "EVA midsole for lightweight cushioning",
      "High abrasion rubber outsole",
      "Die-cut EVA sockliner",
      "Padded foam sockliner for added comfort"
    ],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1415&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1400&auto=format&fit=crop"
    ],
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" },
      { name: "Chalk", value: "#EAE8DC" }
    ],
    sizes: ["6", "7", "8", "9", "10", "11"],
    rating: 4.3,
    reviews: 92,
    isPopular: true,
    gender: "unisex",
    tags: ["classic", "leather", "heritage"]
  },
  {
    id: 5,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    category: "Casual",
    price: 3499,
    description: "The iconic Chuck Taylor All Star with canvas upper and timeless design.",
    features: [
      "Canvas upper for lightweight comfort",
      "Medial eyelets enhance airflow",
      "OrthoLite insole for cushioning",
      "Diamond pattern outsole",
      "Signature Chuck Taylor ankle patch"
    ],
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556048219-bb6978360b84?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?q=80&w=1470&auto=format&fit=crop"
    ],
    colors: [
      { name: "Optical White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" },
      { name: "Red", value: "#EF4444" }
    ],
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    rating: 4.4,
    reviews: 318,
    isPopular: true,
    gender: "unisex",
    tags: ["classic", "canvas", "casual"]
  },
  {
    id: 6,
    name: "SuperRep Go",
    brand: "Nike",
    category: "Training",
    price: 6499,
    description: "Versatile training shoes designed for circuit training, HIIT workouts, and cardio.",
    features: [
      "Mesh upper for ventilation",
      "Arc on the outsole for smooth transitions",
      "Cushlon foam midsole provides responsive cushioning",
      "Burpee break for flexibility",
      "Rope wrap for durability during rope climbs"
    ],
    images: [
      "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?q=80&w=1364&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1374&auto=format&fit=crop"
    ],
    colors: [
      { name: "Black/White", value: "#000000" },
      { name: "Racer Blue", value: "#2463EB" },
      { name: "Digital Pink", value: "#EC4899" }
    ],
    sizes: ["6", "7", "8", "9", "10", "11"],
    rating: 4.6,
    reviews: 86,
    isNew: true,
    gender: "unisex",
    tags: ["training", "hiit", "fitness"]
  },
  {
    id: 7,
    name: "RS-X Bold",
    brand: "Puma",
    category: "Lifestyle",
    price: 7499,
    originalPrice: 8999,
    description: "Bold and chunky silhouette with futuristic design elements and maximum style impact.",
    features: [
      "Mesh and synthetic upper",
      "Bulky design with bold colors",
      "RS cushioning technology",
      "Rubber outsole for traction",
      "Padded collar and tongue for comfort"
    ],
    images: [
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1379&auto=format&fit=crop"
    ],
    colors: [
      { name: "Puma White", value: "#FFFFFF" },
      { name: "High Risk Red", value: "#DC2626" },
      { name: "Puma Black", value: "#000000" }
    ],
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.3,
    reviews: 59,
    isOnSale: true,
    gender: "unisex",
    tags: ["chunky", "retro", "streetstyle"]
  },
  {
    id: 8,
    name: "Metcon 7",
    brand: "Nike",
    category: "Training",
    price: 7999,
    description: "The ultimate training shoe for weightlifting and high-intensity workouts.",
    features: [
      "Mesh upper with textured overlays for durability",
      "Wide, flat heel for stability during lifts",
      "Firm foam midsole for security",
      "Removable Hyperlift insert",
      "Rubber tread on the outsole for traction"
    ],
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1480&auto=format&fit=crop"
    ],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "University Red", value: "#DC2626" },
      { name: "Particle Grey", value: "#6B7280" }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.7,
    reviews: 142,
    isPopular: true,
    gender: "unisex",
    tags: ["crossfit", "weightlifting", "training"]
  },
  {
    id: 9,
    name: "Gel-Kayano 28",
    brand: "Asics",
    category: "Running",
    price: 8999,
    description: "Premium stability running shoes with exceptional cushioning for long-distance comfort.",
    features: [
      "Engineered mesh upper for breathability",
      "Dynamic DuoMax Support System",
      "Rearfoot and Forefoot GEL Technology Cushioning System",
      "FLYTEFOAM Propel Technology for bounce",
      "AHAR Plus Outsole for durability"
    ],
    images: [
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=1476&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606753930828-beee975f3ff8?q=80&w=1453&auto=format&fit=crop"
    ],
    colors: [
      { name: "Black/Graphite Grey", value: "#000000" },
      { name: "White/Pure Silver", value: "#FFFFFF" },
      { name: "Thunder Blue", value: "#1E3A8A" }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.9,
    reviews: 207,
    isFeatured: true,
    gender: "unisex",
    tags: ["running", "stability", "cushioned"]
  },
  {
    id: 10,
    name: "574 Core",
    brand: "New Balance",
    category: "Lifestyle",
    price: 5499,
    description: "Iconic silhouette combining style and comfort with ENCAP midsole technology.",
    features: [
      "Suede and mesh upper for support and breathability",
      "ENCAP midsole technology for support and durability",
      "EVA foam midsole for cushioning",
      "Rubber outsole for traction",
      "Padded collar and tongue"
    ],
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1480&auto=format&fit=crop"
    ],
    colors: [
      { name: "Navy", value: "#1E3A8A" },
      { name: "Grey", value: "#6B7280" },
      { name: "Burgundy", value: "#9F1239" }
    ],
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.4,
    reviews: 98,
    isPopular: true,
    gender: "unisex",
    tags: ["classic", "lifestyle", "retro"]
  },
  {
    id: 11,
    name: "Stan Smith",
    brand: "Adidas",
    category: "Lifestyle",
    price: 6499,
    description: "The iconic tennis-inspired sneaker with clean lines and classic style.",
    features: [
      "Full grain leather upper",
      "Perforated 3-Stripes",
      "Rubber cupsole",
      "OrthoLite sockliner",
      "Synthetic leather lining"
    ],
    images: [
      "https://images.unsplash.com/photo-1543508282-5c1f427f023f?q=80&w=1415&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1431&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1374&auto=format&fit=crop"
    ],
    colors: [
      { name: "White/Green", value: "#FFFFFF" },
      { name: "White/Navy", value: "#FFFFFF" },
      { name: "White/Black", value: "#FFFFFF" }
    ],
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    rating: 4.5,
    reviews: 326,
    isPopular: true,
    gender: "unisex",
    tags: ["classic", "tennis", "casual"]
  },
  {
    id: 12,
    name: "Fresh Foam 1080v11",
    brand: "New Balance",
    category: "Running",
    price: 9999,
    description: "Premium cushioned running shoes for maximum comfort on long distances.",
    features: [
      "Engineered Hypoknit upper",
      "Fresh Foam X midsole",
      "Ultra Heel design hugs the back of the foot",
      "Blown rubber outsole",
      "Bootie construction for a snug fit"
    ],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1379&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=1476&auto=format&fit=crop"
    ],
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" },
      { name: "Light Blue", value: "#93C5FD" }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.8,
    reviews: 183,
    isFeatured: true,
    gender: "unisex",
    tags: ["running", "cushioned", "comfort"]
  }
];

// Add more products to reach 70+
// Generate additional products based on the templates above
const generateAdditionalProducts = (): Product[] => {
  const additionalProducts: Product[] = [];
  
  // Clone and modify existing products to create more variety
  for (let i = 13; i <= 72; i++) {
    const templateProduct = products[i % 12]; // Use existing products as templates
    
    // Create variations
    const newProduct: Product = {
      ...structuredClone(templateProduct),
      id: i,
      name: `${templateProduct.name} ${['Elite', 'Pro', 'Plus', 'X', 'Ultra', 'Max', 'Classic', 'Lite'][i % 8]}`,
      price: templateProduct.price + (Math.floor(Math.random() * 10) - 5) * 100, // Slight price variations
      isNew: i % 7 === 0,
      isOnSale: i % 5 === 0,
      isFeatured: i % 10 === 0,
      isPopular: i % 8 === 0,
    };
    
    // Add some color variations
    if (i % 3 === 0) {
      newProduct.colors.push({ name: "Teal", value: "#14B8A6" });
    }
    
    // Add to collection
    additionalProducts.push(newProduct);
  }
  
  return additionalProducts;
};

// Combine original products with additional ones
export const allProducts: Product[] = [...products, ...generateAdditionalProducts()];

// Export categories for filtering
export const categories = [...new Set(allProducts.map(product => product.category))];

// Export brands for filtering
export const brands = [...new Set(allProducts.map(product => product.brand))];
