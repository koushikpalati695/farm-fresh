import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sprout,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  Eye,
  Star,
  Check
} from 'lucide-react';
import { ProduceCategory, Unit } from '../types';

export const AddProduceView: React.FC = () => {
  const { addNewProduce, setActiveView, getActiveFarmer, userLocation, t, language } = useApp();

  const currentFarmer = getActiveFarmer();

  // Form Fields
  const [name, setName] = useState('');
  const [regionalName, setRegionalName] = useState('');
  const [category, setCategory] = useState<ProduceCategory>('fruits');
  const [cropGroup, setCropGroup] = useState('mango');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80');
  const [availableQuantity, setAvailableQuantity] = useState<number>(200);
  const [unit, setUnit] = useState<Unit>('kg');
  const [pricePerUnit, setPricePerUnit] = useState<number>(80);
  const [minOrderQuantity, setMinOrderQuantity] = useState<number>(2);
  const [harvestDate, setHarvestDate] = useState('2026-10-06');
  const [availableUntil, setAvailableUntil] = useState('2026-10-18');
  const [village, setVillage] = useState(currentFarmer.village || userLocation.village);
  const [district, setDistrict] = useState(currentFarmer.district || userLocation.district);
  const [stateName, setStateName] = useState(currentFarmer.state || userLocation.state);
  const [description, setDescription] = useState('Naturally grown and freshly harvested from our farm soil with 0% synthetic chemicals.');
  const [isOrganic, setIsOrganic] = useState(true);

  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Broad photo presets covering Fruits, Veggies, and Pulses
  const photoPresets = [
    { label: 'Mangoes', group: 'mango', cat: 'fruits' as const, url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80' },
    { label: 'Apples', group: 'apple', cat: 'fruits' as const, url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80' },
    { label: 'Oranges', group: 'orange', cat: 'fruits' as const, url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80' },
    { label: 'Bananas', group: 'banana', cat: 'fruits' as const, url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80' },
    { label: 'Tomatoes', group: 'tomato', cat: 'vegetables' as const, url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
    { label: 'Chillies', group: 'chilli', cat: 'vegetables' as const, url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Onions', group: 'onion', cat: 'vegetables' as const, url: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80' },
    { label: 'Potatoes', group: 'potato', cat: 'vegetables' as const, url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80' },
    { label: 'Toor Dal', group: 'toor_dal', cat: 'pulses' as const, url: 'https://images.unsplash.com/photo-1585994192701-f2f21eafe681?auto=format&fit=crop&w=800&q=80' },
    { label: 'Moong Dal', group: 'moong_dal', cat: 'pulses' as const, url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80' },
    { label: 'Chana Dal', group: 'chana_dal', cat: 'pulses' as const, url: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=800&q=80' },
    { label: 'Rajma', group: 'rajma', cat: 'pulses' as const, url: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleSelectPreset = (p: typeof photoPresets[0]) => {
    setImageUrl(p.url);
    setCategory(p.cat);
    setCropGroup(p.group);
    if (!name) setName(p.label);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || availableQuantity <= 0 || pricePerUnit <= 0) {
      alert('Please fill out produce name, quantity, and price.');
      return;
    }

    addNewProduce({
      name,
      teluguName: language === 'te' ? regionalName : undefined,
      hindiName: language === 'hi' ? regionalName : undefined,
      kannadaName: language === 'kn' ? regionalName : undefined,
      tamilName: language === 'ta' ? regionalName : undefined,
      cropGroup,
      category,
      imageUrl,
      pricePerUnit: Number(pricePerUnit),
      unit,
      availableQuantity: Number(availableQuantity),
      minOrderQuantity: Number(minOrderQuantity),
      farmerId: currentFarmer.id,
      farmerName: currentFarmer.name,
      farmerPhone: currentFarmer.phone,
      farmerPhoto: currentFarmer.photoUrl,
      isVerified: currentFarmer.isVerified,
      village,
      district,
      state: stateName,
      distanceKm: 4.0,
      harvestDate,
      harvestTimeAgo: 'Harvested fresh today',
      availableUntil,
      description,
      isOrganic,
      status: 'active'
    });

    setPublishedSuccess(true);
    setTimeout(() => {
      setActiveView('farmer-dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <button
            onClick={() => setActiveView('farmer-dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-emerald-700 mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {t('addProduceTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Publishing as: <strong className="text-stone-800">{currentFarmer.name} ({currentFarmer.farmName})</strong>
          </p>
        </div>
      </div>

      {publishedSuccess && (
        <div className="p-6 rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-950 flex items-center gap-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg">
              {t('publishSuccess')}
            </h3>
            <p className="text-sm text-emerald-800">
              Your custom price (₹{pricePerUnit}/{unit}) is now live on the marketplace. Redirecting...
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Form */}
        <form onSubmit={handlePublish} className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
          {/* Produce Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700 uppercase">
              {t('produceName')} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Banganapalli Mangoes / Country Tomatoes / Desi Toor Dal"
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Regional Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700 uppercase">
              Regional Language Name (Hindi / Telugu / Kannada / Tamil)
            </label>
            <input
              type="text"
              value={regionalName}
              onChange={(e) => setRegionalName(e.target.value)}
              placeholder="e.g. देसी टमाटर / ನಾಟಿ ಟೊಮೆಟೊ / நாட்டு தக்காளி / నాటు టమాటాలు"
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                {t('category')} *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProduceCategory)}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer"
              >
                <option value="fruits">{t('fruits')}</option>
                <option value="vegetables">{t('vegetables')}</option>
                <option value="pulses">{t('pulses')}</option>
                <option value="grains">{t('grains')}</option>
                <option value="spices">{t('spices')}</option>
                <option value="other">{t('other')}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                Crop Group (For Price Comparison)
              </label>
              <input
                type="text"
                value={cropGroup}
                onChange={(e) => setCropGroup(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                placeholder="e.g. tomato, mango, toor_dal"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm"
              />
            </div>
          </div>

          {/* Fast Photo Presets */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase">
              {t('producePhoto')} (Tap a preset or enter custom image URL)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {photoPresets.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                    imageUrl === preset.url
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <img src={preset.url} alt="" className="w-full h-10 rounded-lg object-cover mb-1" />
                  <span className="text-[10px] font-bold block truncate">{preset.label}</span>
                </button>
              ))}
            </div>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or enter image URL"
              className="w-full px-4 py-2 rounded-xl border border-stone-300 text-xs font-mono"
            />
          </div>

          {/* Quantity & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                {t('availableQuantity')} *
              </label>
              <input
                type="number"
                min="1"
                required
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-bold text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                {t('unit')} *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as Unit)}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-bold text-sm cursor-pointer"
              >
                <option value="kg">kg (Kilogram)</option>
                <option value="quintal">quintal (100 kg)</option>
                <option value="ton">ton (1,000 kg)</option>
                <option value="piece">piece (Units)</option>
              </select>
            </div>
          </div>

          {/* Price per unit (SET PRICE VARIATION FOR FARMER) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                Your Desired Price Per Unit (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold">₹</span>
                <input
                  type="number"
                  min="1"
                  required
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-3 rounded-2xl border-2 border-emerald-500 font-black text-lg text-emerald-950"
                />
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">100% of this price goes directly to your wallet</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                Minimum Order Quantity ({unit})
              </label>
              <input
                type="number"
                min="1"
                value={minOrderQuantity}
                onChange={(e) => setMinOrderQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-bold text-sm"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                {t('harvestDate')} *
              </label>
              <input
                type="date"
                required
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase">
                {t('availableUntil')} *
              </label>
              <input
                type="date"
                required
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 font-medium text-sm"
              />
            </div>
          </div>

          {/* Organic checkbox */}
          <label className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isOrganic}
              onChange={(e) => setIsOrganic(e.target.checked)}
              className="w-5 h-5 rounded-md text-emerald-600"
            />
            <div>
              <span className="font-bold text-emerald-950 text-sm">Grown Organically / Chemical-Free</span>
              <p className="text-xs text-emerald-800">Check this if natural manure and zero synthetic pesticides were used</p>
            </div>
          </label>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700 uppercase">
              {t('shortDescription')}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Crisp, sweet fruits picked at sunrise."
              className="w-full p-4 rounded-2xl border border-stone-300 text-sm"
            />
          </div>

          {/* Publish Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-emerald-700 text-white font-extrabold text-base sm:text-lg hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-700/25 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t('publishProduce')}</span>
          </button>
        </form>

        {/* Right Preview Card */}
        <div className="lg:col-span-5 space-y-4 sticky top-28">
          <div className="flex items-center gap-2 text-stone-500 font-bold text-xs uppercase tracking-wider">
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>{t('previewCard')}</span>
          </div>

          <div className="bg-white rounded-3xl border-2 border-dashed border-emerald-300 p-4 shadow-sm space-y-3">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100">
              <img src={imageUrl} alt="" className="w-full h-full object-cover" />
              {isOrganic && (
                <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  Organic
                </span>
              )}
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-300" />
                <span>{village}, {district}</span>
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-emerald-900">
                  ₹{pricePerUnit || 0}
                  <span className="text-xs font-normal text-stone-500">/{unit}</span>
                </span>
                <span className="text-xs font-bold text-stone-500">
                  {availableQuantity || 0} {unit} left
                </span>
              </div>

              <h3 className="font-extrabold text-stone-900 text-lg">
                {name || 'Your Produce Name'}
              </h3>
              {regionalName && (
                <p className="text-xs font-semibold text-emerald-700">{regionalName}</p>
              )}

              <p className="text-xs text-stone-600 line-clamp-2">
                {description || 'Produce description will appear here.'}
              </p>

              <div className="pt-2 text-xs text-stone-500 border-t border-stone-100 flex justify-between">
                <span>Farmer: <strong>{currentFarmer.name}</strong></span>
                <span>Harvest: {harvestDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
