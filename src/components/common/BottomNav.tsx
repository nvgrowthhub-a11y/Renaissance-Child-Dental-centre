import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, MessageSquare, Tag, User } from "lucide-react";

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Services", path: "/services", icon: Sparkles },
    { name: "Messages", path: "/messages", icon: MessageSquare },
    { name: "Offers", path: "/offers", icon: Tag },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(31,168,160,0.08)] border-t border-primary-container/10">
      <div className="h-16 px-4 max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/home"
              ? location.pathname === "/" || location.pathname === "/home"
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className="group relative flex flex-col items-center justify-center flex-1 h-full py-1 text-center min-w-[56px]"
            >
              <div className="relative flex items-center justify-center w-12 h-8 rounded-full mb-0.5">
                {/* Active Pill with teal glow */}
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary-mint to-primary-container shadow-[0_4px_14px_rgba(31,168,160,0.38)] transition-all duration-300 ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                />
                <Icon
                  className={`relative z-10 w-5 h-5 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-tertiary group-hover:text-primary"
                  }`}
                />
              </div>
              <span
                className={`text-[11px] leading-tight transition-colors ${
                  isActive
                    ? "font-bold text-primary"
                    : "font-medium text-tertiary group-hover:text-primary"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
