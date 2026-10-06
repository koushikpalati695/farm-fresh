import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Users,
  Tractor,
  Package,
  TrendingUp,
  AlertCircle,
  Check,
  X,
  Trash2,
  Eye,
  Star,
  RefreshCw,
  Search
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    farmers,
    produceList,
    orders,
    toggleFarmerVerification,
    deleteProduce,
    setActiveView,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'farmers' | 'listings' | 'orders' | 'grievances'>('farmers');
  const [searchFilter, setSearchFilter] = useState('');

  // Stats
  const totalFarmers = 48; // realistic total including sample
  const totalCustomers = 1240;
  const activeProducts = produceList.length;
  const totalOrdersCount = orders.length + 840;
  const completedOrders = orders.filter((o) => o.status === 'delivered').length + 810;
  const pendingOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length + 30;
  const platformRevenue = 894500; // in INR

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* Admin Title */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-800/80 text-purple-200 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Platform Administrator Operations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight">
          {t('adminDashboardTitle')}
        </h1>
        <p className="text-purple-200 text-sm sm:text-base max-w-2xl">
          Supervise farmer field verifications, quality inspections, listing compliance, and marketplace volume.
        </p>
      </div>

      {/* 7 Core KPI Cards (Req 15) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Total Farmers */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">{t('totalFarmers')}</span>
          <p className="text-2xl font-black text-stone-900">{totalFarmers}</p>
        </div>

        {/* Total Customers */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">{t('totalCustomers')}</span>
          <p className="text-2xl font-black text-stone-900">{totalCustomers.toLocaleString('en-IN')}</p>
        </div>

        {/* Active Products */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">{t('activeProducts')}</span>
          <p className="text-2xl font-black text-emerald-700">{activeProducts}</p>
        </div>

        {/* Total Orders */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">{t('totalPlatformOrders')}</span>
          <p className="text-2xl font-black text-stone-900">{totalOrdersCount}</p>
        </div>

        {/* Completed Orders */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Completed</span>
          <p className="text-2xl font-black text-green-700">{completedOrders}</p>
        </div>

        {/* Pending Orders */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">In Flight</span>
          <p className="text-2xl font-black text-amber-600">{pendingOrders}</p>
        </div>

        {/* Revenue Overview */}
        <div className="p-4 rounded-2xl bg-stone-900 text-white shadow-2xs space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">{t('platformRevenue')}</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-400">₹{(platformRevenue / 100000).toFixed(1)}L</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-2">
        <button
          onClick={() => setActiveTab('farmers')}
          className={`py-3 px-5 font-bold text-sm border-b-2 cursor-pointer transition-all ${
            activeTab === 'farmers'
              ? 'border-purple-600 text-purple-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Manage & Verify Farmers ({farmers.length})
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`py-3 px-5 font-bold text-sm border-b-2 cursor-pointer transition-all ${
            activeTab === 'listings'
              ? 'border-purple-600 text-purple-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Manage Produce Listings ({produceList.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-5 font-bold text-sm border-b-2 cursor-pointer transition-all ${
            activeTab === 'orders'
              ? 'border-purple-600 text-purple-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Platform Orders ({orders.length})
        </button>
      </div>

      {/* Tab 1: Farmer Verification Management */}
      {activeTab === 'farmers' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Farmer Verification & Badges</h3>
              <p className="text-xs text-stone-500">Toggle "Verified Farmer" badge based on land records or field checks</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs font-bold text-stone-400 uppercase">
                  <th className="py-3 px-4">Farmer</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Acreage</th>
                  <th className="py-3 px-4">Fulfilled Orders</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {farmers.map((farmer) => (
                  <tr key={farmer.id} className="hover:bg-stone-50">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img src={farmer.photoUrl} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-stone-900">{farmer.name}</p>
                        <p className="text-xs text-stone-400">{farmer.phone}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {farmer.village}, {farmer.district}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {farmer.farmSizeAcres} Acres
                    </td>
                    <td className="py-3.5 px-4 font-bold text-stone-800">
                      {farmer.completedOrdersCount} orders
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1 font-bold text-amber-600 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {farmer.rating}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {farmer.isVerified ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                          <Check className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2.5 py-1 rounded-full">
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleFarmerVerification(farmer.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                          farmer.isVerified
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {farmer.isVerified ? t('unverifyAction') : t('verifyAction')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Produce Listings */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Active Crop Listings on Marketplace</h3>
              <p className="text-xs text-stone-500">Remove deceptive or sold-out produce listings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produceList.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={p.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{p.name}</h4>
                    <p className="text-xs text-stone-500">Farmer: {p.farmerName}</p>
                    <p className="text-xs font-bold text-emerald-700">₹{p.pricePerUnit}/{p.unit} ({p.availableQuantity} {p.unit})</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteProduce(p.id)}
                  className="p-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 cursor-pointer"
                  title="Remove Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Platform Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-stone-900 text-base">All Active Platform Orders</h3>
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="p-4 rounded-2xl bg-stone-50 flex items-center justify-between text-sm">
                <div>
                  <span className="font-mono text-xs font-bold text-stone-500">#{o.id}</span>
                  <p className="font-bold text-stone-900">
                    {o.customerName} ordered from {o.farmerName}
                  </p>
                  <p className="text-xs text-stone-500">
                    Items: {o.items.map((i) => `${i.name} (${i.quantity} ${i.unit})`).join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-black text-stone-900 text-base">₹{o.totalAmount}</span>
                  <p className="text-xs font-bold text-blue-700 uppercase">{o.status.replace('_', ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
