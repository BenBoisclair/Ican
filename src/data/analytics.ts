/*
 * Visitor statistics with Google Analytics 4. Paste the site's Measurement ID ("G-…", from Analytics → Admin →
 * Data streams → the website stream) into `measurementId`. Until then nothing loads and no banner shows.
 * GA sets cookies, so under Thailand's PDPA it only loads after a visitor presses Accept. The choice is kept in the
 * browser; "Cookie settings" in the footer brings the banner back so visitors can change their mind.
 */
export const analytics = {
  measurementId: 'G-R4TEFYB8RY',
  // GA only loads on these hostnames, so local development and previews stay out of the numbers.
  domains: ['www.ican.co.th', 'ican.co.th'],
  consent: {
    text: 'May we use Google Analytics cookies to see how visitors use this site?',
    accept: 'Accept',
    decline: 'Decline',
    label: 'Cookie choice',
    settings: 'Cookie settings',
  },
};
