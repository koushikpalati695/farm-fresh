import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  ProduceItem,
  CartItem,
  Order,
  OrderStatus,
  NotificationItem,
  FarmerProfile,
  DeliveryMethod,
  PaymentMethod
} from '../types';
import { sampleFarmers, sampleProduce, sampleOrders, sampleNotifications } from '../data/sampleData';
import { translations } from '../data/translations';

export type ActiveView =
  | 'home'
  | 'marketplace'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'order-tracking'
  | 'farmer-dashboard'
  | 'add-produce'
  | 'customer-profile'
  | 'farmer-profile'
  | 'admin-dashboard'
  | 'role-selection'
  | 'farmer-registration'
  | 'how-it-works'
  | 'about';

interface AppContextType {
  role: UserRole;
  language: Language;
  activeView: ActiveView;
  produceList: ProduceItem[];
  cart: CartItem[];
  orders: Order[];
  notifications: NotificationItem[];
  farmers: FarmerProfile[];
  activeFarmerId: string;
  selectedProduceId: string | null;
  selectedOrderId: string | null;
  selectedFarmerId: string | null;
  latestOrderId: string | null;
  userLocation: { village: string; district: string; state: string };
  searchQuery: string;
  selectedCategory: string;

  // Actions
  setRole: (role: UserRole) => void;
  setLanguage: (lang: Language) => void;
  setActiveView: (view: ActiveView) => void;
  setActiveFarmerId: (id: string) => void;
  setSelectedProduceId: (id: string | null) => void;
  setSelectedOrderId: (id: string | null) => void;
  setSelectedFarmerId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setUserLocation: (loc: { village: string; district: string; state: string }) => void;

  // Multi-Farmer & Registration
  registerFarmer: (data: {
    name: string;
    phone: string;
    village: string;
    district: string;
    state: string;
    farmName: string;
    specialties: string[];
    photoUrl?: string;
    experienceYears?: number;
    farmSizeAcres?: number;
    bio?: string;
  }) => FarmerProfile;

  getActiveFarmer: () => FarmerProfile;
  getPriceVariationsForCrop: (cropGroupOrId: string) => ProduceItem[];

  // Business operations
  addToCart: (produce: ProduceItem, quantity?: number) => void;
  updateCartQuantity: (produceId: string, quantity: number) => void;
  removeFromCart: (produceId: string) => void;
  clearCart: () => void;
  getCartTotal: () => { subtotal: number; deliveryFee: number; total: number; itemCount: number };
  
  placeOrder: (details: {
    customerName: string;
    customerPhone: string;
    addressLine: string;
    village: string;
    district: string;
    pincode: string;
    deliveryMethod: DeliveryMethod;
    paymentMethod: PaymentMethod;
  }) => Order | null;

  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  addNewProduce: (item: Omit<ProduceItem, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>) => void;
  toggleFarmerVerification: (farmerId: string) => void;
  updateProducePrice: (produceId: string, newPrice: number) => void;
  deleteProduce: (produceId: string) => void;
  addFarmerReview: (farmerId: string, review: { customerName: string; rating: number; comment: string; produceName: string }) => void;
  markNotificationAsRead: (notificationId: string) => void;

