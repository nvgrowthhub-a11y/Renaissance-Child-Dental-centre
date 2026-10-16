import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Appointment, Review, NotificationItem } from "../types";
import { INITIAL_REVIEWS } from "../data/reviews";

interface ToastState {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

interface AppContextType {
  // Auth
  user: User | null;
  login: (name: string, email: string, phone: string) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (apt: Omit<Appointment, "id" | "createdAt" | "status">) => Appointment;
  cancelAppointment: (id: string) => boolean;
  rescheduleAppointment: (id: string, newDate: string, newDisplayDate: string, newTime: string) => boolean;
  latestUpcomingAppointment: Appointment | null;

  // Favorites & Bookmarks
  favorites: string[];
  toggleFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;

  bookmarks: string[];
  toggleBookmark: (blogId: string) => void;
  isBookmarked: (blogId: string) => boolean;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date" | "verified" | "initials">) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationsAsRead: () => void;

  // Toast
  toasts: ToastState[];
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: number) => void;

  // Contact submissions
  saveContactSubmission: (submission: { name: string; phone: string; email: string; service: string; message: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample initial default appointment for rich showcase
const DEFAULT_APPOINTMENT: Appointment = {
  id: "SC-98421",
  patientName: "Alex Rivera",
  patientPhone: "08470077778",
  patientEmail: "alex.rivera@example.com",
  doctorId: "dr-emma-johnson",
  doctorName: "Dr. Emma Johnson",
  doctorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyH-rt7rzFPLnj_pbloc83_iuZD-x0KWnCHms-1lJqhlifisG1HWDqtizvnGBL6yiEQgyFvmNvPsQ3lhXWCLZDp9-PRFzZlQVmanrsEtUYF-KNT57o7WfOj2aRFAtWz4qdpAL3N29vlJJUcQfCUxy4z0xdOw_Izr3vFkDdQQCV7yZ0zeLMYt6e4EFFE3z7pEmVOf04j21xuB2Am0nhhRLQoxU8xme_-b-ymbZtp6678bpQsHs6ENORDQ",
  serviceId: "teeth-whitening",
  serviceName: "Teeth Whitening",
  servicePrice: "$150",
  appointmentType: "In-Clinic Visit",
  date: "2026-10-24",
  displayDate: "Sat, Oct 24, 2026",
  timeSlot: "10:30 AM",
  notes: "First time laser whitening patient.",
  status: "confirmed",
  createdAt: new Date().toISOString()
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("smilecare_user");
      return saved ? JSON.parse(saved) : {
        id: "usr-1",
        name: "Alex Rivera",
        email: "alex.rivera@example.com",
        phone: "+91 84700 77778",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHzLWKAbtJOQXTooSQOL0xL21LaLo5SW2SXPwgS2XaJGTDSfKMJEsWtIqoH0FPelbdRFT5ulmuZuC4E1LOT1ICQXpmyHLPyRyjZCHqp0ZYLiiVvA0e9g85xAWPBITff5m45MmcNM3_b6faLwv8gk7im2dJNeJQuaQ8fEOKeq9o-Rj5sfHmxG2_gPoeKa4ZSr9QXC_9dZCE2oBAzOPTNZ-t95cdocw9nPThfGkTg39_qMlhr7XtNt_jzQ",
        bloodGroup: "O+",
        emergencyContact: "08470077778",
        allergies: "None",
        createdAt: "2024-01-15"
      };
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem("smilecare_appointments");
      return saved ? JSON.parse(saved) : [DEFAULT_APPOINTMENT];
    } catch {
      return [DEFAULT_APPOINTMENT];
    }
  });

