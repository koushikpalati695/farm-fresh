import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  MapPin
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    setActiveView,
    setSelectedProduceId,
    t
  } = useApp();

  const { subtotal, deliveryFee, total, itemCount } = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingCart className="w-12 h-12 stroke-1 text-emerald-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {t('cartEmpty')}
          </h2>
          <p className="text-stone-500 text-sm sm:text-base max-w-md mx-auto">
            {t('cartEmptyDesc')}
          </p>
        </div>
        <div>
          <button
            onClick={() => setActiveView('marketplace')}
            className="px-8 py-4 rounded-2xl bg-emerald-700 text-white font-extrabold text-base hover:bg-emerald-800 transition-all shadow-md shadow-emerald-700/20 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{t('browseProduce')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {t('yourCart')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            {itemCount} total units directly from local farmers
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Cart Item Rows */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map(({ produce, quantity }) => {
            const itemTotal = produce.pricePerUnit * quantity;
            return (
              <div
                key={produce.id}
                className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Image and Basic Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={produce.imageUrl}
                    alt={produce.name}
                    onClick={() => {
                      setSelectedProduceId(produce.id);
                      setActiveView('product-detail');
                    }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 cursor-pointer hover:opacity-90"
                  />
                  <div className="space-y-1">
                    <h3
                      onClick={() => {
                        setSelectedProduceId(produce.id);
                        setActiveView('product-detail');
                      }}
                      className="font-bold text-stone-900 text-base leading-tight hover:text-emerald-700 cursor-pointer"
                    >
                      {produce.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      Farmer: <strong className="text-stone-700">{produce.farmerName}</strong> (📍 {produce.village})
                    </p>
                    <p className="text-sm font-black text-emerald-800">
                      ₹{produce.pricePerUnit} <span className="text-xs text-stone-500 font-normal">/{produce.unit}</span>
                    </p>
                  </div>
                </div>

                {/* Stepper, Item Total & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2.5 bg-stone-100 px-3 py-1.5 rounded-2xl">
                    <button
                      onClick={() => updateCartQuantity(produce.id, quantity - 1)}
                      className="w-7 h-7 rounded-xl bg-white hover:bg-stone-200 flex items-center justify-center font-bold text-stone-700 cursor-pointer transition-colors shadow-2xs"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-extrabold text-stone-900 min-w-10 text-center">
                      {quantity} {produce.unit}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(produce.id, quantity + 1)}
                      disabled={quantity >= produce.availableQuantity}
                      className="w-7 h-7 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center font-bold cursor-pointer transition-colors shadow-2xs"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total per item */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-base font-black text-stone-900">₹{itemTotal}</span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(produce.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <button
            onClick={() => setActiveView('marketplace')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 hover:underline pt-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping Fresh Produce</span>
          </button>
        </div>

        {/* Order Summary & Proceed to Checkout */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h2 className="text-xl font-extrabold text-stone-900 font-serif border-b border-stone-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3.5 text-sm text-stone-600">
            <div className="flex justify-between">
              <span>{t('subtotal')}</span>
              <span className="font-bold text-stone-900">₹{subtotal}</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span>{t('deliveryFee')}</span>
                <p className="text-[11px] text-stone-400">(Farmer direct delivery / ₹0 on farm pickup)</p>
              </div>
              <span className="font-bold text-stone-900">₹{deliveryFee}</span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <span className="text-base font-extrabold text-stone-900">{t('grandTotal')}</span>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-900">₹{total}</span>
                <p className="text-[10px] text-stone-400">All direct farm rates included</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('checkout')}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-700 text-white font-extrabold text-base hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t('proceedToCheckout')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Direct farmer trust message */}
          <div className="pt-2 text-xs text-stone-500 text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% of the produce value goes to the farmer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
