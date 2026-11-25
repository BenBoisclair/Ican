import type { IconName } from '../lib/icons';

/*
 * Social Responsibility page: charity work and staff activities from ICAN's Facebook (facebook.com/ican.co.th, plus
 * two recent posts from the company page), June 2016 to April 2025. ICAN gave permission to use its photos; keep
 * clients' faces out. Originals and post links: assets/facebook-csr/activities.json. Photos: src/assets/csr/.
 */
export interface Activity {
  /** YYYY-MM or YYYY-MM-DD */
  date: string;
  category: 'charity' | 'people';
  title: string;
  summary: string;
  photos: string[];
  postUrl?: string;
}

export const csr = {
  metaTitle: 'Social Responsibility',
  description: 'How ICAN gives back to the community, and how our team spends time together: charity work, company events and trips.',
  eyebrow: 'Social responsibility',
  title: 'Giving back, together',
  lead: 'What ICAN does for the community, and the events that bring our team together.',
  groups: [
    { key: 'charity', icon: 'heart-handshake', heading: 'Community and charity', intro: 'Donations, visits and volunteering by the ICAN team.' },
    { key: 'people', icon: 'party-popper', heading: 'Life at ICAN', intro: 'Parties, trips and team days for everyone at ICAN.' },
  ] as { key: Activity['category']; icon: IconName; heading: string; intro: string }[],
  activities: [
    {
      date: '2025-04-29', category: 'charity',
      title: 'Computer equipment for a school in Mae Hong Son',
      summary: 'For the Ban Kiew Khamin non-formal education school in Huai Pu Ling, Mae Hong Son, handed to a school representative at our office.',
      photos: ['csr/2025-04-mae-hong-son-csr-1.jpg'],
    },
    {
      date: '2024-05-08', category: 'charity',
      title: 'Laptops for education in remote areas',
      summary: 'Laptops and laptop bags for the Association for the Promotion of Education in Remote Areas, under the patronage of HRH the Princess Mother.',
      photos: ['csr/2024-05-remote-education-csr-1.jpg'],
    },
    {
      date: '2024-03-08', category: 'charity',
      title: 'Computers for Kids: Ban Phu Sawan School',
      summary: 'Computers and school supplies for Ban Phu Sawan School in Kaeng Krachan, Phetchaburi, handed to the students.',
      photos: ['csr/2024-03-ban-phu-sawan-csr-1.jpg', 'csr/2024-03-ban-phu-sawan-csr-2.jpg'],
    },
    {
      date: '2022-01-21', category: 'charity',
      title: 'Computers for Kids: Ban Thung Kham School',
      summary: 'Computers, a TV, school supplies and sports balls for Ban Thung Kham School in Cha-am, Phetchaburi. Our team gave a gift to every student.',
      photos: ['csr/2022-01-ban-thung-kham-csr-1.jpg', 'csr/2022-01-ban-thung-kham-csr-2.jpg'],
    },
    {
      date: '2016-06-10', category: 'charity',
      title: '16 computers and 2 notebooks for a school in Nan',
      summary: 'Donated to Ban Phi Tai School in Ban Luang, Nan, on a three-day team trip, 10 to 12 June 2016.',
      photos: ['csr/2016-06-nan-csr-1.jpg', 'csr/2016-06-nan-csr-2.jpg'],
    },
    {
      date: '2022-12-09', category: 'people',
      title: 'New Year Party 2023',
      summary: 'Dinner, a group photo and prizes with staff and their families.',
      photos: ['csr/2022-12-new-year-party-1.jpg', 'csr/2022-12-new-year-party-2.jpg'],
    },
    {
      date: '2022-10', category: 'people',
      title: 'Company trip to Pattaya',
      summary: 'A yacht trip from the marina, meals together and a hotel stay.',
      photos: ['csr/2022-10-pattaya-trip-1.jpg', 'csr/2022-10-pattaya-trip-2.jpg'],
    },
    {
      date: '2020-12-30', category: 'people',
      title: 'Gifts on the last working day of the year',
      summary: 'Everyone who came to work on the last day of the year received a gift, in 2019 and again in 2020.',
      photos: ['csr/2020-12-last-day-prizes-1.jpg', 'csr/2019-12-last-day-prizes-1.jpg'],
    },
    {
      date: '2019-11', category: 'people',
      title: 'New Year Party 2020',
      summary: 'A colourful dress-up party with a photo booth, a gift exchange and dinner.',
      photos: ['csr/2019-11-new-year-party-2020-1.jpg', 'csr/2019-11-new-year-party-2020-2.jpg'],
    },
    {
      date: '2019-10', category: 'people',
      title: 'Company trip to Pattaya',
      summary: 'A farm visit, the Buddha cliff at Khao Chi Chan and more stops along the way.',
      photos: ['csr/2019-10-pattaya-trip-1.jpg', 'csr/2019-10-pattaya-trip-2.jpg'],
    },
    {
      date: '2019-08-30', category: 'people',
      title: 'Merit-making at the office',
      summary: 'Monks chanted at our office while staff and their families offered food, in 2018 and 2019.',
      photos: ['csr/2019-08-merit-making-1.jpg', 'csr/2019-08-merit-making-2.jpg', 'csr/2018-08-merit-making-1.jpg'],
    },
    {
      date: '2017-12-21', category: 'people',
      title: 'New Year Party 2018',
      summary: 'Staff and their families, a themed photo backdrop and dinner in Bangkok.',
      photos: ['csr/2017-12-new-year-party-2018-1.jpg', 'csr/2017-12-new-year-party-2018-2.jpg'],
    },
    {
      date: '2016-12-23', category: 'people',
      title: 'New Year Party 2017',
      summary: 'A buffet dinner at the Gold Orchid Bangkok Hotel, with everyone in ICAN shirts.',
      photos: ['csr/2016-12-new-year-party-2017-1.jpg'],
    },
  ] as Activity[],
  facebook: { heading: 'More on Facebook', text: 'Photos and news from our activities, on the ICAN Facebook page.', label: 'Visit our Facebook page' },
};
