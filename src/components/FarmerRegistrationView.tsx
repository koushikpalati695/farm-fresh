import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Tractor,
  ArrowRight,
  CheckCircle2,
  Phone,
  MapPin,
  Camera,
  ShieldCheck,
  Sparkles,
  UserCheck
} from 'lucide-react';

export const FarmerRegistrationView: React.FC = () => {
  const { registerFarmer, setActiveView, setRole, farmers, activeFarmerId, setActiveFarmerId, t, language } = useApp();

  const [fullName, setFullName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('4291');
  const [otpVerified, setOtpVerified] = useState(false);
  const [village, setVillage] = useState('Srirangapatna');
  const [district, setDistrict] = useState('Mandya');
  const [stateName, setStateName] = useState('Karnataka');
  const [acreage, setAcreage] = useState<number>(6.5);
  const [experience, setExperience] = useState<number>(12);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Vegetables', 'Fruits']);
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80');
  const [submitted, setSubmitted] = useState(false);
  const [registeredFarmerName, setRegisteredFarmerName] = useState('');

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Other'];

  const avatarPresets = [
    { label: 'Farmer 1', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80' },
    { label: 'Farmer 2', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { label: 'Farmer 3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { label: 'Farmer 4', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' }
  ];

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleVerifyOtp = () => {
    if (!mobileNumber) {
      alert('Please enter your 10-digit mobile number first.');
      return;
    }
    setOtpVerified(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !village || !district) {
      alert('Please fill in required farmer name and village details.');
      return;
    }

    const created = registerFarmer({
      name: fullName,
      phone: mobileNumber.startsWith('+91') ? mobileNumber : `+91 ${mobileNumber}`,
      farmName: farmName || `${fullName} Natural Farm`,
      village,
      district,
      state: stateName,
      specialties: selectedCategories,
      photoUrl,
      experienceYears: Number(experience),
      farmSizeAcres: Number(acreage),
      bio: `Organic producer from ${village}, ${district}. Direct farm sales with 0% middleman margin.`
    });

    setRegisteredFarmerName(created.name);
    setSubmitted(true);
    setTimeout(() => {
      setActiveView('add-produce');
    }, 2200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14 text-left space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-xs">
          <Tractor className="w-9 h-9" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 font-serif">
          Farmer Direct Registration
        </h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Register as an independent grower on Farm Fresh. Set your own prices for produce and sell directly to customers.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4 animate-in fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-emerald-950 font-serif">
            Welcome to Farm Fresh, {registeredFarmerName}! 🎉
          </h2>
          <p className="text-sm text-emerald-800">
            Your farmer profile is now active. Opening the form to list your first produce and set your price...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          {/* Active Registered Farmers Info */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-700" />
              <span>Currently {farmers.length} independent farmers are registered</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setRole('farmer');
                setActiveView('farmer-dashboard');
              }}
              className="text-xs font-bold text-amber-800 underline cursor-pointer"
            >
              View Dashboard
            </button>
          </div>

          {/* Full Name & Farm Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                Farmer Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Venkat Reddy / Ramesh"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                Farm / Land Name (Optional)
              </label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                placeholder="e.g. Kaveri Organic Farm"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Mobile & OTP */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase">
              Mobile Number & OTP Verification *
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="10-digit mobile (e.g. 9848011223)"
                className="flex-1 px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className={`px-4 py-3 font-bold text-xs rounded-2xl cursor-pointer transition-colors ${
                  otpVerified
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
              >
                {otpVerified ? 'Verified ✓' : 'Verify Mobile Number'}
              </button>
            </div>
            {otpVerified && (
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mobile number verified.
              </p>
            )}
          </div>

          {/* Location details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 uppercase">Village / Town *</label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Kovur"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 uppercase">District *</label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Nellore"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 uppercase">State *</label>
              <input
                type="text"
                required
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                placeholder="e.g. Andhra Pradesh"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
              />
            </div>
          </div>

          {/* Acreage & Farming Experience */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 uppercase">Land Size (Acres)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={acreage}
                onChange={(e) => setAcreage(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 uppercase">Farming Experience (Years)</label>
              <input
                type="number"
                min="1"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
              />
            </div>
          </div>

          {/* Profile Photo Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase">
              Profile Photo Preset
            </label>
            <div className="flex gap-3 items-center">
              {avatarPresets.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setPhotoUrl(preset.url)}
                  className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    photoUrl === preset.url ? 'border-amber-600 ring-2 ring-amber-300 scale-105' : 'border-stone-200'
                  }`}
                >
                  <img src={preset.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Produce Categories */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase">
              Produce Categories You Grow
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategories.includes(cat)
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat} {selectedCategories.includes(cat) && '✓'}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-amber-600 text-white font-black text-base hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Complete Farmer Registration & Set Prices</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      )}
    </div>
  );
};
