import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, Phone, Mail, MapPin, Heart, ShieldCheck, Tractor, ShoppingBag } from 'lucide-react';
import { Language } from '../types';

export const Footer: React.FC = () => {
  const { setActiveView, setRole, language, setLanguage, t } = useApp();

  const allLanguages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 md:pb-16 text-left border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white font-serif tracking-tight">
                Farm <span className="text-emerald-500">Fresh</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Direct peer-to-peer agricultural marketplace built to empower rural Indian farmers, eliminate predatory middlemen, and provide families with chemical-free, fresh farm produce.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kisan Helpline: 1800-FARM-FRESH (Toll Free)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@farmfresh.org</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button
                  onClick={() => setActiveView('marketplace')}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  Buy Fresh Produce
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('farmer');
                    setActiveView('add-produce');
                  }}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  Sell Your Harvest
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('how-it-works')}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('about')}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  About Our Mission
                </button>
              </li>
            </ul>
          </div>

          {/* User Modes */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Account Modes</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setRole('customer');
                    setActiveView('marketplace');
                  }}
                  className="hover:text-emerald-400 cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Customer View</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('farmer');
                    setActiveView('farmer-dashboard');
                  }}
                  className="hover:text-amber-400 cursor-pointer flex items-center gap-1.5"
                >
                  <Tractor className="w-3.5 h-3.5 text-amber-400" />
                  <span>Farmer Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('admin');
                    setActiveView('admin-dashboard');
                  }}
                  className="hover:text-purple-400 cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin & Verification</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Language & Multi-State Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Languages (5)</h4>
            <div className="flex flex-wrap gap-1.5">
              {allLanguages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    language === l.code
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 pt-1 leading-relaxed">
              Available in English, Telugu, Hindi, Kannada, and Tamil across all agricultural zones.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Farm Fresh. Empowering Direct Local Agriculture.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Built with care for Indian farmers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
