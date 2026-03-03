/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { 
  Search, 
  ArrowRight, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  Menu, 
  X,
  Bed,
  Bath,
  Maximize,
  Instagram,
  Twitter,
  Facebook,
  ArrowDown,
  ArrowUp,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Wind,
  Cigarette,
  Home as HomeIcon,
  Users
} from 'lucide-react';

// --- Types ---
interface Property {
  id: string;
  name: string;
  price: string;
  location: string;
  rating: number;
  beds: number;
  baths: number;
  sqft: number;
  img: string;
  gallery: string[];
  description: string;
  status: string;
  mlsId: string;
  type: string;
  agent: {
    name: string;
    email: string;
    img: string;
  };
}

const properties: Property[] = [
  { 
    id: '1',
    name: 'Veloura Residences', 
    price: '$4,050', 
    location: 'Miami, Florida, celinam delware 2098',
    rating: 5.0,
    beds: 3, 
    baths: 2, 
    sqft: 10000, 
    img: 'https://picsum.photos/seed/prop1/1200/800',
    gallery: [
      'https://picsum.photos/seed/prop1/1200/800',
      'https://picsum.photos/seed/prop1-2/800/600',
      'https://picsum.photos/seed/prop1-3/800/600',
    ],
    description: 'Discover this modern 3-bedroom apartment located in the heart of the city, offering a perfect blend of comfort and convenience. Enjoy breathtaking skyline views, an open-concept kitchen, spacious living areas, and a private balcony ideal for relaxing evenings.',
    status: 'For Sale',
    mlsId: '0978347',
    type: 'Single-Family Home',
    agent: {
      name: 'Alex Ripon',
      email: 'example@gamil.com',
      img: 'https://picsum.photos/seed/agent1/100/100'
    }
  },
  { 
    id: '2',
    name: 'EcoSerene Haven Residences', 
    price: '$350,000', 
    location: 'Los Angeles, CA',
    rating: 4.8,
    beds: 3, 
    baths: 2, 
    sqft: 1400, 
    img: 'https://picsum.photos/seed/prop2/1200/800',
    gallery: [
      'https://picsum.photos/seed/prop2/1200/800',
      'https://picsum.photos/seed/prop2-2/800/600',
      'https://picsum.photos/seed/prop2-3/800/600',
    ],
    description: 'A sustainable sanctuary blending modern architecture with lush natural surroundings for ultimate peace.',
    status: 'For Sale',
    mlsId: '0978348',
    type: 'Single-Family Home',
    agent: {
      name: 'Sarah Jenkins',
      email: 'sarah@example.com',
      img: 'https://picsum.photos/seed/agent2/100/100'
    }
  },
  { 
    id: '3',
    name: 'Luxe Haven Residences', 
    price: '$420,000', 
    location: 'New York, NY',
    rating: 4.9,
    beds: 4, 
    baths: 2, 
    sqft: 2000, 
    img: 'https://picsum.photos/seed/prop3/1200/800',
    gallery: [
      'https://picsum.photos/seed/prop3/1200/800',
      'https://picsum.photos/seed/prop3-2/800/600',
      'https://picsum.photos/seed/prop3-3/800/600',
    ],
    description: 'Experience the pinnacle of luxury with panoramic views and world-class amenities in every corner.',
    status: 'For Sale',
    mlsId: '0978349',
    type: 'Single-Family Home',
    agent: {
      name: 'Michael Chen',
      email: 'michael@example.com',
      img: 'https://picsum.photos/seed/agent3/100/100'
    }
  },
];
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-luxury-ink transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-luxury-ink text-white flex items-center justify-center shadow-xl transition-all duration-500 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <ArrowUp size={20} />
    </button>
  );
};

