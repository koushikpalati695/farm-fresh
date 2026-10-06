import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Phone,
  CheckCircle2,
  Award,
  Clock,
  ShoppingCart
} from 'lucide-react';

export const FarmerPublicProfile: React.FC = () => {
  const {
    farmers,
    selectedFarmerId,
    produceList,
    setActiveView,
    setSelectedProduceId,
    addToCart,
    t
  } = useApp();

  const farmer = farmers.find((f) => f.id === selectedFarmerId) || farmers[0];
  const availableProduce = produceList.filter((p) => p.farmerId === farmer.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 text-left">
      <button
        onClick={() => setActiveView('marketplace')}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-emerald-700 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Produce Marketplace</span>
      </button>

      {/* Hero Bio Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={farmer.photoUrl}
            alt={farmer.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-emerald-100 shadow-md"
          />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold text-stone-900 font-serif">
                {farmer.name}
              </h1>
              {farmer.isVerified && (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Farmer</span>
                </span>
              )}
            </div>

            <p className="text-stone-600 font-medium text-sm sm:text-base flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{farmer.farmName} • {farmer.village}, {farmer.district}, {farmer.state}</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-600 pt-1">
              <div className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{farmer.rating} / 5</span>
              </div>
              <span>•</span>
              <span className="font-semibold text-emerald-800">
                {farmer.completedOrdersCount} Orders Fulfilled
              </span>
              <span>•</span>
              <span>{farmer.experienceYears} Years Farming</span>
              <span>•</span>
              <span>{farmer.farmSizeAcres} Acres Farm Size</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <a
            href={`tel:${farmer.phone}`}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>Call Farmer ({farmer.phone})</span>
          </a>
        </div>
      </div>

      {/* Farm Story & Specialties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-3">
          <h3 className="text-lg font-bold text-stone-900 font-serif">
            About Our Farm & Soil Cultivation
          </h3>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {farmer.bio}
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            {farmer.specialties.map((sp) => (
              <span
                key={sp}
                className="px-3 py-1 bg-white text-emerald-800 rounded-full text-xs font-bold border border-stone-200"
              >
                🌾 {sp}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-4">
          <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
            Agricultural Credentials
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct field inspection completed</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero chemical ripening agent pledge</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Same-day morning harvesting</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Produce currently available (Req 13) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-stone-900 font-serif">
            Fresh Produce Currently Available for Sale
          </h2>
          <span className="text-xs text-stone-500 font-medium">{availableProduce.length} Items</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableProduce.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all p-4 space-y-3"
            >
              <div
                onClick={() => {
                  setSelectedProduceId(p.id);
                  setActiveView('product-detail');
                }}
                className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-100 cursor-pointer"
              >
                <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-md">
                  {p.harvestTimeAgo}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black text-emerald-900">
                    ₹{p.pricePerUnit} <span className="text-xs font-normal text-stone-500">/{p.unit}</span>
                  </span>
                  <span className="text-xs text-stone-500">
                    Avail: {p.availableQuantity} {p.unit}
                  </span>
                </div>
                <h4
                  onClick={() => {
                    setSelectedProduceId(p.id);
                    setActiveView('product-detail');
                  }}
                  className="font-bold text-stone-900 text-base hover:text-emerald-700 cursor-pointer"
                >
                  {p.name}
                </h4>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedProduceId(p.id);
                    setActiveView('product-detail');
                  }}
                  className="py-2.5 px-3 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={() => addToCart(p, 1)}
                  className="py-2.5 px-3 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 cursor-pointer shadow-xs"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Ratings & Reviews (Req 13) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <h3 className="text-xl font-bold text-stone-900 font-serif">
          Customer Feedback & Reviews ({farmer.reviews.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {farmer.reviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-stone-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">{rev.customerName}</span>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{rev.rating}</span>
                </div>
              </div>
              <p className="text-xs text-stone-600 italic">"{rev.comment}"</p>
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span>Crop: {rev.produceName}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
