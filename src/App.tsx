import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home, MessageSquare, FileText, User, ShieldAlert, Heart, Menu, X, AlertTriangle, Mail, Facebook, Twitter, Instagram, Phone, Info, HelpCircle, ChevronRight, Github, ShieldCheck } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "./pages/LandingPage";
import SymptomChecker from "./pages/SymptomChecker";
import DocumentUpload from "./pages/DocumentUpload";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";

const DisclaimerBanner = () => {
  return (
    <div className="bg-slate-900 text-white py-2.5 px-4 text-center sticky top-0 z-[60] shadow-md border-b border-white/5 overflow-hidden">
      <motion.div 
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-[10px] md:text-[11px] font-black flex items-center justify-center gap-3 uppercase tracking-[0.15em]"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        Medical Disclaimer: Educational use only • Not for diagnosis • Call emergency services if in danger
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Symptom Check", path: "/check", icon: MessageSquare },
    { name: "Upload Doc", path: "/upload", icon: FileText },
    { name: "Health Profile", path: "/profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-[36px] md:top-[40px] z-50 bg-white/90 backdrop-blur-2xl border-b border-slate-100/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 md:h-22 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1, y: -2 }}
              className="w-11 h-11 bg-blue-600 rounded-[14px] flex items-center justify-center shadow-lg shadow-blue-200"
            >
              <Heart className="w-6 h-6 text-white fill-white/20" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-slate-900 leading-none">
                MediGuide<span className="text-blue-600">AI</span>
              </span>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-0.5">Investor Demo</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-2 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "text-slate-500 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/privacy" className="ml-4 p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all">
              <ShieldAlert className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
             <Link to="/check" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                <MessageSquare className="w-5 h-5" />
             </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-2xl text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden bg-white fixed right-0 top-0 h-full w-[85%] z-[70] shadow-2xl border-l border-slate-100"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <Heart className="w-5 h-5 text-white fill-white/20" />
                  </div>
                  <span className="font-black text-xl">Menu</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-3 rounded-2xl bg-slate-50 text-slate-900 shadow-sm"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-3 flex-grow">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-5 px-6 py-5 rounded-[2rem] text-lg font-bold transition-all ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white shadow-2xl shadow-blue-200"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-8 border-t border-slate-100 mt-auto">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Support & Information</p>
                 <div className="grid grid-cols-2 gap-3">
                    <Link to="/privacy" className="flex flex-col p-4 bg-slate-50 rounded-2xl gap-2" onClick={() => setIsOpen(false)}>
                       <ShieldAlert className="w-5 h-5 text-blue-600" />
                       <span className="text-[11px] font-black uppercase">Privacy</span>
                    </Link>
                    <a href="mailto:support@mediguide.ai" className="flex flex-col p-4 bg-slate-50 rounded-2xl gap-2">
                       <HelpCircle className="w-5 h-5 text-blue-600" />
                       <span className="text-[11px] font-black uppercase">Support</span>
                    </a>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-12 px-4 relative overflow-hidden mt-auto">
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                MediGuide<span className="text-blue-600">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 mb-8 text-[15px] leading-relaxed font-medium max-w-xs">
              Bridging clinical logic and patient understanding through secure, structured AI health guidance.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[11px] mb-8">Platform Experience</h4>
            <ul className="space-y-5">
              <li><Link to="/check" className="text-slate-600 hover:text-blue-600 font-bold text-[14px] transition-colors flex items-center gap-2 group">Symptom Checker <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /></Link></li>
              <li><Link to="/upload" className="text-slate-600 hover:text-blue-600 font-bold text-[14px] transition-colors flex items-center gap-2 group">Document Analysis <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /></Link></li>
              <li><Link to="/profile" className="text-slate-600 hover:text-blue-600 font-bold text-[14px] transition-colors flex items-center gap-2 group">Health Profile <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[11px] mb-8">Legal & Policy</h4>
            <ul className="space-y-5">
              <li><Link to="/privacy" className="text-slate-600 hover:text-blue-600 font-bold text-[14px] transition-colors">Privacy Policy</Link></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 font-bold text-[14px] transition-colors">Terms of Service</a></li>
              <li><Link to="/privacy" className="text-red-500 hover:text-red-600 font-black text-[12px] uppercase tracking-widest flex items-center gap-2 border border-red-100 bg-red-50/50 px-3 py-1.5 rounded-lg w-fit">
                <AlertTriangle className="w-3.5 h-3.5" /> Clinical Disclaimer
              </Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[11px] mb-8">Direct Support</h4>
            <div className="space-y-6">
              <a href="mailto:support@mediguide.ai" className="block p-5 bg-slate-50 hover:bg-white border border-slate-100 rounded-2xl group transition-all hover:shadow-lg hover:shadow-blue-100/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Support</p>
                    <p className="text-[13px] font-bold text-slate-900">support@mediguide.ai</p>
                  </div>
                </div>
              </a>
              <a href="tel:1800MEDIGUIDE" className="block p-5 bg-slate-50 hover:bg-white border border-slate-100 rounded-2xl group transition-all hover:shadow-lg hover:shadow-blue-100/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Helpline</p>
                    <p className="text-[13px] font-bold text-slate-900">1-800-MEDI-AI</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} MediGuide AI Protocol v1.6.0
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Investor-Ready MVP
              </span>
              <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> Secure SSL
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Built for Patient Empowerment</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FDFEFF] flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
        <DisclaimerBanner />
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10">
          <div className="fixed top-0 right-0 -z-0 w-[800px] h-[800px] bg-blue-50/40 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="fixed bottom-0 left-0 -z-0 w-[600px] h-[600px] bg-indigo-50/30 rounded-full blur-[140px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/check" element={<SymptomChecker />} />
              <Route path="/upload" element={<DocumentUpload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <Toaster position="top-center" expand={true} richColors closeButton theme="light" />
      </div>
    </Router>
  );
}

export default App;