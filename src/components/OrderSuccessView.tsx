import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Package,
  Calendar,
  User,
  ArrowRight,
  ShoppingBag,
  Phone,
  Truck,
  MapPin
} from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { latestOrderId, orders, setActiveView, setSelectedOrderId, t } = useApp();

  const order = orders.find((o) => o.id === latestOrderId) || orders[0];

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-stone-500">Order not found.</p>
        <button
          onClick={() => setActiveView('marketplace')}
          className="mt-4 px-6 py-2 bg-emerald-700 text-white rounded-xl font-bold"
        >
          Go to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 text-center space-y-8 animate-in fade-in">
      {/* Celebration Icon */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif">
          {t('orderSuccessTitle')}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto">
          {t('orderSuccessSubtitle')}
        </p>
      </div>

      {/* Order Summary Card (Req 9) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs text-left space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              {t('orderIdLabel')}
            </span>
            <p className="text-xl font-extrabold text-stone-900 font-mono">{order.id}</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            {order.status.replace('_', ' ')}
          </span>
        </div>

        {/* Product List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Produce Items Ordered
          </span>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-stone-50">
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-stone-500">
                      {item.quantity} {item.unit} × ₹{item.price}
                    </p>
                  </div>
                </div>
                <span className="font-extrabold text-stone-900 text-sm">
                  ₹{item.quantity * item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Delivery & Farmer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-stone-50 space-y-1">
            <span className="text-stone-400 font-medium">Farmer</span>
            <p className="font-bold text-stone-900 text-base">{order.farmerName}</p>
            <p className="text-stone-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {order.farmerVillage}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 space-y-1">
            <span className="text-stone-400 font-medium">Expected Delivery</span>
            <p className="font-bold text-emerald-800 text-base">{order.expectedDelivery}</p>
            <p className="text-stone-500 capitalize">
              Via {order.deliveryMethod.replace('_', ' ')}
            </p>
          </div>
        </div>

        {/* Total Amount */}
        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
          <span className="font-extrabold text-stone-900 text-base">Total Amount Paid / Payable</span>
          <span className="text-2xl font-black text-emerald-900">₹{order.totalAmount}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => {
            setSelectedOrderId(order.id);
            setActiveView('order-tracking');
          }}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-700 text-white font-extrabold text-base hover:bg-emerald-800 transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Truck className="w-5 h-5" />
          <span>{t('trackOrder')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveView('marketplace')}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-stone-300 text-stone-700 font-bold text-base hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{t('browseProduce')}</span>
        </button>
      </div>
    </div>
  );
};
