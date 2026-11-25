import type { IconName } from '../lib/icons';

export interface Cta { label: string; href: string; variant: 'primary' | 'ghost'; arrow?: boolean }
export interface Logo {
  file: string;
  name: string;
  white?: boolean;
  height?: number;
  /** Shrinks or grows a logo in the client grid; solid colour tiles look larger than line logos. */
  scale?: number;
}
export interface Solution { title: string; blurb: string; icon: IconName; href: string }
export interface Spot {
  id: number;
  name: string;
  thaiName?: string;
  tag: string;
  text: string;
  pin: { left: number; top: number };
  link?: { label: string; href: string; external: boolean };
}

export const hero = {
  titleLead: 'Your Trusted Partner in',
  titleHighlight: 'IT Solutions.',
  lead: 'ICAN helps businesses build, assess, and improve their IT systems and cybersecurity.',
  ctas: [
    { label: 'Explore Solutions', href: '#solutions', variant: 'primary', arrow: true },
    { label: 'Contact Us', href: '#contact', variant: 'ghost' },
  ] as Cta[],
  trustedText: 'Trusted by',
  trustedCount: '50+ organizations',
  trustedSuffix: ', including',
  trustedLogos: [
    { file: 'logos/trusted/scg.png', name: 'SCG', height: 26 },
    { file: 'logos/trusted/ptt.png', name: 'PTT', height: 30 },
    { file: 'logos/trusted/7-eleven.png', name: '7-Eleven', height: 36 },
    { file: 'logos/trusted/loreal.png', name: "L'Oréal Thailand", height: 22 },
    { file: 'logos/trusted/synnex.png', name: 'Synnex', height: 19 },
  ] as Logo[],
  images: {
    main: 'images/hero-cabling.jpg',
    mainAlt: 'Structured cabling installed by ICAN',
    second: 'images/hero-room.jpg',
    secondAlt: 'Server room installed by ICAN',
  },
  cards: [
    { icon: 'history', value: '27+', label: 'Years in IT services', countTo: 27 },
    { icon: 'badge-check', value: 'CCIE · CCNP · CCNA', label: 'Cisco-certified experts' },
    { icon: 'check', value: 'Assessment first' },
  ] as { icon: IconName; value: string; label?: string; countTo?: number }[],
};

export const solutions = {
  heading: 'Our Solutions',
  items: [
    { title: 'Network & IT Infrastructure', blurb: 'Resilient networks, from IP planning to fiber redundancy.', icon: 'network', href: '#solutions' },
    { title: 'IT Security Assessment', blurb: 'Find weak spots across firewalls, servers, and Wi-Fi.', icon: 'shield-check', href: '#solutions' },
    { title: 'Server Room & Cabling Solutions', blurb: 'Racks, cabling, power, and cooling, assessed and improved.', icon: 'server', href: '#solutions' },
    { title: 'Enterprise Wi-Fi Solutions', blurb: 'Access point and controller design for business Wi-Fi.', icon: 'wifi', href: '#solutions' },
    { title: 'Software & Application Solutions', blurb: 'Custom applications built around your business.', icon: 'code-xml', href: '#solutions' },
    { title: 'IT Consulting & Assessment', blurb: 'Clear findings and a roadmap before you invest.', icon: 'clipboard-check', href: '#solutions' },
  ] as Solution[],
};

