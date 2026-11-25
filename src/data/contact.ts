import { solutions } from './solutions';

/*
 * Contact page and form. The form sends through Web3Forms (a free form-to-email service that works on any static
 * host) once `web3formsKey` is set; get a key at https://web3forms.com with the inbox that should receive queries.
 * Until then, sending opens the visitor's email app with the message filled in, addressed to `to`.
 * Spam guards: Web3Forms filters spam itself and requires the hCaptcha robot check; the page adds a hidden bot
 * trap, length caps, a short pause before the first send, and one message a minute per browser.
 */
export const contact = {
  metaTitle: 'Contact ICAN',
  description: 'Contact ICAN in Bangkok for a quote, a consultation or technical help. Send us a message or call +66 2-272-3111.',
  title: 'Contact us',
  lead: 'Tell us what you need and we will get back to you by email or phone.',
  form: {
    to: 'websupport@ican.co.th',
    web3formsKey: 'a41a9742-0b1e-4595-93a7-892fb2381c55',
    // Robot check: hCaptcha, free through Web3Forms with its shared site key (docs.web3forms.com, spam protection).
    // hCaptcha must also be on for this form in the Web3Forms dashboard, which then rejects messages without it.
    hcaptchaSiteKey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2',
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
    tooFast: 'Please check your message, then press Send again.',
    wait: 'Thank you, we have your message. To send another, please wait a minute.',
    captchaMissing: 'Please tick “I am human” above the Send button. If you cannot see it, email us at',
    noScript: 'This form needs JavaScript. Please email us at',
  },
  chang: { title: 'A home or office job?', text: 'Chang ICAN technicians handle wiring, repairs, moving and event setup.' },
};
