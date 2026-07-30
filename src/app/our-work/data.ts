// src/app/our-work/data.ts

import {
  Building2,
  Stethoscope,
  Film,
  Dumbbell,
  Palette,
  Utensils,
  Code2,
  Globe,
  Briefcase,
  Instagram,
  Linkedin,
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
  pdfs: {
    title: string;
    url: string;
  }[];
  links?: {
    title: string;
    url: string;
    type?: "website" | "portfolio" | "case-study" | "social";
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
      "/profiles/dental/images/1.png",
      "/profiles/dental/images/2.png",
      "/profiles/dental/images/3.png",
      "/profiles/dental/images/4.png",
      "/profiles/dental/images/5.png",
      "/profiles/dental/images/6.png",
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
      // {
      //   title: "Company Profile",
      //   url: "/profiles/dental/profile/banet alemar profile lite2.pdf",
      // },
    ],
    links: [
      // {
      //   title: "Dental Clinic Website",
      //   url: "https://example-dental.com",
      //   type: "website",
      // },
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
      "/profiles/construction/21.png",
      "/profiles/construction/22.png",
      "/profiles/construction/23.png",
      "/profiles/construction/24.png",
      "/profiles/construction/25.png",
      "/profiles/construction/26.png",
      "/profiles/construction/27.jpg",
      "/profiles/construction/28.jpg",
      "/profiles/construction/29.jpg",
      "/profiles/construction/30.jpg",
      "/profiles/construction/31.png",
      "/profiles/construction/32.png",
      "/profiles/construction/33.png",
      "/profiles/construction/34.png",
      "/profiles/construction/35.png",
      "/profiles/construction/36.png",
      "/profiles/construction/37.png",
      "/profiles/construction/39.png",
      "/profiles/construction/40.png",
      "/profiles/construction/41.png",
      "/profiles/construction/42.png",
      "/profiles/construction/43.png",
      "/profiles/construction/44.png",
      "/profiles/construction/45.png",
      "/profiles/construction/46.png",
      "/profiles/construction/47.png",
    ],
    videos: [
      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://youtube.com/embed/V1ZNek9V0wo",
      },
      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://youtube.com/embed/LT52R8auFtU",
      },
      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://youtube.com/embed/wvyCovwNLUc",
      },
      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://youtube.com/embed/8QSbuaJ68YY",
      },
      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://youtube.com/embed/Tku0FWwZqjU",
      },
      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://youtube.com/embed/kWXkVwoWG7Y",
      },

      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://youtube.com/embed/i_EG4xWnLRw",
      },

      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://youtube.com/embed/pjhp3yBmI04",
      },

      {
        title: "Construction Project Showcase",
        youtubeUrl: "https://youtube.com/embed/Wlt5gKr6hx0",
      },
    ],
    pdfs: [
      {
        title: "yamas Profile",
        url: "/profiles/construction/yamas.pdf",
      },
      {
        title: "baneta Portfolio",
        url: "/profiles/construction/baneta.pdf",
      },
    ],
    links: [
      {
        title: "sadif",
        url: "https://www.sadif.sa/",
        type: "website",
      },
      {
        title: "Yamas ",
        url: "https://www.yamas.com.sa/ar",
        type: "website",
      },
      // {
      //   title: "Project Portfolio Gallery",
      //   url: "https://www.baneta-eg.com/projects",
      //   type: "portfolio",
      // },
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
      },
    ],
    pdfs: [],
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
      "/profiles/Food/24.PNG",
      "/profiles/Food/25.PNG",
      "/profiles/Food/26.PNG",
      "/profiles/Food/27.jpg",
      "/profiles/Food/28.jpg",
      "/profiles/Food/29.jpg",
      "/profiles/Food/30.png",
      "/profiles/Food/31.png",
      "/profiles/Food/32.png",
      "/profiles/Food/33.png",
      "/profiles/Food/34.png",
      "/profiles/Food/35.png",
      "/profiles/Food/36.png",
      "/profiles/Food/37.png",
      "/profiles/Food/38.png",
      "/profiles/Food/39.png",
    ],
    videos: [
      {
        title: "Restaurant Branding Reel",
        youtubeUrl: "https://youtube.com/embed/jWhP0R5Pcsg",
      },

      {
        title: "Restaurant Branding Reel",
        youtubeUrl: "https://youtube.com/embed/GBwLX6aF7Ho",
      },
    ],
    pdfs: [
      {
        title: "aziza Portfolio",
        url: "/profiles/Food/aziza identity.pdf",
      },
      {
        title: "aziza Portfolio",
        url: "/profiles/Food/COVER.pdf",
      },
      {
        title: "aziza Portfolio",
        url: "/profiles/Food/PACKAGE.pdf",
      },
      {
        title: "aziza Portfolio",
        url: "/profiles/Food/Aziza_Stickers.pdf",
      },
    ],
    links: [
      // {
      //   title: "Restaurant Website",
      //   url: "https://example-restaurant.com",
      //   type: "website",
      // },
      // {
      //   title: "Instagram Page",
      //   url: "https://instagram.com/example",
      //   type: "social",
      // },
    ],
  },
  {
    id: "clothes",
    label: "Fashion & Clothing",
    Icon: Palette,
    accent: "#E8A87C",
    desc: "Fashion branding, social media campaigns, and visual content for clothing brands and boutiques.",
    images: [
      "/profiles/clothes/1.jpg",
      "/profiles/clothes/2.jpg",
      "/profiles/clothes/3.jpg",
      "/profiles/clothes/4.jpg",
      "/profiles/clothes/5.jpg",
    ],
    videos: [
      {
        title: "Fashion Brand Reel",
        youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        title: "Clothing Collection Showcase",
        youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
    pdfs: [
      // {
      //   title: "Fashion Brand Portfolio",
      //   url: "/profiles/clothes/fashion-portfolio.pdf",
      // },
    ],
    links: [
      // {
      //   title: "Fashion Brand Website",
      //   url: "https://example-fashion.com",
      //   type: "website",
      // },
    ],
  },
  {
    id: "ai",
    label: "Software & AI Solutions",
    Icon: Code2,
    accent: "#6C63FF",
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
      "/profiles/Software/22.jpg",
      "/profiles/Software/23.jpg",
      "/profiles/Software/24.jpg",
      "/profiles/Software/25.jpg",
      "/profiles/Software/26.jpg",
      "/profiles/Software/27.jpg",
      "/profiles/Software/28.jpg",
      "/profiles/Software/29.jpg",
      "/profiles/Software/30.jpg",
      "/profiles/Software/31.jpg",
    ],
    videos: [
      {
        title: "Elite Pay",
        youtubeUrl: "https://www.youtube.com/embed/bP2chqjbQ6A",
      },
      {
        title: "Elite Pay",
        youtubeUrl: "https://youtube.com/embed/EC7nuifHgGg",
      },
      {
        title: "Elite Pay",
        youtubeUrl: "https://youtube.com/embed/TxaOC6xrPAQ",
      },
      {
        title: "Elite Pay",
        youtubeUrl: "https://youtube.com/embed/JU9ChDvm_tQ",
      },
      {
        title: "Elite Pay",
        youtubeUrl: "https://youtube.com/embed/fIeJ4Ir9mtA",
      },
    ],
    pdfs: [
      {
        title: "Software Portfolio",
        url: "/profiles/Software/Egypt pp.pptx",
      },
      // {
      //   title: "AI Solutions Brochure",
      //   url: "/profiles/ai/ai-brochure.pdf",
      // },
    ],
    links: [
      {
        title: "ahmed-portfolio",
        url: "https://ahmed-portfolio-lake.vercel.app/",
        type: "website",
      },
      // {
      //   title: "GitHub Portfolio",
      //   url: "https://github.com/example",
      //   type: "portfolio",
      // },
      // {
      //   title: "LinkedIn Page",
      //   url: "https://linkedin.com/company/example",
      //   type: "social",
      // },
    ],
  },
];