const Navbar = ({ onHomeClick }: { onHomeClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 lg:px-24 py-6",
      isScrolled ? "bg-white/80 backdrop-blur-lg py-4 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={onHomeClick} className="flex items-center space-x-2 text-2xl font-bold tracking-tighter">
          <div className="w-8 h-8 bg-luxury-ink rounded-full flex items-center justify-center text-white">
            <HomeIcon size={16} />
          </div>
          <span>Realnest</span>
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <button onClick={onHomeClick} className="hover:text-luxury-gray transition-colors">Home</button>
          <a href="#" className="hover:text-luxury-gray transition-colors">About us</a>
          <a href="#" className="hover:text-luxury-gray transition-colors">Property</a>
          <a href="#" className="hover:text-luxury-gray transition-colors">Agents</a>
          <a href="#" className="hover:text-luxury-gray transition-colors">Blog</a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="hidden sm:block bg-luxury-ink text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">
            Contact Us
          </button>
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-black/5 p-6 flex flex-col space-y-6 shadow-xl">
          <button onClick={() => { onHomeClick(); setMobileMenuOpen(false); }} className="text-left text-lg font-medium">Home</button>
          <a href="#" className="text-lg font-medium">About us</a>
          <a href="#" className="text-lg font-medium">Property</a>
          <a href="#" className="text-lg font-medium">Agents</a>
          <a href="#" className="text-lg font-medium">Blog</a>
          <button className="bg-luxury-ink text-white w-full py-4 rounded-full font-medium">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

const heroSlides = [
  {
    title: "Etalon City Real Estate",
    desc: "This premier development offers a range of high-end residential spaces designed with meticulous attention to detail.",
    img: "https://picsum.photos/seed/modern-house-1/1920/1080"
  },
  {
    title: "EcoSerene Haven Residences",
    desc: "A sustainable sanctuary blending modern architecture with lush natural surroundings for ultimate peace.",
    img: "https://picsum.photos/seed/prop1/1920/1080"
  },
  {
    title: "Luxe Haven Residences",
    desc: "Experience the pinnacle of luxury with panoramic views and world-class amenities in every corner.",
    img: "https://picsum.photos/seed/prop2/1920/1080"
  },
  {
    title: "Urban Oasis Apartments",
    desc: "Modern living in the heart of the city, featuring contemporary design and unparalleled convenience.",
    img: "https://picsum.photos/seed/prop3/1920/1080"
  }
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const nextSlide = () => {
    const next = (currentSlide + 1) % heroSlides.length;
    
    gsap.to(slideRefs.current[currentSlide], {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    });
    
    gsap.fromTo(slideRefs.current[next], 
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }
    );
    
    setCurrentSlide(next);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animations
      gsap.from(".hero-reveal", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Initial slide state
      slideRefs.current.forEach((slide, i) => {
        if (i !== 0) gsap.set(slide, { opacity: 0 });
      });
    }, heroRef);

    const timer = setInterval(nextSlide, 6000);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, [currentSlide]);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12">
          <div className="max-w-4xl">
            <h1 className="hero-reveal font-medium tracking-tighter leading-[0.85] mb-12">
              <span className="text-4xl md:text-6xl block opacity-60 mb-2">Discover</span>
              <span className="text-8xl md:text-[11rem] lg:text-[14rem] italic font-light block -ml-1 md:-ml-3 mb-4">Modern</span>
              <span className="text-4xl md:text-6xl block">Homes Tailored to</span>
              <span className="text-4xl md:text-6xl block">Your Lifestyle</span>
            </h1>
            <div className="hero-reveal flex items-center space-x-4">
              <button 
                onClick={nextSlide}
                className="w-16 h-16 rounded-full border border-luxury-ink flex items-center justify-center group hover:bg-luxury-ink hover:text-white transition-all duration-500"
              >
                <ArrowDown size={24} className="group-hover:translate-y-1 transition-transform" />
              </button>
              <p className="text-luxury-gray max-w-xs text-sm uppercase tracking-widest font-bold">
                Explore our curated collection of architectural masterpieces.
              </p>
            </div>
          </div>
          
          <div className="hero-reveal hidden lg:block glass p-8 rounded-[32px] shadow-2xl shadow-black/10 max-w-sm mt-12 lg:mt-0 relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white/20 bg-luxury-sand overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 text-xs font-bold">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span>4.8 Rating</span>
              </div>
            </div>
            <p className="text-base text-luxury-ink font-medium italic leading-relaxed">
              "The most seamless property search experience I've ever had. Truly exceptional design and architectural vision."
            </p>
            <div className="mt-4 text-[10px] uppercase tracking-widest font-bold opacity-40">Top Testimonial</div>
          </div>
        </div>

        <div className="hero-reveal relative w-full h-[500px] md:h-[800px] rounded-[40px] overflow-hidden shadow-2xl">
          {heroSlides.map((slide, i) => (
            <div 
              key={i}
              ref={el => slideRefs.current[i] = el}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={slide.img} 
                alt={slide.title} 
                className="w-full h-full object-cover will-change-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between text-white">
                <div className="glass p-8 rounded-[32px] max-w-md mb-6 md:mb-0">
                  <h3 className="text-2xl font-medium mb-3">{slide.title}</h3>
                  <p className="text-sm opacity-80 mb-6 leading-relaxed">
                    {slide.desc}
                  </p>
                  <button className="flex items-center space-x-3 text-sm font-bold group">
                    <span className="uppercase tracking-widest">See Detail</span>
                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-luxury-ink transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-12 right-12 hidden md:flex items-center space-x-4 text-sm font-bold uppercase tracking-[0.2em] text-white">
            <span className="text-2xl">0{currentSlide + 1}</span>
            <div className="w-16 h-[1px] bg-white/30" />
            <span className="opacity-40">0{heroSlides.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = gsap.utils.toArray('.stat-item');
      stats.forEach((stat: any) => {
        const target = parseInt(stat.getAttribute('data-target'));
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: target,
          duration: 2,
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          },
          onUpdate: () => {
            stat.querySelector('.count').innerText = Math.floor(obj.value).toLocaleString() + (stat.getAttribute('data-suffix') || '');
          }
        });
      });
    }, statsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={statsRef} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="stat-item flex flex-col" data-target="13000" data-suffix="+">
          <span className="count text-6xl font-medium tracking-tighter mb-4">0</span>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-2">Projects</h4>
          <p className="text-luxury-gray text-sm">Total revenue we get from various projects or clients that we complete.</p>
        </div>
        <div className="stat-item flex flex-col" data-target="21000" data-suffix="+">
          <span className="count text-6xl font-medium tracking-tighter mb-4">0</span>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-2">Happy Clients</h4>
          <p className="text-luxury-gray text-sm">The beauty of nature, creating a timeless escape where tranquility meets luxury.</p>
        </div>
        <div className="stat-item flex flex-col" data-target="112" data-suffix="+">
          <span className="count text-6xl font-medium tracking-tighter mb-4">0</span>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-2">Awards</h4>
          <p className="text-luxury-gray text-sm">Recognized globally for our commitment to architectural excellence and innovation.</p>
        </div>
      </div>
    </section>
  );
};

