import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Tractor,
  ShoppingBag,
  ArrowRight,
  Sprout,
  CheckCircle2,
  Clock,
  Coins,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { setActiveView, setRole, t } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 text-left">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Simple Farm-to-Table Model
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif">
          How Farm Fresh Works
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Connecting rural agriculture directly to household kitchens without layers of commission agents, brokers, or cold-storage middlemen.
        </p>
      </div>

      {/* For Customers */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-stone-900 font-serif">For Customers & Households</h2>
            <p className="text-xs text-stone-500">Buy produce harvested same morning</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 p-5 rounded-2xl bg-stone-50">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="font-bold text-stone-900 text-base">Browse Nearby Harvests</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Search vegetables, fruits, rice, or spices harvested in your local village or district. See exact harvest timestamps and farmer details.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-stone-50">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="font-bold text-stone-900 text-base">Select Quantity & Checkout</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Order anywhere from 1 kg up to sacks. Pick farmer doorstep delivery or visit the farm for free pickup. Pay via COD or instant UPI.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-stone-50">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="font-bold text-stone-900 text-base">Live Order Tracking</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Follow every step: Harvested → Packed in ventilated crates → Out for delivery → Delivered directly to your home.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setRole('customer');
            setActiveView('marketplace');
          }}
          className="px-6 py-3.5 rounded-2xl bg-emerald-700 text-white font-extrabold text-sm hover:bg-emerald-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Start Buying Fresh Produce</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* For Farmers */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Tractor className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-stone-900 font-serif">For Farmers & Growers</h2>
            <p className="text-xs text-stone-500">Sell at fair farmgate rates with zero deduction</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 p-5 rounded-2xl bg-amber-50/50">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="font-bold text-stone-900 text-base">List Produce in 2 Minutes</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Enter crop name, pick preset photo, set your desired price per kg or quintal, and quantity available.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-amber-50/50">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="font-bold text-stone-900 text-base">Receive Direct Orders</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Get mobile alerts when customers place orders. Accept or reject with one tap. No broker fees or APMC cuts.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-amber-50/50">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="font-bold text-stone-900 text-base">Get Paid 100% Directly</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Receive direct payment to your UPI account or cash in hand when handing over produce to the buyer.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setRole('farmer');
            setActiveView('add-produce');
          }}
          className="px-6 py-3.5 rounded-2xl bg-amber-600 text-white font-extrabold text-sm hover:bg-amber-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Sell Your Crops Today</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
