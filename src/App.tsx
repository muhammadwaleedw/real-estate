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
  ArrowUp
} from 'lucide-react';
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

const Navbar = () => {
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
      isScrolled ? "bg-luxury-beige/80 backdrop-blur-lg py-4 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter">Living</div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium uppercase tracking-widest opacity-70">
          <a href="#" className="hover:opacity-100 transition-opacity">About Us</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Land For Sale</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Resources</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden sm:block bg-luxury-ink text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">
            Sign Up
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
        <div className="md:hidden absolute top-full left-0 w-full bg-luxury-beige border-t border-black/5 p-6 flex flex-col space-y-6 shadow-xl">
          <a href="#" className="text-lg font-medium">About Us</a>
          <a href="#" className="text-lg font-medium">Land For Sale</a>
          <a href="#" className="text-lg font-medium">Resources</a>
          <a href="#" className="text-lg font-medium">Contact Us</a>
          <button className="bg-luxury-ink text-white w-full py-4 rounded-full font-medium">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

      // Parallax + Zoom effect
      gsap.to(imageRef.current, {
        yPercent: 15,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12">
          <div className="max-w-3xl">
            <h1 className="hero-reveal text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] mb-8">
              Discover <span className="italic font-light">Modern Homes</span> Tailored to Your Lifestyle
            </h1>
            <div className="hero-reveal flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border border-luxury-ink flex items-center justify-center animate-bounce">
                <ArrowDown size={20} />
              </div>
              <p className="text-luxury-gray max-w-xs text-sm uppercase tracking-widest">
                Explore our curated collection of architectural masterpieces.
              </p>
            </div>
          </div>
          
          <div className="hero-reveal hidden lg:block bg-white p-6 rounded-[24px] shadow-xl shadow-black/5 max-w-xs mt-12 lg:mt-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-luxury-sand overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span>4.8 Rating</span>
              </div>
            </div>
            <p className="text-sm text-luxury-gray italic">
              "The most seamless property search experience I've ever had. Truly exceptional design."
            </p>
          </div>
        </div>

        <div className="hero-reveal relative w-full h-[500px] md:h-[700px] rounded-[32px] overflow-hidden">
          <img 
            ref={imageRef}
            src="https://picsum.photos/seed/modern-house-1/1920/1080" 
            alt="Modern architectural home" 
            className="w-full h-[120%] object-cover absolute top-[-10%] will-change-transform"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-end justify-between text-white">
            <div className="glass p-6 rounded-[24px] max-w-sm mb-6 md:mb-0">
              <h3 className="text-xl font-medium mb-2">Etalon City Real Estate</h3>
              <p className="text-sm opacity-80 mb-4">
                This premier development offers a range of high-end residential spaces designed with meticulous attention to detail.
              </p>
              <button className="flex items-center space-x-2 text-sm font-bold group">
                <span>See Detail</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm font-medium uppercase tracking-widest">
              <span>01</span>
              <div className="w-12 h-[1px] bg-white/50" />
              <span className="opacity-50">04</span>
            </div>
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

const Testimonials = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-medium mb-20">
          See Other People Who Have <br /> Lived In Our Residence
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-1">Gregg Bergstrom</h4>
              <p className="text-sm text-luxury-gray uppercase tracking-widest">Marketing Executive</p>
            </div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12">
              "Working with Living was a fantastic experience from start to finish. They listened to exactly what I wanted, and within a few short weeks, I found my dream home. The team was knowledgeable, responsive, and made the entire process so easy. I truly felt supported."
            </p>
            <div className="flex space-x-4">
              <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-luxury-ink hover:text-white transition-all">
                <ChevronLeft size={20} />
              </button>
              <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-luxury-ink hover:text-white transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-square rounded-[32px] overflow-hidden">
              <img 
                src="https://picsum.photos/seed/person-1/800/800" 
                alt="Testimonial" 
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

const PropertyListing = () => {
  const properties = [
    { name: 'EcoSerene Haven Residences', price: '$350,000', beds: 3, baths: 2, sqft: 1400, img: 'https://picsum.photos/seed/prop1/800/600' },
    { name: 'Luxe Haven Residences', price: '$420,000', beds: 4, baths: 2, sqft: 2000, img: 'https://picsum.photos/seed/prop2/800/600' },
    { name: 'Urban Oasis Apartments', price: '$510,000', beds: 3, baths: 2, sqft: 1800, img: 'https://picsum.photos/seed/prop3/800/600' },
  ];

  return (
    <section className="section-padding bg-luxury-beige">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-medium max-w-md leading-tight">
            So, what kind of home do you want to realize?
          </h2>
          <p className="text-luxury-gray max-w-xs text-sm mt-6 md:mt-0">
            Every corner of serenity beckons you to unwind, relax, and embrace the beauty of nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((prop, i) => (
            <div key={i} className="luxury-card group">
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
      </div>
    </section>
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
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen">
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Showcase />
        <Categories />
        <Testimonials />
        <PropertyListing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
