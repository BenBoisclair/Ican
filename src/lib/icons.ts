import {
  AppWindow, ArrowRight, ArrowUpRight, BadgeCheck, BatteryCharging, BellRing, Cable, CalendarCheck, Cctv, Check,
  ChevronDown, ChevronLeft, ChevronRight, CircleCheck, ClipboardCheck, CodeXml, Database, Download, FileCheck,
  FireExtinguisher, Hammer, Headset, HeartHandshake, History, KeyRound, LifeBuoy, Mail, Map, MapPin, Menu,
  MessageCircle, Monitor, Network, PartyPopper, Phone, PlugZap, Router, ScanSearch, Send, Server, ShieldCheck,
  Smartphone, Star, TriangleAlert, Truck, Users, Video, Wifi, Workflow, Wrench, X,
} from '@lucide/vue';

export const icons = {
  'network': Network, 'shield-check': ShieldCheck, 'server': Server, 'wifi': Wifi, 'code-xml': CodeXml,
  'clipboard-check': ClipboardCheck, 'wrench': Wrench, 'cable': Cable, 'app-window': AppWindow,
  'history': History, 'scan-search': ScanSearch, 'file-check': FileCheck, 'users': Users,
  'badge-check': BadgeCheck, 'check': Check, 'plug-zap': PlugZap, 'hammer': Hammer, 'truck': Truck,
  'calendar-check': CalendarCheck, 'phone': Phone, 'smartphone': Smartphone, 'map-pin': MapPin, 'map': Map,
  'arrow-right': ArrowRight, 'arrow-up-right': ArrowUpRight, 'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft, 'chevron-right': ChevronRight,
  'menu': Menu, 'x': X, 'message-circle': MessageCircle, 'star': Star,
  'battery-charging': BatteryCharging, 'bell-ring': BellRing, 'cctv': Cctv, 'circle-check': CircleCheck,
  'database': Database, 'download': Download, 'fire-extinguisher': FireExtinguisher, 'headset': Headset,
  'heart-handshake': HeartHandshake, 'key-round': KeyRound, 'life-buoy': LifeBuoy, 'mail': Mail,
  'monitor': Monitor, 'party-popper': PartyPopper, 'router': Router, 'send': Send,
  'triangle-alert': TriangleAlert, 'video': Video, 'workflow': Workflow,
} as const;

export type IconName = keyof typeof icons;
