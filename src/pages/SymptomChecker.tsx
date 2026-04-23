import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RefreshCcw, User, Bot, AlertTriangle, ChevronRight, Clock, ShieldCheck, Stethoscope, Sparkles, PhoneCall, HeartPulse, Pill, Calendar, Activity, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isEmergency?: boolean;
  classification?: "self-care" | "pharmacist" | "doctor" | "emergency";
  options?: string[];
}

type FlowStep = "symptom" | "age" | "duration" | "result";

const SymptomChecker = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm your MediGuide AI assistant. I'm here to help classify your symptoms into safe, actionable next steps.

To begin, please describe your primary symptom or physical concern in a few words.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<FlowStep>("symptom");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [data, setData] = useState({
    symptom: "",
    age: "",
    duration: "",
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const savedProfile = localStorage.getItem("mediguide_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
  }, []);

  const handleSend = async (customInput?: string) => {
    const text = customInput || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      processNextStep(text);
    }, 800);
  };

  const processNextStep = (currentInput: string) => {
    let nextMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "" };
    
    // Emergency Check
    const emergencyKeywords = ["chest pain", "breathing", "bleeding", "unconscious", "seizure", "stroke", "heart attack", "choking", "poison", "vision loss", "sudden numbness", "911", "emergency", "suicide", "overdose"];
    if (emergencyKeywords.some(k => currentInput.toLowerCase().includes(k))) {
      nextMsg.content = `URGENT: Your symptoms indicate a potential emergency.

PLEASE STOP THIS CHECK AND CALL EMERGENCY SERVICES (911) IMMEDIATELY. Do not wait for further AI analysis.`;
      nextMsg.isEmergency = true;
      nextMsg.classification = "emergency";
      setMessages(prev => [...prev, nextMsg]);
      setIsTyping(false);
      toast.error("Emergency Protocol Activated", { duration: 10000 });
      setStep("result");
      return;
    }

    if (step === "symptom") {
      setData(prev => ({ ...prev, symptom: currentInput }));
      
      // If profile exists and has age, skip age prompt
      if (userProfile?.ageBracket) {
        setData(prev => ({ ...prev, age: userProfile.ageBracket }));
        nextMsg.content = `Got it. I've noted your age as ${userProfile.ageBracket} from your profile. 

Approximately how long have you been experiencing this symptom?`;
        nextMsg.options = ["Less than 24h", "1-3 days", "4-7 days", "Over a week"];
        setStep("duration");
      } else {
        nextMsg.content = "Understood. To provide safe guidance, please select your age bracket.";
        nextMsg.options = ["Under 18", "18-24", "25-44", "45-64", "65+"];
        setStep("age");
      }
    } else if (step === "age") {
      setData(prev => ({ ...prev, age: currentInput }));
      nextMsg.content = "Thank you. Approximately how long have you been experiencing this symptom?";
      nextMsg.options = ["Less than 24h", "1-3 days", "4-7 days", "Over a week"];
      setStep("duration");
    } else if (step === "duration") {
      const finalData = { ...data, duration: currentInput };
      setData(finalData);
      
      const lowerSymptom = finalData.symptom.toLowerCase();
      let classification: "self-care" | "pharmacist" | "doctor" | "emergency" = "self-care";
      let advice = "";
      let educationalInfo = "";

      const durationMap: Record<string, number> = {
        "Less than 24h": 1,
        "1-3 days": 3,
        "4-7 days": 7,
        "Over a week": 10
      };
      
      const durationVal = durationMap[currentInput] || 1;

      // Classification Logic
      if (durationVal >= 10 || lowerSymptom.includes("severe") || lowerSymptom.includes("intense") || lowerSymptom.includes("lump") || lowerSymptom.includes("unexplained")) {
        classification = "doctor";
        advice = "Your symptoms appear persistent or clinically notable. We recommend booking an appointment with your primary care doctor for a full professional evaluation.";
        educationalInfo = "Educational Note: Chronic or severe symptoms require physical examination. Avoid self-diagnosing via internet search.";
      } else if (durationVal >= 3 || lowerSymptom.includes("fever") || lowerSymptom.includes("cough") || lowerSymptom.includes("rash") || lowerSymptom.includes("allergy")) {
        classification = "pharmacist";
        advice = "Your symptoms suggest a moderate condition. We recommend speaking with a pharmacist first; they can provide OTC suggestions or advise if a GP visit is necessary.";
        educationalInfo = "Educational Note: Pharmacists are trained to advise on minor ailments and medication interactions. Common aids include hydration and specific OTC relief.";
      } else {
        classification = "self-care";
        advice = "Based on the short duration and description, these symptoms appear manageable at home. Rest, hydrate, and monitor your condition closely.";
        educationalInfo = "Educational Note: Self-care often involves rest and monitoring for 'red flags' like rising temperature or worsening pain.";
      }

      nextMsg.content = `Based on your input, here is the classified guidance:

**Status: ${classification.replace("-", " ").toUpperCase()}**

${advice}

${educationalInfo}

*This is not a diagnosis. For medication, consult a professional for exact dosing and safety checks.*`;
      nextMsg.classification = classification;
      setStep("result");
      toast.success("Analysis Complete");
    }

    setMessages(prev => [...prev, nextMsg]);
    setIsTyping(false);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: `Hello! I'm your MediGuide AI assistant. I'm here to help classify your symptoms into safe, actionable next steps.

To begin, please describe your primary symptom or physical concern in a few words.`,
      },
    ]);
    setStep("symptom");
    setData({ symptom: "", age: "", duration: "" });
    toast.info("Session restarted");
  };

  return (
    <div className="flex-grow flex flex-col max-w-6xl mx-auto w-full px-4 py-12 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
             <Badge className="bg-blue-600/10 text-blue-700 border-none font-black text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full">Protocol v1.6</Badge>
             <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" /> Secure Session
             </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">
            Symptom <span className="text-blue-600 italic">Checker</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-xl text-lg leading-relaxed">
            Professional triage logic to guide you to the right care level. 
            Short, safe, and strictly educational.
          </p>
        </motion.div>
        
        <Button 
          variant="outline" 
          onClick={resetChat} 
          className="rounded-2xl border-slate-200 hover:bg-slate-900 hover:text-white transition-all h-14 px-8 font-black shadow-sm"
        >
          <RefreshCcw className="w-4.5 h-4.5 mr-2.5" />
          Restart Flow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col">
          <Card className="flex-grow flex flex-col bg-white border-slate-100 shadow-2xl shadow-blue-100/50 rounded-[3rem] overflow-hidden min-h-[650px] border relative">
            <div className="bg-slate-900 px-8 py-7 text-white flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center border border-white/10 shadow-lg p-0.5 overflow-hidden">
                    <img 
                      src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/72dc0290-4500-4fec-8643-39c0f3a3f00e/medibot-avatar-v2-fe5fe14c-177566034.webp" 
                      alt="MediBot" 
                      className="w-full h-full object-cover rounded-[1.4rem]"
                    />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-slate-900 rounded-full" 
                  />
                </div>
                <div>
                  <p className="font-black text-2xl tracking-tight leading-none">MediBot <span className="text-blue-400 italic">AI</span></p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5 border border-slate-700 rounded-md">Triage Active</span>
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">v1.6.0</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 md:p-10 space-y-8 bg-slate-50/20"
            >
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    layout
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] md:max-w-[75%] flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-1 shadow-sm ${
                        msg.role === "user" ? "bg-slate-800 text-white" : "bg-white border border-slate-100"
                      }`}>
                        {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-blue-600" />}
                      </div>
                      
                      <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                        <div className={`p-5 md:p-7 rounded-[2rem] shadow-sm relative overflow-hidden ${
                          msg.isEmergency 
                            ? "bg-red-600 text-white font-black" 
                            : msg.role === "user" 
                              ? "bg-blue-600 text-white rounded-tr-none font-bold text-[16px]" 
                              : "bg-white border border-slate-100 text-slate-800 rounded-tl-none font-medium text-[16px] leading-relaxed shadow-md"
                        }`}>
                          {msg.classification && !msg.isEmergency && (
                            <div className="flex items-center gap-3 mb-4">
                               <Badge className={`border-none font-black text-[9px] uppercase tracking-[0.15em] px-3 py-1 rounded-lg ${
                                 msg.classification === 'doctor' ? 'bg-orange-100 text-orange-700' :
                                 msg.classification === 'pharmacist' ? 'bg-indigo-100 text-indigo-700' :
                                 'bg-emerald-100 text-emerald-700'
                               }`}>
                                 {msg.classification === 'doctor' && <Stethoscope className="w-3 h-3 mr-1.5" />}
                                 {msg.classification === 'pharmacist' && <Pill className="w-3 h-3 mr-1.5" />}
                                 {msg.classification === 'self-care' && <HeartPulse className="w-3 h-3 mr-1.5" />}
                                 Action: {msg.classification.replace('-', ' ')}
                               </Badge>
                            </div>
                          )}
                          
                          {msg.isEmergency && (
                            <div className="flex items-center gap-2 mb-4 text-white">
                              <AlertTriangle className="w-5 h-5 animate-pulse text-amber-300" />
                              <span className="uppercase tracking-[0.2em] text-[10px] font-black">Emergency Detected</span>
                            </div>
                          )}

                          <p className="whitespace-pre-wrap">
                            {msg.content}
                          </p>

                          {msg.isEmergency && (
                             <div className="mt-6">
                                <Button asChild className="bg-white text-red-600 hover:bg-slate-50 font-black rounded-xl h-14 text-lg shadow-lg w-full">
                                   <a href="tel:911"><PhoneCall className="w-5 h-5 mr-3" /> Dial Emergency (911)</a>
                                </Button>
                             </div>
                          )}
                        </div>

                        {msg.options && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {msg.options.map((opt, i) => (
                              <motion.button
                                key={opt}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => handleSend(opt)}
                                className="px-5 py-3 bg-white hover:bg-blue-600 border border-slate-100 hover:border-blue-600 text-slate-700 hover:text-white text-sm font-black rounded-xl shadow-sm transition-all flex items-center gap-2 group"
                              >
                                {opt}
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white border border-slate-100 px-5 py-3 rounded-[1.2rem] rounded-tl-none ml-14 flex gap-1.5 shadow-sm">
                      <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-6 md:p-10 bg-white border-t border-slate-50">
              {step === "result" ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-6 py-4"
                >
                  <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 max-w-xl">
                    <Info className="w-6 h-6 text-blue-600 shrink-0" />
                    <p className="text-[13px] font-bold text-slate-600 leading-relaxed">
                      This summary is for educational reference. It is not a clinical diagnosis. Always seek professional advice for health decisions.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Button onClick={resetChat} className="bg-slate-900 hover:bg-slate-800 rounded-xl px-10 h-16 text-lg font-black shadow-lg transition-all hover:-translate-y-1">
                      <RefreshCcw className="w-5 h-5 mr-3" />
                      New Health Check
                    </Button>
                    <Button variant="outline" asChild className="rounded-xl px-8 h-16 text-md font-black border-slate-200 hover:bg-slate-50">
                      <Link to="/upload">Upload Records</Link>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="max-w-4xl mx-auto w-full">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-3 items-center"
                  >
                    <div className="relative flex-grow group">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={step === 'symptom' ? "Describe your symptom..." : "Type here..."}
                        className="h-16 bg-slate-50 border-slate-100 group-focus-within:bg-white group-focus-within:border-blue-500 rounded-xl pl-6 pr-14 text-[16px] font-bold transition-all shadow-inner focus-visible:ring-0"
                        disabled={isTyping}
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300">
                        <Activity className="w-5 h-5" />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="h-16 w-16 bg-blue-600 hover:bg-blue-700 rounded-xl flex-shrink-0 shadow-xl shadow-blue-200 transition-all active:scale-90"
                      disabled={!input.trim() || isTyping}
                    >
                      <Send className="w-6 h-6" />
                    </Button>
                  </form>
                  
                  <div className="mt-8 flex items-center justify-between px-2">
                    <div className="flex gap-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${
                          (step === 'symptom' && i === 1) || (step === 'age' && i === 2) || (step === 'duration' && i === 3) 
                            ? 'w-10 bg-blue-600 shadow-sm shadow-blue-100' 
                            : ((step === 'age' && i < 2) || (step === 'duration' && i < 3))
                              ? 'w-6 bg-blue-200'
                              : 'w-6 bg-slate-100'
                        }`} />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Progress: {step === 'symptom' ? '30' : step === 'age' ? '60' : '90'}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
           <Card className="bg-slate-900 border-none rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-xl font-black mb-6 italic flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                Classification Rules
              </h3>
              <div className="space-y-5">
                 {[
                   { level: "Emergency", color: "bg-red-500", desc: "Life-threatening symptoms", icon: AlertTriangle },
                   { level: "Doctor Visit", color: "bg-orange-500", desc: "Severe or chronic issues", icon: Stethoscope },
                   { level: "Pharmacist", color: "bg-indigo-500", desc: "Minor illness & OTC needs", icon: Pill },
                   { level: "Self-care", color: "bg-emerald-500", desc: "Brief, manageable symptoms", icon: HeartPulse }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 items-start">
                      <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center shrink-0 shadow-md`}>
                         <item.icon className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div>
                         <p className="font-black text-[12px] uppercase tracking-widest mb-0.5">{item.level}</p>
                         <p className="text-slate-400 text-[12px] font-medium leading-snug">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>

           <div className="rounded-[3rem] overflow-hidden shadow-lg h-56 relative border-4 border-white">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/72dc0290-4500-4fec-8643-39c0f3a3f00e/clinical-logic-viz-0ee0744c-1775660471018.webp" 
                alt="Logic Flow" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                 <p className="text-white text-[10px] font-black uppercase tracking-widest mb-1">Decision Engine</p>
                 <p className="text-white/60 text-[10px] font-medium leading-relaxed italic">Structured pathways for maximum patient safety and clear guidance.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;