const Categories = () => {
  const categories = [
    { id: '01', title: 'Luxury Living', desc: 'Breathtaking city views, sleek design, and modern conveniences at your doorstep.', img: 'https://picsum.photos/seed/luxury/800/1000' },
    { id: '02', title: 'Minimalist Haven', desc: 'Step into a world where elegance and ease come together in perfect harmony.', img: 'https://picsum.photos/seed/minimal/800/1000' },
    { id: '03', title: 'Discover Modern', desc: 'Each home is crafted to suit your unique lifestyle with top-tier amenities.', img: 'https://picsum.photos/seed/modern/800/1000' },
  ];

  return (
    <section className="section-padding bg-luxury-beige">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-medium max-w-md leading-tight">
            Work With Archspace Architecture Mastery
          </h2>
          <p className="text-luxury-gray max-w-xs text-sm mt-6 md:mt-0">
            Every corner of serenity beckons you to unwind, relax, and embrace the beauty of nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div key={cat.id} className="group relative flex flex-col">
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-6">
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-sm font-bold opacity-30">{cat.id}</span>
                <div>
                  <h3 className="text-xl font-medium mb-2">{cat.title}</h3>
                  <p className="text-sm text-luxury-gray leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Showcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for cards
      gsap.from(".showcase-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".showcase-grid",
          start: "top 80%",
        }
      });

      // Image scale animation
      gsap.from(".showcase-img", {
        scale: 1.05,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".showcase-grid",
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const items = [
    { id: '01', title: 'Luxury Living', desc: 'Breathtaking city views, sleek design, and modern conveniences at your doorstep. These homes offer spacious.', img: 'https://picsum.photos/seed/arch1/800/1000' },
    { id: '02', title: 'Minimalist Haven', desc: 'Step into a world where elegance and ease come together in perfect harmony. Each home is designed with high-end finishes and ample living spaces.', img: 'https://picsum.photos/seed/arch2/800/1000' },
    { id: '03', title: 'Discover Modern', desc: 'This property is crafted to suit your unique lifestyle with top-tier amenities, and stunning architectural details.', img: 'https://picsum.photos/seed/arch3/800/1000' },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-[#F5F5F3]">
      <div className="max-w-7xl mx-auto">
        {/* Top Layout */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-20">
          <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-8 md:mb-0">
            We are Here <br /> for your need
          </h2>
          <div className="max-w-[420px]">
            <p className="text-luxury-gray text-sm leading-relaxed mb-8">
              Enjoy a sophisticated lifestyle with breathtaking city views, sleek design, and modern conveniences at your doorstep. These homes offer spacious, open layouts filled with natural light.
            </p>
            <button className="bg-luxury-ink text-white px-10 py-4 rounded-full text-sm font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              See More
            </button>
          </div>
        </div>

        {/* Bottom Layout - 3 Card Grid */}
        <div className="showcase-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr] gap-8 items-end">
          {items.map((item, i) => (
            <div 
              key={item.id} 
              className={cn(
                "showcase-card group flex flex-col",
                i === 1 ? "lg:mb-0" : "lg:mb-12" // Center card featured look
              )}
            >
              <div className="relative rounded-[28px] overflow-hidden mb-8 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="showcase-img w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold tracking-tighter mb-4 opacity-10 group-hover:opacity-100 transition-opacity duration-500">{item.id}</span>
                <h3 className="text-2xl font-medium mb-3">{item.title}</h3>
                <p className="text-sm text-luxury-gray leading-relaxed max-w-[300px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonialSlides = [
  {
    name: "Gregg Bergstrom",
    role: "Marketing Executive",
    quote: "Working with Living was a fantastic experience from start to finish. They listened to exactly what I wanted, and within a few short weeks, I found my dream home. The team was knowledgeable, responsive, and made the entire process so easy. I truly felt supported.",
    img: "https://picsum.photos/seed/person-1/800/800"
  },
  {
    name: "Sarah Jenkins",
    role: "Interior Designer",
    quote: "The attention to detail in their architectural designs is simply unmatched. As a designer, I appreciate the clean lines and functional spaces they create. It's rare to find a developer that truly understands modern luxury.",
    img: "https://picsum.photos/seed/person-2/800/800"
  },
  {
    name: "Michael Chen",
    role: "Architect",
    quote: "Living sets a new standard for modern housing. Their commitment to sustainable materials and innovative construction techniques is inspiring. Every project they undertake is a masterpiece of contemporary architecture.",
    img: "https://picsum.photos/seed/person-3/800/800"
  },
  {
    name: "Elena Rodriguez",
    role: "Homeowner",
    quote: "I never thought I'd find a home that perfectly matched my lifestyle until I discovered Living. The process was transparent, and the result exceeded my expectations. I'm proud to live in such a beautifully designed space.",
    img: "https://picsum.photos/seed/person-4/800/800"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const next = () => {
    const nextIdx = (current + 1) % testimonialSlides.length;
    
    gsap.to([contentRef.current, imageRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.5,
      onComplete: () => {
        setCurrent(nextIdx);
        gsap.to([contentRef.current, imageRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });
  };

  const prev = () => {
    const prevIdx = (current - 1 + testimonialSlides.length) % testimonialSlides.length;
    
    gsap.to([contentRef.current, imageRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        setCurrent(prevIdx);
        gsap.to([contentRef.current, imageRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-medium mb-20">
          See Other People Who Have <br /> Lived In Our Residence
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div ref={contentRef} className="flex-1">
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-1">{testimonialSlides[current].name}</h4>
              <p className="text-sm text-luxury-gray uppercase tracking-widest">{testimonialSlides[current].role}</p>
            </div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12 min-h-[200px]">
              "{testimonialSlides[current].quote}"
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-luxury-ink hover:text-white transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-luxury-ink hover:text-white transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div ref={imageRef} className="flex-1 w-full">
            <div className="aspect-square rounded-[32px] overflow-hidden shadow-2xl">
              <img 
                src={testimonialSlides[current].img} 
                alt={testimonialSlides[current].name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PropertyListing = ({ onPropertyClick }: { onPropertyClick: (prop: Property) => void }) => {
  const [filters, setFilters] = useState({
    priceRange: 'all',
    beds: 'all',
    baths: 'all'
  });

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''));
  };

  const filteredProperties = properties.filter(prop => {
    const price = parsePrice(prop.price);
    
    // Price Filter
    let priceMatch = true;
    if (filters.priceRange === 'under-100k') priceMatch = price < 100000;
    else if (filters.priceRange === '100k-500k') priceMatch = price >= 100000 && price <= 500000;
    else if (filters.priceRange === 'over-500k') priceMatch = price > 500000;

    // Beds Filter
    let bedsMatch = true;
    if (filters.beds !== 'all') {
      bedsMatch = prop.beds >= parseInt(filters.beds);
    }

    // Baths Filter
    let bathsMatch = true;
    if (filters.baths !== 'all') {
      bathsMatch = prop.baths >= parseInt(filters.baths);
    }

    return priceMatch && bedsMatch && bathsMatch;
  });

  return (
    <section className="section-padding bg-luxury-beige">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-4">
              So, what kind of home do you want to realize?
            </h2>
            <p className="text-luxury-gray text-sm">
              Every corner of serenity beckons you to unwind, relax, and embrace the beauty of nature.
            </p>
          </div>
          
          {/* Filter Bar */}
          <div className="mt-8 md:mt-0 flex flex-wrap gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-gray">Price Range</label>
              <select 
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="bg-white border border-black/5 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-luxury-ink transition-colors appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="all">All Prices</option>
                <option value="under-100k">Under $100,000</option>
                <option value="100k-500k">$100,000 - $500,000</option>
                <option value="over-500k">Over $500,000</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-gray">Bedrooms</label>
              <select 
                value={filters.beds}
                onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
                className="bg-white border border-black/5 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-luxury-ink transition-colors appearance-none cursor-pointer min-w-[120px]"
              >
                <option value="all">Any Beds</option>
                <option value="1">1+ Bed</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-gray">Bathrooms</label>
              <select 
                value={filters.baths}
                onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
                className="bg-white border border-black/5 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-luxury-ink transition-colors appearance-none cursor-pointer min-w-[120px]"
              >
                <option value="all">Any Baths</option>
                <option value="1">1+ Bath</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
              </select>
            </div>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProperties.map((prop, i) => (
              <div key={prop.id} className="luxury-card group cursor-pointer" onClick={() => onPropertyClick(prop)}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={prop.img} 
                    alt={prop.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full text-xs font-bold text-white">
                    Featured
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="bg-white text-luxury-ink px-6 py-3 rounded-full text-sm font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-4">{prop.name}</h3>
                  <div className="flex items-center space-x-6 text-luxury-gray text-xs font-bold uppercase tracking-widest mb-6">
                    <div className="flex items-center space-x-2">
                      <Bed size={14} />
                      <span>{prop.beds} Bed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath size={14} />
                      <span>{prop.baths} Bath</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Maximize size={14} />
                      <span>{prop.sqft} sq</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-black/5">
                    <span className="text-2xl font-medium tracking-tighter">{prop.price}</span>
                    <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-luxury-ink group-hover:text-white transition-all">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mb-6">
              <Search size={32} className="text-luxury-gray opacity-30" />
            </div>
            <h3 className="text-2xl font-medium mb-2">No properties found</h3>
            <p className="text-luxury-gray max-w-xs">Try adjusting your filters to find more architectural masterpieces.</p>
            <button 
              onClick={() => setFilters({ priceRange: 'all', beds: 'all', baths: 'all' })}
              className="mt-8 text-sm font-bold uppercase tracking-widest underline underline-offset-8 hover:text-luxury-gray transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const PropertyDetail = ({ property, onHomeClick }: { property: Property, onHomeClick: () => void }) => {
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(".detail-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, detailRef);
    return () => ctx.revert();
  }, [property]);

  return (
    <div ref={detailRef} className="bg-[#F8F9FA] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 mb-16 detail-reveal">
          <div className="rounded-[24px] overflow-hidden shadow-lg group">
            <img 
              src={property.gallery[0]} 
              alt={property.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-[24px] overflow-hidden shadow-lg group">
              <img 
                src={property.gallery[1]} 
                alt={property.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 rounded-[24px] overflow-hidden shadow-lg group">
              <img 
                src={property.gallery[2]} 
                alt={property.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          <div className="space-y-12">
            {/* Title & Overview */}
            <div className="detail-reveal">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                  <h1 className="text-5xl font-bold mb-4">{property.name}</h1>
                  <div className="flex items-center space-x-4 text-luxury-gray">
                    <div className="flex items-center space-x-1">
                      <MapPin size={18} />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={18} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{property.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold text-luxury-ink">{property.price}</span>
                  <span className="text-luxury-gray ml-2 text-sm uppercase tracking-widest font-bold">USD</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="detail-reveal">
              <h3 className="text-lg font-bold mb-4">Description:</h3>
              <p className="text-luxury-gray leading-relaxed max-w-[700px]">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="detail-reveal">
              <div className="bg-white p-8 rounded-[24px] border border-black/5 shadow-sm">
                <h3 className="text-lg font-bold mb-8">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-luxury-beige flex items-center justify-center text-luxury-ink">
                      <Bed size={20} />
                    </div>
                    <span className="text-sm font-medium">{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-luxury-beige flex items-center justify-center text-luxury-ink">
                      <Bath size={20} />
                    </div>
                    <span className="text-sm font-medium">{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-luxury-beige flex items-center justify-center text-luxury-ink">
                      <Maximize size={20} />
                    </div>
                    <span className="text-sm font-medium">{property.sqft.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-luxury-beige flex items-center justify-center text-luxury-ink">
                      <Cigarette size={20} />
                    </div>
                    <span className="text-sm font-medium">Smoking Area</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-luxury-beige flex items-center justify-center text-luxury-ink">
                      <Utensils size={20} />
                    </div>
                    <span className="text-sm font-medium">Kitchen</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-luxury-beige flex items-center justify-center text-luxury-ink">
                      <Wind size={20} />
                    </div>
                    <span className="text-sm font-medium">Balcony</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-luxury-beige flex items-center justify-center text-luxury-ink">
                      <Wifi size={20} />
                    </div>
                    <span className="text-sm font-medium">Wifi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-luxury-beige flex items-center justify-center text-luxury-ink">
                      <Car size={20} />
                    </div>
                    <span className="text-sm font-medium">Parking Area</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Areas & Lot */}
            <div className="detail-reveal">
              <h3 className="text-lg font-bold mb-6">Areas & Lot</h3>
              <div className="bg-white rounded-[24px] border border-black/5 overflow-hidden shadow-sm">
                <div className="divide-y divide-black/5">
                  <div className="flex justify-between p-6">
                    <span className="text-luxury-gray font-medium">Status</span>
                    <span className="font-bold">{property.status}</span>
                  </div>
                  <div className="flex justify-between p-6">
                    <span className="text-luxury-gray font-medium">Location</span>
                    <span className="font-bold">{property.location}</span>
                  </div>
                  <div className="flex justify-between p-6">
                    <span className="text-luxury-gray font-medium">Living Space</span>
                    <span className="font-bold">{property.sqft.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between p-6">
                    <span className="text-luxury-gray font-medium">MLS ID</span>
                    <span className="font-bold">{property.mlsId}</span>
                  </div>
                  <div className="flex justify-between p-6">
                    <span className="text-luxury-gray font-medium">Type</span>
                    <span className="font-bold">{property.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Agent Card */}
          <div className="detail-reveal">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-xl shadow-black/5">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src={property.agent.img} alt={property.agent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{property.agent.name}</h4>
                    <p className="text-sm text-luxury-gray">{property.agent.email}</p>
                  </div>
                </div>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-luxury-gray mb-2">Full Name</label>
                    <input type="text" placeholder="Jone Doe" className="w-full bg-[#F8F9FA] border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-luxury-ink transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-luxury-gray mb-2">Email Address</label>
                    <input type="email" placeholder="yourmail@gmail.com" className="w-full bg-[#F8F9FA] border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-luxury-ink transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-luxury-gray mb-2">Phone</label>
                    <input type="tel" placeholder="+880" className="w-full bg-[#F8F9FA] border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-luxury-ink transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-luxury-gray mb-2">Message</label>
                    <textarea rows={4} placeholder="Write here..." className="w-full bg-[#F8F9FA] border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-luxury-ink transition-colors resize-none"></textarea>
                  </div>
                  <button className="w-full bg-luxury-ink text-white py-4 rounded-full font-bold hover:shadow-lg transition-all">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Properties */}
        <div className="mt-32 detail-reveal">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="bg-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/5 mb-4">Property List</span>
            <h2 className="text-4xl md:text-5xl font-medium">Recommend More Property</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((prop, i) => (
              <div key={i} className="luxury-card group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={prop.img} 
                    alt={prop.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full text-xs font-bold text-white">
                    For Buy
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xl font-bold mb-2">{prop.price}</div>
                  <h3 className="text-lg font-medium mb-4">{prop.name}</h3>
                  <div className="flex items-center space-x-2 text-luxury-gray text-xs mb-6">
                    <MapPin size={14} />
                    <span>{prop.location}</span>
                  </div>
                  <div className="flex items-center space-x-6 text-luxury-gray text-xs font-bold uppercase tracking-widest pt-6 border-t border-black/5">
                    <div className="flex items-center space-x-2">
                      <Bed size={14} />
                      <span>{prop.beds} Beds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath size={14} />
                      <span>{prop.baths} Baths</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Maximize size={14} />
                      <span>{prop.sqft} sq</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button onClick={onHomeClick} className="bg-luxury-ink text-white px-10 py-4 rounded-full text-sm font-bold flex items-center space-x-2 hover:shadow-lg transition-all">
              <span>Explore all Property</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="mt-32 relative h-[600px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/newsletter/1920/1080" 
          alt="Newsletter" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Stay Updated on Latest Property</h2>
          <p className="text-lg opacity-80 mb-12">Never miss a beat and stay update</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full sm:w-80 bg-white rounded-full py-4 px-8 text-luxury-ink focus:outline-none"
            />
            <button className="w-full sm:w-auto bg-luxury-ink text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-luxury-ink transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Banner Image */}
      <div className="w-full h-[400px] overflow-hidden">
        <img 
          src="https://picsum.photos/seed/footer-banner/1920/600" 
          alt="Footer Banner" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "Can I buy a home with bad credit?", a: "Fractional Property Investing is the process of dividing an asset into smaller pieces to allow a number of investors to mutually own a percentage of the asset. Fractional Property Investing is the process of dividing an asset into smaller pieces." },
    { q: "How do I schedule a property viewing?", a: "You can schedule a viewing directly through our platform by clicking the 'Schedule Viewing' button on any property page or by contacting our concierge team." },
    { q: "What is the process for selling a property?", a: "Our expert team provides a comprehensive market analysis, professional photography, and targeted marketing to ensure your property reaches the right buyers quickly." },
    { q: "How do I choose the right real estate agent?", a: "We match you with agents who specialize in your desired neighborhood and property type, ensuring you have the best expertise for your specific needs." },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/3">
          <h2 className="text-4xl md:text-5xl font-medium mb-6">Top questions answered.</h2>
          <p className="text-luxury-gray">Your Questions Answered Everything You Need To Know</p>
        </div>
        <div className="lg:w-2/3 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-black/5 pb-4">
              <button 
                className="w-full flex items-center justify-between py-4 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className={cn(
                  "text-xl font-medium transition-colors",
                  openIndex === i ? "text-luxury-ink" : "text-luxury-gray group-hover:text-luxury-ink"
                )}>{faq.q}</span>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                openIndex === i ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
              )}>
                <p className="text-luxury-gray leading-relaxed text-sm max-w-2xl">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-luxury-ink text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute bottom-[-10%] left-0 w-full text-[25vw] font-bold tracking-tighter opacity-[0.03] pointer-events-none select-none leading-none">
        Living
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <h3 className="text-xl font-bold mb-6">Subscribe to the Prime Newsletter</h3>
            <p className="text-white/50 text-sm mb-8">Every Corner of Serenity Beckons You to Unwind, Relax, and Embrace the Beauty.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="absolute right-2 top-2 bg-white text-luxury-ink px-6 py-2 rounded-full text-xs font-bold hover:bg-opacity-90 transition-all">
                Get Started
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white/70 transition-colors">Terms of use</a></li>
              <li><a href="#" className="hover:text-white/70 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white/70 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Social Media</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-2">
                <Instagram size={16} />
                <a href="#" className="hover:text-white/70 transition-colors">Instagram</a>
              </li>
              <li className="flex items-center space-x-2">
                <Twitter size={16} />
                <a href="#" className="hover:text-white/70 transition-colors">Twitter</a>
              </li>
              <li className="flex items-center space-x-2">
                <Facebook size={16} />
                <a href="#" className="hover:text-white/70 transition-colors">Facebook</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white/70 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white/70 transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-white/70 transition-colors">Land For Sale</a></li>
              <li><a href="#" className="hover:text-white/70 transition-colors">Resources</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/10 text-xs text-white/30 uppercase tracking-widest font-bold">
          <p>© 2026 Living Real Estate. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initial reveal animations for sections
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('section');
      sections.forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });
      });
    }, mainRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [selectedProperty]);

  const handleHomeClick = () => {
    setSelectedProperty(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-luxury-beige font-sans text-luxury-ink selection:bg-luxury-ink selection:text-white">
      <ScrollProgress />
      <BackToTop />
      <Navbar onHomeClick={handleHomeClick} />
      
      {selectedProperty ? (
        <PropertyDetail 
          property={selectedProperty} 
          onHomeClick={handleHomeClick} 
        />
      ) : (
        <main>
          <Hero />
          <Stats />
          <Showcase />
          <Categories />
          <Testimonials />
          <PropertyListing onPropertyClick={(prop) => setSelectedProperty(prop)} />
          <FAQ />
        </main>
      )}
      
      <Footer />
    </div>
  );
}
