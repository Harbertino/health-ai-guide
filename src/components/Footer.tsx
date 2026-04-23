import { Link } from "react-router-dom";
import { Heart, ShieldCheck, Mail, Phone, ExternalLink, ShieldAlert, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">MediGuide AI</span>
            </Link>
            <p className="text-slate-400 max-w-sm font-medium text-sm">Secure, intelligence-driven health guidance and document accessibility.</p>
            <div className="flex gap-4"><Twitter className="w-5 h-5 text-slate-500" /><Linkedin className="w-5 h-5 text-slate-500" /><Github className="w-5 h-5 text-slate-500" /></div>
          </div>
          <div>
            <h4 className="font-black text-[10px] mb-8 uppercase tracking-widest text-slate-500">Navigation</h4>
            <ul className="space-y-4">
              {[{l: "Home", p: "/"}, {l: "Symptom Check", p: "/check"}, {l: "Document Analysis", p: "/upload"}, {l: "Privacy", p: "/privacy"}].map((link, i) => (
                <li key={i}><Link to={link.p} className="text-slate-400 hover:text-white text-sm font-bold">{link.l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] mb-8 uppercase tracking-widest text-slate-500">Support</h4>
            <div className="space-y-4">
              <a href="mailto:support@mediguide.ai" className="flex items-center gap-3 text-slate-400 text-sm font-bold bg-white/5 p-4 rounded-2xl"><Mail className="w-4 h-4" /> support@mediguide.ai</a>
              <div className="flex items-center gap-3 text-slate-400 text-sm font-bold bg-white/5 p-4 rounded-2xl"><Phone className="w-4 h-4" /> +1 (800) MEDI-GUI</div>
            </div>
          </div>
          <div>
            <h4 className="font-black text-[10px] mb-8 uppercase tracking-widest text-slate-500">Trust Center</h4>
            <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
               <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3" />
               <p className="text-[10px] font-black uppercase mb-1">Privacy First</p>
               <p className="text-[11px] text-slate-500 font-medium">GDPR & HIPAA compliant data handling protocols.</p>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10">
          <div className="bg-red-600/10 rounded-3xl p-8 mb-12 border border-red-600/30">
            <div className="flex items-center gap-3 mb-4"><ShieldAlert className="w-5 h-5 text-red-500" /><h5 className="text-[10px] font-black text-red-500 uppercase tracking-widest">Medical Disclosure</h5></div>
            <p className="text-xs text-red-100/60 leading-relaxed font-medium">MediGuide AI is for educational purposes only. If you have a medical emergency, call 911 immediately.</p>
          </div>
          <div className="flex justify-between items-center"><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© {new Date().getFullYear()} MediGuide AI. Investor Demo Build.</p><div className="flex gap-6"><Link to="/privacy" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Privacy Policy</Link></div></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;