export type ServiceCategory = "All" | "General" | "Cosmetic" | "Orthodontics" | "Surgery" | "Pediatric";

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  category: ServiceCategory;
  price: string;
  priceNumber: number;
  duration: string;
  sessions: string;
  results: string;
  about: string;
  highlights: string[];
  image: string;
  iconName: string;
  isPopular?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  department: string;
  experience: string;
  education: string;
  rating: number;
  reviewsCount: number;
  image: string;
  bio: string;
  specialties: string[];
  availableDays: string[];
  isAvailableToday?: boolean;
}

export interface Review {
  id: string;
  patientName: string;
  avatar?: string;
  initials: string;
  treatment: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  doctorName?: string;
  beforeImage?: string;
  afterImage?: string;
  duration?: string;
}

export interface VideoTestimonial {
  id: string;
  patientName: string;
  treatment: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  isFeatured?: boolean;
  content: string[];
  tags: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  serviceId: string;
  serviceName: string;
  servicePrice: string;
  appointmentType: "In-Clinic Visit" | "Video Consultation";
  date: string; // e.g. "2024-05-22"
  displayDate: string; // e.g. "Wed, May 22, 2024"
  timeSlot: string; // e.g. "10:30 AM"
  notes?: string;
  status: "confirmed" | "completed" | "cancelled" | "rescheduled";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  allergies?: string;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  discount: string;
  code: string;
  validUntil: string;
  description: string;
  serviceCategory: string;
  badge: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  link?: string;
  type: "appointment" | "offer" | "system";
}
