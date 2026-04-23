import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, Lock, EyeOff } from "lucide-react";

const Privacy = () => {
  return (
    <div className="flex-grow max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Privacy & Trust</h1>
          <p className="text-xl text-slate-500 font-medium">How we handle your data with medical-grade security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            { icon: ShieldCheck, title: "HIPAA Validated", desc: "Our infrastructure follows strict medical data privacy standards." },
            { icon: Lock, title: "End-to-End Encryption", desc: "All chat sessions and document scans are fully encrypted." },
            { icon: EyeOff, title: "Zero Data Persistence", desc: "We do not store your medical data on our servers after analysis." },
            { icon: ShieldAlert, title: "Safety Protocol", desc: "Automated emergency detection is our priority." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl">
               <item.icon className="w-10 h-10 text-blue-600 mb-6" />
               <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
               <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate max-w-none bg-slate-900 text-white p-12 rounded-[40px] shadow-2xl">
           <h2 className="text-3xl font-black mb-8 text-white">Commitment to Patients</h2>
           <p className="text-slate-400 font-medium leading-loose mb-6">
             At MediGuide AI, we believe health data is the most sensitive information a person owns. 
             Our technology is designed from the ground up to analyze, guide, and protect without compromising anonymity.
           </p>
           <ul className="space-y-4 text-slate-300 font-bold">
             <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> No advertising based on health data.</li>
             <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> No selling data to third parties.</li>
             <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Immediate deletion of session data upon logout.</li>
           </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;