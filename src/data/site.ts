import type { IconName } from '../lib/icons';
import { solutionHref, solutions } from './solutions';
import { portfolioPages } from './portfolio';

export interface NavLink { label: string; href: string; icon: IconName; separatorBefore?: boolean }
/** A top-level menu item. `icon` shows before the label (the Location button). */
export interface NavItem { label: string; href: string; icon?: IconName; children?: NavLink[] }
export interface Phone { display: string; note: string; tel: string; icon: IconName }

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
  facebookUrl: 'https://www.facebook.com/ican.co.th',
  facebookLabel: 'Follow us on Facebook',
  phones: [
    { display: '+66 2-272-3111', note: '(Automatic)', tel: 'tel:+6622723111', icon: 'phone' },
    { display: '+66 84-672-3111', note: '(Hotline)', tel: 'tel:+66846723111', icon: 'smartphone' },
  ] as Phone[],
  footerHeadings: { address: 'Address', phone: 'Phone' },
  copyright: '© 2026 International Computing And Networking Co., Ltd. All rights reserved.',
  email: 'websupport@ican.co.th',
  contact: { label: 'Contact Us', href: '/contact' },
  menuLabel: 'Menu',
  nav: [
    {
      label: 'Solutions',
      href: '/#solutions',
      children: [
        ...solutions.map((s): NavLink => ({ label: s.title, href: solutionHref(s), icon: s.icon })),
        { label: 'Chang ICAN — Home & Office Technicians', href: '/#chang', icon: 'wrench', separatorBefore: true },
      ],
    },
    {
      label: 'Portfolio',
      href: portfolioPages['it-infrastructure'].href,
      children: [
        { label: portfolioPages['it-infrastructure'].title, href: portfolioPages['it-infrastructure'].href, icon: 'cable' },
        { label: portfolioPages.software.title, href: portfolioPages.software.href, icon: 'app-window' },
      ],
    },
    {
      label: 'About Us',
      href: '/about',
      children: [
        { label: 'About ICAN', href: '/about', icon: 'users' },
        { label: 'Social Responsibility', href: '/social-responsibility', icon: 'heart-handshake' },
      ],
    },
    // Goes to the Area54 directory at the bottom of the homepage.
    { label: 'Location', href: '/#area54', icon: 'map-pin' },
  ] as NavItem[],
};