export const startEasy = {
  eyebrow: 'Chang ICAN',
  thaiName: 'ช่างไอแคน',
  title: 'Start easy',
  text: 'ICAN technicians for everyday home and office jobs. Book by the job or by the day.',
  rating: { value: 4.5, count: 22 },
  /** Chips show the labels; "All services" opens the full list. Source: content/chang-ican/chang-ican.md. */
  services: [
    { icon: 'plug-zap', label: 'Electrical & network', items: ['Wiring', 'LAN & fiber cabling, tested', 'CCTV & Wi-Fi installation', 'Pick-to-Light / Put-to-Light'] },
    { icon: 'hammer', label: 'Handyman', items: ['Lights, faucets, breakers', 'Furniture assembly', 'Shelves, signs, wall mounting'] },
    { icon: 'truck', label: 'Moving', items: ['Homes, condos, offices', 'Heavy items, any floor', 'Demolition, hauling, clearing'] },
    { icon: 'calendar-check', label: 'Event setup', items: ['Meeting rooms', 'Exhibition & fair move-in', 'Equipment setup & teardown'] },
  ] as { icon: IconName; label: string; items: string[] }[],
  phone: { display: '081-613-5243', tel: 'tel:+66816135243' },
  callLabel: 'Call',
  lineLabel: 'LINE',
  lineUrl: 'https://lin.ee/zk70Gu8',
  lineQr: 'images/chang-line-qr.png',
  lineQrCaption: 'Scan to add Chang ICAN',
  allServicesLabel: 'All services',
  images: {
    main: 'images/chang-team.jpg',
    mainAlt: 'The Chang ICAN team',
    second: 'images/chang-photo.jpg',
    secondAlt: 'Chang ICAN technicians terminating fiber cables',
  },
};

const logo = (file: string, name: string, white = false, scale?: number): Logo =>
  ({ file: `logos/${file}.png`, name, ...(white ? { white } : {}), ...(scale ? { scale } : {}) });
/** Solid colour tiles read larger than line logos at the same size. */
const TILE = 0.8;

export const clients = {
  eyebrow: 'Clients',
  heading: 'Trusted by',
  logos: [
    logo('c001', 'B.Grimm'), logo('c002', 'INSEE (Siam City Cement)'), logo('c003', 'Lucky Resources & Logistics'),
    logo('c004', 'Merck'), logo('synnex', 'Synnex'), logo('c005', 'Lyreco'), logo('c006', 'UNIS Thai', false, TILE),
    logo('c007', 'Jacto'), logo('c008', 'Thoresen Thai Agencies'), logo('c009', '7-Eleven', false, TILE),
    logo('c010', 'INSEE Concrete'), logo('c011', 'EGCO Group'), logo('c012', 'Roongthong Wattana'),
    logo('c013', 'World Health Organization Thailand', false, TILE), logo('c014', 'Bangkok Airways'), logo('c015', 'PTT Digital'),
    logo('c016', "L'Oréal Thailand"), logo('c017', 'Conwood'), logo('c018', 'Central Marketing Group', false, TILE),
    logo('c019', 'BIG'), logo('c020', 'AACP'), logo('c021', 'Embassy of the United States'), logo('c022', 'SCG'),
    logo('c023', 'Bank of Thailand'), logo('c024', 'PTT'), logo('c025', 'Siam Shoreside Services'),
    logo('c026', 'LafargeHolcim'), logo('c027', 'MSD'), logo('c028', 'Magotteaux'), logo('c029', 'INSEE Ecocycle'),
    logo('c030', 'Nipat Associates', false, TILE), logo('c031', 'CPF'), logo('c032', 'Dextra'), logo('c033', 'Nokia'),
    logo('c034', 'TenCate'), logo('c035', 'Federal Electric Corp'), logo('c036', 'Ovaltine', false, TILE), logo('c037', 'Beko'),
    logo('c038', 'True'), logo('c039', 'Nielsen'), logo('c040', 'Mead Johnson Nutrition'), logo('c041', 'Red Bull', false, TILE),
    logo('c042', 'X-Speed'), logo('c043', 'Sharp'), logo('c044', 'Soiha Intergroup'), logo('c045', 'Team Group'),
    logo('ubon', 'Ubon Bio Ethanol'), logo('partner1', 'AkzoNobel', true), logo('partner2', 'Alberta Centennial', true),
    logo('partner3', 'Alamo Water', true), logo('partner4', 'ASTD', true), logo('partner5', 'Health', true),
  ],
};

