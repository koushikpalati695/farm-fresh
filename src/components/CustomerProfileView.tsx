import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Phone,
  MapPin,
  Package,
  Heart,
  Star,
  Bell,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const CustomerProfileView: React.FC = () => {
  const {
    orders,
    farmers,
    produceList,
    setActiveView,
    setSelectedOrderId,
    setSelectedProduceId,
    setSelectedFarmerId,
    t
  } = useApp();

  const customerName = 'Anand Varma';
  const customerPhone = '+91 98492 55678';
  const savedAddress = 'Plot 42, Green Avenue, Near Water Tank, Kovur, Nellore - 524137';

  const favoriteFarmer = farmers[0];
  const favoriteItems = produceList.slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-2xl">
            AV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-stone-900 font-serif">{customerName}</h1>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                Customer
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">📞 {customerPhone}</p>
            <p className="text-xs text-stone-500">📍 Kovur, Nellore, Andhra Pradesh</p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('marketplace')}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs sm:text-sm hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          {t('browseProduce')}
        </button>
      </div>

      {/* Grid: Saved Address & Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saved Addresses (Req 12) */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Saved Delivery Address</span>
          </span>
          <div className="p-4 rounded-2xl bg-stone-50 text-sm space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-stone-900">Home Address</span>
              <span className="text-[10px] font-bold bg-stone-200 text-stone-700 px-2 py-0.5 rounded-sm">Default</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">{savedAddress}</p>
          </div>
        </div>

        {/* Favorite Farmers (Req 12) */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Favorite Local Farmers</span>
          </span>
          <div
            onClick={() => {
              setSelectedFarmerId(favoriteFarmer.id);
              setActiveView('farmer-profile');
            }}
            className="p-4 rounded-2xl bg-stone-50 flex items-center justify-between cursor-pointer hover:bg-emerald-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <img src={favoriteFarmer.photoUrl} alt="" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700">
                  {favoriteFarmer.name}
                </h4>
                <p className="text-xs text-stone-500">{favoriteFarmer.village}, {favoriteFarmer.district}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </div>
        </div>
      </div>

      {/* Order History (Req 12) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
            My Order History
          </h2>
          <span className="text-xs text-stone-500">{orders.length} Total Orders</span>
        </div>

        <div className="space-y-3">
          {orders.map((o) => (
            <div
              key={o.id}
              className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-500">#{o.id}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-stone-100 text-stone-700">
                      {o.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    {o.items.map((i) => `${i.name} (${i.quantity} ${i.unit})`).join(', ')}
                  </h4>
                  <p className="text-xs text-stone-500">Farmer: {o.farmerName}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <span className="font-black text-stone-900 text-base">₹{o.totalAmount}</span>
                <button
                  onClick={() => {
                    setSelectedOrderId(o.id);
                    setActiveView('order-tracking');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Track Order</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Safety (Req 17) */}
      <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Need help or want to report an issue with an order?</span>
        </div>
        <button
          onClick={() => alert('Support grievance ticket opened. Our agricultural mediator will call you within 30 minutes.')}
          className="font-bold text-emerald-800 hover:underline cursor-pointer"
        >
          Report Issue
        </button>
      </div>
    </div>
  );
};
