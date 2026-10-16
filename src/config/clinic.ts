export interface ClinicHours {
  day: string;
  open: string;
  close: string;
  isEmergencyOnly?: boolean;
}

export const CLINIC_CONFIG = {
  name: "SmileCare",
  fullName: "SmileCare Dental & Orthodontic Clinic",
  tagline: "Healthy Smile, Happy Life",
  description: "Advanced dental care and orthodontic treatments with gentle precision, certified specialists, and complete care transparency.",
  
  // Direct Contacts
  phone: "08470077778",
  phoneFormatted: "+91 84700 77778",
  phoneLink: "tel:08470077778",
  
  tollFree: "1800 4123 0923",
  tollFreeLink: "tel:180041230923",
  
  whatsapp: "08470077778",
  whatsappLink: "https://wa.me/918470077778?text=Hello%20SmileCare%2C%20I%20want%20to%20book%20an%20appointment",
  
  email: "info@smilecare.com",
  emailLink: "mailto:info@smilecare.com",
  careEmail: "care@smilecare.com",
  
  // Location
  address: "742 Evergreen Terrace, Suite 300, Medical Arts Pavilion, San Francisco, CA 94102",
  mapUrl: "https://maps.app.goo.gl/bxXdSkQpnSMLRGr77",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086438096238!2d-122.420679!3d37.774929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjciTiAxMjLCsDI1JzE0LjQiVw!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus",
  
  // Working Hours
  hours: [
    { day: "Monday", open: "09:00", close: "20:00" },
    { day: "Tuesday", open: "09:00", close: "20:00" },
    { day: "Wednesday", open: "09:00", close: "20:00" },
    { day: "Thursday", open: "09:00", close: "20:00" },
    { day: "Friday", open: "09:00", close: "20:00" },
    { day: "Saturday", open: "09:00", close: "20:00" },
    { day: "Sunday", open: "10:00", close: "16:00", isEmergencyOnly: true }
  ] as ClinicHours[],

  // Social Links
  socialLinks: [
    { name: "Instagram", url: "https://instagram.com", icon: "camera_alt" },
    { name: "Facebook", url: "https://facebook.com", icon: "thumb_up" },
    { name: "YouTube", url: "https://youtube.com", icon: "smart_display" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "share" }
  ],

  // Logos & Visual Assets from Stitch designs
  logoUrl: "https://lh3.googleusercontent.com/aida/AEtjO1VPiRxsuxYYij1HbIaw2MCUZ0QOhk58zzsdlwfLot7Hf4ObYzy5ANlhzOPjp4hpLhKag0w3erulZQlAEeTHL9jIuDln5bSCQE1mAp1xpY4gCIQQuPtuJUDveh_chYUhXv06q2RIK8Nu3TJwarZkKQEqkG4oVz_h9Gu59D2FV2opeO4YmKoGOeCG-2z3RGX-ZNY9at2sMIsADh705Cno6SCRnAFPLkRuS8j0JebrAvkV1Sw73rooKvxwAKE5",
  heroTooth3D: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrUYzT8vOjQa1xDAjnK2wIz2A4R1dtgiPBTToYdZPV3UqJLDfRi10cQFTJWpbS6rg2FpDWHMwr86WSnH9FY3e2qwHzJGy6HAA2jbVnYxslCYqoTBxfkKbn2xS4mZkKrzZikP1MtRKxZwFVT95VKKpx-lu8-kBKqH1VwF6xOr4-38umtYHItx547fXT5dW7UvrEeKCx6SS1lqnkQt41GY2VWse3V2vWXI8A3ePE6h8XhWFbZf4ESDQmTg",
  whiteningTooth3D: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpc804NWYJDx9YGiaxcCQyiwdA_eac8BtJHPinp146dpg05FNsYg6wwZaJUzbLVMwpP7LeTBXdqF_UmwOE36RSzBnsCdj6r4nq57k5OWPHFMhj-KP1crR-8h4tX5TeGqI5mMc3v6cvb3R-auqEZMAJhIJfK1w0UkdxVnsypQgjjJIcsbvAw5Y8zh73P0JxdPm41DfvJTfOus85rK3-zZ9Ilwe6x6APgMLgCRSH50Mf8fginQlrHceS_Q",
  clinicInterior: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZEBFWyg-J8ziS3WuIcfbtD57Eks6WIS07v6ncVQNTpETNvZCyzijCteJ_YyfvsWEihh0y5bPwUzXBBQclymLx5aH5PGxFKPcDKLJUB4WlZWxYTGJK0EsjJmU3efrHr9grzGpBvfCoXPzwwDBhLGkjlTK1_0Tq8jmG_q_F02JcwKL9oKkA9s5Fc9VPYjUjxSOALVTvfpX8dp-N1PkhMQuowXcx37Is0aUuJpLAgRkUfCz056B07HwL4Q"
};

// Check if clinic is open right now
export function isClinicOpenNow(): { isOpen: boolean; message: string; isEmergencyOnly: boolean } {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[now.getDay()];
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHours * 60 + currentMinutes;

  const todayConfig = CLINIC_CONFIG.hours.find(h => h.day === currentDayName);
  if (!todayConfig) {
    return { isOpen: false, message: "Closed Today", isEmergencyOnly: false };
  }

  const [openH, openM] = todayConfig.open.split(":").map(Number);
  const [closeH, closeM] = todayConfig.close.split(":").map(Number);
  const openTime = openH * 60 + openM;
  const closeTime = closeH * 60 + closeM;

  if (currentTime >= openTime && currentTime < closeTime) {
    if (todayConfig.isEmergencyOnly) {
      return { isOpen: true, message: "Open Now (Emergency Only)", isEmergencyOnly: true };
    }
    return { isOpen: true, message: "Open Now (Closes at 8:00 PM)", isEmergencyOnly: false };
  } else {
    return { isOpen: false, message: "Closed Now (Opens at 9:00 AM)", isEmergencyOnly: false };
  }
}
