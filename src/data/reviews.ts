import { Review, VideoTestimonial } from "../types";

export const RATING_STATS = {
  overall: 4.9,
  totalReviews: 328,
  breakdown: [
    { stars: 5, percentage: 92, count: 302 },
    { stars: 4, percentage: 6, count: 20 },
    { stars: 3, percentage: 1.5, count: 4 },
    { stars: 2, percentage: 0.3, count: 1 },
    { stars: 1, percentage: 0.2, count: 1 },
  ]
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    patientName: "Jessica Miller",
    initials: "JM",
    treatment: "Clear Aligners & Laser Whitening",
    rating: 5,
    date: "2 days ago",
    comment: "I used to hide my smile in every family photo. After 5 months with SmileCare's 3D custom aligners, my confidence is sky-high. Genuinely 100% painless throughout!",
    verified: true,
    doctorName: "Dr. Emma Johnson",
    duration: "5 Months",
    beforeImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmqy3ZtJfBMRnv9cd2jhvcHLq8p16jTwplDpIJLgYiysdnKOM6K10P3Zpg2_owyjRaBoQJ9QCw48P5bZSMdrE2Bj2W301D76z6ZdkBAE_iARTLfi-lqda5rPOmC5wC6lu7hFrpDy1YxpymSAm7crtvLM9K2tduuxMYcn5F9xZBuSKnvuNCpTcoL_24J7nZROH4UYmCoafFt62T9fmQqCh6dxTogrrNFIRpCMFNeHXkwS53ePQiMRLJqw",
    afterImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJLL53Vt43l_EqeYQyfzfgUf_jw7AVz1NCTeRjpyR0WUwxy50ir5Sj1y-HoCtLYKYyxZMmQcwPsqQhawMF0lu_TjmgyzTNuUjsPv-fg1EzcawY7lH5ARnqp4nPOWfC3l_zTTxOZR-Dm2DpLawrlV-XLWGhhMwAjUzyv8sUdUAaVq4p7D1v5pcBC8RDsiq6YhuRUWKd1NVFt36ZlYJsoWoqOgtlPqcQrYRQk5cUsaguy0NvVH8QVpjTNw"
  },
  {
    id: "rev-2",
    patientName: "David Thornton",
    initials: "DT",
    treatment: "Dental Implants",
    rating: 5,
    date: "1 week ago",
    comment: "Lost a molar during a sports injury. Dr. Sophia Chen completed the implant surgery so swiftly and gently I barely realized it was over. Feels and chews exactly like my original tooth.",
    verified: true,
    doctorName: "Dr. Sophia Chen"
  },
  {
    id: "rev-3",
    patientName: "Maya & Leo Patel",
    initials: "MP",
    treatment: "Pediatric Dental Care",
    rating: 5,
    date: "2 weeks ago",
    comment: "My 6-year-old was terrified of dentists. Dr. Anamika turned it into a magical adventure with games and zero tears! He actually asked when we can visit again.",
    verified: true,
    doctorName: "Dr. Anamika Jain"
  },
  {
    id: "rev-4",
    patientName: "Elena Rostova",
    initials: "ER",
    treatment: "Teeth Whitening",
    rating: 5,
    date: "3 weeks ago",
    comment: "Walked in with years of coffee staining and walked out with an 8-shade brighter Hollywood smile in under 60 minutes. Zero sensitivity thanks to their remineralizing gel!",
    verified: true,
    doctorName: "Dr. Emma Johnson"
  },
  {
    id: "rev-5",
    patientName: "Robert Chang",
    initials: "RC",
    treatment: "Root Canal Therapy",
    rating: 5,
    date: "1 month ago",
    comment: "I had throbbing pain over the weekend and called their emergency hotline. They accommodated me immediately. Completely pain-free root canal done in a single session.",
    verified: true,
    doctorName: "Dr. Emma Johnson"
  }
];

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "vid-1",
    patientName: "Sarah M.",
    treatment: "Clear Aligners",
    duration: "1:24",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHzLWKAbtJOQXTooSQOL0xL21LaLo5SW2SXPwgS2XaJGTDSfKMJEsWtIqoH0FPelbdRFT5ulmuZuC4E1LOT1ICQXpmyHLPyRyjZCHqp0ZYLiiVvA0e9g85xAWPBITff5m45MmcNM3_b6faLwv8gk7im2dJNeJQuaQ8fEOKeq9o-Rj5sfHmxG2_gPoeKa4ZSr9QXC_9dZCE2oBAzOPTNZ-t95cdocw9nPThfGkTg39_qMlhr7XtNt_jzQ",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    quote: "“The 3D preview showed me exactly what my smile would look like before I even began!”"
  },
  {
    id: "vid-2",
    patientName: "Michael K.",
    treatment: "Full Arch Implants",
    duration: "2:08",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuA15YpYkQW1HyzQ4TMmaxoULPOfSlwINs6JvyV4zgJe6ILKUlaN7Ax8Rj98qmYNAsRnofIfjxMurc7Zv7mTkH6T6Lo68P0LIq1zCKz4tjxEM-AHNYQl7ioh8VMGiH_TEvQ5BmF3HV6NA9xyWDbzA2uECrXp5xZyyqIaSQWbVCdcTEM1d3fH3LcLhzlRMsa-pmFjE_aCFJV7wgSHOmf55O2M9UuT2_B_JwZgTzr70wtcFwF_B8mjYAeftQ",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    quote: "“I can eat crisp apples and steaks again without a second thought. Truly life-changing.”"
  },
  {
    id: "vid-3",
    patientName: "Chloe H.",
    treatment: "Laser Whitening & Veneers",
    duration: "1:45",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB41sWmgw8If5sm1dgS0b2NNkxmg7AaaYwsn9oRAWBcnR-HWCT24sH_uW5T2CVm1M7FEMtdVXei8tYbA3IS4OGSZpPGqYerN_81h0-FwEdVuynGg0keZU9DR40v15mJdG_VVm9G9ksuQYyqRvxfBPorEpNLtOBGf5Qb6Xsjeu6WmJCeB22lG_h0Ej_5M-RotctuhcpZsQ0kcSyLCAsVDKB8mLfVsQTz3x9rFVooYad3KpnmOe8g4qExGw",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    quote: "“No needles, no scary drill noises — pure luxury medical care from start to finish.”"
  }
];