  // Translation helper
  t: (key: keyof typeof translations.en) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage state initialization
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('ff_role');
    return (saved as UserRole) || 'customer';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ff_lang');
    return (saved as Language) || 'en';
  });

  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [activeFarmerId, setActiveFarmerId] = useState<string>('farmer-1');
  const [selectedProduceId, setSelectedProduceId] = useState<string | null>('fruit-1');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('FF-1094');
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>('farmer-1');
  const [latestOrderId, setLatestOrderId] = useState<string | null>('FF-1094');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [userLocation, setUserLocation] = useState({
    village: 'Kovur',
    district: 'Nellore',
    state: 'Andhra Pradesh'
  });

  const [produceList, setProduceList] = useState<ProduceItem[]>(() => {
    const saved = localStorage.getItem('ff_produce');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 35 && parsed.some((p: any) => p.id === 'fruit-12')) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return sampleProduce;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ff_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ff_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return sampleOrders;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ff_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return sampleNotifications;
  });

  const [farmers, setFarmers] = useState<FarmerProfile[]>(() => {
    const saved = localStorage.getItem('ff_farmers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 7 && parsed.some((f: any) => f.id === 'farmer-7')) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return sampleFarmers;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ff_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('ff_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('ff_produce', JSON.stringify(produceList));
  }, [produceList]);

  useEffect(() => {
    localStorage.setItem('ff_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ff_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ff_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ff_farmers', JSON.stringify(farmers));
  }, [farmers]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'farmer') {
      setActiveView('farmer-dashboard');
    } else if (newRole === 'admin') {
      setActiveView('admin-dashboard');
    } else {
      setActiveView('marketplace');
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    const langDict = (translations as any)[language] || translations.en;
    return (langDict as any)[key] || translations.en[key] || String(key);
  };

  const getActiveFarmer = (): FarmerProfile => {
    return farmers.find((f) => f.id === activeFarmerId) || farmers[0];
  };

  // Farmer registration for multiple farmers
  const registerFarmer = (data: {
    name: string;
    phone: string;
    village: string;
    district: string;
    state: string;
    farmName: string;
    specialties: string[];
    photoUrl?: string;
    experienceYears?: number;
    farmSizeAcres?: number;
    bio?: string;
  }): FarmerProfile => {
    const newId = `farmer-${Date.now()}`;
    const newFarmer: FarmerProfile = {
      id: newId,
      name: data.name,
      phone: data.phone,
      photoUrl:
        data.photoUrl ||
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      farmName: data.farmName || `${data.name} Natural Farm`,
      village: data.village,
      district: data.district,
      state: data.state,
      isVerified: true,
      rating: 5.0,
      completedOrdersCount: 0,
      experienceYears: data.experienceYears || 10,
      farmSizeAcres: data.farmSizeAcres || 5.0,
      specialties: data.specialties.length > 0 ? data.specialties : ['Fresh Produce'],
      cropsGrown: data.specialties,
      bio: data.bio || `Farmer from ${data.village}, ${data.district} dedicated to direct fresh harvest with zero chemicals.`,
      reviews: []
    };

    setFarmers((prev) => [newFarmer, ...prev]);
    setActiveFarmerId(newId);
    setRoleState('farmer');
    setUserLocation({
      village: data.village,
      district: data.district,
      state: data.state
    });

    // Send notification
    const welcomeNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'farmer',
      recipientId: newId,
      title: 'Farmer Profile Registered! 🌾',
      message: `Welcome ${data.name}! You can now set your own produce prices and sell directly to customers.`,
      type: 'general',
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);

    return newFarmer;
  };

  // Price variations query for same crop group
  const getPriceVariationsForCrop = (cropGroupOrId: string): ProduceItem[] => {
    const targetItem = produceList.find((p) => p.id === cropGroupOrId);
    const groupKey = targetItem?.cropGroup || cropGroupOrId;

    if (!groupKey) return [];

    return produceList
      .filter((p) => p.cropGroup === groupKey)
      .sort((a, b) => a.pricePerUnit - b.pricePerUnit);
  };

  // Cart operations
  const addToCart = (produce: ProduceItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.produce.id === produce.id);
      if (existing) {
        return prev.map((item) =>
          item.produce.id === produce.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { produce, quantity: Math.max(quantity, produce.minOrderQuantity || 1) }];
    });
  };

  const updateCartQuantity = (produceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(produceId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.produce.id === produceId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (produceId: string) => {
    setCart((prev) => prev.filter((item) => item.produce.id !== produceId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.produce.pricePerUnit * item.quantity, 0);
    const deliveryFee = subtotal > 0 ? 30 : 0;
    const total = subtotal + deliveryFee;
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, deliveryFee, total, itemCount };
  };

  // Place order
  const placeOrder = (details: {
    customerName: string;
    customerPhone: string;
    addressLine: string;
    village: string;
    district: string;
    pincode: string;
    deliveryMethod: DeliveryMethod;
    paymentMethod: PaymentMethod;
  }): Order | null => {
    if (cart.length === 0) return null;

    const { subtotal } = getCartTotal();
    const deliveryFee = details.deliveryMethod === 'farm_pickup' ? 0 : 30;
    const totalAmount = subtotal + deliveryFee;

    const primaryItem = cart[0].produce;
    const orderId = `FF-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      customerId: 'cust-current',
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      deliveryAddress: {
        name: details.customerName,
        phone: details.customerPhone,
        addressLine: details.addressLine,
        village: details.village,
        district: details.district,
        pincode: details.pincode
      },
      items: cart.map((c) => ({
        produceId: c.produce.id,
        name: c.produce.name,
        teluguName: c.produce.teluguName,
        farmerId: c.produce.farmerId,
        farmerName: c.produce.farmerName,
        price: c.produce.pricePerUnit,
        unit: c.produce.unit,
        quantity: c.quantity,
        imageUrl: c.produce.imageUrl
      })),
      deliveryMethod: details.deliveryMethod,
      deliveryFee,
      subtotal,
      totalAmount,
      paymentMethod: details.paymentMethod,
      paymentStatus: details.paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'placed',
      timeline: [
        {
          status: 'placed',
          label: 'Order Placed',
          teluguLabel: 'ఆర్డర్ నమోదైంది',
          timestamp: 'Just now',
          completed: true,
          note: `Order received via ${details.deliveryMethod === 'farm_pickup' ? 'Farm Pickup' : 'Direct Delivery'}`
        },
        {
          status: 'accepted',
          label: 'Accepted by Farmer',
          teluguLabel: 'రైతు అంగీకరించారు',
          timestamp: 'Pending confirmation',
          completed: false
        },
        {
          status: 'preparing',
          label: 'Harvesting & Packing',
          teluguLabel: 'కోత & ప్యాకింగ్',
          timestamp: 'Pending',
          completed: false
        },
        {
          status: 'ready',
          label: 'Ready for Dispatch',
          teluguLabel: 'రవాణాకు సిద్ధం',
          timestamp: 'Pending',
          completed: false
        },
        {
          status: 'out_for_delivery',
          label: 'Out for Delivery',
          teluguLabel: 'దారిలో ఉంది',
          timestamp: 'Pending',
          completed: false
        },
        {
          status: 'delivered',
          label: 'Delivered Fresh',
          teluguLabel: 'చేరింది',
          timestamp: 'Pending',
          completed: false
        }
      ],
      createdAt: new Date().toISOString(),
      expectedDelivery: 'Today within 2-4 hours',
      farmerId: primaryItem.farmerId,
      farmerName: primaryItem.farmerName,
      farmerPhone: primaryItem.farmerPhone,
      farmerVillage: `${primaryItem.village}, ${primaryItem.district}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrderId(orderId);
    setSelectedOrderId(orderId);

    // Reduce inventory
    setProduceList((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((c) => c.produce.id === prod.id);
        if (cartItem) {
          const newQty = Math.max(0, prod.availableQuantity - cartItem.quantity);
          return {
            ...prod,
            availableQuantity: newQty,
            status: newQty === 0 ? 'sold_out' : prod.status
          };
        }
        return prod;
      })
    );

    // Trigger notification
    const farmerNotif: NotificationItem = {
      id: `notif-${Date.now()}-1`,
      recipientRole: 'farmer',
      recipientId: primaryItem.farmerId,
      title: 'New Order Received! 🛒',
      message: `${details.customerName} placed order #${orderId} for ₹${totalAmount}. Click to accept.`,
      type: 'order',
      timestamp: 'Just now',
      read: false,
      orderId
    };

    const customerNotif: NotificationItem = {
      id: `notif-${Date.now()}-2`,
      recipientRole: 'customer',
      recipientId: 'cust-current',
      title: 'Order Confirmed! 🎉',
      message: `Your order #${orderId} was sent to ${primaryItem.farmerName}. Total: ₹${totalAmount}.`,
      type: 'order',
      timestamp: 'Just now',
      read: false,
      orderId
    };

    setNotifications((prev) => [farmerNotif, customerNotif, ...prev]);

    clearCart();
    setActiveView('order-success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    const statusOrder: OrderStatus[] = [
      'placed',
      'accepted',
      'preparing',
      'ready',
      'out_for_delivery',
      'delivered'
    ];

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const targetIndex = statusOrder.indexOf(newStatus);
        const updatedTimeline = order.timeline.map((step) => {
          const stepIndex = statusOrder.indexOf(step.status);
          if (stepIndex <= targetIndex) {
            return {
              ...step,
              completed: true,
              timestamp: step.status === newStatus ? 'Just updated' : step.timestamp,
              note: step.status === newStatus && note ? note : step.note
            };
          }
          return { ...step, completed: false };
        });

        return {
          ...order,
          status: newStatus,
          timeline: updatedTimeline
        };
      })
    );

    const orderObj = orders.find((o) => o.id === orderId);
    if (orderObj) {
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        recipientRole: 'customer',
        recipientId: orderObj.customerId,
        title: `Order #${orderId} Update 📦`,
        message: `Your produce status was updated to ${newStatus.replace('_', ' ')}.`,
        type: newStatus === 'delivered' ? 'general' : 'delivery',
        timestamp: 'Just now',
        read: false,
        orderId
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const addNewProduce = (itemData: Omit<ProduceItem, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduce: ProduceItem = {
      ...itemData,
      id: newId,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewsCount: 0
    };

    setProduceList((prev) => [newProduce, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'farmer',
      recipientId: itemData.farmerId,
      title: 'Produce Published Live! 🌾',
      message: `${itemData.name} (${itemData.availableQuantity} ${itemData.unit}) is now live at ₹${itemData.pricePerUnit}/${itemData.unit}.`,
      type: 'general',
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const toggleFarmerVerification = (farmerId: string) => {
    setFarmers((prev) =>
      prev.map((f) => (f.id === farmerId ? { ...f, isVerified: !f.isVerified } : f))
    );
    setProduceList((prev) =>
      prev.map((p) => (p.farmerId === farmerId ? { ...p, isVerified: !p.isVerified } : p))
    );
  };

  const updateProducePrice = (produceId: string, newPrice: number) => {
    const validPrice = Math.max(1, Math.round(newPrice));
    setProduceList((prev) =>
      prev.map((item) => (item.id === produceId ? { ...item, pricePerUnit: validPrice } : item))
    );
    setCart((prev) =>
      prev.map((c) =>
        c.produce.id === produceId
          ? { ...c, produce: { ...c.produce, pricePerUnit: validPrice } }
          : c
      )
    );
  };

  const deleteProduce = (produceId: string) => {
    setProduceList((prev) => prev.filter((p) => p.id !== produceId));
  };

  const addFarmerReview = (
    farmerId: string,
    review: { customerName: string; rating: number; comment: string; produceName: string }
  ) => {
    const newReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setFarmers((prev) =>
      prev.map((f) => (f.id === farmerId ? { ...f, reviews: [newReview, ...f.reviews] } : f))
    );

    if (selectedOrderId) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrderId
            ? {
                ...o,
                reviewGiven: {
                  rating: review.rating,
                  comment: review.comment,
                  date: newReview.date
                }
              }
            : o
        )
      );
    }
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        language,
        activeView,
        produceList,
        cart,
        orders,
        notifications,
        farmers,
        activeFarmerId,
        selectedProduceId,
        selectedOrderId,
        selectedFarmerId,
        latestOrderId,
        userLocation,
        searchQuery,
        selectedCategory,
        setRole,
        setLanguage,
        setActiveView,
        setActiveFarmerId,
        setSelectedProduceId,
        setSelectedOrderId,
        setSelectedFarmerId,
        setSearchQuery,
        setSelectedCategory,
        setUserLocation,
        registerFarmer,
        getActiveFarmer,
        getPriceVariationsForCrop,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        placeOrder,
        updateOrderStatus,
        addNewProduce,
        toggleFarmerVerification,
        updateProducePrice,
        deleteProduce,
        addFarmerReview,
        markNotificationAsRead,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
