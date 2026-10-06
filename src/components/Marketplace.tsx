import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  Filter,
  X,
  Plus,
  Check,
  ChevronDown,
  Navigation,
  ArrowRight,
  TrendingDown,
  SlidersHorizontal
} from 'lucide-react';
import { ProduceCategory, ProduceItem } from '../types';

export const Marketplace: React.FC = () => {
  const {
    produceList,
    addToCart,
    setSelectedProduceId,
    setActiveView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    getPriceVariationsForCrop,
    t,
    language
  } = useApp();

  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [maxDistance, setMaxDistance] = useState<number>(50); // km
  const [sortBy, setSortBy] = useState<'nearest' | 'price_low' | 'price_high' | 'recent'>('nearest');
  const [onlyOrganic, setOnlyOrganic] = useState<boolean>(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Modal for comparing farmer prices
  const [comparingCrop, setComparingCrop] = useState<ProduceItem | null>(null);

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: t('allCategories'), icon: '🌾' },
    { id: 'fruits', label: t('fruits'), icon: '🥭' },
    { id: 'vegetables', label: t('vegetables'), icon: '🥬' },
    { id: 'pulses', label: t('pulses'), icon: '🫘' },
    { id: 'grains', label: t('grains'), icon: '🌾' },
    { id: 'spices', label: t('spices'), icon: '🌶️' },
  ];

  const locations = [
    { id: 'all', label: 'All Regions & States' },
    { id: 'Nellore', label: 'Nellore, AP' },
    { id: 'West Godavari', label: 'West Godavari, AP' },
    { id: 'Eluru', label: 'Eluru, AP' },
    { id: 'Mandya', label: 'Mandya, Karnataka' },
    { id: 'Salem', label: 'Salem, Tamil Nadu' },
    { id: 'Nashik', label: 'Nashik, Maharashtra' },
    { id: 'Vikarabad', label: 'Vikarabad, Telangana' },
    { id: 'Shimla', label: 'Shimla, Himachal' }
  ];

  const getLocalizedName = (item: ProduceItem): string => {
    if (language === 'te' && item.teluguName) return item.teluguName;
    if (language === 'hi' && item.hindiName) return item.hindiName;
    if (language === 'kn' && item.kannadaName) return item.kannadaName;
    if (language === 'ta' && item.tamilName) return item.tamilName;
    return item.name;
  };

  // Filtering and Sorting logic
  const filteredProducts = useMemo(() => {
    return produceList
      .filter((p) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesTe = p.teluguName ? p.teluguName.toLowerCase().includes(q) : false;
          const matchesHi = p.hindiName ? p.hindiName.toLowerCase().includes(q) : false;
          const matchesKn = p.kannadaName ? p.kannadaName.toLowerCase().includes(q) : false;
          const matchesTa = p.tamilName ? p.tamilName.toLowerCase().includes(q) : false;
          const matchesFarmer = p.farmerName.toLowerCase().includes(q);
          const matchesLoc = p.village.toLowerCase().includes(q) || p.district.toLowerCase().includes(q) || p.state.toLowerCase().includes(q);
          if (!matchesName && !matchesTe && !matchesHi && !matchesKn && !matchesTa && !matchesFarmer && !matchesLoc) {
            return false;
          }
        }

        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        if (selectedLocation !== 'all' && p.district !== selectedLocation) {
          return false;
        }

        if (p.distanceKm > maxDistance) {
          return false;
        }

        if (onlyOrganic && !p.isOrganic) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'nearest') return a.distanceKm - b.distanceKm;
        if (sortBy === 'price_low') return a.pricePerUnit - b.pricePerUnit;
        if (sortBy === 'price_high') return b.pricePerUnit - a.pricePerUnit;
        if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
  }, [produceList, searchQuery, selectedCategory, selectedLocation, maxDistance, onlyOrganic, sortBy]);

  const handleAddToCart = (item: ProduceItem) => {
    addToCart(item, 1);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-3xl p-6 sm:p-10 text-white shadow-lg text-left relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-200 text-xs font-bold">
            <Navigation className="w-3.5 h-3.5" />
            <span>Farm Fresh Marketplace • Multi-Farmer Price Comparison</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight">
            {t('marketplaceTitle')}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100">
            Compare live harvest rates directly from 8+ regional farmers. Over 10 fruits, 10 vegetables, and 10 pulses available with zero middleman margin.
          </p>
        </div>
      </div>

      {/* Search and Quick Filters Row */}
      <div className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-stone-300 bg-white text-stone-900 placeholder-stone-400 font-medium text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative min-w-[190px]">
            <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              aria-label="Filter by region"
              className="w-full pl-10 pr-8 py-3.5 rounded-2xl border border-stone-300 bg-white text-stone-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs appearance-none cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          {/* Sort Selector */}
          <div className="relative min-w-[170px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort produce by"
              className="w-full px-4 py-3.5 rounded-2xl border border-stone-300 bg-white text-stone-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs appearance-none cursor-pointer"
            >
              <option value="nearest">{t('sortNearest')}</option>
              <option value="price_low">{t('sortLowestPrice')}</option>
              <option value="price_high">{t('sortHighestPrice')}</option>
              <option value="recent">{t('sortRecent')}</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills (Fruits 10+, Vegetables 10+, Pulses 10+) */}
      <div className="overflow-x-auto pb-2 scrollbar-none flex items-center gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setOnlyOrganic(!onlyOrganic)}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
            onlyOrganic
              ? 'bg-green-800 text-white'
              : 'bg-white text-green-900 border border-green-300 hover:bg-green-50'
          }`}
        >
          <span>🌱</span>
          <span>{t('organicBadge')}</span>
          {onlyOrganic && <Check className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Active Filter Chips & Results Count */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 px-1">
        <p className="font-semibold text-stone-700">
          Showing <span className="text-emerald-700 font-bold">{filteredProducts.length}</span> fresh harvest items across verified farmers
        </p>

        {(selectedCategory !== 'all' || selectedLocation !== 'all' || searchQuery || onlyOrganic) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLocation('all');
              setSearchQuery('');
              setOnlyOrganic(false);
            }}
            className="text-emerald-700 font-bold hover:underline cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-stone-50 rounded-3xl p-12 text-center border border-dashed border-stone-300 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
            🌾
          </div>
          <h3 className="text-xl font-bold text-stone-800 font-serif">No Produce Found</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Try resetting your filters or selecting "All Categories" to view 30+ fruits, vegetables, and pulses.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLocation('all');
              setSearchQuery('');
              setOnlyOrganic(false);
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => {
            const isJustAdded = justAddedId === item.id;
            const localizedName = getLocalizedName(item);

            // Check if multiple farmers are selling this crop
            const variations = item.cropGroup ? getPriceVariationsForCrop(item.cropGroup) : [];
            const hasMultipleFarmers = variations.length > 1;
            const lowestPrice = hasMultipleFarmers ? Math.min(...variations.map((v) => v.pricePerUnit)) : item.pricePerUnit;
            const highestPrice = hasMultipleFarmers ? Math.max(...variations.map((v) => v.pricePerUnit)) : item.pricePerUnit;

            return (
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
                    <span className="absolute top-3 left-3 bg-emerald-800/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                      Organic
                    </span>
                  )}

                  <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-bold px-2 py-1 rounded-full shadow-2xs flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>

                  <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-300" />
                    <span>{item.distanceKm} km away</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    {/* Price and Stock */}
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-black text-emerald-900">
                        ₹{item.pricePerUnit}
                        <span className="text-xs font-semibold text-stone-500">/{item.unit}</span>
                      </div>
                      <span className="text-xs text-stone-500 font-semibold bg-stone-100 px-2 py-0.5 rounded-full">
                        {item.availableQuantity} {item.unit} left
                      </span>
                    </div>

                    {/* Produce Name */}
                    <h3
                      onClick={() => {
                        setSelectedProduceId(item.id);
                        setActiveView('product-detail');
                      }}
                      className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-700 cursor-pointer"
                    >
                      {item.name}
                    </h3>

                    {/* Localized regional name */}
                    {language !== 'en' && localizedName !== item.name && (
                      <p className="text-xs font-bold text-emerald-700">{localizedName}</p>
                    )}

                    {/* Farmer Name & Village */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 pt-1">
                      <span className="font-semibold text-stone-800">{item.farmerName}</span>
                      {item.isVerified && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />}
                      <span>•</span>
                      <span className="text-stone-500">{item.village}, {item.district}</span>
                    </div>

                    {/* Harvest freshness */}
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.harvestTimeAgo}
                    </p>

                    {/* Price Variation Indicator (Requirement: Price variation for multiple farmers) */}
                    {hasMultipleFarmers && (
                      <div
                        onClick={() => setComparingCrop(item)}
                        className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold flex items-center justify-between cursor-pointer hover:bg-amber-100 transition-colors"
                      >
                        <div className="flex items-center gap-1">
                          <TrendingDown className="w-3.5 h-3.5 text-amber-700" />
                          <span>{variations.length} Farmers: ₹{lowestPrice} - ₹{highestPrice}/{item.unit}</span>
                        </div>
                        <span className="text-amber-800 underline text-[10px]">Compare</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduceId(item.id);
                        setActiveView('product-detail');
                      }}
                      className="py-3 px-3 rounded-2xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 hover:text-stone-900 transition-colors text-center cursor-pointer"
                    >
                      {t('viewDetails')}
                    </button>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.availableQuantity <= 0}
                      className={`py-3 px-3 rounded-2xl font-bold text-xs transition-all shadow-2xs text-center cursor-pointer flex items-center justify-center gap-1 ${
                        isJustAdded
                          ? 'bg-green-700 text-white'
                          : item.availableQuantity <= 0
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : 'bg-emerald-700 text-white hover:bg-emerald-800'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t('addedToCart')}</span>
                        </>
                      ) : (
                        <span>{t('addToCart')}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compare Prices Modal */}
      {comparingCrop && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-5 text-left border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg font-serif">
                  Compare Farmer Rates for {comparingCrop.name}
                </h3>
                <p className="text-xs text-stone-500">Pick the farmer with the best price or closest location</p>
              </div>
              <button
                onClick={() => setComparingCrop(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {getPriceVariationsForCrop(comparingCrop.cropGroup || comparingCrop.id).map((varItem) => (
                <div
                  key={varItem.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    varItem.id === comparingCrop.id
                      ? 'border-emerald-600 bg-emerald-50/50'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={varItem.farmerPhoto} alt="" className="w-11 h-11 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1">
                        <span>{varItem.farmerName}</span>
                        {varItem.isVerified && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                      </h4>
                      <p className="text-xs text-stone-500">{varItem.village}, {varItem.district} • {varItem.distanceKm} km</p>
                      <p className="text-[11px] text-amber-600 font-bold">★ {varItem.rating} Rating</p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-xl font-black text-emerald-900">
                      ₹{varItem.pricePerUnit}
                      <span className="text-xs text-stone-500 font-normal">/{varItem.unit}</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduceId(varItem.id);
                        setComparingCrop(null);
                        setActiveView('product-detail');
                      }}
                      className="px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setComparingCrop(null)}
              className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 cursor-pointer"
            >
              Close Comparison
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
