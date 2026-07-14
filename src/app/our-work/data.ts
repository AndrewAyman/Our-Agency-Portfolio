// src/app/our-work/data.ts

import {
  Building2,
  Stethoscope,
  Film,
  Dumbbell,
  Palette,
  Utensils,
  Code2,
} from "lucide-react";

export type Sector = {
  id: string;
  label: string;
  Icon: any;
  accent: string;
  desc: string;
  images: string[];
  videos: {
    title: string;
    youtubeUrl: string;
    thumbnail?: string;
  }[];
  pdfs: {           // ← array مش string
    title: string;
    url: string;
  }[];
};

export const SECTORS: Sector[] = [
  {
    id: "dental",
    label: "Dental & Cosmetics",
    Icon: Stethoscope,
    accent: "#8D9AB0",
    desc: "Brand identity, social media, and video content for dental clinics and cosmetic practices.",
    images: [
      "/profiles/dental/images/post 1/1.png",
      "/profiles/dental/images/post 1/2.png",
      "/profiles/dental/images/post 1/3.png",
      "/profiles/dental/images/post 1/4.png",
      "/profiles/dental/images/post 1/5.png",
      "/profiles/dental/images/June/heighlight/1.png",
      "/profiles/dental/images/June/heighlight/2.png",
      "/profiles/dental/images/June/heighlight/3.png",
      "/profiles/dental/images/June/heighlight/4.png",
      "/profiles/dental/images/June/heighlight/5.png",
      "/profiles/dental/images/June/heighlight/6.png",
      "/profiles/dental/images/June/heighlight/7.png",
      "/profiles/dental/images/June/heighlight/8.png",
      "/profiles/dental/images/June/post 1/1.png",
      "/profiles/dental/images/June/post 1/2.png",
      "/profiles/dental/images/June/post 1/3.png",
      "/profiles/dental/images/June/post 1/4.png",
      "/profiles/dental/images/June/post 1/5.png",
      "/profiles/dental/images/June/post 1/6.png",
      "/profiles/dental/images/June/post 2/11.png",
      "/profiles/dental/images/June/post 2/22.png",
      "/profiles/dental/images/June/post 3/1.png",
      "/profiles/dental/images/June/post 3/2.png",
      "/profiles/dental/images/June/post 3/3.png",
      "/profiles/dental/images/June/post 3/4.png",
      "/profiles/dental/images/June/post 3/5.png",
      "/profiles/dental/images/June/post 4/1.png",
      "/profiles/dental/images/June/post 8/1.png",
      "/profiles/dental/images/June/post 8/2.png",
      "/profiles/dental/images/June/6.png",
      "/profiles/dental/images/June/9.png",
    ],
    videos: [
      {
        title: "Dental Clinic Branding Reel",
        youtubeUrl: "https://www.youtube.com/embed/uBPRvMTOVg0",
      },
      {
        title: "Mena Case Study 1",
        youtubeUrl: "https://www.youtube.com/embed/SoTgDc9W5Xw",
      },
      {
        title: "Mena Case Study 2",
        youtubeUrl: "https://www.youtube.com/embed/Ru4GboV8hEg",
      },
      {
        title: "رائحة النفس 2",
        youtubeUrl: "https://www.youtube.com/embed/rCDQVXIP-cg",
      },
    ],
    pdfs: [
      {
        title: "Company Profile",
        url: "/profiles/dental/profile/banet alemar profile lite2.pdf",
      },
    ],
  },
  {
    id: "construction",
    label: "Construction",
    Icon: Building2,
    accent: "#A8B4C5",
    desc: "Full marketing solutions for construction companies, stone & marble contractors.",
    images: [
      "/profiles/construction/1.png",
      "/profiles/construction/2.png",
      "/profiles/construction/3.png",
      "/profiles/construction/4.png",
      "/profiles/construction/5.png",
      "/profiles/construction/6.png",
      "/profiles/construction/7.png",
      "/profiles/construction/8.png",
      "/profiles/construction/9.png",
      "/profiles/construction/10.png",
      "/profiles/construction/11.png",
      "/profiles/construction/12.png",
      "/profiles/construction/13.png",
      "/profiles/construction/14.png",
      "/profiles/construction/15.png",
      "/profiles/construction/16.png",
      "/profiles/construction/17.png",
      "/profiles/construction/18.png",
      "/profiles/construction/19.png",
      "/profiles/construction/20.png",


    ],
    videos: [
      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      }
    ],
    pdfs: [
      {
        title: "Company Profile",
    url: "/construction/baneta.pdf", // ✅ صحيح
      },
      {
        title: "Project Portfolio",
        url: "/construction/yamas.pdf",
      },
    ],
  },
  {
    id: "gym",
    label: "Gym & Fitness",
    Icon: Dumbbell,
    accent: "#8D9AB0",
    desc: "Energetic branding, reels, and performance ads for gyms and fitness studios.",
    images: [],
    videos: [
      {
        title: "Gym Motivation Reel",
        youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      }
    ],
    pdfs: [],  // ← array فاضي
  },
  {
    id: "food",
    label: "Restaurant",
    Icon: Utensils,
    accent: "#E8A87C",
    desc: "Branding, social media management, and video production for restaurants, cafes, and hospitality brands.",
    images: [
      "/profiles/Food/1.PNG",
      "/profiles/Food/2.PNG",
      "/profiles/Food/3.PNG",
      "/profiles/Food/4.PNG",
      "/profiles/Food/5.PNG",
      "/profiles/Food/6.PNG",
      "/profiles/Food/7.PNG",
      "/profiles/Food/8.PNG",
      "/profiles/Food/9.PNG",
      "/profiles/Food/10.PNG",
      "/profiles/Food/11.PNG",
      "/profiles/Food/12.PNG",
      "/profiles/Food/13.PNG",
      "/profiles/Food/14.PNG",
      "/profiles/Food/15.PNG",
      "/profiles/Food/16.PNG",
      "/profiles/Food/17.PNG",
      "/profiles/Food/18.PNG",
      "/profiles/Food/19.PNG",
      "/profiles/Food/20.PNG",
    ],
    videos: [
      {
        title: "Restaurant Branding Reel",
        youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      }
    ],
    pdfs: [],  // ← array فاضي
  },
{
  id: "clothes",
  label: "Fashion & Clothing",
  Icon: Palette,  // أو استخدم أيقونة Shirt أو ShoppingBag
  accent: "#E8A87C",  // لون دافئ يناسب الأزياء
  desc: "Fashion branding, social media campaigns, and visual content for clothing brands and boutiques.",
  images: [
    // حط مسارات صور الملابس هنا
    // "/profiles/clothes/1.png",
    // "/profiles/clothes/2.png",
    // "/profiles/clothes/3.png",
  ],
  videos: [
    {
      title: "Fashion Brand Reel",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Clothing Collection Showcase",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    }
  ],
  pdfs: [
    {
      title: "Fashion Brand Portfolio",
      url: "/profiles/clothes/fashion-portfolio.pdf",
    },
  ],
},
{
  id: "ai",
  label: "Software & AI Solutions",
  Icon: Code2,  // ← أيقونة الكود
  accent: "#6C63FF",  // لون أرجواني/أزرق يناسب التكنولوجيا
  desc: "Custom software development, AI solutions, and digital transformation for businesses.",
  images: [
     "/profiles/Software/1.png",
     "/profiles/Software/2.png",
     "/profiles/Software/3.png",
     "/profiles/Software/4.png",
     "/profiles/Software/5.png",
     "/profiles/Software/6.png",
     "/profiles/Software/7.png",
     "/profiles/Software/8.png",
     "/profiles/Software/9.png",
     "/profiles/Software/10.png",
     "/profiles/Software/11.png",
     "/profiles/Software/12.png",
     "/profiles/Software/14.png",
     "/profiles/Software/13.png",
     "/profiles/Software/15.png",
     "/profiles/Software/16.png",
     "/profiles/Software/17.png",
     "/profiles/Software/18.png",
     "/profiles/Software/19.png",
     "/profiles/Software/20.png",
     "/profiles/Software/21.png",

  ],
  videos: [
 {
    title: "Elite Pay",
    youtubeUrl: "https://www.youtube.com/embed/bP2chqjbQ6A",  // ← كده
  },
  {
    title: "Elite Pay",
    youtubeUrl: "https://youtube.com/embed/EC7nuifHgGg",  // ← كده
  },
  {
    title: "Elite Pay",
    youtubeUrl: "https://youtube.com/embed/TxaOC6xrPAQ",  // ← كده
  },
  {
    title: "Elite Pay",
    youtubeUrl: "https://youtube.com/embed/JU9ChDvm_tQ",  // ← كده
  },
 
  
  ],
  pdfs: [
    {
      title: "Software Portfolio",
      url: "/profiles/ai/software-portfolio.pdf",
    },
    {
      title: "AI Solutions Brochure",
      url: "/profiles/ai/ai-brochure.pdf",
    },
  ],
},
];