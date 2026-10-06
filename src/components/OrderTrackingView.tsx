import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  MapPin,
  Star,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  Send
} from 'lucide-react';
import { OrderStatus } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { orders, selectedOrderId, setActiveView, addFarmerReview, language, t } = useApp();

  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // Review modal state
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!order) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-stone-500">No order found to track.</p>
        <button
          onClick={() => setActiveView('marketplace')}
          className="px-6 py-2 bg-emerald-700 text-white rounded-xl font-bold"
        >
          Go to Marketplace
        </button>
      </div>
    );
  }

  const steps: { status: OrderStatus; label: string; icon: any }[] = [
    { status: 'placed', label: t('statusPlaced'), icon: Package },
    { status: 'accepted', label: t('statusAccepted'), icon: CheckCircle2 },
    { status: 'preparing', label: t('statusPreparing'), icon: Clock },
    { status: 'ready', label: t('statusReady'), icon: ShieldCheck },
    { status: 'out_for_delivery', label: t('statusOutForDelivery'), icon: Truck },
    { status: 'delivered', label: t('statusDelivered'), icon: CheckCircle2 }
  ];

  const currentStepIdx = steps.findIndex((s) => s.status === order.status);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addFarmerReview(order.farmerId, {
      customerName: order.customerName,
      rating,
      comment: reviewComment,
      produceName: order.items[0]?.name || 'Produce'
    });
    setReviewSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <button
            onClick={() => setActiveView('marketplace')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-emerald-700 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {t('trackOrderTitle')}
            </h1>
            <span className="font-mono text-xs sm:text-sm font-bold bg-stone-100 text-stone-800 px-3 py-1 rounded-full">
              #{order.id}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">Estimated Delivery</span>
          <span className="text-base sm:text-lg font-black text-emerald-800">
            {order.expectedDelivery}
          </span>
        </div>
      </div>

      {/* Visual Timeline (Requirement 10) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-8">
        <h2 className="text-base sm:text-lg font-bold text-stone-900">
          Order Status Progress
        </h2>

        {/* Desktop Step Stepper */}
        <div className="hidden md:grid grid-cols-6 gap-2 relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-6 right-6 h-1 bg-stone-200 -z-0">
            <div
              className="h-full bg-emerald-600 transition-all duration-500"
              style={{
                width: `${Math.max(0, Math.min(100, (currentStepIdx / (steps.length - 1)) * 100))}%`
              }}
            />
          </div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={step.status} className="flex flex-col items-center text-center space-y-2 z-10">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all shadow-xs ${
                    isCurrent
                      ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 scale-110'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border-2 border-stone-200 text-stone-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-bold leading-tight ${
                    isCurrent
                      ? 'text-emerald-900'
                      : isCompleted
                      ? 'text-stone-800'
                      : 'text-stone-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            const timelineEntry = order.timeline.find((t) => t.status === step.status);

            return (
              <div key={step.status} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? 'bg-emerald-700 text-white ring-4 ring-emerald-100'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 pt-1">
                  <h4 className={`text-sm font-bold ${isCurrent ? 'text-emerald-800' : 'text-stone-900'}`}>
                    {step.label}
                  </h4>
                  {timelineEntry && (
                    <p className="text-xs text-stone-500">
                      {timelineEntry.timestamp} {timelineEntry.note && `• ${timelineEntry.note}`}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2 Cards: Farmer Contact & Delivery Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Farmer Card */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Farmer Information
          </span>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
              👨‍🌾
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-stone-900 text-lg">{order.farmerName}</h3>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-stone-500">{order.farmerVillage}</p>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <a
              href={`tel:${order.farmerPhone}`}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Farmer ({order.farmerPhone})</span>
            </a>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Delivery Destination
          </span>
          <div className="space-y-1 text-sm text-stone-700">
            <p className="font-bold text-stone-900">{order.deliveryAddress.name}</p>
            <p className="text-xs text-stone-500">{order.deliveryAddress.phone}</p>
            <p className="text-xs text-stone-600 leading-relaxed pt-1">
              📍 {order.deliveryAddress.addressLine}, {order.deliveryAddress.village}, {order.deliveryAddress.district} - {order.deliveryAddress.pincode}
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Method: <strong className="text-stone-800 capitalize">{order.deliveryMethod.replace('_', ' ')}</strong></span>
            <span>Payment: <strong className="text-stone-800 uppercase">{order.paymentMethod}</strong></span>
          </div>
        </div>
      </div>

      {/* Review Farmer Section (If Delivered) */}
      {order.status === 'delivered' && (
        <div className="bg-emerald-50 p-6 sm:p-8 rounded-3xl border border-emerald-200 space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <h3 className="text-lg font-bold text-emerald-950">
              {t('leaveReview')}
            </h3>
          </div>

          {order.reviewGiven || reviewSubmitted ? (
            <div className="p-4 rounded-2xl bg-white border border-emerald-200 text-sm space-y-1">
              <p className="font-bold text-emerald-900">Thank you for supporting this local farmer! ⭐</p>
              <p className="text-xs text-stone-600">
                "{order.reviewGiven?.comment || reviewComment}"
              </p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-600">Your Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience about produce freshness, packaging, and the farmer's service..."
                className="w-full p-3 rounded-2xl border border-stone-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                rows={3}
                required
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
