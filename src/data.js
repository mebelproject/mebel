import {
  Box,
  Crown,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PenTool,
  Truck,
} from 'lucide-react';

export const navLinks = [
  { label: 'Asosiy', href: '#hero', id: 'hero' },
  { label: 'Biz haqimizda', href: '#about', id: 'about' },
  { label: 'Afzalliklar', href: '#features', id: 'features' },
  { label: 'Aloqa', href: '#contact', id: 'contact' },
];

export const stats = [
  { value: '12+', label: 'yillik tajriba' },
  { value: '5000+', label: 'mijoz' },
  { value: '300+', label: 'premium model' },
  { value: '24/7', label: 'xizmat' },
];

export const features = [
  {
    title: 'Premium materiallar',
    description: "Tanlangan yog'och, bardoshli qoplamalar va uzoq xizmat muddati bilan.",
    Icon: Box,
  },
  {
    title: 'Italiya dizayni',
    description: 'Sokin, monumental va zamonaviy Italian aesthetic asosida yaratilgan.',
    Icon: Crown,
  },
  {
    title: 'Individual buyurtma',
    description: "O'lcham, rang va yakuniy detailingni sizning interyeringizga moslaymiz.",
    Icon: PenTool,
  },
  {
    title: 'Tez yetkazib berish',
    description: "Professional logistika va ehtiyotkor o'rnatish bilan aniq muddatda.",
    Icon: Truck,
  },
];

export const contactItems = [
  { label: '+998 95 959 88 78', href: 'tel:+998959598878', Icon: Phone },
  { label: 'mxamidullaev858@gmail.com', href: 'mailto:mxamidullaev858@gmail.com', Icon: Mail },
  { label: '@mukh.ammadali77', href: 'https://instagram.com/mukh.ammadali77', Icon: Instagram },
  {
    label: 'Salarbuyi Street 47, Tashkent 1000520',
    href: 'https://yandex.com/maps/?text=Salarbuyi%20Street%2047%2C%20Tashkent',
    Icon: MapPin,
  },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/mukh.ammadali77', Icon: Instagram },
  { label: 'Telegram', href: 'https://t.me/', Icon: MessageCircle },
  { label: 'Email', href: 'mailto:mxamidullaev858@gmail.com', Icon: Mail },
];

export const heroBackground =
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80';
export const aboutImage =
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80';
