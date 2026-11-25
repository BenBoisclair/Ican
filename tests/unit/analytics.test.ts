import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { eventForLink, initAnalytics } from '../../src/scripts/analytics';

const link = (html: string) => {
  document.body.innerHTML = html;
  return document.querySelector('a')!;
};

describe('eventForLink', () => {
  test('phone and email links', () => {
    expect(eventForLink(link('<a href="tel:+6622723111">+66 2-272-3111</a>'))).toEqual({ name: 'phone_call', params: { number: '+6622723111' } });
    expect(eventForLink(link('<a href="mailto:websupport@ican.co.th?subject=Hi">Email</a>'))).toEqual({ name: 'email_click', params: { address: 'websupport@ican.co.th' } });
  });

  test('LINE and Facebook', () => {
    expect(eventForLink(link('<a href="https://lin.ee/zk70Gu8"> LINE </a>'))).toEqual({ name: 'line_click', params: { link_text: 'LINE' } });
    expect(eventForLink(link('<a href="https://www.facebook.com/ican.co.th">Follow us</a>'))).toEqual({ name: 'facebook_click' });
  });

  test('directions name the Area54 business, else the searched place', () => {
    const card = '<div data-spot="1"><h3>Tidnuad Thai Massage <span class="th">ทิดนวด</span></h3><a href="https://share.google/fep024W269fiv6ZjT">Open in Maps</a></div>';
    expect(eventForLink(link(card))).toEqual({ name: 'get_directions', params: { place: 'Tidnuad Thai Massage' } });
    const search = '<a href="https://www.google.com/maps/search/?api=1&query=Area54+Vibhavadi">Get directions</a>';
    expect(eventForLink(link(search))).toEqual({ name: 'get_directions', params: { place: 'Area54 Vibhavadi' } });
  });

  test('the Contact and Location buttons; other links are not counted', () => {
    expect(eventForLink(link('<a href="/contact?topic=quote&solution=it-outsourcing">Get a quote</a>'))).toEqual({ name: 'contact_click', params: { link_text: 'Get a quote' } });
    expect(eventForLink(link('<a href="/#area54">Location</a>'))).toEqual({ name: 'location_click' });
    expect(eventForLink(link('<a href="/about">About</a>'))).toBeNull();
    expect(eventForLink(link('<a href="https://example.com/contact">Elsewhere</a>'))).toBeNull();
  });
});

describe('initAnalytics', () => {
  const banner = (domains = 'localhost') =>
    `<div id="consent" data-ga="G-TEST123" data-domains="${domains}" hidden>
      <button data-choice="denied">Decline</button><button data-choice="granted">Accept</button>
    </div>`;
  const $ = (sel: string) => document.querySelector<HTMLElement>(sel)!;
  const gaScript = () => document.head.querySelector('script[src="https://www.googletagmanager.com/gtag/js?id=G-TEST123"]');
  const events = () => (window.dataLayer ?? []).map((e) => Array.from(e as ArrayLike<unknown>)).filter((a) => a[0] === 'event');
  const stopNavigation = (e: Event) => e.preventDefault(); // jsdom can't follow tel: links
  let undo = () => {};

  beforeEach(() => {
    localStorage.clear();
    delete window.gtag;
    delete window.dataLayer;
    delete (window as unknown as Record<string, unknown>)['ga-disable-G-TEST123'];
    document.head.querySelectorAll('script').forEach((s) => s.remove());
    document.addEventListener('click', stopNavigation);
  });
  afterEach(() => {
    undo();
    document.removeEventListener('click', stopNavigation);
    document.body.innerHTML = '';
  });

  test('does nothing when no Measurement ID is set', () => {
    document.body.innerHTML = '<a href="tel:+66">Call</a>';
    undo = initAnalytics();
    $('a').click();
    expect(window.gtag).toBeUndefined();
    expect(gaScript()).toBeNull();
  });

  test('asks first, and loads and counts nothing until Accept', () => {
    document.body.innerHTML = `${banner()}<a href="tel:+66">Call</a>`;
    undo = initAnalytics();
    expect($('#consent').hidden).toBe(false);
    $('a').click();
    expect(gaScript()).toBeNull();
    expect(window.dataLayer).toBeUndefined();

    $('[data-choice="granted"]').click();
    expect($('#consent').hidden).toBe(true);
    expect(localStorage.getItem('ican-analytics-consent')).toBe('granted');
    expect(gaScript()).not.toBeNull();
    $('a').click();
    expect(events()).toEqual([['event', 'phone_call', { number: '+66' }]]);
  });

  test('Decline keeps GA off and is remembered on the next page', () => {
    document.body.innerHTML = banner();
    undo = initAnalytics();
    $('[data-choice="denied"]').click();
    expect(gaScript()).toBeNull();
    expect(localStorage.getItem('ican-analytics-consent')).toBe('denied');

    undo();
    document.body.innerHTML = banner();
    undo = initAnalytics();
    expect($('#consent').hidden).toBe(true);
    expect(gaScript()).toBeNull();
  });

  test('a visitor who accepted before is counted without being asked again', () => {
    localStorage.setItem('ican-analytics-consent', 'granted');
    document.body.innerHTML = banner();
    undo = initAnalytics();
    expect($('#consent').hidden).toBe(true);
    expect(gaScript()).not.toBeNull();
  });

  test('a contact form send counts as a lead', () => {
    localStorage.setItem('ican-analytics-consent', 'granted');
    document.body.innerHTML = `${banner()}<form></form>`;
    undo = initAnalytics();
    $('form').dispatchEvent(new CustomEvent('contact:sent', { bubbles: true, detail: { topic: 'Get a quote', solution: 'IT Outsourcing' } }));
    expect(events()).toEqual([['event', 'generate_lead', { topic: 'Get a quote', solution: 'IT Outsourcing' }]]);
  });

  test('Cookie settings reopens the banner; Decline then stops counting and clears GA cookies', () => {
    localStorage.setItem('ican-analytics-consent', 'granted');
    document.body.innerHTML = `${banner()}<a href="tel:+66">Call</a><button data-consent-open>Cookie settings</button>`;
    undo = initAnalytics();
    document.cookie = '_ga=GA1.1.123; path=/';
    document.cookie = '_ga_TEST123=GS1.1.456; path=/';

    $('[data-consent-open]').click();
    expect($('#consent').hidden).toBe(false);
    expect(document.activeElement).toBe($('[data-choice="denied"]'));

    $('[data-choice="denied"]').click();
    expect(document.activeElement).toBe($('[data-consent-open]'));
    expect(localStorage.getItem('ican-analytics-consent')).toBe('denied');
    expect((window as unknown as Record<string, unknown>)['ga-disable-G-TEST123']).toBe(true);
    expect(document.cookie).not.toContain('_ga');
    $('a').click();
    expect(events()).toEqual([]);
  });

  test('stays off on hostnames outside the list, such as local development', () => {
    document.body.innerHTML = banner('www.ican.co.th,ican.co.th');
    undo = initAnalytics();
    $('[data-choice="granted"]').click();
    expect(localStorage.getItem('ican-analytics-consent')).toBe('granted');
    expect(gaScript()).toBeNull();
  });
});
