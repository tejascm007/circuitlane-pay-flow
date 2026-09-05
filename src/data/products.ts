import asusRogStrix from "@/assets/laptop-asus-rog-strix-g16.jpg";
import acerNitro from "@/assets/laptop-acer-nitro-v15.jpg";
import hpVictus from "@/assets/laptop-hp-victus.jpg";
import macbookAir from "@/assets/laptop-apple-macbook-air-15.jpg";
import macbookPro from "@/assets/laptop-apple-macbook-pro-14.jpg";
import hpOmnibook from "@/assets/laptop-hp-omnibook-x-flip.jpg";
import lenovoV14 from "@/assets/laptop-lenovo-v14.jpg";
import lenovoV15 from "@/assets/laptop-lenovo-v15-g4.jpg";

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
    name: "ASUS ROG Strix G16 (2025)",
    brand: "ASUS",
    category: "Gaming",
    price: 154990,
    mrp: 179990,
    shortSpec: 'Ryzen 9 8940HX · 16GB · 1TB SSD · RTX 5070 Ti · 16" 165Hz',
    image: asusRogStrix,
    gallery: [asusRogStrix],
    rating: 4.7,
    specs: {
      cpu: "AMD Ryzen 9 8940HX (16 cores, up to 5.4GHz)",
      ram: "16GB DDR5 5600MHz (expandable to 32GB)",
      storage: "1TB PCIe 4.0 NVMe SSD",
      display: '16" QHD+ (2560 x 1600) 165Hz IPS, 100% DCI-P3',
      graphics: "NVIDIA GeForce RTX 5070 Ti 8GB GDDR7",
      battery: "90WHr, up to 6 hours mixed use, 240W adapter",
      weight: "2.45 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "apple-macbook-air-15-m4",
    name: 'Apple MacBook Air 15" M4',
    brand: "Apple",
    category: "Ultrabooks",
    price: 134900,
    mrp: 134900,
    shortSpec: 'Apple M4 · 16GB · 512GB SSD · 15.3" Liquid Retina',
    image: macbookAir,
    gallery: [macbookAir],
    rating: 4.9,
    specs: {
      cpu: "Apple M4 chip (10-core CPU, 10-core GPU)",
      ram: "16GB unified memory",
      storage: "512GB SSD",
      display: '15.3" Liquid Retina (2880 x 1864), 500 nits',
      graphics: "10-core Apple GPU",
      battery: "66.5WHr, up to 18 hours video playback",
      weight: "1.51 kg",
      os: "macOS Sequoia",
    },
  },
  {
    id: "apple-macbook-pro-14-m4pro",
    name: 'Apple MacBook Pro 14" M4 Pro',
    brand: "Apple",
    category: "Ultrabooks",
    price: 199900,
    mrp: 199900,
    shortSpec: 'Apple M4 Pro · 24GB · 512GB SSD · 14.2" Liquid Retina XDR',
    image: macbookPro,
    gallery: [macbookPro],
    rating: 4.9,
    specs: {
      cpu: "Apple M4 Pro chip (12-core CPU, 16-core GPU)",
      ram: "24GB unified memory",
      storage: "512GB SSD",
      display: '14.2" Liquid Retina XDR (3024 x 1964), 1000 nits sustained',
      graphics: "16-core Apple GPU",
      battery: "72.4WHr, up to 18 hours video playback",
      weight: "1.55 kg",
      os: "macOS Sequoia",
    },
  },
  {
    id: "lenovo-v14-i3",
    name: "Lenovo V14 G4",
    brand: "Lenovo",
    category: "Business",
    price: 32990,
    mrp: 39990,
    shortSpec: 'Core i3-1315U (13th Gen) · 8GB · 512GB SSD · 14" FHD',
    image: lenovoV14,
    gallery: [lenovoV14],
    rating: 4.2,
    specs: {
      cpu: "Intel Core i3-1315U (6 cores, up to 4.5GHz)",
      ram: "8GB DDR4 3200MHz (expandable to 16GB)",
      storage: "512GB PCIe NVMe SSD",
      display: '14" Full HD (1920 x 1080) IPS, anti-glare',
      graphics: "Intel UHD Graphics",
      battery: "45WHr, up to 9 hours",
      weight: "1.48 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "hp-victus-15",
    name: "HP Victus 15",
    brand: "HP",
    category: "Gaming",
    price: 66990,
    mrp: 74990,
    shortSpec: 'Ryzen 7 7445HS · 16GB · 512GB SSD · RTX 4050 · 144Hz',
    image: hpVictus,
    gallery: [hpVictus],
    rating: 4.5,
    specs: {
      cpu: "AMD Ryzen 7 7445HS (8 cores, up to 4.5GHz)",
      ram: "16GB DDR5 4800MHz",
      storage: "512GB PCIe 4.0 NVMe SSD",
      display: '15.6" Full HD (1920 x 1080) IPS, 144Hz',
      graphics: "NVIDIA GeForce RTX 4050 6GB GDDR6",
      battery: "70WHr, up to 8 hours, HP Fast Charge",
      weight: "2.29 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "acer-nitro-v-15",
    name: "Acer Nitro V 15",
    brand: "Acer",
    category: "Gaming",
    price: 57990,
    mrp: 64990,
    shortSpec: 'Ryzen 5 7535HS · 16GB · 512GB SSD · RTX 2050 · 15.6" FHD',
    image: acerNitro,
    gallery: [acerNitro],
    rating: 4.3,
    specs: {
      cpu: "AMD Ryzen 5 7535HS (6 cores, up to 4.55GHz)",
      ram: "16GB DDR5 4800MHz (expandable to 32GB)",
      storage: "512GB PCIe 4.0 NVMe SSD",
      display: '15.6" Full HD (1920 x 1080) IPS, 144Hz',
      graphics: "NVIDIA GeForce RTX 2050 4GB GDDR6",
      battery: "57.5WHr, up to 7 hours mixed use",
      weight: "2.10 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "hp-omnibook-x-flip",
    name: "HP OmniBook X Flip 14",
    brand: "HP",
    category: "Ultrabooks",
    price: 94990,
    mrp: 109990,
    shortSpec: "Core Ultra 5 226V · 16GB · 1TB SSD · 14\" 3K OLED Touch",
    image: hpOmnibook,
    gallery: [hpOmnibook],
    rating: 4.6,
    specs: {
      cpu: "Intel Core Ultra 5 226V (8 cores, up to 4.9GHz, 40 TOPS NPU)",
      ram: "16GB LPDDR5x 8533MHz",
      storage: "1TB PCIe 4.0 NVMe SSD",
      display: '14" 3K (2880 x 1800) OLED Touch, 400 nits, convertible 2-in-1',
      graphics: "Intel Arc Graphics (integrated)",
      battery: "68.6WHr, up to 17 hours, includes active pen",
      weight: "1.55 kg",
      os: "Windows 11 Home (Copilot+ PC)",
    },
  },
  {
    id: "lenovo-v15-g4",
    name: "Lenovo V15 G4",
    brand: "Lenovo",
    category: "Budget",
    price: 24990,
    mrp: 29990,
    shortSpec: "Athlon Silver 7120U · 8GB · 512GB SSD · 15.6\" FHD",
    image: lenovoV15,
    gallery: [lenovoV15],
    rating: 4.0,
    specs: {
      cpu: "AMD Athlon Silver 7120U (2 cores, up to 2.8GHz)",
      ram: "8GB DDR4 3200MHz (expandable to 16GB)",
      storage: "512GB PCIe NVMe SSD",
      display: '15.6" Full HD (1920 x 1080) TN, anti-glare',
      graphics: "AMD Radeon Graphics (integrated)",
      battery: "38WHr, up to 6 hours",
      weight: "1.66 kg",
      os: "Windows 11 Home",
    },
  },
];

export const categories: { name: Category; blurb: string; image: string }[] = [
  { name: "Gaming", blurb: "RTX power, high refresh", image: asusRogStrix },
  { name: "Ultrabooks", blurb: "Thin, light, all-day", image: macbookAir },
  { name: "Budget", blurb: "Best value under ₹30k", image: lenovoV15 },
  { name: "Business", blurb: "Built for work", image: lenovoV14 },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatINR = (rupees: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
