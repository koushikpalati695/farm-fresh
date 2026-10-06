import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Check, X, ArrowRight, Package, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

export const NotificationDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { notifications, markNotificationAsRead, setActiveView, setSelectedOrderId, role } = useApp();

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter(
    (n) => n.recipientRole === role || role === 'admin'
  );

  const handleNotificationClick = (notifId: string, orderId?: string) => {
    markNotificationAsRead(notifId);
    if (orderId) {
      setSelectedOrderId(orderId);
      if (role === 'farmer') {
        setActiveView('farmer-dashboard');
      } else {
        setActiveView('order-tracking');
      }
    }
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-5 h-5 text-emerald-600" />;
      case 'delivery':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'payment':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Notifications & Alerts</h3>
              <p className="text-xs text-stone-500">Live order & harvest updates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-12 text-stone-400 space-y-3">
              <Bell className="w-12 h-12 mx-auto stroke-1 text-stone-300" />
              <p className="text-sm font-medium">No new notifications</p>
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id, notif.orderId)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                  notif.read
                    ? 'bg-white border-stone-200 opacity-80 hover:opacity-100'
                    : 'bg-emerald-50/70 border-emerald-200 shadow-xs hover:bg-emerald-50'
                }`}
              >
                {!notif.read && (
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-2xs border border-stone-100 shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="space-y-1 pr-4">
                    <h4 className="text-sm font-bold text-stone-900 leading-snug">{notif.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{notif.message}</p>
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-400">
                      <span>{notif.timestamp}</span>
                      {notif.orderId && (
                        <span className="font-semibold text-emerald-700 flex items-center gap-0.5">
                          View details <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>Active Role: <strong className="text-stone-800 capitalize">{role}</strong></span>
          <button
            onClick={() => {
              filteredNotifs.forEach((n) => markNotificationAsRead(n.id));
            }}
            className="text-emerald-700 font-bold hover:underline cursor-pointer"
          >
            Mark all read
          </button>
        </div>
      </div>
    </div>
  );
};