  // Favorites & Bookmarks
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("smilecare_favorites");
      return saved ? JSON.parse(saved) : ["teeth-whitening", "clear-aligners"];
    } catch {
      return ["teeth-whitening"];
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("smilecare_bookmarks");
      return saved ? JSON.parse(saved) : ["enamel-protection-guide"];
    } catch {
      return [];
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem("smilecare_reviews");
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "Appointment Confirmed",
      message: "Your Teeth Whitening session with Dr. Emma Johnson is scheduled for Sat, Oct 24 at 10:30 AM.",
      time: "2h ago",
      unread: true,
      link: "/appointments",
      type: "appointment"
    },
    {
      id: "notif-2",
      title: "Special Summer Offer",
      message: "Get $50 OFF on Laser Teeth Whitening this week with code WHITE50.",
      time: "1d ago",
      unread: true,
      link: "/offers",
      type: "offer"
    },
    {
      id: "notif-3",
      title: "SmileCare Care Tip",
      message: "New clinic guide published: Complete Enamel Protection in 2024.",
      time: "3d ago",
      unread: false,
      link: "/blog/enamel-protection-sensitive-teeth-guide",
      type: "system"
    }
  ]);

  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("smilecare_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("smilecare_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("smilecare_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("smilecare_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("smilecare_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("smilecare_reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Toast actions
  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth actions
  const login = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHzLWKAbtJOQXTooSQOL0xL21LaLo5SW2SXPwgS2XaJGTDSfKMJEsWtIqoH0FPelbdRFT5ulmuZuC4E1LOT1ICQXpmyHLPyRyjZCHqp0ZYLiiVvA0e9g85xAWPBITff5m45MmcNM3_b6faLwv8gk7im2dJNeJQuaQ8fEOKeq9o-Rj5sfHmxG2_gPoeKa4ZSr9QXC_9dZCE2oBAzOPTNZ-t95cdocw9nPThfGkTg39_qMlhr7XtNt_jzQ",
      bloodGroup: "A+",
      emergencyContact: "08470077778",
      createdAt: new Date().toISOString().split("T")[0]
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    showToast("You have been signed out.", "info");
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    showToast("Profile updated successfully!");
  };

  // Appointment actions
  const bookAppointment = (aptData: Omit<Appointment, "id" | "createdAt" | "status">) => {
    const newAppointment: Appointment = {
      ...aptData,
      id: `SC-${Math.floor(10000 + Math.random() * 90000)}`,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast("Appointment booked successfully!", "success");
    return newAppointment;
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" } : apt))
    );
    showToast("Appointment has been cancelled.", "info");
    return true;
  };

  const rescheduleAppointment = (id: string, newDate: string, newDisplayDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              date: newDate,
              displayDate: newDisplayDate,
              timeSlot: newTime,
              status: "rescheduled"
            }
          : apt
      )
    );
    showToast("Appointment rescheduled successfully!");
    return true;
  };

  const latestUpcomingAppointment =
    appointments.find((apt) => apt.status === "confirmed" || apt.status === "rescheduled") || null;

  // Favorites
  const toggleFavorite = (serviceId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(serviceId);
      const next = exists ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      showToast(exists ? "Removed from favorites" : "Saved to favorites!");
      return next;
    });
  };

  const isFavorite = (serviceId: string) => favorites.includes(serviceId);

  // Bookmarks
  const toggleBookmark = (blogId: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(blogId);
      const next = exists ? prev.filter((id) => id !== blogId) : [...prev, blogId];
      showToast(exists ? "Removed bookmark" : "Article bookmarked!");
      return next;
    });
  };

  const isBookmarked = (blogId: string) => bookmarks.includes(blogId);

  // Reviews
  const addReview = (reviewData: Omit<Review, "id" | "date" | "verified" | "initials">) => {
    const initials = reviewData.patientName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "PT";

    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: "Just now",
      verified: true,
      initials
    };

    setReviews((prev) => [newRev, ...prev]);
    showToast("Thank you for sharing your feedback!");
  };

  // Notifications
  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Contact form storage
  const saveContactSubmission = (submission: { name: string; phone: string; email: string; service: string; message: string }) => {
    try {
      const existing = JSON.parse(localStorage.getItem("smilecare_contact_messages") || "[]");
      existing.unshift({ ...submission, id: Date.now(), date: new Date().toISOString() });
      localStorage.setItem("smilecare_contact_messages", JSON.stringify(existing));
    } catch {
      // ignore
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        appointments,
        bookAppointment,
        cancelAppointment,
        rescheduleAppointment,
        latestUpcomingAppointment,
        favorites,
        toggleFavorite,
        isFavorite,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        reviews,
        addReview,
        notifications,
        unreadNotificationsCount,
        markNotificationsAsRead,
        toasts,
        showToast,
        removeToast,
        saveContactSubmission
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
