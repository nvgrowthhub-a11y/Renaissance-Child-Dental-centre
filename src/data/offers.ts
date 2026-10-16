import { Offer } from "../types";

export const OFFERS_DATA: Offer[] = [
  {
    id: "offer-free-consult",
    title: "Complimentary 3D Dental Scan & Consultation",
    discount: "100% OFF",
    code: "SMILEFREE",
    validUntil: "Valid this month",
    description: "Full digital 3D oral scan, bite analysis, and personalized treatment roadmap with our senior specialist (Value: $120).",
    serviceCategory: "All",
    badge: "Most Popular"
  },
  {
    id: "offer-whitening",
    title: "Summer Radiance Laser Whitening",
    discount: "$50 OFF",
    code: "WHITE50",
    validUntil: "Limited time",
    description: "Get in-clinic laser whitening for just $100 (Regular: $150). Includes complimentary remineralization mineral booster.",
    serviceCategory: "Cosmetic",
    badge: "Special Deal"
  },
  {
    id: "offer-aligners",
    title: "Clear Aligner Package + Free Whitening",
    discount: "$300 OFF",
    code: "CLEAR300",
    validUntil: "First 50 Patients",
    description: "Save $300 on comprehensive invisible aligner treatments plus receive a free post-treatment teeth whitening session.",
    serviceCategory: "Orthodontics",
    badge: "Best Value"
  },
  {
    id: "offer-family",
    title: "Family Dental Wellness Shield",
    discount: "20% OFF",
    code: "FAMILY20",
    validUntil: "Ongoing",
    description: "Book cleanings and checkups for 2 or more family members and receive 20% off all preventive treatments.",
    serviceCategory: "Pediatric & General",
    badge: "Family Pack"
  }
];
