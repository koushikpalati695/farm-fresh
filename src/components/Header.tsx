import React, { useState } from 'react';
import { useApp, ActiveView } from '../context/AppContext';
import {
  Sprout,
  ShoppingCart,
  Bell,
  Menu,
  X,
  Languages,
  User,
  ShieldCheck,
  Tractor,
  Store,
  ChevronDown,
  Check,
  Plus
} from 'lucide-react';
import { UserRole, Language } from '../types';

export const Header: React.FC<{ onOpenNotifications: () => void }> = ({ onOpenNotifications }) => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    activeView,
    setActiveView,
    getCartTotal,
    notifications,
    farmers,
    activeFarmerId,
    setActiveFarmerId,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [farmerDropdownOpen, setFarmerDropdownOpen] = useState(false);

  const { itemCount } = getCartTotal();
  const unreadNotifications = notifications.filter((n) => !n.read && (n.recipientRole === role || role === 'admin')).length;

  const currentFarmer = farmers.find((f) => f.id === activeFarmerId) || farmers[0];

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const languagesList: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  const navLinks: { label: string; view: ActiveView }[] = [
    { label: t('navHome'), view: 'home' },
    { label: t('navMarketplace'), view: 'marketplace' },
    { label: t('navSell'), view: role === 'farmer' ? 'farmer-dashboard' : 'role-selection' },
    { label: t('navHowItWorks'), view: 'how-it-works' },
    { label: t('navAbout'), view: 'about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-emerald-800 text-emerald-50 text-xs sm:text-sm py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sprout className="w-4 h-4 text-emerald-300 animate-pulse" />
        <span>
          {language === 'te'
            ? 'రైతుల నుండి నేరుగా సరుకులు • 10+ పండ్లు, 10+ కూరగాయలు, 10+ పప్పుదినుసులు • 0% దళారీ కమీషన్'
            : language === 'hi'
            ? 'सीधे किसानों से ताज़ा उपज • 10+ फल, 10+ सब्जियां, 10+ दालें • 0% बिचौलिया कमीशन'
            : language === 'kn'
            ? 'ರೈತರಿಂದಲೇ ನೇರ ಉತ್ಪನ್ನಗಳು • 10+ ಹಣ್ಣುಗಳು, 10+ ತರಕಾರಿಗಳು, 10+ ಬೇಳೆಕಾಳುಗಳು'
            : language === 'ta'
            ? 'விவசாயிகளிடமிருந்து நேரடி விளைபொருட்கள் • 10+ பழங்கள், 10+ காய்கறிகள், 10+ பருப்பு வகைகள்'
            : 'Farm Fresh Direct • 10+ Fruits, 10+ Vegetables, 10+ Pulses • Multi-Farmer Pricing'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo with "Farm Fresh" */}
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 font-serif">
                  Farm <span className="text-emerald-600">Fresh</span>
                </span>
                <span className="hidden xs:inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Direct
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-700 font-medium hidden sm:block">
                {language === 'te'
                  ? 'రైతుల పొలం నుండి నేరుగా మీ ఇంటికి'
                  : language === 'hi'
                  ? 'खेत से सीधे आपके घर'
                  : language === 'kn'
                  ? 'ಜಮೀನಿನಿಂದ ನೇರವಾಗಿ ನಿಮ್ಮ ಮನೆಗೆ'
                  : language === 'ta'
                  ? 'பண்ணையிலிருந்து நேரடியாக வீட்டிற்கு'
                  : 'Fresh Harvest. Fair Farmer Prices.'}
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setActiveView(link.view)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activeView === link.view
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Multi-Language Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                  setFarmerDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-bold rounded-xl border border-stone-200 bg-stone-50 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors cursor-pointer shadow-2xs"
                title="Change Language"
              >
                <Languages className="w-4 h-4 text-emerald-600" />
                <span>
                  {languagesList.find((l) => l.code === language)?.native || 'English'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Select Language / భాష ఎంచుకోండి
                  </div>
                  {languagesList.map((langItem) => (
                    <button
                      key={langItem.code}
                      onClick={() => {
                        setLanguage(langItem.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span>{langItem.native}</span>
                        <span className="text-xs text-stone-400">({langItem.label})</span>
                      </div>
                      {language === langItem.code && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setActiveView('cart')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeView === 'cart'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-emerald-700" />
              <span className="hidden sm:inline font-semibold">{t('navCart')}</span>
              {itemCount > 0 && (
                <span className="bg-emerald-700 text-white text-xs font-black px-2 py-0.5 rounded-full min-w-5 text-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                  setFarmerDropdownOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer shadow-2xs ${
                  role === 'farmer'
                    ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                    : role === 'admin'
                    ? 'bg-purple-50 border-purple-300 text-purple-900 hover:bg-purple-100'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                {role === 'farmer' ? (
                  <Tractor className="w-4 h-4 text-amber-700" />
                ) : role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                ) : (
                  <Store className="w-4 h-4 text-emerald-700" />
                )}
                <span className="hidden sm:inline">
                  {role === 'farmer'
                    ? t('farmerRole')
                    : role === 'admin'
                    ? t('adminRole')
                    : t('customerRole')}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    {t('switchRole')}
                  </div>
                  <button
                    onClick={() => handleRoleSelect('customer')}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-emerald-600" />
                      <span>{t('customerRole')} (Buy)</span>
                    </div>
                    {role === 'customer' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => handleRoleSelect('farmer')}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-900 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Tractor className="w-4 h-4 text-amber-600" />
                      <span>{t('farmerRole')} (Sell)</span>
                    </div>
                    {role === 'farmer' && <Check className="w-4 h-4 text-amber-600" />}
                  </button>
                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-purple-50 hover:text-purple-900 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <span>{t('adminRole')}</span>
                    </div>
                    {role === 'admin' && <Check className="w-4 h-4 text-purple-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* If in Farmer Mode, show Farmer Switcher dropdown! */}
            {role === 'farmer' && (
              <div className="hidden lg:block relative">
                <button
                  onClick={() => {
                    setFarmerDropdownOpen(!farmerDropdownOpen);
                    setLangDropdownOpen(false);
                    setRoleDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-100/80 text-amber-900 border border-amber-300 hover:bg-amber-200 cursor-pointer"
                  title="Switch between registered farmers"
                >
                  <img src={currentFarmer.photoUrl} alt="" className="w-4 h-4 rounded-full object-cover" />
                  <span>{currentFarmer.name}</span>
                  <ChevronDown className="w-3 h-3 text-amber-700" />
                </button>

                {farmerDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Switch Farmer Profile ({farmers.length})
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {farmers.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => {
                            setActiveFarmerId(f.id);
                            setFarmerDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-2">
                            <img src={f.photoUrl} alt="" className="w-7 h-7 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold text-stone-900">{f.name}</p>
                              <p className="text-[10px] text-stone-400">{f.village}, {f.district}</p>
                            </div>
                          </div>
                          {f.id === activeFarmerId && <Check className="w-3.5 h-3.5 text-amber-600" />}
                        </button>
                      ))}
                    </div>
                    <div className="p-2 border-t border-stone-100">
                      <button
                        onClick={() => {
                          setActiveView('farmer-registration');
                          setFarmerDropdownOpen(false);
                        }}
                        className="w-full py-1.5 px-3 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Register New Farmer</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-stone-700 hover:text-emerald-700 rounded-xl hover:bg-stone-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-100 bg-white space-y-1 animate-in fade-in">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setActiveView(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold cursor-pointer ${
                  activeView === link.view
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-stone-100 px-4">
              <p className="text-xs font-bold text-stone-400 uppercase py-2">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setRole('farmer');
                    setActiveView('farmer-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 rounded-xl bg-amber-50 text-amber-900 font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Tractor className="w-4 h-4 text-amber-700" />
                  <span>Farmer Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setActiveView('farmer-registration');
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 rounded-xl bg-emerald-50 text-emerald-900 font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>+ New Farmer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
