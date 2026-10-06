import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Store, Package, PlusCircle, User, Tractor } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeView, setActiveView, role, setRole, getCartTotal } = useApp();
  const { itemCount } = getCartTotal();

  const handleSellClick = () => {
    if (role === 'farmer') {
      setActiveView('farmer-dashboard');
    } else {
      setActiveView('role-selection');
    }
  };

  const handleProfileClick = () => {
    if (role === 'farmer') {
      setActiveView('farmer-dashboard');
    } else if (role === 'admin') {
      setActiveView('admin-dashboard');
    } else {
      setActiveView('customer-profile');
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 py-2 px-3 shadow-lg">
      <div className="grid grid-cols-5 gap-1 text-center items-center">
        {/* Home */}
        <button
          onClick={() => setActiveView('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl cursor-pointer transition-colors ${
            activeView === 'home' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Market */}
        <button
          onClick={() => setActiveView('marketplace')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl cursor-pointer transition-colors ${
            activeView === 'marketplace' || activeView === 'product-detail'
              ? 'text-emerald-700 font-bold'
              : 'text-stone-500'
          }`}
        >
          <Store className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Market</span>
        </button>

        {/* Sell / Farmer Dashboard */}
        <button
          onClick={handleSellClick}
          className={`flex flex-col items-center justify-center py-1 rounded-xl cursor-pointer transition-colors ${
            activeView === 'farmer-dashboard' || activeView === 'add-produce' || activeView === 'role-selection'
              ? 'text-amber-700 font-bold'
              : 'text-stone-500'
          }`}
        >
          <div className="w-9 h-9 -mt-3 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/30">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight font-bold text-emerald-800">Sell</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => setActiveView('order-tracking')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl cursor-pointer transition-colors ${
            activeView === 'order-tracking' || activeView === 'order-success'
              ? 'text-emerald-700 font-bold'
              : 'text-stone-500'
          }`}
        >
          <Package className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Orders</span>
        </button>

        {/* Profile */}
        <button
          onClick={handleProfileClick}
          className={`flex flex-col items-center justify-center py-1 rounded-xl cursor-pointer transition-colors ${
            activeView === 'customer-profile' || activeView === 'admin-dashboard'
              ? 'text-emerald-700 font-bold'
              : 'text-stone-500'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Profile</span>
        </button>
      </div>
    </div>
  );
};
