import gaming from "@/assets/laptop-gaming.jpg";
import ultrabook from "@/assets/laptop-ultrabook.jpg";
import business from "@/assets/laptop-business.jpg";
import premium from "@/assets/laptop-premium.jpg";

export type Category = "Gaming" | "Ultrabooks" | "Budget" | "Business";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number; // rupees
  mrp: number;
  shortSpec: string;
  image: string;
  gallery: string[];
  rating: number;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
    battery: string;
    weight: string;
    os: string;
  };
};

export const products: Product[] = [
  {
    id: "asus-rog-strix-g16",
    name: "ASUS ROG Strix G16 (2024)",
    brand: "ASUS",
    category: "Gaming",
    price: 164990,
    mrp: 189990,
    shortSpec: 'Core i9-14900HX · 16GB · 1TB SSD · RTX 4070 · 16" 240Hz',
    image: gaming,
    gallery: [gaming, premium, business],
    rating: 4.7,
    specs: {
      cpu: "Intel Core i9-14900HX (24 cores, up to 5.8GHz)",
      ram: "16GB DDR5 4800MHz (expandable to 32GB)",
      storage: "1TB PCIe 4.0 NVMe SSD",
      display: '16" QHD+ (2560 x 1600) 240Hz IPS, 100% DCI-P3',
      graphics: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      battery: "90WHr, up to 6 hours mixed use, 240W adapter",
      weight: "2.50 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "apple-macbook-air-m3",
    name: 'Apple MacBook Air 13" M3',
    brand: "Apple",
    category: "Ultrabooks",
    price: 114900,
    mrp: 124900,
    shortSpec: 'Apple M3 · 16GB · 512GB SSD · 13.6" Liquid Retina',
    image: ultrabook,
    gallery: [ultrabook, premium],
    rating: 4.9,
    specs: {
      cpu: "Apple M3 chip (8-core CPU, 10-core GPU)",
      ram: "16GB unified memory",
      storage: "512GB SSD",
      display: '13.6" Liquid Retina (2560 x 1664), 500 nits',
      graphics: "10-core Apple GPU",
      battery: "52.6WHr, up to 18 hours video playback",
      weight: "1.24 kg",
      os: "macOS Sonoma",
    },
  },
  {
    id: "dell-xps-14-9440",
    name: "Dell XPS 14 9440",
    brand: "Dell",
    category: "Ultrabooks",
    price: 179990,
    mrp: 199990,
    shortSpec: 'Core Ultra 7 155H · 16GB · 1TB SSD · 14.5" OLED Touch',
    image: business,
    gallery: [business, gaming],
    rating: 4.6,
    specs: {
      cpu: "Intel Core Ultra 7 155H (16 cores, up to 4.8GHz)",
      ram: "16GB LPDDR5x 6400MHz",
      storage: "1TB PCIe 4.0 NVMe SSD",
      display: '14.5" 3.2K (3200 x 2000) OLED Touch, 120Hz',
      graphics: "NVIDIA GeForce RTX 4050 6GB",
      battery: "69.5WHr, up to 12 hours, 100W USB-C adapter",
      weight: "1.68 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "lenovo-thinkpad-e14-g6",
    name: "Lenovo ThinkPad E14 Gen 6",
    brand: "Lenovo",
    category: "Business",
    price: 78990,
    mrp: 92990,
    shortSpec: 'Core Ultra 5 125U · 16GB · 512GB SSD · 14" WUXGA',
    image: business,
    gallery: [business, gaming],
    rating: 4.4,
    specs: {
      cpu: "Intel Core Ultra 5 125U (12 cores, up to 4.3GHz)",
      ram: "16GB DDR5 5600MHz",
      storage: "512GB PCIe 4.0 NVMe SSD",
      display: '14" WUXGA (1920 x 1200) IPS, 300 nits, anti-glare',
      graphics: "Intel Graphics (integrated)",
      battery: "57WHr, up to 11 hours, Rapid Charge",
      weight: "1.41 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "hp-pavilion-plus-14",
    name: "HP Pavilion Plus 14",
    brand: "HP",
    category: "Ultrabooks",
    price: 89990,
    mrp: 104990,
    shortSpec: 'Ryzen 7 8840U · 16GB · 1TB SSD · 14" 2.8K OLED',
    image: gaming,
    gallery: [gaming, business],
    rating: 4.5,
    specs: {
      cpu: "AMD Ryzen 7 8840U (8 cores, up to 5.1GHz)",
      ram: "16GB LPDDR5 6400MHz",
      storage: "1TB PCIe 4.0 NVMe SSD",
      display: '14" 2.8K (2880 x 1800) OLED, 120Hz, 400 nits',
      graphics: "AMD Radeon 780M (integrated)",
      battery: "68WHr, up to 13 hours, 65W fast charge",
      weight: "1.39 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "acer-aspire-lite-15",
    name: "Acer Aspire Lite 15",
    brand: "Acer",
    category: "Budget",
    price: 36990,
    mrp: 48999,
    shortSpec: 'Core i3-1215U · 8GB · 512GB SSD · 15.6" FHD',
    image: gaming,
    gallery: [gaming, business],
    rating: 4.1,
    specs: {
      cpu: "Intel Core i3-1215U (6 cores, up to 4.4GHz)",
      ram: "8GB DDR4 3200MHz (expandable to 16GB)",
      storage: "512GB PCIe NVMe SSD",
      display: '15.6" Full HD (1920 x 1080) IPS, 250 nits',
      graphics: "Intel UHD Graphics",
      battery: "50WHr, up to 8 hours",
      weight: "1.59 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "lenovo-loq-15-rtx4060",
    name: "Lenovo LOQ 15 RTX 4060",
    brand: "Lenovo",
    category: "Gaming",
    price: 99990,
    mrp: 119990,
    shortSpec: 'Core i7-13650HX · 16GB · 512GB SSD · RTX 4060 · 144Hz',
    image: gaming,
    gallery: [gaming, business],
    rating: 4.5,
    specs: {
      cpu: "Intel Core i7-13650HX (14 cores, up to 4.9GHz)",
      ram: "16GB DDR5 4800MHz",
      storage: "512GB PCIe 4.0 NVMe SSD",
      display: '15.6" Full HD (1920 x 1080) IPS, 144Hz, 350 nits',
      graphics: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      battery: "60WHr, up to 5 hours mixed use, 170W adapter",
      weight: "2.38 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "hp-250-g9-essential",
    name: "HP 250 G9 Essential",
    brand: "HP",
    category: "Budget",
    price: 42990,
    mrp: 54999,
    shortSpec: 'Core i5-1235U · 8GB · 512GB SSD · 15.6" FHD',
    image: business,
    gallery: [business, gaming],
    rating: 4.2,
    specs: {
      cpu: "Intel Core i5-1235U (10 cores, up to 4.4GHz)",
      ram: "8GB DDR4 3200MHz (expandable to 32GB)",
      storage: "512GB PCIe NVMe SSD",
      display: '15.6" Full HD (1920 x 1080) SVA, anti-glare',
      graphics: "Intel Iris Xe Graphics",
      battery: "41WHr, up to 7.5 hours",
      weight: "1.74 kg",
      os: "Windows 11 Home",
    },
  },
];

export const categories: { name: Category; blurb: string; image: string }[] = [
  { name: "Gaming", blurb: "RTX power, high refresh", image: gaming },
  { name: "Ultrabooks", blurb: "Thin, light, all-day", image: ultrabook },
  { name: "Budget", blurb: "Best value under ₹50k", image: gaming },
  { name: "Business", blurb: "Built for work", image: business },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatINR = (rupees: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
