import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ToastContainer } from "./components/common/Toast";
import { AuthModal } from "./components/common/AuthModal";
import { BottomNav } from "./components/common/BottomNav";
import { Footer } from "./components/common/Footer";
import { FloatingActions } from "./components/common/FloatingActions";

// Pages
import { SplashPage } from "./pages/SplashPage";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { WhyUsPage } from "./pages/WhyUsPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { BookAppointmentPage } from "./pages/BookAppointmentPage";
import { BookingSuccessPage } from "./pages/BookingSuccessPage";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { OffersPage } from "./pages/OffersPage";
import { MessagesPage } from "./pages/MessagesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// App Layout Controller
function AppLayout() {
  const { pathname } = useLocation();
  const isSplash = pathname === "/";
  const isBookingSuccess = pathname === "/booking-success";

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-secondary-container selection:text-on-secondary-container">
      <ScrollToTop />
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<BookAppointmentPage />} />
          <Route path="/booking-success" element={<BookingSuccessPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Global Elements on non-splash pages */}
      {!isSplash && (
        <>
          <Footer />
          <BottomNav />
          <FloatingActions />
        </>
      )}

      {/* Global Modals & Notifications */}
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  );
}

export default App;
