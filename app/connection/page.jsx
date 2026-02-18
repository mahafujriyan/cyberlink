"use client";
import { useEffect, useState } from "react";
import { packages } from "@/lib/data";
import { useRouter } from "next/navigation";

export default function ConnectionForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [formData, setFormData] = useState({
    package: "", location: "", flatNo: "", houseNo: "",
    roadNo: "", area: "", landmark: "", fullName: "",
    email: "", mobile: "", phone: "", nid: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    const loadCoverage = async () => {
      try {
        const response = await fetch("/api/coverage", { cache: "no-store" });
        const data = await response.json();
        if (response.ok && data.success && Array.isArray(data.data?.regions)) {
          const mappedRegions = data.data.regions.map((region) => ({
            name: region.name,
            areas: region.areas || [],
          }));
          setRegions(mappedRegions);
        }
      } catch {
        setRegions([]);
      }
    };

    loadCoverage();
  }, []);

  const handleNext = () => {
    if (!formData.package || !formData.location) {
      alert("প্যাকেজ এবং লোকেশন সিলেক্ট করা বাধ্যতামূলক!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("আপনার আবেদন সফলভাবে জমা হয়েছে!");
        router.push("/");
      }
    } catch (error) {
      alert("দুঃখিত, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
        
        {/* Progress Bar */}
        <div className="flex bg-slate-800/50 border-b border-slate-800">
          <div className={`flex-1 py-5 text-center text-[10px] font-black tracking-[0.2em] transition-all ${step === 1 ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>01. ADDRESS</div>
          <div className={`flex-1 py-5 text-center text-[10px] font-black tracking-[0.2em] transition-all ${step === 2 ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>02. PERSONAL</div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 lg:p-14">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Package Select */}
              <div className="flex flex-col gap-2">
                <label className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Select Package *</label>
                <select name="package" value={formData.package} onChange={handleChange} required className="bg-slate-800 border-2 border-slate-700 text-white rounded-2xl p-4 outline-none focus:border-orange-500 transition-all">
                  <option value="">Choose your speed</option>
                  {packages.map((pkg, i) => (
                    <option key={i} value={pkg.label}>{pkg.label} - {pkg.price}</option>
                  ))}
                </select>
              </div>

              {/* District & Area Select */}
              <div className="flex flex-col gap-2">
                <label className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Select Location *</label>
                <select name="location" value={formData.location} onChange={handleChange} required className="bg-slate-800 border-2 border-slate-700 text-white rounded-2xl p-4 outline-none focus:border-orange-500 transition-all">
                  <option value="">Choose your area</option>
                  {regions.map((region, i) => (
                    <optgroup key={i} label={region.name} className="bg-slate-900 text-orange-500">
                      {region.areas.map((area, j) => (
                        <option key={j} value={`${area}, ${region.name}`} className="text-white">
                          {area}, {region.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {["flatNo", "houseNo", "roadNo", "area"].map((field) => (
                <div key={field} className="flex flex-col gap-2">
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{field.replace('No', ' No')} *</label>
                  <input type="text" name={field} onChange={handleChange} required className="bg-slate-800 border-2 border-slate-700 text-white rounded-2xl p-4 outline-none focus:border-orange-500 transition-all" />
                </div>
              ))}

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Landmark / বিবরণ</label>
                <input type="text" name="landmark" onChange={handleChange} placeholder="যেমন: মসজিদের পাশে" className="bg-slate-800 border-2 border-slate-700 text-white rounded-2xl p-4 outline-none focus:border-orange-500 transition-all" />
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button type="button" onClick={handleNext} className="bg-orange-600 hover:bg-orange-700 text-white font-black px-12 py-4 rounded-2xl transition-all shadow-xl shadow-orange-600/30">
                  NEXT STEP &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col gap-2">
                <label className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Full Name / পুরো নাম *</label>
                <input type="text" name="fullName" onChange={handleChange} required className="bg-slate-800 border-2 border-slate-700 text-white rounded-2xl p-4 outline-none focus:border-orange-500 transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-orange-400 text-[10px] font-black uppercase tracking-widest">E-mail / ই-মেইল *</label>
                <input type="email" name="email" onChange={handleChange} required className="bg-slate-800 border-2 border-slate-700 text-white rounded-2xl p-4 outline-none focus:border-orange-500 transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Mobile No / মোবাইল নম্বর *</label>
                <div className="flex gap-3">
                  <input type="tel" name="mobile" onChange={handleChange} required className="flex-1 bg-slate-800 border-2 border-slate-700 text-white rounded-2xl p-4 outline-none focus:border-orange-500 transition-all" />
                  <button type="button" className="bg-green-600 hover:bg-green-700 text-white text-[10px] px-6 rounded-2xl font-black uppercase">Verify</button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest">NID (Optional)</label>
                <input type="text" name="nid" onChange={handleChange} className="bg-slate-800 border-2 border-slate-700 text-white rounded-2xl p-4 outline-none focus:border-orange-500 transition-all" />
              </div>

              <div className="md:col-span-2 flex justify-between items-center mt-10 border-t border-slate-800 pt-10">
                <button type="button" onClick={() => setStep(1)} className="text-slate-500 hover:text-white font-black text-xs uppercase tracking-widest transition-all">&larr; Back</button>
                <button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700 text-white font-black px-12 py-4 rounded-2xl transition-all shadow-xl shadow-orange-600/30 disabled:opacity-50">
                  {loading ? "SENDING..." : "CONFIRM REQUEST"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
