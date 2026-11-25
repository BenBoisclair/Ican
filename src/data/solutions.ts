import type { IconName } from '../lib/icons';
import type { GalleryKey } from './portfolio';

/*
 * The eight solutions: homepage cards, the Solutions menu and the solution pages all read from here.
 * Page copy is condensed from the 2019 site (IT Infrastructure, Software & Application, Out Sources, Services &
 * Product) and the ICAN Alert brochure. A solution without `page` has no content yet: its card opens the contact form
 * with that solution picked. What we still need for those is in content/solution-briefs.md.
 */

export interface Card { title: string; text: string; icon: IconName; href?: string }
export type Section =
  | { type: 'cards'; heading: string; intro?: string; items: Card[] }
  | { type: 'steps'; heading: string; items: { title: string; text: string }[] }
  | { type: 'chips'; heading: string; intro?: string; items: string[] }
  | { type: 'checks'; heading: string; items: string[] }
  | { type: 'apps'; heading: string; intro?: string; groups: { name: string; items: { title: string; text: string }[] }[] };

export interface SolutionPage {
  /** Browser tab title and search snippet. */
  metaTitle: string;
  description: string;
  lead: string;
  facts: string[];
  image?: string;
  imageAlt?: string;
  sections: Section[];
  /** Portfolio galleries shown under "Our work" and linked to the portfolio. */
  galleries?: GalleryKey[];
  download?: { label: string; href: string; note: string };
}

export interface Solution {
  slug: string;
  title: string;
  blurb: string;
  icon: IconName;
  recommended?: boolean;
  page?: SolutionPage;
}

/** Shared by the infrastructure pages: the way ICAN has run projects since 1999. */
const howWeWork: Section = {
  type: 'steps',
  heading: 'How we work',
  items: [
    { title: 'Survey', text: 'We visit the site and check what you have today.' },
    { title: 'Design', text: 'You approve a To-be Design before any work starts.' },
    { title: 'Install and test', text: 'Every device is tested. Results go in the delivery report.' },
    { title: 'Maintain', text: 'Maintenance anywhere in Thailand, by the team that built it.' },
  ],
};

