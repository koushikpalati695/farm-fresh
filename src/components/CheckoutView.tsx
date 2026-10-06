import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Store,
  ShieldCheck,
  QrCode,
  Smartphone,
  Banknote
} from 'lucide-react';
import { DeliveryMethod, PaymentMethod } from '../types';

export const CheckoutView: React.FC = () => {
  const { cart, getCartTotal, placeOrder, setActiveView, t } = useApp();

  // Form State
  const [name, setName] = useState('Anand Varma');
  const [phone, setPhone] = useState('+91 98492 55678');
  const [addressLine, setAddressLine] = useState('House 42, Green Avenue, Near Water Tank');
  const [village, setVillage] = useState('Kovur');
  const [district, setDistrict] = useState('Nellore');
  const [pincode, setPincode] = useState('524137');
  
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('farmer_delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('anand@okhdfcbank');

  const { subtotal } = getCartTotal();
  const deliveryFee = deliveryMethod === 'farm_pickup' ? 0 : 30;
  const total = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !addressLine || !village) {
      alert('Please fill in your delivery details.');
      return;
    }

    placeOrder({
      customerName: name,
      customerPhone: phone,
      addressLine,
      village,
      district,
      pincode,
      deliveryMethod,
      paymentMethod
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {t('checkoutTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Direct purchase from farm with live tracking
          </p>
        </div>
        <button
          onClick={() => setActiveView('cart')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-emerald-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
      </div>

      <form onSubmit={handleSubmitOrder} className="space-y-8">
        {/* Step 1: Delivery Address */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
              1
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {t('step1Address')}
              </h2>
              <p className="text-xs text-stone-500">Where should the produce be brought?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                {t('fullName')} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Reddy"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                {t('mobileNumber')} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                {t('deliveryAddressLine')} *
              </label>
              <input
                type="text"
                required
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="House / Door No, Street name, Near Landmark"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                {t('villageTown')} *
              </label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Village / Town"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                  {t('district')} *
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                  {t('pincode')} *
                </label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Delivery Method */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
              2
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {t('step2Delivery')}
              </h2>
              <p className="text-xs text-stone-500">Choose how you wish to receive the crop</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {/* Farmer Direct Delivery */}
            <label
              className={`flex items-start sm:items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                deliveryMethod === 'farmer_delivery'
                  ? 'border-emerald-600 bg-emerald-50/50'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'farmer_delivery'}
                  onChange={() => setDeliveryMethod('farmer_delivery')}
                  className="w-4 h-4 text-emerald-600"
                />
                <div>
                  <div className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>{t('farmerDelivery')}</span>
                  </div>
                  <p className="text-xs text-stone-500">Directly transported from farm in crate or tempo</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-black text-emerald-800">₹30</span>
            </label>

            {/* Farm Pickup */}
            <label
              className={`flex items-start sm:items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                deliveryMethod === 'farm_pickup'
                  ? 'border-emerald-600 bg-emerald-50/50'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'farm_pickup'}
                  onChange={() => setDeliveryMethod('farm_pickup')}
                  className="w-4 h-4 text-emerald-600"
                />
                <div>
                  <div className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-amber-700" />
                    <span>{t('farmPickup')}</span>
                  </div>
                  <p className="text-xs text-stone-500">Visit farm, inspect crops in person, meet the grower</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-black text-green-700 uppercase">FREE (₹0)</span>
            </label>

            {/* Local Delivery Partner */}
            <label
              className={`flex items-start sm:items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                deliveryMethod === 'local_partner'
                  ? 'border-emerald-600 bg-emerald-50/50'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'local_partner'}
                  onChange={() => setDeliveryMethod('local_partner')}
                  className="w-4 h-4 text-emerald-600"
                />
                <div>
                  <div className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-700" />
                    <span>{t('localPartner')}</span>
                  </div>
                  <p className="text-xs text-stone-500">Express delivery within 2 hours</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-black text-emerald-800">₹30</span>
            </label>
          </div>
        </div>

        {/* Step 3: Payment Method */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
              3
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {t('step3Payment')}
              </h2>
              <p className="text-xs text-stone-500">Select payment preference</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* UPI Option */}
            <label
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                paymentMethod === 'upi'
                  ? 'border-emerald-600 bg-emerald-50/50'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Smartphone className="w-5 h-5 text-emerald-700" />
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="text-emerald-600"
                />
              </div>
              <div>
                <p className="font-bold text-stone-900 text-sm">{t('paymentUPI')}</p>
                <p className="text-[11px] text-stone-500">GPay, PhonePe, Paytm</p>
              </div>
            </label>

            {/* Cash on Delivery */}
            <label
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                paymentMethod === 'cod'
                  ? 'border-emerald-600 bg-emerald-50/50'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Banknote className="w-5 h-5 text-amber-700" />
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="text-emerald-600"
                />
              </div>
              <div>
                <p className="font-bold text-stone-900 text-sm">{t('paymentCOD')}</p>
                <p className="text-[11px] text-stone-500">Pay cash upon delivery</p>
              </div>
            </label>

            {/* Online Payment */}
            <label
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                paymentMethod === 'online'
                  ? 'border-emerald-600 bg-emerald-50/50'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <CreditCard className="w-5 h-5 text-blue-700" />
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="text-emerald-600"
                />
              </div>
              <div>
                <p className="font-bold text-stone-900 text-sm">{t('paymentOnline')}</p>
                <p className="text-[11px] text-stone-500">Netbanking / Card</p>
              </div>
            </label>
          </div>

          {/* UPI interactive field */}
          {paymentMethod === 'upi' && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="block text-xs font-bold text-stone-600">Enter UPI ID or Mobile (Simulated)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-medium"
                />
                <button
                  type="button"
                  className="px-4 py-2.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl"
                >
                  Verify UPI ✓
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Grand Total Bar and Place Order CTA */}
        <div className="p-6 sm:p-8 bg-stone-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Order Grand Total</span>
            <div className="text-3xl sm:text-4xl font-black">
              ₹{total}
            </div>
            <p className="text-xs text-stone-400">
              {cart.length} items • Zero middleman deduction
            </p>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-lg transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>{t('placeOrder')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
