export type UserRole = 'farmer' | 'customer' | 'admin';

export type Language = 'en' | 'hi' | 'kn' | 'ta' | 'te';

export type ProduceCategory = 'vegetables' | 'fruits' | 'grains' | 'pulses' | 'spices' | 'other';

export type Unit = 'kg' | 'quintal' | 'ton' | 'piece' | 'dozen' | 'bunch';

export interface ProduceItem {
  id: string;
  name: string;
  hindiName?: string;
  kannadaName?: string;
  tamilName?: string;
  teluguName?: string;
  cropGroup?: string;
  category: ProduceCategory;
  imageUrl: string;
  additionalImages?: string[];
  pricePerUnit: number;
  unit: Unit;
  availableQuantity: number;
  minOrderQuantity: number;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerPhoto: string;
  isVerified: boolean;
  village: string;
  district: string;
  state: string;
  distanceKm: number;
  harvestDate: string;
  harvestTimeAgo: string;
  availableUntil: string;
  description: string;
  isOrganic: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  status: 'active' | 'paused' | 'sold_out';
}

export interface CartItem {
  produce: ProduceItem;
  quantity: number;
}

export type DeliveryMethod = 'farmer_delivery' | 'farm_pickup' | 'local_partner';

export type PaymentMethod = 'cod' | 'upi' | 'online';

export type OrderStatus = 'placed' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderItem {
  produceId: string;
  name: string;
  hindiName?: string;
  kannadaName?: string;
  tamilName?: string;
  teluguName?: string;
  farmerId: string;
  farmerName: string;
  price: number;
  unit: Unit;
  quantity: number;
  imageUrl: string;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  hindiLabel?: string;
  kannadaLabel?: string;
  tamilLabel?: string;
  teluguLabel: string;
  timestamp: string;
  completed: boolean;
  note?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: {
    name: string;
    phone: string;
    addressLine: string;
    village: string;
    district: string;
    pincode: string;
  };
  items: OrderItem[];
  deliveryMethod: DeliveryMethod;
  deliveryFee: number;
  subtotal: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  status: OrderStatus;
  timeline: OrderTimelineStep[];
  createdAt: string;
  expectedDelivery: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerVillage: string;
  reviewGiven?: {
    rating: number;
    comment: string;
    date: string;
  };
}

export interface NotificationItem {
  id: string;
  recipientRole: UserRole;
  recipientId: string;
  title: string;
  message: string;
  type: 'order' | 'delivery' | 'payment' | 'general';
  timestamp: string;
  read: boolean;
  orderId?: string;
}

export interface FarmerReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  produceName: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  photoUrl: string;
  farmName: string;
  village: string;
  district: string;
  state: string;
  isVerified: boolean;
  rating: number;
  completedOrdersCount: number;
  experienceYears: number;
  farmSizeAcres: number;
  specialties: string[];
  bio: string;
  cropsGrown: string[];
  reviews: FarmerReview[];
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  village: string;
  district: string;
  state: string;
  avatarUrl: string;
}