export const solutions: Solution[] = [
  {
    slug: 'it-security-assessment',
    title: 'IT Security Assessment',
    blurb: 'Find weak spots across firewalls, servers, and Wi-Fi.',
    icon: 'shield-check',
    recommended: true,
  },
  {
    slug: 'network-it-infrastructure',
    title: 'Network & IT Infrastructure',
    blurb: 'Resilient networks, from IP planning to fiber redundancy.',
    icon: 'network',
    recommended: true,
    page: {
      metaTitle: 'Network & IT Infrastructure',
      description: 'Network design and installation in Thailand: switches, routers, firewalls, CCTV, access control, IP phones and video conferencing, maintained nationwide.',
      lead: 'Resilient networks, from IP planning to fiber redundancy. We design and install your network and the systems that run on it, then maintain them anywhere in Thailand.',
      facts: ['Cisco CCIE · CCNP · CCNA', 'Tested before handover', 'Nationwide maintenance'],
      image: 'portfolio/ipphone/07.jpg',
      imageAlt: 'Network rack with router and patch cabling installed by ICAN',
      sections: [
        {
          type: 'cards',
          heading: 'What we cover',
          items: [
            { icon: 'workflow', title: 'Network design', text: 'LAN, WAN redundancy, VLANs and fiber links, drawn up and approved before we build.' },
            { icon: 'router', title: 'Network equipment', text: 'Switches, routers and firewalls from quality brands, installed and configured.' },
            { icon: 'cctv', title: 'CCTV', text: 'Camera positions planned so nothing important is missed, with control-room monitoring.' },
            { icon: 'key-round', title: 'Access control', text: 'Card access for doors, with time and attendance records for every staff member.' },
            { icon: 'phone', title: 'IP phone systems', text: 'IP phones installed by our engineers, with a choice of brands.' },
            { icon: 'video', title: 'Video conferencing', text: 'Meeting and conference rooms set up with quality video equipment.' },
          ],
        },
        howWeWork,
      ],
      galleries: ['network', 'cctv', 'access', 'ipphone', 'video'],
    },
  },
  {
    slug: 'server-room-cabling',
    title: 'Server Room & Cabling',
    blurb: 'Racks, cabling, power, and cooling, assessed and improved.',
    icon: 'server',
    page: {
      metaTitle: 'Server Room & Cabling',
      description: 'Server rooms and structured cabling in Thailand: racks, copper and fiber cabling, UPS power, cooling and FM-200 fire suppression, built to standard and tested.',
      lead: 'Racks, cabling, power, and cooling, assessed and improved. We build server rooms and structured cabling to standard, from the floor plan to the fire protection.',
      facts: ['Systimax · Panduit certified', 'Copper and fiber, tested', 'Nationwide maintenance'],
      image: 'portfolio/datacenter/23.jpg',
      imageAlt: 'Server room with rows of racks built by ICAN',
      sections: [
        {
          type: 'cards',
          heading: 'What we cover',
          items: [
            { icon: 'server', title: 'Server room and data center', text: 'Floor plan, racks, cooling and layout for a tidy room that meets standards.' },
            { icon: 'cable', title: 'Structured cabling', text: 'Copper and fiber, indoor and outdoor, labelled and tested, with results in the report.' },
            { icon: 'battery-charging', title: 'Power and UPS', text: 'Power layouts and UPS backup, from the main board to every rack.' },
            { icon: 'fire-extinguisher', title: 'Fire suppression', text: 'FM-200 gas suppression, smoke detectors and alarm panels to protect the room.' },
            { icon: 'monitor', title: 'Servers and PCs', text: 'Supplied at fair prices and installed to standard by our engineers.' },
            { icon: 'bell-ring', title: 'Alerts with ICAN Alert', text: 'A call and an SMS when the room overheats, loses power or detects fire.', href: '/solutions/ican-alert' },
          ],
        },
        howWeWork,
      ],
      galleries: ['datacenter', 'cabling', 'power', 'fire', 'servers'],
    },
  },
  {
    slug: 'enterprise-wifi',
    title: 'Enterprise Wi-Fi',
    blurb: 'Access point and controller design for business Wi-Fi.',
    icon: 'wifi',
  },
  {
    slug: 'software-applications',
    title: 'Software & Applications',
    blurb: 'Custom applications built around your business.',
    icon: 'code-xml',
    page: {
      metaTitle: 'Software & Applications',
      description: 'Custom software development in Thailand: web and desktop applications, SAP interfaces, workflows, helpdesk and reporting systems. 20 systems delivered.',
      lead: 'Custom applications built around your business. We design, build and support web, desktop and mobile systems, many of them linked to SAP.',
      facts: ['20 systems delivered', 'SAP interfaces', 'TQS / ISO 15504'],
      sections: [
        {
          type: 'chips',
          heading: 'What we build',
          items: ['Web applications', 'Desktop and mobile apps', 'SAP and ERP interfaces', 'Approval workflows', 'Reports and data warehouses', 'Helpdesk and service systems'],
        },
        {
          type: 'apps',
          heading: 'Systems we have delivered',
          intro: 'Built for our clients and still the best summary of what we do.',
          groups: [
            {
              name: 'Linked to SAP and other systems',
              items: [
                { title: 'Time attendance to SAP', text: 'Takes staff attendance from the access control system into the ERP.' },
                { title: 'Weighbridge interface', text: 'Reads three weighbridges, encrypts the weights for SAP and shows live CCTV of each.' },
                { title: 'Distributor data warehouse', text: 'Combines distributor sales with SAP data for analysis reports.' },
                { title: 'Distributor sales system', text: 'Collects sales data from every distributor into one central database.' },
              ],
            },
            {
              name: 'Sales and customers',
              items: [
                { title: 'Customer information system', text: 'Customer and sales history for sales analysis.' },
                { title: 'Price information system', text: 'Product prices, shipping destinations and discount approvals.' },
                { title: 'Sales tools', text: 'Products, customers, visits, stock, orders and promotions, on desktop and mobile.' },
              ],
            },
            {
              name: 'Operations and maintenance',
              items: [
                { title: 'Equipment history', text: 'Machine data with maintenance and repair records.' },
                { title: 'Maintenance workflow', text: 'From request and approval to hiring contractors and payment.' },
                { title: 'Silo and dust-filter service', text: 'Requests, repairs, parts, vendor payments and stock, on a digital map.' },
                { title: 'Contractor management', text: 'Registration, training history and safety rules for contractors.' },
                { title: 'Material quality control', text: 'Lab tests, purchasing and documents for cement production materials.' },
              ],
            },
            {
              name: 'Service and helpdesk',
              items: [
                { title: 'Helpdesk management', text: 'Tracks service jobs against SLAs and alerts before deadlines.' },
                { title: 'Service form', text: 'Customer service requests, handled helpdesk style.' },
              ],
            },
            {
              name: 'People and company',
              items: [
                { title: 'Web portal', text: 'One entry point to all company applications.' },
                { title: 'Knowledge management', text: 'E-learning, e-library and training records.' },
                { title: 'Clinic application', text: 'Patient records, treatments, medicine stock and reports.' },
                { title: 'E-uniform', text: 'A yearly staff uniform survey with Excel reports.' },
                { title: 'E-voting', text: 'Shareholder registration, ballots, vote counting and results.' },
                { title: 'Microsite', text: 'A stand-in website that keeps you reachable during an incident.' },
              ],
            },
          ],
        },
      ],
      galleries: ['software'],
    },
  },
  {
    slug: 'it-consulting-assessment',
    title: 'IT Consulting & Assessment',
    blurb: 'Clear findings and a roadmap before you invest.',
    icon: 'clipboard-check',
  },
  {
    slug: 'it-outsourcing',
    title: 'IT Outsourcing',
    blurb: 'IT support, service desk, SAP and programmers, on site or remote.',
    icon: 'headset',
    page: {
      metaTitle: 'IT Outsourcing',
      description: 'IT outsourcing in Thailand: 24-hour IT support and service desk, SAP consultants, programmers and system engineers, on site or remote.',
      lead: 'Experienced ICAN staff at your site or working remotely, for as long as you need them.',
      facts: ['On site or remote', '24-hour support', 'Software and hardware teams'],
      sections: [
        {
          type: 'cards',
          heading: 'Who we provide',
          items: [
            { icon: 'headset', title: 'IT support', text: 'On site or remote, 24 hours a day.' },
            { icon: 'life-buoy', title: 'IT service desk', text: 'On site or remote, 24 hours a day.' },
            { icon: 'database', title: 'SAP consultants', text: 'SAP BI and ABAP.' },
            { icon: 'code-xml', title: 'Programmers', text: '.NET, PHP, Java, SQL and data conversion.' },
            { icon: 'server', title: 'System engineers', text: 'Specialists in networks and systems.' },
          ],
        },
        {
          type: 'cards',
          heading: 'Two teams behind them',
          items: [
            { icon: 'code-xml', title: 'Software team', text: 'Programmers for applications and websites, plus SAP support and advice.' },
            { icon: 'wrench', title: 'Hardware team', text: 'Fixes equipment and network faults on site, with support around the clock.' },
          ],
        },
      ],
    },
  },
  {
    slug: 'ican-alert',
    title: 'ICAN Alert',
    blurb: 'Our own alarm for smoke, heat, power cuts and break-ins.',
    icon: 'bell-ring',
    page: {
      metaTitle: 'ICAN Alert server room alarm',
      description: 'ICAN Alert, our own server room alarm: it calls and texts the people in charge about fire, heat, power, UPS, air-conditioning or water leak problems.',
      lead: 'Our own alarm system for server rooms. When something goes wrong, it texts and calls the people in charge, so they can act before it becomes serious.',
      facts: ['Made by ICAN', 'Up to 8 devices and 8 contacts', 'SMS and phone calls'],
      image: 'portfolio/alert/13.jpg',
      imageAlt: 'The ICAN Alert unit',
      sections: [
        {
          type: 'chips',
          heading: 'What it watches',
          intro: 'Anything unusual in the server room: equipment failure, power cuts, UPS or air-conditioning failure, water leaks or fire. It connects to:',
          items: ['Fire alarm system', 'FM-200 fire suppression', 'UPS (I/O contact)', 'Room temperature control', 'Electrical system', 'Water leak detectors', 'Humidity detectors', 'Any device with an I/O contact'],
        },
        {
          type: 'steps',
          heading: 'How it works',
          items: [
            { title: 'A device raises an alarm', text: 'ICAN Alert receives the signal and rechecks the status.' },
            { title: 'It texts and calls', text: 'An SMS and a call go to the people in charge, naming the device.' },
            { title: 'It keeps calling', text: 'While the problem lasts, it calls again every 1 to 90 minutes, as you set.' },
            { title: 'It confirms the all-clear', text: 'When things are back to normal, it sends an SMS or calls.' },
          ],
        },
        {
          type: 'checks',
          heading: 'Highlights',
          items: [
            'Connects up to 8 devices and alerts up to 8 contacts',
            'SMS and calls to mobiles, calls to landlines, or both',
            'A delay of up to 9 seconds stops brief blips, like a short power dip, from raising an alarm',
            'A system log for checking afterwards',
            'Set up and configured with the included software',
            'Reminder alarms when you need them',
          ],
        },
      ],
      galleries: ['alert'],
      download: { label: 'Download the brochure', href: '/downloads/ican-alert-brochure.pdf', note: 'PDF, 2 pages, 0.6 MB' },
    },
  },
];

/** Where a solution card or menu item goes: its page, or the contact form with the solution picked. */
export const solutionHref = (s: Solution): string =>
  s.page ? `/solutions/${s.slug}` : `/contact?topic=quote&solution=${s.slug}`;
