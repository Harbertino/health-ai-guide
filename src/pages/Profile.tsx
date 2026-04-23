import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, MapPin, Globe, Calendar, Save, Trash2, ShieldCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    ageBracket: "25-44",
    gender: "male",
    language: "English",
    location: "New York, USA",
  });

  useEffect(() => {
    const saved = localStorage.getItem("mediguide_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("mediguide_profile", JSON.stringify(profile));
    toast.success("Health profile updated");
  };

  const handleClear = () => {
    localStorage.removeItem("mediguide_profile");
    toast.info("Profile data cleared");
  };

  const updateProfile = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex-grow max-w-2xl mx-auto w-full px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-none shadow-2xl shadow-slate-200/50 overflow-hidden rounded-[3rem]">
          <CardHeader className="bg-slate-900 text-white p-10 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-[2rem] bg-blue-600 border-4 border-slate-800 flex items-center justify-center text-4xl font-black italic shadow-2xl">
                {profile.name.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <CardTitle className="text-3xl font-black tracking-tight mb-2 uppercase">{profile.name}</CardTitle>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Badge className="bg-blue-500/20 text-blue-400 border-none px-3 py-1 font-black text-[10px] tracking-widest uppercase">Verified Member</Badge>
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">v1.5.0 Protocol</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 md:p-12 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                  <Calendar className="w-3.5 h-3.5" /> Age Bracket
                </Label>
                <Select 
                  defaultValue={profile.ageBracket} 
                  onValueChange={(val) => updateProfile("ageBracket", val)}
                >
                  <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold text-slate-700">
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100">
                    <SelectItem value="Under 18">Under 18</SelectItem>
                    <SelectItem value="18-24">18-24</SelectItem>
                    <SelectItem value="25-44">25-44</SelectItem>
                    <SelectItem value="45-64">45-64</SelectItem>
                    <SelectItem value="65+">65+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                  <User className="w-3.5 h-3.5" /> Gender Identity
                </Label>
                <Select 
                  defaultValue={profile.gender}
                  onValueChange={(val) => updateProfile("gender", val)}
                >
                  <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold text-slate-700">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                  <Globe className="w-3.5 h-3.5" /> Primary Language
                </Label>
                <Input 
                  value={profile.language} 
                  onChange={(e) => updateProfile("language", e.target.value)}
                  className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold text-slate-700 focus-visible:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                  <MapPin className="w-3.5 h-3.5" /> Region / City
                </Label>
                <Input 
                  value={profile.location} 
                  onChange={(e) => updateProfile("location", e.target.value)}
                  className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold text-slate-700 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-5">
              <Button 
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 h-16 rounded-2xl text-lg font-black shadow-xl shadow-blue-100 transition-all hover:-translate-y-1 active:scale-95"
              >
                <Save className="w-5 h-5 mr-3" />
                Commit Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClear}
                className="flex-1 border-slate-100 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 h-16 rounded-2xl text-lg font-black transition-all"
              >
                <Trash2 className="w-5 h-5 mr-3" />
                Reset Data
              </Button>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100/50 flex items-start gap-4">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <p className="text-[12px] text-slate-600 font-bold leading-relaxed">
                MediGuide AI uses your age and gender to refine triage logic protocols. This information is stored only in your browser's local persistent memory for privacy.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4">
               <ShieldCheck className="w-4 h-4 text-green-500" />
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Zero-Cloud Storage Protocol Active</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;