import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Activity, FileText, Zap, Heart, Star, Users, ChevronRight, ShieldAlert, HeartPulse, Stethoscope, Pill, AlertTriangle, PhoneCall, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LandingPage = () => {
  const features = [
    {
      title: "Safe Classification",
      description: "Advanced triage logic that guides you toward self-care, pharmacists, or doctors without diagnostic guesswork.",
      icon: HeartPulse,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Doc Summarization",
      description: "Clinical OCR technology to extract medical test results and prescriptions into patient-friendly insights.",
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Red Flag Detection",
      description: "High-priority monitoring for emergency symptoms to ensure you get professional help when minutes matter.",
      icon: ShieldAlert,
      color: "bg-red-100 text-red-600",
    },
  ];

  const stats = [
    { label: "Check Accuracy", value: "98.2%", icon: Activity },
    { label: "Data Secured", value: "100%", icon: ShieldCheck },
    { label: "Global Presence", value: "24", icon: Users },
  ];

  const steps = [
    { num: "01", title: "Log Symptoms", desc: "Describe what you're feeling in plain English. No complex medical terminology needed." },
    { num: "02", title: "Smart Analysis", desc: "Our engine analyzes duration, age, and severity using structured clinical logic protocols." },
    { num: "03", title: "Actionable Path", desc: "Receive clear, safe next steps: Self-care, Pharmacist, Doctor Visit, or Emergency." },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 md:pt-40 md:pb-52 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none -z-10">
           <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px]" />
           <div className="absolute top-60 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left relative z-10"
          >
            <div className="inline-flex items-center gap-3 mb-8 bg-slate-900 text-white px-5 py-2 rounded-[14px] shadow-2xl">
              <Zap className="w-4 h-4 text-blue-400 fill-blue-400" /> 
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Investor Demo Ready</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.95] md:leading-[0.85]">
              Health Guidance <br/>
              <span className="text-blue-600 italic font-black">Simplified</span>. <br/>
              Safe & Secure.
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-medium">
              Empowering thousands with structured symptom checks and secure clinical document analysis. Built for safety, speed, and privacy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button asChild size="lg" className="rounded-[2rem] px-12 h-20 bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-200 text-xl md:text-2xl font-black group transition-all hover:-translate-y-2 active:scale-95">
                <Link to="/check">
                  Start Health Check <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-[2rem] px-10 h-20 text-slate-900 hover:bg-slate-50 text-lg md:text-xl font-bold transition-all border border-slate-100 bg-white shadow-sm">
                <Link to="/upload">Upload Records</Link>
              </Button>
            </div>

            <div className="mt-16 flex items-center gap-6 p-5 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/50 inline-flex shadow-sm">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-xl border-4 border-white bg-slate-100 overflow-hidden shadow-lg ring-1 ring-slate-100">
                      <img src={`https://i.pravatar.cc/150?u=health${i+300}`} alt="user" className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
                <div>
                   <p className="text-xs font-black text-slate-900 tracking-tight">15k+ Global Users</p>
                   <div className="flex text-amber-400 mt-1 gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400" />)}
                      <span className="text-[9px] text-slate-400 font-black uppercase ml-2 tracking-widest italic">Clinical Grade</span>
                   </div>
                </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full relative"
          >
            <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(37,99,235,0.2)] border-[12px] border-white bg-white group">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/72dc0290-4500-4fec-8643-39c0f3a3f00e/hero-medical-ai-dashboard-ac8dc739-1775660042828.webp" 
                alt="MediGuide Hero" 
                className="object-cover w-full h-full aspect-[4/5] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent pointer-events-none" />
            </div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-4 md:-right-8 bg-white p-6 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-50 flex items-center gap-5 hidden sm:flex z-20"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Logic Accuracy</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">98.2%</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Onboarding / Process Visualization */}
      <section className="py-28 md:py-40 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <Badge className="mb-4 bg-blue-600/10 text-blue-700 border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">Onboarding Flow</Badge>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-none italic">Structured <span className="text-blue-600 not-italic">Health Path</span></h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
              Our clinical triage engine ensures you get the right advice at the right time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group"
              >
                <Card className="border-none shadow-xl shadow-slate-200/40 bg-white rounded-[3rem] p-10 h-full transition-all hover:-translate-y-2 duration-500 border border-slate-50/50">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-8 shadow-xl group-hover:bg-blue-600 transition-colors duration-500 ring-4 ring-slate-50">
                    <span className="text-2xl font-black italic">{step.num}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-6 text-slate-900 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-lg">
                    {step.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-10">
             <div className="max-w-md rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/72dc0290-4500-4fec-8643-39c0f3a3f00e/triage-process-visual-f0a92ec5-1775660469677.webp" 
                  alt="Triage Process"
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="max-w-md space-y-6">
                <h3 className="text-3xl font-black text-slate-900 leading-tight">Simplified clinical logic for patient empowerment.</h3>
                <p className="text-slate-500 font-medium text-lg">We bridge the gap between complex symptoms and professional care with transparent, multi-step triage.</p>
                <Button asChild size="lg" className="rounded-2xl px-12 bg-blue-600 hover:bg-blue-700 h-16 text-lg font-black shadow-xl">
                   <Link to="/check">Start Health Check Now</Link>
                </Button>
             </div>
          </div>
        </div>
      </section>

      {/* Triage / Tiers Section */}
      <section className="py-28 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1 order-2 md:order-1">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {features.map((feature, idx) => (
                      <Card key={idx} className="border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                            <feature.icon className="w-7 h-7" />
                         </div>
                         <h4 className="text-xl font-black mb-3">{feature.title}</h4>
                         <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.description}</p>
                      </Card>
                    ))}
                    <Card className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-center items-center text-center">
                       <ShieldCheck className="w-12 h-12 text-blue-400 mb-4" />
                       <p className="text-white font-black text-lg">100% HIPAA Ready</p>
                       <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest">Secure Data Protocol</p>
                    </Card>
                 </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                 <Badge className="mb-4 bg-indigo-50 text-indigo-700 border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">Clinical Integrity</Badge>
                 <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-none italic">Built for <span className="text-indigo-600 not-italic">Safety First</span>.</h2>
                 <p className="text-slate-500 text-xl font-medium leading-relaxed mb-10">
                   Our infrastructure is designed to provide high-fidelity educational guidance while strictly avoiding definitive diagnosis.
                 </p>
                 <div className="flex items-center gap-6">
                    <img 
                      src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/72dc0290-4500-4fec-8643-39c0f3a3f00e/clinical-team-photo-55894a27-1775660470484.webp" 
                      alt="Clinical Team"
                      className="w-24 h-24 rounded-full border-4 border-slate-100 object-cover shadow-lg"
                    />
                    <div>
                       <p className="text-slate-900 font-black text-lg italic">Clinical Partnership Network</p>
                       <p className="text-slate-500 text-sm font-medium">Verified by medical professionals for triage logic accuracy.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-28 md:py-40 px-4 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="w-20 h-20 bg-red-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-10 shadow-3xl border border-white/10 animate-pulse">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none italic uppercase">Don't Wait. <br/> Get Help.</h2>
          <p className="text-slate-400 mb-16 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            If you experience critical signs like chest pain or difficulty breathing, call emergency services immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
            <a 
              href="tel:911" 
              className="px-12 py-6 bg-red-600 text-white rounded-[1.5rem] font-black text-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 flex items-center gap-4 hover:scale-105"
            >
              <PhoneCall className="w-7 h-7" /> Dial 911 Now
            </a>
          </div>
        </div>
      </section>
      
      {/* Final Disclaimer */}
      <section className="py-20 bg-white px-4 text-center border-t border-slate-50">
        <div className="max-w-4xl mx-auto">
           <Badge variant="outline" className="mb-8 border-slate-200 text-slate-400 px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">Legal Notice</Badge>
           <p className="text-[10px] text-slate-400 italic leading-loose font-bold uppercase tracking-tight">
             MediGuide AI provides educational health insights based on limited user input. It is not a clinical diagnosis tool. Always consult a licensed clinician for medical decisions and long-term treatment.
           </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;