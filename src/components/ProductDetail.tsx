import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  CheckCircle2,
  Calendar,
  Share2,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  Leaf,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { ProduceItem } from '../types';

export const ProductDetail: React.FC = () => {
  const {
    produceList,
    selectedProduceId,
    setSelectedProduceId,
    setActiveView,
    addToCart,
    farmers,
    getPriceVariationsForCrop,
    setSelectedFarmerId,
    t,
    language
  } = useApp();

  const product = produceList.find((p) => p.id === selectedProduceId) || produceList[0];
  const farmer = farmers.find((f) => f.id === product?.farmerId);

  const [quantity, setQuantity] = useState<number>(product?.minOrderQuantity || 2);
  const [activeImage, setActiveImage] = useState<string>(product?.imageUrl || '');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-stone-500">Produce not found.</p>
        <button
          onClick={() => setActiveView('marketplace')}
          className="px-6 py-2 bg-emerald-700 text-white rounded-xl font-bold"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  const allImages = [product.imageUrl, ...(product.additionalImages || [])];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const min = product.minOrderQuantity || 1;
      const max = product.availableQuantity;
      const next = prev + delta;
      return Math.min(Math.max(next, min), max);
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActiveView('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Farmer price variations for this exact crop
  const variations = product.cropGroup ? getPriceVariationsForCrop(product.cropGroup) : [];
  const otherFarmers = variations.filter((v) => v.id !== product.id);

  // Similar produce from other categories
  const similarItems = produceList
    .filter((p) => p.id !== product.id && p.category === product.category && p.cropGroup !== product.cropGroup)
    .slice(0, 3);

  const getLocalizedName = (item: ProduceItem): string => {
    if (language === 'te' && item.teluguName) return item.teluguName;
    if (language === 'hi' && item.hindiName) return item.hindiName;
    if (language === 'kn' && item.kannadaName) return item.kannadaName;
    if (language === 'ta' && item.tamilName) return item.tamilName;
    return item.name;
  };

  const localizedTitle = getLocalizedName(product);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView('marketplace')}
          className="inline-flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-600 hover:text-emerald-700 bg-stone-100 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Copied link! ✓' : 'Share Produce'}</span>
        </button>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 text-left">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 aspect-4/3 shadow-md">
            <img
              src={activeImage || product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isOrganic && (
              <span className="absolute top-4 left-4 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                100% Certified Organic
              </span>
            )}
            <span className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{product.village}, {product.district} ({product.distanceKm} km away)</span>
            </span>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    (activeImage || product.imageUrl) === img
                      ? 'border-emerald-600 ring-2 ring-emerald-200'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Direct Farm Transparency Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-stone-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <Leaf className="w-4 h-4 text-emerald-700" />
              <span>Direct Farm-to-Consumer Promise</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              This produce was harvested directly on the farmer's land and has not been preserved with chemical wax or held in commercial storage facilities.
            </p>
          </div>
        </div>

        {/* Right Column: Product Info & Buy Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-600 px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-stone-400 font-normal">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif leading-tight">
              {product.name}
            </h1>
            {language !== 'en' && localizedTitle !== product.name && (
              <p className="text-lg font-bold text-emerald-700">{localizedTitle}</p>
            )}
          </div>

          {/* Pricing Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Direct Farmgate Price</p>
              <div className="text-3xl sm:text-4xl font-black text-emerald-900">
                ₹{product.pricePerUnit}
                <span className="text-sm font-semibold text-stone-500"> / {product.unit}</span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Available: {product.availableQuantity} {product.unit}
              </span>
              <p className="text-[11px] text-stone-500">Min. order: {product.minOrderQuantity} {product.unit}</p>
            </div>
          </div>

          {/* MULTI-FARMER PRICE VARIATION SELECTOR (Requirement: Price variation for multiple farmers) */}
          {otherFarmers.length > 0 && (
            <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <TrendingDown className="w-4 h-4 text-amber-700" />
                <span>{t('otherFarmersSelling')} ({otherFarmers.length} Other Offers)</span>
              </div>
              <p className="text-xs text-amber-800">
                Different farmers sell this crop at varied rates depending on their distance and farm method.
              </p>

              <div className="space-y-2">
                {otherFarmers.map((other) => (
                  <div
                    key={other.id}
                    onClick={() => setSelectedProduceId(other.id)}
                    className="p-3 bg-white rounded-2xl border border-amber-200 hover:border-amber-400 flex items-center justify-between cursor-pointer transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={other.farmerPhoto} alt="" className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{other.farmerName}</h4>
                        <p className="text-[11px] text-stone-500">{other.village}, {other.district} ({other.distanceKm} km)</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-black text-emerald-800 text-base">
                        ₹{other.pricePerUnit}/{other.unit}
                      </span>
                      <button className="px-3 py-1 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 cursor-pointer">
                        Switch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Harvest Timing Info */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl border border-stone-200 bg-white text-xs sm:text-sm">
            <div className="space-y-0.5">
              <span className="text-stone-400 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {t('harvestDateLabel')}
              </span>
              <p className="font-bold text-stone-800">{product.harvestDate}</p>
              <p className="text-[11px] text-emerald-700 font-medium">{product.harvestTimeAgo}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-stone-400 text-xs flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                {t('validUntilLabel')}
              </span>
              <p className="font-bold text-stone-800">{product.availableUntil}</p>
              <p className="text-[11px] text-stone-500">Fresh harvest guarantee</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Produce Description</h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed bg-white p-4 rounded-2xl border border-stone-200">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector Box */}
          <div className="p-5 rounded-3xl border-2 border-emerald-100 bg-emerald-50/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {t('quantityToOrder')}
                </span>
                <p className="text-xs text-stone-600 font-medium">
                  Total price: <strong className="text-emerald-900 text-base">₹{quantity * product.pricePerUnit}</strong>
                </p>
              </div>

              {/* Stepper buttons */}
              <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-2xl border border-stone-300 shadow-2xs">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= (product.minOrderQuantity || 1)}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-stone-100 flex items-center justify-center font-bold text-stone-700 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-base font-extrabold text-stone-900 min-w-14 text-center">
                  {quantity} {product.unit}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.availableQuantity}
                  className="w-8 h-8 rounded-xl bg-emerald-100 hover:bg-emerald-200 disabled:opacity-30 flex items-center justify-center font-bold text-emerald-800 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="py-4 px-6 rounded-2xl border-2 border-emerald-700 bg-white text-emerald-800 font-bold text-base hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{t('addToCart')}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-2xl bg-emerald-700 text-white font-bold text-base hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-700/20"
              >
                <span>{t('buyNow')}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Farmer Information Card */}
          {farmer && (
            <div
              onClick={() => {
                setSelectedFarmerId(farmer.id);
                setActiveView('farmer-profile');
              }}
              className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer group text-left space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  {t('farmerInfo')}
                </span>
                <span className="text-xs font-bold text-emerald-700 group-hover:underline flex items-center gap-1">
                  View Full Farm Profile →
                </span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={farmer.photoUrl}
                  alt={farmer.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-100"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-stone-900 text-lg group-hover:text-emerald-700">
                      {farmer.name}
                    </h4>
                    {farmer.isVerified && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-stone-500 font-medium">
                    {farmer.farmName} • {farmer.village}, {farmer.district}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-stone-600">
                    <span className="font-bold text-amber-500 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {farmer.rating} Rating
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-emerald-700">
                      {farmer.completedOrdersCount} orders completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Produce Section */}
      {similarItems.length > 0 && (
        <div className="pt-8 border-t border-stone-200 text-left space-y-6">
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-serif">
            {t('similarProduce')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedProduceId(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700">
                    {item.name}
                  </h4>
                  <div className="text-emerald-800 font-extrabold text-base">
                    ₹{item.pricePerUnit} <span className="text-xs font-normal text-stone-500">/{item.unit}</span>
                  </div>
                  <p className="text-xs text-stone-500">{item.farmerName} • {item.village}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
