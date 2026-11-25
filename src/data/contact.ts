import { solutions } from './solutions';

/*
 * Contact page and form. The form sends through Web3Forms (a free form-to-email service that works on any static
 * host) once `web3formsKey` is set; get a key at https://web3forms.com with the inbox that should receive queries.
 * Until then, sending opens the visitor's email app with the message filled in, addressed to `to`.
 */
export const contact = {
  metaTitle: 'Contact ICAN',
  description: 'Contact ICAN in Bangkok for a quote, a consultation or technical help. Send us a message or call +66 2-272-3111.',
  title: 'Contact us',
  lead: 'Tell us what you need and we will get back to you by email or phone.',
  form: {
    to: 'websupport@ican.co.th',
    web3formsKey: '',
    heading: 'Send us a message',
    topicLabel: 'What can we help with?',
    topics: [
      { value: 'quote', label: 'Get a quote', askSolution: true },
      { value: 'solution', label: 'Ask about a solution', askSolution: true },
      { value: 'consult', label: 'Book a consultation', askSolution: false },
      { value: 'support', label: 'Get technical help', askSolution: false },
      { value: 'other', label: 'Something else', askSolution: false },
    ],
    solutionLabel: 'Which solution?',
    solutions: [...solutions.map((s) => ({ value: s.slug, label: s.title })), { value: 'other', label: 'Other' }],
    privacy: 'We only use your details to reply to you.',
    submit: 'Send message',
    sent: 'Thank you. Your message has been sent and we will reply soon.',
    mailOpened: 'Your email app should now open with your message. If it does not, email us at',
    failed: 'Sorry, the message could not be sent. Please email us at',
  },
  chang: { title: 'A home or office job?', text: 'Chang ICAN technicians handle wiring, repairs, moving and event setup.' },
};
