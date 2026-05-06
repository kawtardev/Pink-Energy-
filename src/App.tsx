/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { Menu, X, ShoppingCart, Twitter, Instagram, Youtube, ChevronDown, Check } from 'lucide-react';

// --- Assets / Reusable UI ---

const MonsterLogo = ({ size = 48, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={`${className} drop-shadow-[0_0_10px_#FF2D78]`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M30 20C30 20 25 40 25 60C25 80 30 90 30 90M50 10C50 10 45 40 45 65C45 90 50 100 50 100M70 20C70 20 65 40 65 60C65 80 70 90 70 90" 
      stroke="#FF2D78" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
  </svg>
);

const CanMockup = ({ primaryColor = "#FF2D78", label = "ULTRA ROSA", className = "" }) => (
  <div className={`relative w-48 h-80 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-black-surface to-black-void rounded-[2rem] border-2 border-white/10 overflow-hidden shadow-2xl">
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${primaryColor}, transparent)` }}
      />
      <div className="absolute inset-x-0 bottom-12 text-center transform -rotate-90 origin-center whitespace-nowrap">
        <span className="text-4xl font-display text-white/90 tracking-tighter opacity-80 uppercase">{label}</span>
      </div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <MonsterLogo size={60} className="opacity-100" />
      </div>
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-white/20 to-transparent" />
    </div>
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-chrome rounded-t-lg shadow-inner" />
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Products', 'About', 'Athletes', 'Shop'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'bg-black-void/80 backdrop-blur-xl py-3 border-b border-pink-neon/20' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <MonsterLogo size={40} />
          <span className="font-display text-2xl tracking-tighter hidden sm:block">MONSTER</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="font-condensed font-bold uppercase tracking-widest text-white/70 hover:text-pink-neon transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-neon transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="cta-btn text-sm py-2 px-6">BUY NOW</button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-pink-neon">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black-void z-[999] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="font-display text-4xl hover:text-pink-neon transition-colors"
              >
                {link}
              </a>
            ))}
            <button className="cta-btn mt-4">BUY NOW</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black-void" />
        <motion.div 
          animate={{ 
            background: [
              "radial-gradient(circle at 20% 30%, rgba(255, 45, 120, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(255, 45, 120, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(255, 45, 120, 0.15) 0%, transparent 50%)"
            ] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="font-condensed font-bold text-pink-neon tracking-[0.3em] uppercase block mb-4">
            MONSTER ENERGY. LIMITED PINK EDITION.
          </span>
          <h1 className="text-6xl md:text-9xl mb-8 leading-none">
            UNLEASH <br />
            <span className="neon-text">THE PINK</span>
          </h1>
          <div className="flex flex-wrap gap-4">
            <button className="cta-btn">SHOP NOW</button>
            <button className="ghost-btn">WATCH THE DROP</button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center md:justify-end"
        >
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <CanMockup primaryColor="#FF2D78" label="ULTRA ROSA" className="scale-125 md:scale-150" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-pink-neon cursor-pointer"
        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={40} />
      </motion.div>

      {/* Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-pink-neon rounded-full"
          initial={{ 
            x: Math.random() * 2000 - 1000, 
            y: Math.random() * 2000 - 1000,
            opacity: Math.random() * 0.5 
          }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
            y: "-=100" 
          }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
        />
      ))}
    </section>
  );
};

const Products = () => {
  const flavors = [
    { name: "Ultra Rosa", color: "#FF2D78", desc: "Floral, light and slightly sweet with a crisp finish.", tags: ["Zero Sugar", "Ultra"] },
    { name: "Pipeline Punch", color: "#FF70A6", desc: "A perfect blend of Hawaiian flavors: passion fruit, orange, and guava.", tags: ["Juice", "Punch"] },
    { name: "Mango Loco", color: "#FFB347", desc: "A heavenly blend of exotic juices to attract even the most stubborn spirit.", tags: ["Juice", "Crazy Good"] },
    { name: "Pink Lemonade", color: "#FF1493", desc: "Classic lemonade with a pink Monster twist. Electrifying energy.", tags: ["Classic", "Limited"] }
  ];

  return (
    <section id="products" className="py-24 bg-black-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4">THE LINEUP</h2>
          <div className="w-24 h-1 bg-pink-neon mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {flavors.map((f, i) => (
            <motion.div 
              key={f.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-black-surface p-8 rounded-3xl border border-white/5 hover:border-pink-neon transition-all duration-500 group shadow-lg"
            >
              <div className="flex justify-center mb-8 group-hover:-translate-y-4 transition-transform duration-500">
                <CanMockup primaryColor={f.color} label={f.name} className="scale-90" />
              </div>
              <h3 className="text-2xl font-condensed mb-2 text-white group-hover:text-pink-neon transition-colors">{f.name}</h3>
              <p className="text-white/60 text-sm mb-6 line-clamp-2">{f.desc}</p>
              <div className="flex gap-2 mb-8">
                {f.tags.map(t => <span key={t} className="text-[10px] uppercase font-bold tracking-widest text-pink-neon px-2 py-1 border border-pink-neon/20 rounded-full">{t}</span>)}
              </div>
              <button className="cta-btn w-full py-2 text-sm">ADD TO CART</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsBar = () => {
  const stats = [
    { value: 200, suffix: "M+", label: "Cans Sold Monthly" },
    { value: 100, suffix: "+", label: "Countries Worldwide" },
    { value: 1, prefix: "#", label: "Energy Drink Brand" },
    { value: 30, suffix: "+", label: "Athlete Sponsorships" }
  ];

  return (
    <section id="stats" className="py-20 bg-black-void border-y border-pink-neon/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-5xl md:text-7xl font-display text-pink-neon mb-2">
                <span>{s.prefix}</span>
                <Counter value={s.value} />
                <span>{s.suffix}</span>
              </div>
              <div className="font-condensed font-bold tracking-widest uppercase opacity-60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 overflow-hidden py-6 border-t border-white/5 whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center font-condensed font-bold text-4xl uppercase tracking-[0.2em] opacity-40"
        >
          {['ZARA VEX', 'KAI NEON', 'RIV STORM', 'LUNA BLAZE', 'DAX RIOT', 'YUKI ZERO', 'ZARA VEX', 'KAI NEON', 'RIV STORM', 'LUNA BLAZE', 'DAX RIOT', 'YUKI ZERO'].map((name, i) => (
            <span key={i} className={i % 2 === 0 ? "text-pink-neon" : "text-white"}>{name}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
};

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full bg-pink-neon/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="font-bold text-pink-neon uppercase tracking-widest text-sm block mb-4">THE STORY</span>
          <h2 className="text-5xl md:text-7xl mb-8 leading-tight">BORN TO BE <br /><span className="neon-text">DIFFERENT</span></h2>
          <div className="space-y-6 text-white/70 font-sans leading-relaxed">
            <p>At Monster Energy, we don't just sell an energy drink. We represent a culture. The Pink Edition isn't a trend; it's a declaration of power, individuality, and raw energy. We've taken the intensity of our heritage and infused it with a neon-soaked future.</p>
            <p>Whether you're hitting the ramps, dominating the leaderboard, or owning the night, the Pink Edition provides the fuel to sustain your ambition. It's the taste of victory reimagined in a universe where the rules don't exist.</p>
            <p>Unleash the Beast. Unleash the Pink.</p>
          </div>
          <button className="ghost-btn mt-10">READ MORE</button>
        </div>

        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[120%] aspect-square border-2 border-pink-neon/10 rounded-full border-dashed" />
          </motion.div>
          <div className="relative z-10 flex items-center justify-center p-12 bg-black-surface/50 rounded-[4rem] border border-white/5 backdrop-blur-sm">
            <MonsterLogo size={240} className="scale-125" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Athletes = () => {
  const athletes = [
    { name: "Zara Vex", sport: "BMX", color: "from-[#FF2D78]" },
    { name: "Kai Neon", sport: "Gaming", color: "from-blue-600" },
    { name: "Riv Storm", sport: "Surf", color: "from-cyan-400" },
    { name: "Luna Blaze", sport: "Skateboard", color: "from-orange-500" },
    { name: "Dax Riot", sport: "Motocross", color: "from-red-600" },
    { name: "Yuki Zero", sport: "Snowboard", color: "from-indigo-400" }
  ];

  return (
    <section id="athletes" className="py-24 bg-black-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl">MONSTERS IN THE WILD</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {athletes.map((a, i) => (
            <motion.div 
              key={a.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${a.color} to-black-void/40 opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                <span className="text-pink-neon text-xs font-bold uppercase tracking-widest mb-2 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{a.sport}</span>
                <h4 className="text-4xl font-display mb-4">{a.name}</h4>
                <div className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">VIEW PROFILE →</div>
              </div>
              <div className="absolute inset-0 border-4 border-pink-neon opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="cta-btn">SEE ALL ATHLETES</button>
        </div>
      </div>
    </section>
  );
};

const ShopSection = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 30, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date();
      target.setDate(target.getDate() + 30);
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bundles = [
    { name: "Single Can", price: "2.99", action: "Try It", popular: false },
    { name: "12-Pack", price: "24.99", action: "Most Popular", popular: true },
    { name: "24-Pack", price: "44.99", action: "Best Value", popular: false }
  ];

  return (
    <section id="shop" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-neon/10 blur-[200px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block px-4 py-1 bg-pink-neon text-black-void font-bold text-xs uppercase rounded-full mb-8"
        >
          LIMITED DROP
        </motion.div>

        <h2 className="text-6xl md:text-[10rem] leading-none mb-12">
          GET YOURS <br /> BEFORE <br /> <span className="neon-text">IT'S GONE</span>
        </h2>

        <div className="flex justify-center gap-4 md:gap-12 mb-20">
          {Object.entries(timeLeft).map(([k, v]) => (
            <div key={k} className="text-center">
              <div className="text-4xl md:text-7xl font-display text-pink-neon">{v.toString().padStart(2, '0')}</div>
              <div className="text-xs uppercase tracking-widest opacity-60 uppercase">{k === 'd' ? 'Days' : k === 'h' ? 'Hours' : k === 'm' ? 'Mins' : 'Secs'}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {bundles.map((b) => (
            <div key={b.name} className={`bg-black-surface p-10 rounded-3xl transition-all duration-300 border ${b.popular ? 'border-pink-neon scale-105 shadow-[0_0_40px_rgba(255,45,120,0.3)]' : 'border-white/5'}`}>
              <h4 className="text-2xl font-condensed font-bold mb-2 uppercase">{b.name}</h4>
              <div className="text-4xl font-display text-pink-neon mb-4">£{b.price}</div>
              {b.popular && <span className="text-[10px] text-pink-neon uppercase font-bold tracking-widest block mb-6">BEST SELLER</span>}
              <button className="cta-btn w-full">ADD TO CART</button>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-10 opacity-60">
          {['Free Shipping Over £30', '30-Day Returns', 'Secure Checkout', 'UK Stocked'].map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <Check className="text-pink-neon" size={16} />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [easterEgg, setEasterEgg] = useState(false);

  const triggerEasterEgg = () => {
    setEasterEgg(true);
    setTimeout(() => setEasterEgg(false), 300);
  };

  return (
    <footer className="bg-black-void pt-24 pb-12 border-t-2 border-pink-neon relative">
      <AnimatePresence>
        {easterEgg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[9999] bg-pink-neon" 
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={triggerEasterEgg}>
            <MonsterLogo size={60} />
            <span className="font-display text-4xl tracking-tighter">MONSTER</span>
          </div>
          <p className="text-pink-neon font-condensed font-bold uppercase tracking-widest">Unleash The Beast</p>
        </div>

        <div>
          <h5 className="font-display text-xl mb-8">Quick Links</h5>
          <ul className="space-y-4 text-white/50 font-condensed font-bold uppercase tracking-widest text-sm">
            {['Home', 'Products', 'Athletes', 'About', 'Blog'].map(link => (
              <li key={link} className="hover:text-pink-neon cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-display text-xl mb-8">Support</h5>
          <ul className="space-y-4 text-white/50 font-condensed font-bold uppercase tracking-widest text-sm">
            {['FAQ', 'Shipping', 'Returns', 'Contact', 'Wholesale'].map(link => (
              <li key={link} className="hover:text-pink-neon cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-display text-xl mb-8">JOIN THE PACK</h5>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="ENTER EMAIL" 
              className="bg-black-surface border border-white/10 rounded-full px-6 py-2 w-full focus:outline-none focus:border-pink-neon text-sm transition-colors"
            />
            <button className="cta-btn text-xs py-2 px-6">JOIN</button>
          </div>
          <div className="flex gap-6 mt-10 text-pink-neon">
            <Instagram size={24} className="hover:scale-110 transition-transform cursor-pointer" />
            <Twitter size={24} className="hover:scale-110 transition-transform cursor-pointer" />
            <Youtube size={24} className="hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">
        <span>© 2024 Monster Energy Company. All Rights Reserved.</span>
        <div className="flex gap-8">
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative text-white selection:bg-pink-neon selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <StatsBar />
        <About />
        <Athletes />
        <ShopSection />
      </main>
      <Footer />
    </div>
  );
}
