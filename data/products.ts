export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  gallery: string[];
}

export const PRODUCTS: Product[] = [
  // -------------------- NECKLACES --------------------
  {
    id: 1,
    name: "Tiffany Titan by Pharrell Williams",
    description: "Necklace in rose gold with diamonds — bold, contemporary, and elegant.",
    price: "£55,500",
    category: "necklaces",
    image: "/images/necklace1.jpg",
    gallery: [
      "/images/necklace1.jpg",
      "/images/necklace1_detail1.jpg",
      "/images/necklace1_detail2.jpg",
    ],
  },
  {
    id: 2,
    name: "Elsa Peretti®",
    description: "Starfish necklace in yellow gold with pavé diamonds, radiating natural beauty.",
    price: "£88,500",
    category: "necklaces",
    image: "/images/necklace2.jpg",
    gallery: [
      "/images/necklace2.jpg",
      "/images/necklace2_detail1.jpg",
      "/images/necklace2_detail2.jpg",
    ],
  },
  {
    id: 3,
    name: "Tiffany & Co. Schlumberger® ",
    description: "Bird on a Rock Pendant in yellow gold and platinum with a stunning green gemstone centerpiece.",
    price: "£127,500",
    category: "necklaces",
    image: "/images/necklace3.jpg",
    gallery: [
      "/images/necklace3.jpg",
      "/images/necklace3_detail1.jpg",
      "/images/necklace3_detail2.jpg",
    ],
  },

  // -------------------- EARRINGS --------------------
  {
    id: 4,
    name: "Sixteen Stone by Tiffany",
    description: "Hoop Earrings in Platinum and Yellow Gold with Diamonds",
    price: "£21,400",
    category: "earrings",
    image: "/images/earrings1.jpg",
    gallery: [
      "/images/earrings1.jpg",
      "/images/earrings1_detail1.jpg",
      "/images/earrings1_detail2.jpg",
    ],
  },
  {
    id: 5,
    name: "Tiffany Victoria® ",
    description: "Diamond Vine Earrings in 18k Rose Gold",
    price: "£9,775",
    category: "earrings",
    image: "/images/earrings2.jpg",
    gallery: [
      "/images/earrings2.jpg",
      "/images/earrings2_detail1.jpg",
      "/images/earrings2_detail2.jpg",
    ],
  },
  {
    id: 6,
    name: "Tiffany Titan by Pharrell Williams",
    description: "Pearl Earrings in Yellow Gold with Diamonds",
    price: "£11,200",
    category: "earrings",
    image: "/images/earrings3.jpg",
    gallery: [
      "/images/earrings3.jpg",
      "/images/earrings3_detail1.jpg",
      "/images/earrings3_detail2.jpg",
    ],
  },

  // -------------------- RINGS --------------------
  {
    id: 7,
    name: "Tiffany Victoria®",
    description: "Vine Ring in Platinum with a Tanzanite and Diamonds",
    price: "£18,500",
    category: "rings",
    image: "/images/ring1.jpg",
    gallery: [
      "/images/ring1.jpg",
      "/images/ring1_detail1.jpg",
      "/images/ring1_detail2.jpg",
    ],
  },
  {
    id: 8,
    name: "Apollo by Tiffany",
    description: "Ring in yellow gold and platinum with diamonds — a statement of luminous beauty.",
    price: "£41,800",
    category: "rings",
    image: "/images/ring2.jpg",
    gallery: [
      "/images/ring2.jpg",
      "/images/ring2_detail1.jpg",  
      "/images/ring2_detail2.jpg",
    ],
  },
  {
    id: 9,
    name: "Bird on a Rock by Tiffany",
    description: "Lovebirds ring in platinum and gold with diamonds, romantic and radiant.",
    price: "£32,200",
    category: "rings",
    image: "/images/ring3.jpg",
    gallery: [
      "/images/ring3.jpg",
      "/images/ring3_detail1.jpg",
      "/images/ring3_detail2.jpg",
    ],
  },

  // -------------------- BRACELETS --------------------
  {
    id: 10,
    name: "Tiffany HardWear Pearl Bracelet",
    description: "Pearl bracelet in silver, 7–8 mm pearls, showcasing refined modern elegance.",
    price: "£1,375",
    category: "bracelets",
    image: "/images/bracelet1.jpg",
    gallery: [
      "/images/bracelet1.jpg",
      "/images/bracelet1_detail1.jpg",
      "/images/bracelet1_detail2.jpg",
    ],
  },
  {
    id: 11,
    name: "Return to Tiffany™ Heart Tag Bead Bracelet",
    description: "Classic Tiffany Blue® heart tag bracelet in sterling silver.",
    price: "£275",
    category: "bracelets",
    image: "/images/bracelet2.jpg",
    gallery: [
      "/images/bracelet2.jpg",
      "/images/bracelet2_detail1.jpg",
      "/images/bracelet2_detail2.jpg",
    ],
  },
  {
    id: 12,
    name: "Sixteen Stone by Tiffany",
    description: "Bangle in Platinum with Diamonds",
    price: "£52,000",
    category: "bracelets",
    image: "/images/bracelet3.jpg",
    gallery: [
      "/images/bracelet3.jpg",
      "/images/bracelet3_detail1.jpg",
      "/images/bracelet3_detail2.jpg",
    ],
  },
];
