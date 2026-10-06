import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sprout,
  Users,
  Coins,
  MapPin,
  ArrowRight,
  ShoppingBag,
  Tractor,
  Star,
  CheckCircle,
  Truck,
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { ProduceItem } from '../types';

export const LandingPage: React.FC = () => {
  const {
    setActiveView,
    setRole,
    produceList,
    farmers,
    setSelectedProduceId,
    addToCart,
    setSelectedFarmerId,
    t,
    language
  } = useApp();

  const featuredProduce = produceList.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-stone-50/50 to-white pt-8 sm:pt-14 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>Zero Middlemen • 100% Direct Farmer Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.12] font-serif">
                {t('tagline')}
              </h1>

              <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl">
                {t('subtagline')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => {
                    setRole('customer');
                    setActiveView('marketplace');
                  }}
                  className="px-7 py-4 rounded-2xl bg-emerald-700 text-white font-extrabold text-base sm:text-lg hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{t('buyFreshProduce')}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    setRole('farmer');
                    setActiveView('add-produce');
                  }}
                  className="px-7 py-4 rounded-2xl bg-amber-500 text-stone-950 font-extrabold text-base sm:text-lg hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Tractor className="w-5 h-5 text-stone-900" />
                  <span>{t('sellYourProduce')}</span>
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Harvested fresh today</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Verified local farmers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Cash on delivery / UPI</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/3 sm:aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                    alt="Fresh vegetables market harvest"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating Live Badge */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        🌱
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Today's Fresh Harvest</p>
                        <h4 className="text-base font-extrabold text-stone-900">Desi Tomatoes, Rice & Chillies</h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-700 font-black text-sm">Direct Rate</span>
                      <p className="text-xs text-stone-500">From ₹25/kg</p>
                    </div>
                  </div>
                </div>

                {/* Floating Farmer Avatar Card */}
                <div className="hidden sm:flex absolute -top-4 -left-6 bg-white p-3 rounded-2xl shadow-xl border border-stone-100 items-center gap-3 animate-in fade-in">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80"
                    alt="Farmer Ravi"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="text-left pr-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-stone-900">Ravi Kumar</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-stone-500">Kovur, Nellore • 4.5 km</p>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                      148 Orders Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Prominent Core Message Banner (Req 22) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 p-8 sm:p-12 text-white shadow-xl overflow-hidden">
          {/* Subtle background leaves graphic */}
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
            <Sprout className="w-72 h-72 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Agricultural Commitment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white leading-tight">
              “{t('bannerHeadline')}”
            </h2>
            <p className="text-base sm:text-xl text-emerald-100 font-medium leading-relaxed">
              {t('bannerSubtext')}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setRole('customer');
                  setActiveView('marketplace');
                }}
                className="px-6 py-3 rounded-xl bg-white text-emerald-900 font-extrabold text-sm sm:text-base hover:bg-emerald-50 transition-colors cursor-pointer shadow-md"
              >
                {t('exploreNearby')}
              </button>
              <button
                onClick={() => setActiveView('how-it-works')}
                className="px-6 py-3 rounded-xl bg-emerald-900/60 text-white font-bold text-sm sm:text-base hover:bg-emerald-900 transition-colors border border-emerald-600/50 cursor-pointer"
              >
                {t('navHowItWorks')} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Benefits (Req 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Why Farm Fresh</span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
            Direct Farm Produce, Simplified
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            A trustworthy, transparent marketplace built for both local growers and everyday households.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow text-left space-y-3 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sprout className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-1.5">
              <span>🌱</span> {t('freshProduceTitle')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('freshProduceDesc')}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow text-left space-y-3 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-1.5">
              <span>🤝</span> {t('directConnectionTitle')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('directConnectionDesc')}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow text-left space-y-3 group">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Coins className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-1.5">
              <span>💰</span> {t('fairPricesTitle')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('fairPricesDesc')}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow text-left space-y-3 group">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-1.5">
              <span>📍</span> {t('nearbyFarmersTitle')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('nearbyFarmersDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Featured Fresh Produce Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="text-left space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Marketplace Highlights</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
              Harvested Recently Near You
            </h2>
            <p className="text-sm text-stone-500">Delivered directly from the field to your doorstep.</p>
          </div>
          <button
            onClick={() => setActiveView('marketplace')}
            className="inline-flex items-center gap-2 font-bold text-sm text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
          >
            <span>View All Produce ({produceList.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProduce.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col group text-left"
            >
              {/* Product Image */}
              <div
                onClick={() => {
                  setSelectedProduceId(item.id);
                  setActiveView('product-detail');
                }}
                className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.isOrganic && (
                  <span className="absolute top-3 left-3 bg-emerald-700/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                    Organic
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-bold px-2 py-1 rounded-full shadow-2xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {item.rating}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-emerald-800">
                      ₹{item.pricePerUnit}
                      <span className="text-xs font-semibold text-stone-500">/{item.unit}</span>
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      Avail: {item.availableQuantity} {item.unit}
                    </span>
                  </div>

                  <h3
                    onClick={() => {
                      setSelectedProduceId(item.id);
                      setActiveView('product-detail');
                    }}
                    className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-700 cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  {language === 'te' && item.teluguName && (
                    <p className="text-xs font-semibold text-emerald-600">{item.teluguName}</p>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-stone-600 pt-1">
                    <span className="font-medium text-stone-800">{item.farmerName}</span>
                    {item.isVerified && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />}
                    <span>•</span>
                    <span className="text-stone-500 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />
                      {item.village}
                    </span>
                  </div>

                  <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.harvestTimeAgo}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedProduceId(item.id);
                      setActiveView('product-detail');
                    }}
                    className="py-2.5 px-3 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 hover:text-stone-900 transition-colors text-center cursor-pointer"
                  >
                    {t('viewDetails')}
                  </button>
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors shadow-2xs text-center cursor-pointer"
                  >
                    {t('addToCart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Meet Local Farmers Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200 text-left">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Real Agriculture Partners</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
              Know The Farmers Who Grow Your Food
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Every crop on Farm Fresh is tied directly to a verified grower with full contact transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {farmers.map((farmer) => (
              <div
                key={farmer.id}
                onClick={() => {
                  setSelectedFarmerId(farmer.id);
                  setActiveView('farmer-profile');
                }}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition-all cursor-pointer group space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={farmer.photoUrl}
                    alt={farmer.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-100"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700">
                        {farmer.name}
                      </h4>
                      {farmer.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-xs text-stone-500">{farmer.village}, {farmer.district}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{farmer.rating}</span>
                      <span className="text-stone-400 font-normal">({farmer.completedOrdersCount} orders)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 italic">
                  "{farmer.bio}"
                </p>

                <div className="pt-1 flex flex-wrap gap-1">
                  {farmer.specialties.slice(0, 2).map((sp) => (
                    <span
                      key={sp}
                      className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
