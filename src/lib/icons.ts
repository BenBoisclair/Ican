import {
  AppWindow, ArrowRight, ArrowUpRight, BadgeCheck, Cable, CalendarCheck, Check, ChevronDown,
  ClipboardCheck, CodeXml, FileCheck, Hammer, History, MapPin, Menu, MessageCircle, Network,
  Phone, PlugZap, ScanSearch, Server, ShieldCheck, Smartphone, Star, Truck, Users, Wifi, Wrench, X,
} from '@lucide/vue';

export const icons = {
  'network': Network, 'shield-check': ShieldCheck, 'server': Server, 'wifi': Wifi, 'code-xml': CodeXml,
  'clipboard-check': ClipboardCheck, 'wrench': Wrench, 'cable': Cable, 'app-window': AppWindow,
  'history': History, 'scan-search': ScanSearch, 'file-check': FileCheck, 'users': Users,
  'badge-check': BadgeCheck, 'check': Check, 'plug-zap': PlugZap, 'hammer': Hammer, 'truck': Truck,
  'calendar-check': CalendarCheck, 'phone': Phone, 'smartphone': Smartphone, 'map-pin': MapPin,
  'arrow-right': ArrowRight, 'arrow-up-right': ArrowUpRight, 'chevron-down': ChevronDown,
  'menu': Menu, 'x': X, 'message-circle': MessageCircle, 'star': Star,
} as const;

export type IconName = keyof typeof icons;
