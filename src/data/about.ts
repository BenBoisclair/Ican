import type { IconName } from '../lib/icons';

// About page copy, condensed from the 2019 "About Us" page.
export const about = {
  metaTitle: 'About ICAN',
  description: 'ICAN (International Computing And Networking) is a Thai IT solutions company in Bangkok, founded in 1999: infrastructure, security, software and support.',
  eyebrow: 'About ICAN',
  title: 'IT solutions in Thailand since 1999',
  lead: 'ICAN is a Thai IT solutions company in Bangkok. We design, build and support IT systems for businesses, from the server room to the software, and stay with them after launch.',
  facts: ['Founded in 1999', 'Bangkok, Thailand', 'In-house team'],
  image: 'images/about-building.jpg',
  imageAlt: 'The ICAN Group building',
  stats: [
    { value: '1999', label: 'Founded by experienced IT people' },
    { value: '27+', label: 'Years in IT services' },
    { value: '20+', label: 'Years of experience in our specialists' },
    { value: '50+', label: 'Client organizations' },
  ],
  what: {
    heading: 'One team, from design to support',
    image: 'images/about-meeting.jpg',
    imageAlt: 'ICAN meeting room',
    points: [
      { icon: 'server', title: 'Hardware', text: 'Servers, PCs, networks and site preparation.' },
      { icon: 'code-xml', title: 'Software', text: 'SAP, e-commerce and custom applications.' },
      { icon: 'history', title: 'Start to finish', text: 'Design, build and launch, then support afterwards.' },
      { icon: 'users', title: 'Our own people', text: 'Little outsourcing, so work stays under our control.' },
    ] as { icon: IconName; title: string; text: string }[],
    principle: 'Our principle: give clients a real return on what they invest, and bring technology closer to them.',
  },
  more: [
    { icon: 'heart-handshake', title: 'Social responsibility', text: 'Charity work and life at ICAN.', href: '/social-responsibility' },
    { icon: 'map-pin', title: 'Visit us at Area54', text: 'Six businesses, one address.', href: '/#area54' },
  ] as { icon: IconName; title: string; text: string; href: string }[],
};
