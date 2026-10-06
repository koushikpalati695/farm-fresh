import React from 'react';
import { useApp } from '../context/AppContext';
import { Tractor, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../types';

export const RoleSelectModal: React.FC = () => {
  const { setRole, setActiveView, role, language, t } = useApp();

  const handleSelectRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'farmer') {
      setActiveView('farmer-registration');
    } else if (newRole === 'admin') {
      setActiveView('admin-dashboard');
    } else {
      setActiveView('marketplace');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800">
          Farm Fresh Community
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
          {t('roleSelectTitle')}
        </h1>
        <p className="text-base sm:text-lg text-stone-600">
          {t('roleSelectSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Farmer Card */}
        <div
          onClick={() => handleSelectRole('farmer')}
          className={`group relative rounded-3xl p-6 sm:p-8 border-2 transition-all cursor-pointer text-left bg-gradient-to-b from-amber-50/50 to-white hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 ${
            role === 'farmer' ? 'border-amber-500 ring-4 ring-amber-100' : 'border-stone-200'
          }`}
        >
          {role === 'farmer' && (
            <div className="absolute top-5 right-5 flex items-center gap-1 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Current</span>
            </div>
          )}

          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
            <Tractor className="w-9 h-9" />
          </div>

          <h2 className="text-2xl font-bold text-stone-900 mb-2 group-hover:text-amber-800">
            {t('farmerCardTitle')}
          </h2>
          <p className="text-stone-600 mb-6 text-base leading-relaxed">
            {t('farmerCardDesc')}
          </p>

          <ul className="space-y-2.5 mb-8 text-sm text-stone-700">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>List produce in 2 minutes</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Receive direct orders & instant payments</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Zero commission, 100% earnings to your pocket</span>
            </li>
          </ul>

          <button className="w-full py-4 px-6 rounded-2xl bg-amber-600 text-white font-bold text-base hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 cursor-pointer">
            <span>{t('continueAsFarmer')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Card */}
        <div
          onClick={() => handleSelectRole('customer')}
          className={`group relative rounded-3xl p-6 sm:p-8 border-2 transition-all cursor-pointer text-left bg-gradient-to-b from-emerald-50/50 to-white hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 ${
            role === 'customer' ? 'border-emerald-500 ring-4 ring-emerald-100' : 'border-stone-200'
          }`}
        >
          {role === 'customer' && (
            <div className="absolute top-5 right-5 flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Current</span>
            </div>
          )}

          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
            <ShoppingBag className="w-9 h-9" />
          </div>

          <h2 className="text-2xl font-bold text-stone-900 mb-2 group-hover:text-emerald-800">
            {t('customerCardTitle')}
          </h2>
          <p className="text-stone-600 mb-6 text-base leading-relaxed">
            {t('customerCardDesc')}
          </p>

          <ul className="space-y-2.5 mb-8 text-sm text-stone-700">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Harvested same-day without cold storage chemicals</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Know exactly which farmer grew your food</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Transparent fair rates lower than supermarkets</span>
            </li>
          </ul>

          <button className="w-full py-4 px-6 rounded-2xl bg-emerald-700 text-white font-bold text-base hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 cursor-pointer">
            <span>{t('continueAsCustomer')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Admin Demo Shortcut */}
      <div className="mt-12 text-center">
        <button
          onClick={() => handleSelectRole('admin')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 hover:text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span>Switch to Admin & Verification Panel</span>
        </button>
      </div>
    </div>
  );
};
