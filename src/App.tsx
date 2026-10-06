/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Marketplace } from './components/Marketplace';
import { ProductDetail } from './components/ProductDetail';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { FarmerDashboard } from './components/FarmerDashboard';
import { AddProduceView } from './components/AddProduceView';
import { FarmerRegistrationView } from './components/FarmerRegistrationView';
import { CustomerProfileView } from './components/CustomerProfileView';
import { FarmerPublicProfile } from './components/FarmerPublicProfile';
import { AdminDashboard } from './components/AdminDashboard';
import { RoleSelectModal } from './components/RoleSelectModal';
import { HowItWorksView } from './components/HowItWorksView';
import { AboutView } from './components/AboutView';
import { NotificationDrawer } from './components/NotificationDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView } = useApp();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return <LandingPage />;
      case 'marketplace':
        return <Marketplace />;
      case 'product-detail':
        return <ProductDetail />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'order-tracking':
        return <OrderTrackingView />;
      case 'farmer-dashboard':
        return <FarmerDashboard />;
      case 'add-produce':
        return <AddProduceView />;
      case 'farmer-registration':
        return <FarmerRegistrationView />;
      case 'customer-profile':
        return <CustomerProfileView />;
      case 'farmer-profile':
        return <FarmerPublicProfile />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'role-selection':
        return <RoleSelectModal />;
      case 'how-it-works':
        return <HowItWorksView />;
      case 'about':
        return <AboutView />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-200 selection:text-emerald-950">
      {/* Sticky Header */}
      <Header onOpenNotifications={() => setNotificationsOpen(true)} />

      {/* Slide-out Notification Drawer */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation (Home | Market | Sell | Orders | Profile) */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