export const why = {
  eyebrow: 'Why choose ICAN?',
  heading: 'Experience, Technical Expertise, and Practical Solutions',
  cta: { label: 'Contact Our Team', href: '#contact', variant: 'primary', arrow: true } as Cta,
  certsTitle: 'Certified expertise',
  certs: [
    { key: 'Networking', chips: ['Cisco CCIE', 'CCNP', 'CCNA'] },
    { key: 'Cabling', chips: ['Systimax', 'Panduit'] },
    { key: 'Software', chips: ['TQS / ISO 15504'] },
    { key: 'Safety', chips: ['Management level', 'Working level'] },
  ],
  items: [
    { icon: 'history', title: 'Established in 1999', text: "27+ years in Thailand's IT services industry." },
    { icon: 'scan-search', title: 'Assessment First', text: 'Clear findings and a roadmap before any change.' },
    { icon: 'file-check', title: 'Approved Design', text: 'You sign off a To-be Design before we build.' },
    { icon: 'users', title: 'One Team, One Contact', text: 'In-house specialists, fair pricing, one point of contact.' },
  ] as { icon: IconName; title: string; text: string }[],
};

export const projects = {
  eyebrow: 'Portfolio',
  heading: 'See projects in action',
  allLabel: 'View full portfolio',
  allHref: '#work',
  items: [
    { image: 'images/pf-datacenter.jpg', category: 'IT Infrastructure', title: 'Data Center' },
    { image: 'images/pf-cabling.jpg', category: 'IT Infrastructure', title: 'Structured Cabling' },
    { image: 'images/pf-rack.jpg', category: 'IT Infrastructure', title: 'Server & Storage Racks' },
    { image: 'images/pf-fiber.jpg', category: 'IT Infrastructure', title: 'Fiber Optic Installation' },
    { image: 'images/pf-cctv.jpg', category: 'IT Infrastructure', title: 'CCTV Control Room' },
    { image: 'images/pf-fire.jpg', category: 'IT Infrastructure', title: 'Server Room Fire Suppression' },
  ],
};

export const area54 = {
  eyebrow: 'Vibhavadi Soi 5, Yaek 4',
  heading: 'Visit Area54',
  sub: "Six businesses, one address. Tap a number to see what's where.",
  directionsLabel: 'Get directions',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Area54+Vibhavadi',
  image: 'images/area54.jpg',
  imageAlt: 'Area54: the ICAN Group building and its neighbors',
  spots: [
    {
      id: 1, name: 'Tidnuad Thai Massage', tag: 'Thai massage · ★ 5.0 Google',
      text: 'Traditional Thai health massage, a few steps from the office.',
      pin: { left: 15, top: 20 },
      link: { label: 'Open in Maps', href: 'https://share.google/fep024W269fiv6ZjT', external: true },
    },
    {
      id: 2, name: 'ICAN Group', tag: 'IT solutions',
      text: 'Our head office: infrastructure, security, software, and consulting since 1999.',
      pin: { left: 59.5, top: 22 },
      link: { label: 'Our solutions', href: '#solutions', external: false },
    },
    {
      id: 3, name: "Chef's Place", tag: 'Restaurant · ★ 5.0 Google',
      text: 'Chef-made Western comfort food: pasta, steak, and a 5-course tasting menu by reservation.',
      pin: { left: 82, top: 26 },
      link: { label: 'Open in Maps', href: 'https://share.google/YkK6HwHjR3dihpZi0', external: true },
    },
    {
      id: 4, name: 'Rice & Curry', thaiName: 'ร้านข้าวแกง', tag: 'Rice & curry',
      text: 'Home-style Thai rice and curry, quick and affordable.',
      pin: { left: 11, top: 68 },
    },
    {
      id: 5, name: 'Carfé Area54 Specialty Coffee', tag: 'Café · ★ 4.9 Google',
      text: 'Vintage coffee shop filled with classic cars. Pickup and delivery available.',
      pin: { left: 47, top: 64 },
      link: { label: 'Open in Maps', href: 'https://share.google/eFkmi0EJoEdeAjz2U', external: true },
    },
    {
      id: 6, name: 'Chang ICAN', thaiName: 'ช่างไอแคน', tag: 'Technicians',
      text: 'On-site technicians for home and office jobs. Call 081-613-5243.',
      pin: { left: 84, top: 67 },
      link: { label: 'Start easy', href: '#chang', external: false },
    },
  ] as Spot[],
};
