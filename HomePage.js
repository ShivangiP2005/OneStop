import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      alert('Message sent successfully!');
      setShowContactModal(false);
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-dm-sans">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-2xl px-6 py-4">
        <div className="flex items-center justify-between">
          <img 
            src="https://customer-assets.emergentagent.com/job_6838dcff-eabd-4c97-8161-0cc65dcab5f9/artifacts/o2i1vpec_image.png" 
            alt="Logo" 
            className="h-12 cursor-pointer" 
            data-testid="navbar-logo"
            onClick={() => navigate('/')}
          />
          
          <div className="hidden lg:flex items-center gap-8">
            <DropdownMenu title="Financial Plans" items={[
              'Financial Planning', 'Goal Planning', 'Risk Planning', 'Retirement Planning', 'Tax Saving & Planning'
            ]} />
            <DropdownMenu title="Investment Plans" items={[
              'Mutual Funds', 'SIP', 'Income Returns', 'Gold', 'Wealth Management', 'Portfolio Management'
            ]} />
            <DropdownMenu title="Insurance" items={[
              'Health Insurance', 'Term Insurance', 'Critical Insurance', 'Asset Insurance'
            ]} />
            <button className="text-slate-200 hover:text-emerald-400 transition" onClick={handleLogin} data-testid="navbar-advisor-btn">Advisor</button>
            <button className="text-slate-200 hover:text-emerald-400 transition" onClick={() => setShowContactModal(true)} data-testid="navbar-contact-btn">Contact Us</button>
          </div>

          <div className="hidden lg:flex gap-3">
            <button onClick={handleLogin} className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full transition" data-testid="navbar-login-btn">Login</button>
            <button onClick={handleSignup} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg shadow-emerald-500/20 transition" data-testid="navbar-signup-btn">Sign Up</button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setShowMobileMenu(!showMobileMenu)} data-testid="mobile-menu-toggle">
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-blue-500/10 to-purple-500/5 blur-3xl opacity-50"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-manrope font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight" 
            data-testid="hero-title"
          >
            All Your Financial Goals.
            <br />
            <span className="text-emerald-400">One Trusted Advisor.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg mt-6 max-w-2xl mx-auto" 
            data-testid="hero-subtitle"
          >
            Complete financial planning under one roof. Investments, insurance, retirement, and tax optimization - all managed by trusted experts.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center mt-8"
          >
            <button onClick={handleSignup} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full px-8 py-4 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105" data-testid="hero-start-planning-btn">
              Start Planning
            </button>
            <button onClick={handleLogin} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md rounded-full px-8 py-4 transition-all" data-testid="hero-talk-advisor-btn">
              Talk to an Advisor
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-manrope font-bold text-3xl sm:text-4xl text-center text-white mb-12" data-testid="services-title">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Financial Planning', desc: 'Comprehensive financial roadmap for your future' },
              { title: 'Investments', desc: 'Mutual funds, SIP, gold, and portfolio management' },
              { title: 'Insurance', desc: 'Health, term, critical, and asset protection' },
              { title: 'Retirement', desc: 'Secure your golden years with smart planning' },
              { title: 'Tax Optimization', desc: 'Maximize returns with tax-saving strategies' },
              { title: 'Wealth Management', desc: 'Grow and protect your wealth efficiently' }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:border-emerald-500/30 cursor-pointer"
                onClick={handleLogin}
                data-testid={`service-card-${idx}`}
              >
                <h3 className="font-manrope font-semibold text-xl text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-manrope font-bold text-3xl sm:text-4xl text-center text-white mb-12" data-testid="testimonials-title">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rajesh Kumar', role: 'IT Professional', text: 'One Stop Financial Advisor helped me achieve my retirement goals 5 years ahead of schedule!' },
              { name: 'Priya Sharma', role: 'Business Owner', text: 'Their tax optimization strategies saved me lakhs while building wealth for my family.' },
              { name: 'Amit Patel', role: 'Doctor', text: 'The best financial advisory service in India. Professional, trustworthy, and results-driven.' }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition" 
                data-testid={`testimonial-${idx}`}
              >
                <p className="text-slate-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-manrope font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1120] py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-manrope font-bold text-white mb-4">Financial Plans</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Financial Planning</li>
              <li>Goal Planning</li>
              <li>Risk Management</li>
              <li>Retirement Planning</li>
            </ul>
          </div>
          <div>
            <h3 className="font-manrope font-bold text-white mb-4">Investment Plans</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Mutual Funds</li>
              <li>SIP</li>
              <li>Portfolio Management</li>
              <li>Gold</li>
            </ul>
          </div>
          <div>
            <h3 className="font-manrope font-bold text-white mb-4">Insurance</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Health Insurance</li>
              <li>Term Insurance</li>
              <li>Critical Insurance</li>
              <li>Asset Insurance</li>
            </ul>
          </div>
          <div>
            <h3 className="font-manrope font-bold text-white mb-4">Contact</h3>
            <p className="text-slate-400 text-sm">Email: info@onestopfa.com</p>
            <p className="text-slate-400 text-sm">Phone: +91-1234567890</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-slate-500 text-sm">
          © 2025 One Stop Financial Advisor. All rights reserved.
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowContactModal(false)}>
          <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-white/10" onClick={(e) => e.stopPropagation()} data-testid="contact-modal">
            <h2 className="font-manrope font-bold text-2xl text-white mb-4">Contact Us</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:ring-emerald-500/20 focus:outline-none"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required
                data-testid="contact-name-input"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:ring-emerald-500/20 focus:outline-none"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required
                data-testid="contact-email-input"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:ring-emerald-500/20 focus:outline-none"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                required
                data-testid="contact-message-input"
              ></textarea>
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg px-6 py-3 transition" data-testid="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1 text-slate-200 hover:text-emerald-400 transition">
        {title} <ChevronDown size={16} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 bg-slate-900 border border-white/10 rounded-xl p-2 min-w-[200px] shadow-xl backdrop-blur-md">
          {items.map((item, idx) => (
            <div key={idx} className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition" onClick={() => navigate('/login')}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;