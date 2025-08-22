export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreditCardData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface MpesaData {
  phoneNumber: string;
  pin: string;
}

export type PaymentMethod = 'credit_card' | 'mpesa';

export type CheckoutStep = 'cart' | 'address' | 'payment' | 'mpesa_confirm' | 'processing' | 'success';