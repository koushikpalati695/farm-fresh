import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, Users, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 text-left">
      <div className="text-center space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Our Agricultural Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 font-serif">
          Direct From Rural Fields To Modern Tables
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Farm Fresh was conceived with one foundational principle: the farmer who toils in the sun should earn the fair share of the crop value, and families deserve natural, freshly harvested food.
        </p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-stone-900 font-serif">The Middleman Problem We Solve</h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          In conventional agricultural supply chains, fresh vegetables and fruits change hands through 4 to 6 tiers: village agents, transport brokers, wholesale mandis, commission agents, cold storage hoarders, and retail vendors.
        </p>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          By the time tomatoes or mangoes reach your table, the farmer received as little as 15%–25% of what you paid, and the vegetables spent 4 to 7 days losing nutrients and moisture.
        </p>
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
          <h3 className="font-bold text-emerald-900 text-base mb-1">The Farm Fresh Difference</h3>
          <p className="text-emerald-800 text-sm leading-relaxed">
            By connecting local farmers directly to customers within a 50 km radius, we reduce delivery time to hours, eliminate transit spoilage, guarantee 100% farmgate price retention for the farmer, and save customers 20%–40% compared to supermarket markups.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-2">
          <p className="text-3xl font-black text-emerald-700">100%</p>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Farmer Price Retention</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-2">
          <p className="text-3xl font-black text-amber-600">&lt; 4 Hours</p>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Harvest to Doorstep</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-2">
          <p className="text-3xl font-black text-purple-700">0%</p>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Middlemen Cuts</p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => setActiveView('marketplace')}
          className="px-8 py-4 rounded-2xl bg-emerald-700 text-white font-extrabold text-base hover:bg-emerald-800 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Explore Fresh Produce Near You</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
