import type { IconName } from '../lib/icons';

export interface NavLink { label: string; href: string; icon: IconName; separatorBefore?: boolean }
export interface NavItem { label: string; href: string; children?: NavLink[] }
export interface Phone { display: string; note: string; tel: string; icon: IconName }

// Inner pages don't exist yet, so navigation points at homepage sections for now.
export const site = {
  legalName: 'International Computing And Networking Co., Ltd.',
  logoAlt: 'ICAN — International Computing And Networking Co., Ltd.',
  address: [
    '102 Soi Yasoob 1, Vibhavadi Rangsit Road,',
    'Chom Phon Subdistrict, Chatuchak District,',
    'Bangkok 10900',
  ],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=102+Soi+Yasoob+1+Vibhavadi+Rangsit+Road+Chatuchak+Bangkok+10900',
  mapsLabel: 'Open in Google Maps',
  facebookUrl: 'https://www.facebook.com/ICAN.Admin/',
  facebookLabel: 'Follow us on Facebook',
  phones: [
    { display: '+66 2-272-3111', note: '(Automatic)', tel: 'tel:+6622723111', icon: 'phone' },
    { display: '+66 84-672-3111', note: '(Hotline)', tel: 'tel:+66846723111', icon: 'smartphone' },
  ] as Phone[],
  footerHeadings: { address: 'Address', phone: 'Phone' },
  copyright: '© 2026 International Computing And Networking Co., Ltd. All rights reserved.',
  contact: { label: 'Contact Us', href: '#contact' },
  menuLabel: 'Menu',
  nav: [
    {
      label: 'Solutions',
      href: '#solutions',
      children: [
        { label: 'Network & IT Infrastructure', href: '#solutions', icon: 'network' },
        { label: 'IT Security Assessment', href: '#solutions', icon: 'shield-check' },
        { label: 'Server Room & Cabling Solutions', href: '#solutions', icon: 'server' },
        { label: 'Enterprise Wi-Fi Solutions', href: '#solutions', icon: 'wifi' },
        { label: 'Software & Application Solutions', href: '#solutions', icon: 'code-xml' },
        { label: 'IT Consulting & Assessment', href: '#solutions', icon: 'clipboard-check' },
        { label: 'Chang ICAN — Home & Office Technicians', href: '#chang', icon: 'wrench', separatorBefore: true },
      ],
    },
    {
      label: 'Portfolio',
      href: '#work',
      children: [
        { label: 'IT Infrastructure', href: '#work', icon: 'cable' },
        { label: 'Software & Application', href: '#work', icon: 'app-window' },
      ],
    },
    { label: 'About Us', href: '#why' },
  ] as NavItem[],
};
