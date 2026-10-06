import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Plus,
  Package,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Truck,
  Phone,
  Check,
  X,
  ArrowRight,
  Eye,
  Trash2,
  MapPin,
  Calendar,
  Sparkles,
  Users,
  UserCheck,
  Edit3,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { Order, OrderStatus, ProduceItem } from '../types';

export const FarmerDashboard: React.FC = () => {
  const {
    produceList,
    orders,
    farmers,
    activeFarmerId,
    setActiveFarmerId,
    setActiveView,
    updateOrderStatus,
    deleteProduce,
    updateProducePrice,
    getPriceVariationsForCrop,
    setSelectedProduceId,
    t,
    language
  } = useApp();

  const currentFarmer = farmers.find((f) => f.id === activeFarmerId) || farmers[0];
  const farmerProduce = produceList.filter((p) => p.farmerId === currentFarmer.id);

  const [activeTab, setActiveTab] = useState<'produce' | 'new_orders' | 'in_progress' | 'completed'>('produce');

  // Price adjustment state
  const [editingCrop, setEditingCrop] = useState<ProduceItem | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [priceSuccessToast, setPriceSuccessToast] = useState<string | null>(null);

  // Filter orders for this farmer
  const farmerOrders = orders.filter((o) => o.farmerId === currentFarmer.id || o.items.some((it) => it.farmerId === currentFarmer.id));
  const newOrders = farmerOrders.filter((o) => o.status === 'placed');
  const inProgressOrders = farmerOrders.filter((o) =>
    ['accepted', 'preparing', 'ready', 'out_for_delivery'].includes(o.status)
  );
  const completedOrders = farmerOrders.filter((o) => o.status === 'delivered');

  // Metrics
  const activeListingsCount = farmerProduce.filter((p) => p.status === 'active').length;
  const totalSalesAmount = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0) + (currentFarmer.completedOrdersCount * 950);

  const handleAdvanceStatus = (orderId: string, currentStatus: OrderStatus) => {
    const nextStatusMap: Record<string, OrderStatus> = {
      placed: 'accepted',
      accepted: 'preparing',
      preparing: 'ready',
      ready: 'out_for_delivery',
      out_for_delivery: 'delivered'
    };

    const next = nextStatusMap[currentStatus];
    if (next) {
      updateOrderStatus(orderId, next);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* MULTI-FARMER ACCOUNT SELECTOR BAR */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={currentFarmer.photoUrl} alt="" className="w-12 h-12 rounded-xl object-cover border-2 border-amber-300" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-400 uppercase">Active Farmer Account</span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                {currentFarmer.isVerified ? 'Verified Producer' : 'New Farmer'}
              </span>
            </div>
            <h3 className="font-extrabold text-stone-900 text-base">{currentFarmer.name} ({currentFarmer.farmName})</h3>
            <p className="text-xs text-stone-500">{currentFarmer.village}, {currentFarmer.district}, {currentFarmer.state}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Switch Farmer Dropdown */}
          <select
            value={currentFarmer.id}
            onChange={(e) => setActiveFarmerId(e.target.value)}
            className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm font-bold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 cursor-pointer"
            aria-label="Switch Active Farmer"
          >
            {farmers.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.village})
              </option>
            ))}
          </select>

          <button
            onClick={() => setActiveView('farmer-registration')}
            className="px-4 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs sm:text-sm hover:bg-amber-700 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>+ Register Farmer</span>
          </button>
        </div>
      </div>

      {/* Welcome Bar and Primary Action */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-800 rounded-3xl p-6 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-amber-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Farm Fresh Producer Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight">
            {t('goodMorning')}, {currentFarmer.name} 👋
          </h1>
          <p className="text-amber-100 text-sm sm:text-base">
            Set your own prices, manage your harvest batches, and fulfill incoming direct orders.
          </p>
        </div>

        {/* Large Add Produce Button */}
        <button
          onClick={() => setActiveView('add-produce')}
          className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white text-stone-950 font-black text-base sm:text-lg hover:bg-amber-50 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
        >
          <Plus className="w-6 h-6 text-amber-600" />
          <span>{t('addProduceBtn')}</span>
        </button>
      </div>

      {/* 5 Simple Cards (Req 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Active Listings */}
        <div
          onClick={() => setActiveTab('produce')}
          className="p-5 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-shadow cursor-pointer space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            🌱
          </div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            {t('activeListings')}
          </span>
          <p className="text-2xl sm:text-3xl font-black text-stone-900">{activeListingsCount}</p>
        </div>

        {/* New Orders */}
        <div
          onClick={() => setActiveTab('new_orders')}
          className="p-5 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-shadow cursor-pointer space-y-2 relative"
        >
          {newOrders.length > 0 && (
            <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
          )}
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            🛒
          </div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            {t('newOrders')}
          </span>
          <p className="text-2xl sm:text-3xl font-black text-amber-600">{newOrders.length}</p>
        </div>

        {/* Orders In Progress */}
        <div
          onClick={() => setActiveTab('in_progress')}
          className="p-5 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-shadow cursor-pointer space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            🚚
          </div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            {t('ordersInProgress')}
          </span>
          <p className="text-2xl sm:text-3xl font-black text-blue-600">{inProgressOrders.length}</p>
        </div>

        {/* Completed Orders */}
        <div
          onClick={() => setActiveTab('completed')}
          className="p-5 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-shadow cursor-pointer space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold">
            ✓
          </div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            {t('completedOrdersStat')}
          </span>
          <p className="text-2xl sm:text-3xl font-black text-stone-900">{currentFarmer.completedOrdersCount + completedOrders.length}</p>
        </div>

        {/* Total Sales */}
        <div className="p-5 rounded-3xl bg-stone-900 text-white shadow-md space-y-2 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            ₹
          </div>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
            {t('totalEarnings')}
          </span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">
            ₹{totalSalesAmount.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('produce')}
          className={`py-3 px-5 font-bold text-sm whitespace-nowrap border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'produce'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>{t('myProduceTab')}</span>
          <span className="bg-stone-100 text-stone-700 text-xs px-2 py-0.5 rounded-full font-bold">
            {farmerProduce.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('new_orders')}
          className={`py-3 px-5 font-bold text-sm whitespace-nowrap border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'new_orders'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>{t('newOrdersTab')}</span>
          {newOrders.length > 0 && (
            <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-black">
              {newOrders.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('in_progress')}
          className={`py-3 px-5 font-bold text-sm whitespace-nowrap border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'in_progress'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>{t('inProgressTab')}</span>
          {inProgressOrders.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold">
              {inProgressOrders.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`py-3 px-5 font-bold text-sm whitespace-nowrap border-b-2 cursor-pointer transition-all ${
            activeTab === 'completed'
              ? 'border-stone-800 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          {t('completedTab')}
        </button>
      </div>

      {/* Tab 1: My Produce (Listings & Price management) */}
      {activeTab === 'produce' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-stone-800 text-lg">My Listed Harvests & Custom Prices</h3>
              <p className="text-xs text-stone-500">Crops currently posted under {currentFarmer.name}</p>
            </div>
            <button
              onClick={() => setActiveView('add-produce')}
              className="py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-bold text-xs sm:text-sm hover:bg-emerald-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Crop</span>
            </button>
          </div>

          {farmerProduce.length === 0 ? (
            <div className="p-12 rounded-3xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-3">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="font-bold text-stone-700">No produce listed for this farmer yet</p>
              <button
                onClick={() => setActiveView('add-produce')}
                className="px-6 py-2.5 bg-emerald-700 text-white font-bold text-sm rounded-xl cursor-pointer"
              >
                + Add First Produce
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerProduce.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-3 p-4 text-left"
                >
                  <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-100">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-white/90 text-stone-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      {p.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-900 text-base">{p.name}</h4>
                    <p className="text-xl font-black text-emerald-800">
                      ₹{p.pricePerUnit} <span className="text-xs font-normal text-stone-500">/{p.unit}</span>
                    </p>
                    <p className="text-xs text-stone-500">
                      Remaining: <strong>{p.availableQuantity} {p.unit}</strong>
                    </p>
                    <p className="text-[11px] text-stone-400">Harvest: {p.harvestTimeAgo}</p>

                    {/* Price variation comparison with other farmers */}
                    {p.cropGroup && (() => {
                      const groupVariations = getPriceVariationsForCrop(p.cropGroup);
                      const others = groupVariations.filter((v) => v.id !== p.id);
                      if (others.length === 0) return null;
                      const prices = groupVariations.map((v) => v.pricePerUnit);
                      const minP = Math.min(...prices);
                      const maxP = Math.max(...prices);
                      return (
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] space-y-1">
                          <div className="flex items-center justify-between text-amber-900 font-bold">
                            <span>Market Range: ₹{minP} - ₹{maxP}/{p.unit}</span>
                            <span className="text-[10px] bg-amber-200/80 px-1.5 py-0.5 rounded text-amber-900 font-bold">
                              {groupVariations.length} Farmers
                            </span>
                          </div>
                          <p className="text-[10px] text-amber-700">
                            {others.length} other registered farmer{others.length > 1 ? 's' : ''} selling this crop
                          </p>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingCrop(p);
                        setNewPrice(p.pricePerUnit);
                      }}
                      className="py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      title="Set / update selling price"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Set Price</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduceId(p.id);
                        setActiveView('product-detail');
                      }}
                      className="flex-1 py-2 px-3 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => deleteProduce(p.id)}
                      className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: New Orders */}
      {activeTab === 'new_orders' && (
        <div className="space-y-4">
          {newOrders.length === 0 ? (
            <div className="bg-stone-50 rounded-3xl p-12 text-center border border-dashed border-stone-300 space-y-3">
              <Package className="w-12 h-12 text-stone-400 mx-auto stroke-1" />
              <p className="text-stone-600 font-bold">No new orders waiting for {currentFarmer.name}</p>
              <p className="text-xs text-stone-400">Orders placed by customers will appear here in real-time.</p>
            </div>
          ) : (
            newOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-amber-300 shadow-md space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      New Order Alert 🔔
                    </span>
                    <span className="text-xs font-mono text-stone-500">#{order.id}</span>
                  </div>
                  <span className="text-xs text-stone-400 font-medium">Placed {order.timeline[0]?.timestamp}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-stone-400 uppercase">Customer</span>
                      <h4 className="text-lg font-black text-stone-900">{order.customerName}</h4>
                      <p className="text-xs text-stone-500">
                        📞 {order.customerPhone} • 📍 {order.deliveryAddress.addressLine}, {order.deliveryAddress.village}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold text-stone-400 uppercase">Items Requested</span>
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <img src={it.imageUrl} alt="" className="w-9 h-9 rounded-lg object-cover" />
                          <span className="font-bold text-stone-800">{it.name}:</span>
                          <span className="font-extrabold text-emerald-800">
                            {it.quantity} {it.unit}
                          </span>
                          <span className="text-stone-400">(@ ₹{it.price}/{it.unit})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-4 text-left md:text-right space-y-3">
                    <div>
                      <span className="text-xs font-bold text-stone-400 uppercase">Order Value</span>
                      <p className="text-3xl font-black text-emerald-800">₹{order.totalAmount}</p>
                      <p className="text-xs text-stone-500">Method: {order.deliveryMethod.replace('_', ' ')}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateOrderStatus(order.id, 'accepted', 'Farmer accepted the order and started harvesting')}
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 text-white font-extrabold text-sm hover:bg-emerald-800 transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>{t('acceptOrder')}</span>
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled', 'Farmer was out of stock')}
                        className="py-3 px-3 rounded-xl border border-rose-300 text-rose-700 font-bold text-sm hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Decline"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Orders in Progress */}
      {activeTab === 'in_progress' && (
        <div className="space-y-4">
          {inProgressOrders.length === 0 ? (
            <div className="bg-stone-50 rounded-3xl p-12 text-center border border-dashed border-stone-300 space-y-3">
              <Truck className="w-12 h-12 text-stone-400 mx-auto stroke-1" />
              <p className="text-stone-600 font-bold">No orders currently in preparation or transit</p>
            </div>
          ) : (
            inProgressOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-stone-500">#{order.id}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900">
                      Status: {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <a
                    href={`tel:${order.customerPhone}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Customer</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-2">
                    <p className="text-sm font-bold text-stone-900">
                      Customer: {order.customerName} ({order.deliveryAddress.village})
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-stone-600">
                      {order.items.map((it, idx) => (
                        <span key={idx} className="bg-stone-100 px-2.5 py-1 rounded-lg">
                          {it.name}: <strong>{it.quantity} {it.unit}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-4 text-left md:text-right space-y-2">
                    <p className="text-xl font-black text-stone-900">₹{order.totalAmount}</p>

                    <button
                      onClick={() => handleAdvanceStatus(order.id, order.status)}
                      className="w-full py-3 px-4 rounded-xl bg-blue-700 text-white font-extrabold text-xs sm:text-sm hover:bg-blue-800 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>
                        {order.status === 'accepted'
                          ? 'Harvesting & Packing Done → Next'
                          : order.status === 'preparing'
                          ? 'Ready for Dispatch → Next'
                          : order.status === 'ready'
                          ? 'Start Delivery / Dispatch → Next'
                          : 'Mark Delivered Fresh ✓'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Completed Orders */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-lg">Completed Delivery History</h3>
            <div className="space-y-3">
              {completedOrders.length === 0 ? (
                <p className="text-sm text-stone-500">Recent completed deliveries for {currentFarmer.name} will appear here.</p>
              ) : (
                completedOrders.map((o) => (
                  <div key={o.id} className="p-4 rounded-2xl bg-stone-50 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-bold text-stone-900">Order #{o.id} - {o.customerName}</p>
                      <p className="text-xs text-stone-500">Delivered {o.items[0]?.name} ({o.items[0]?.quantity} {o.items[0]?.unit})</p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-emerald-800 text-base">₹{o.totalAmount}</span>
                      <p className="text-[11px] text-emerald-700 font-bold">Paid & Fulfilled ✓</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Price Editor Modal */}
      {editingCrop && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={editingCrop.imageUrl} alt="" className="w-12 h-12 rounded-2xl object-cover" />
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">{editingCrop.name}</h3>
                  <p className="text-xs text-stone-500">
                    Currently set at ₹{editingCrop.pricePerUnit}/{editingCrop.unit}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingCrop(null)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price variations comparison for this crop */}
            {editingCrop.cropGroup && (() => {
              const variations = getPriceVariationsForCrop(editingCrop.cropGroup);
              const others = variations.filter((v) => v.id !== editingCrop.id);
              if (others.length === 0) return null;
              const avg = Math.round(variations.reduce((s, v) => s + v.pricePerUnit, 0) / variations.length);
              return (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span>Market Comparison ({variations.length} Farmers)</span>
                    <span>Average: ₹{avg}/{editingCrop.unit}</span>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {others.map((oth) => (
                      <div key={oth.id} className="flex items-center justify-between text-xs text-stone-600 bg-white p-2 rounded-xl">
                        <span>{oth.farmerName} ({oth.village})</span>
                        <span className="font-bold text-emerald-800">₹{oth.pricePerUnit}/{oth.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Price adjuster input & steppers */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                New Price Per {editingCrop.unit} (₹)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNewPrice((p) => Math.max(1, p - 5))}
                  className="px-3 py-2.5 rounded-xl border border-stone-200 font-bold text-xs hover:bg-stone-50 cursor-pointer"
                >
                  -₹5
                </button>
                <button
                  type="button"
                  onClick={() => setNewPrice((p) => Math.max(1, p - 1))}
                  className="px-3 py-2.5 rounded-xl border border-stone-200 font-bold text-xs hover:bg-stone-50 cursor-pointer"
                >
                  -₹1
                </button>
                <input
                  type="number"
                  min="1"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="flex-1 text-center font-black text-2xl py-2 px-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setNewPrice((p) => p + 1)}
                  className="px-3 py-2.5 rounded-xl border border-stone-200 font-bold text-xs hover:bg-stone-50 cursor-pointer"
                >
                  +₹1
                </button>
                <button
                  type="button"
                  onClick={() => setNewPrice((p) => p + 5)}
                  className="px-3 py-2.5 rounded-xl border border-stone-200 font-bold text-xs hover:bg-stone-50 cursor-pointer"
                >
                  +₹5
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingCrop(null)}
                className="py-3 px-4 rounded-xl border border-stone-200 font-bold text-sm text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateProducePrice(editingCrop.id, newPrice);
                  setPriceSuccessToast(`Updated ${editingCrop.name} price to ₹${newPrice}/${editingCrop.unit}`);
                  setEditingCrop(null);
                  setTimeout(() => setPriceSuccessToast(null), 3000);
                }}
                className="py-3 px-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 cursor-pointer shadow-md"
              >
                Save New Price
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {priceSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span>{priceSuccessToast}</span>
        </div>
      )}
    </div>
  );
};
