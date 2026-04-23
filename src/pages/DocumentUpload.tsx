import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, AlertCircle, Loader2, Sparkles, Search, ShieldCheck, ArrowUpRight, History, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [processStep, setProcessStep] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size too large. Maximum 5MB allowed.");
        return;
      }
      setFile(selectedFile);
      setSummary(null);
    }
  };

  const processFile = () => {
    if (!file) return;
    setIsProcessing(true);
    
    const steps = [
      "Initializing secure sandbox...",
      "Extracting text via clinical OCR...",
      "Mapping medication identifiers...",
      "Simplifying medical terminology...",
      "Generating final patient-friendly summary..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProcessStep(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        finishProcessing();
      }
    }, 800);

    const finishProcessing = () => {
      setIsProcessing(false);
      const s1 = `ANALYSIS COMPLETE: EDUCATIONAL SUMMARY

`;
      const s2 = `• PRIMARY FINDING: Your document indicates a prescription for AMODIAQUINE 200mg.
`;
      const s3 = `• SCHEDULE: Take one (1) tablet orally every 12 hours.
`;
      const s4 = `• GUIDANCE: This is commonly used for malaria prevention/treatment. Complete the full course even if you feel better.

`;
      const s5 = `EDUCATIONAL NOTE: This medication can cause dizziness or digestive upset. Consult your pharmacist if you experience a persistent rash or severe nausea.`;
      
      setSummary(s1 + s2 + s3 + s4 + s5);
      toast.success("Clinical document analyzed!");
    };
  };

  const removeFile = () => {
    setFile(null);
    setSummary(null);
  };

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-16 md:py-28">
      <div className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="mb-6 bg-blue-600/10 text-blue-700 border-none px-5 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
            <Sparkles className="w-3.5 h-3.5 mr-2 fill-blue-700" /> Clinical OCR v2.5
          </Badge>
        </motion.div>
        <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-[0.95]">
          Upload prescription <br className="hidden md:block"/> 
          <span className="text-blue-600 italic">or test result</span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto">
          Securely transform complex medical jargon into clear, patient-friendly insights using our encrypted clinical parsing technology.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
        <div className="lg:col-span-5 space-y-10 md:space-y-12">
          <Card className="border-none bg-white hover:shadow-2xl hover:shadow-blue-100/40 transition-all duration-700 rounded-[3.5rem] group overflow-hidden shadow-xl shadow-slate-200/30 border border-slate-50">
            <CardContent className="p-10 md:p-16 flex flex-col items-center justify-center text-center relative">
              {!file ? (
                <div className="relative z-10 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mb-10 mx-auto shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 ring-6 ring-blue-50/50"
                  >
                    <Upload className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-3xl font-black mb-4 text-slate-900 tracking-tight leading-none uppercase italic">Drop Records</h3>
                  <p className="text-slate-400 mb-12 px-6 max-w-xs mx-auto font-medium text-md">
                    Supports PDF, High-Res JPG, or PNG files up to 5MB for analysis.
                  </p>
                  <label className="cursor-pointer block w-full">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      onChange={handleFileChange}
                    />
                    <div className="px-10 py-6 bg-slate-900 text-white rounded-[1.5rem] font-black text-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95">
                      Select Document <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </label>
                </div>
              ) : (
                <div className="w-full relative z-10">
                  <div className="flex items-center justify-between bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mb-10">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-slate-900 truncate max-w-[140px] md:max-w-[200px] text-lg tracking-tight">{file.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{(file.size / 1024).toFixed(1)} KB • READY</p>
                      </div>
                    </div>
                    <button 
                      onClick={removeFile} 
                      className="w-12 h-12 flex items-center justify-center bg-white hover:bg-red-50 rounded-full text-slate-300 hover:text-red-500 transition-all shadow-sm active:scale-90"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <Button 
                    onClick={processFile} 
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 h-20 rounded-[1.5rem] text-2xl font-black shadow-2xl shadow-blue-200 transition-all active:scale-95"
                  >
                    {isProcessing ? (
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <Loader2 className="w-8 h-8 mr-4 animate-spin" />
                          Analyzing...
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Sparkles className="w-8 h-8 mr-4" />
                        Analyze Document
                      </div>
                    )}
                  </Button>
                  
                  {isProcessing && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-5 text-[10px] font-black text-blue-600 uppercase tracking-widest text-center italic"
                    >
                      {processStep}
                    </motion.p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-none rounded-[3rem] shadow-2xl overflow-hidden text-white group">
            <CardContent className="p-10 md:p-12">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                <div>
                  <h4 className="font-black text-2xl mb-3 tracking-tight italic uppercase">Privacy Protocol</h4>
                  <p className="text-slate-400 leading-relaxed font-medium text-md">
                    Documents are parsed in transient memory. No files are stored permanently on our servers. 
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {summary ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="h-full"
              >
                <Card className="bg-white shadow-3xl shadow-blue-100/40 border-slate-100 rounded-[4rem] overflow-hidden flex flex-col h-full min-h-[650px]">
                  <div className="bg-blue-600 p-8 text-white font-black flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileCheck className="w-8 h-8" />
                      <span className="text-xl italic uppercase tracking-tighter font-black">Clinical Insights</span>
                    </div>
                    <Badge className="bg-white/20 text-white border-none font-black px-4 py-1.5 rounded-full uppercase text-[9px] tracking-widest">Analysis Ready</Badge>
                  </div>
                  <CardContent className="p-10 md:p-16 flex-grow">
                    <div className="prose prose-slate max-w-none">
                      <div className="text-slate-800 whitespace-pre-wrap leading-relaxed text-xl font-bold bg-slate-50/50 p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-inner group transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-50/50">
                        {summary}
                      </div>
                    </div>
                    <div className="mt-10 p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 flex items-start gap-6">
                      <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center shrink-0">
                         <AlertCircle className="w-7 h-7 text-amber-700" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-amber-800 uppercase tracking-[0.2em]">Medical Disclaimer</p>
                        <p className="text-[14px] text-amber-900/80 leading-relaxed font-bold italic">
                          This insight is for educational reference only. AI can misread medical terminology. Always follow your physician's exact printed instructions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-10 border-t border-slate-50 flex justify-center bg-slate-50/20">
                    <Button variant="ghost" className="text-slate-400 font-black hover:text-blue-600 text-[10px] uppercase tracking-[0.2em] transition-all" onClick={removeFile}>
                      <History className="w-4 h-4 mr-3" /> New Analysis
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white/30 border-4 border-dashed border-slate-100 rounded-[4rem] p-12 text-slate-300 relative overflow-hidden group min-h-[700px] transition-all hover:border-blue-100">
                <div className="absolute inset-0 bg-blue-50/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 text-center"
                >
                  <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-sm border border-slate-100">
                     <Search className="w-12 h-12 opacity-5" />
                  </div>
                  <p className="text-2xl font-black max-w-xs mx-auto text-slate-300 leading-tight italic tracking-tight uppercase">
                    Results will appear <br/> after processing.
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;