/*
 * Google Analytics behind the consent banner, plus events for the clicks that bring in work: calls, emails, LINE,
 * directions, Facebook, the Location and Contact buttons, and contact-form sends. `eventForLink` doesn't depend on
 * GA, so moving to another tool (e.g. Umami) only means changing `loadGa`, `stopGa` and `send`.
 */

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

export interface TrackedEvent { name: string; params?: Record<string, string> }
type Choice = 'granted' | 'denied';

const CHOICE_KEY = 'ican-analytics-consent';

const clean = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim().slice(0, 100);
const linkText = (a: Element) => clean(a.getAttribute('aria-label') || a.textContent);
/** The business name when the link sits on one of the Area54 directory's cards. */
const placeOf = (a: Element) => clean(a.closest('[data-spot]')?.querySelector('h3')?.firstChild?.textContent);
// share.google links are Google Maps places shared from the Maps app.
const MAP_HOSTS = ['maps.google.com', 'maps.app.goo.gl', 'share.google'];

/** Which event a link click counts as, or null for links that aren't counted. */
export function eventForLink(a: HTMLAnchorElement): TrackedEvent | null {
  const href = a.getAttribute('href') ?? '';
  if (href.startsWith('tel:')) return { name: 'phone_call', params: { number: href.slice(4) } };
  if (href.startsWith('mailto:')) return { name: 'email_click', params: { address: href.slice(7).split('?')[0] } };
  let url: URL;
  try { url = new URL(href, location.href); } catch { return null; }
  const host = url.hostname.replace(/^www\./, '');
  if (host === 'lin.ee' || host === 'line.me' || host.endsWith('.line.me')) return { name: 'line_click', params: { link_text: linkText(a) } };
  if ((host === 'google.com' && url.pathname.startsWith('/maps')) || MAP_HOSTS.includes(host)) {
    return { name: 'get_directions', params: { place: placeOf(a) || clean(url.searchParams.get('query')) || linkText(a) } };
  }
  if (host === 'facebook.com' || host.endsWith('.facebook.com')) return { name: 'facebook_click' };
  if (url.origin === location.origin) {
    if (url.pathname.replace(/\/$/, '') === '/contact') return { name: 'contact_click', params: { link_text: linkText(a) } };
    if (url.pathname === '/' && url.hash === '#area54') return { name: 'location_click' };
  }
  return null;
}

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(CHOICE_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch { return null; }
}
function saveChoice(c: Choice) {
  try { localStorage.setItem(CHOICE_KEY, c); } catch { /* private mode: the banner asks again on the next page */ }
}

const disableFlag = (id: string) => `ga-disable-${id}`;

function loadGa(id: string) {
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  // gtag.js reads the `arguments` objects themselves, so this must be a plain function, not an arrow.
  window.gtag = function gtag() { dataLayer.push(arguments); };
  // The banner only asks about statistics, so advertising storage stays off.
  window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('js', new Date());
  window.gtag('config', id);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.append(s);
}

/** A visitor who accepted earlier pressed Decline: stop sending and remove GA's cookies. */
function stopGa(id: string) {
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  (window as unknown as Record<string, unknown>)[disableFlag(id)] = true;
  const parts = location.hostname.split('.');
  for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
    if (name !== '_ga' && !name.startsWith('_ga_')) continue;
    // GA writes its cookies on the widest domain it can (e.g. .ican.co.th), so clear every level.
    for (let i = 0; i < parts.length - 1; i++) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parts.slice(i).join('.')}`;
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

/** Wires up the consent banner and the click events when GA is configured. Returns a function that undoes it. */
export function initAnalytics(): () => void {
  const controller = new AbortController();
  const { signal } = controller;
  const banner = document.getElementById('consent');
  const id = banner?.dataset.ga;
  if (!banner || !id) return () => controller.abort();

  const live = (banner.dataset.domains ?? '').split(',').includes(location.hostname);
  let granted = false;
  let opener: HTMLElement | null = null;

  const grant = () => {
    granted = true;
    if (!live) return;
    if (!window.gtag) { loadGa(id); return; }
    (window as unknown as Record<string, unknown>)[disableFlag(id)] = false;
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  };
  const revoke = () => {
    const was = granted;
    granted = false;
    if (live && was) stopGa(id);
  };
  const send = ({ name, params }: TrackedEvent) => {
    if (granted && live) window.gtag?.('event', name, params ?? {});
  };

  const choice = readChoice();
  if (choice === 'granted') grant();
  else if (!choice) banner.hidden = false;

  banner.addEventListener('click', (e) => {
    const c = (e.target as Element).closest<HTMLElement>('[data-choice]')?.dataset.choice;
    if (c !== 'granted' && c !== 'denied') return;
    saveChoice(c);
    banner.hidden = true;
    if (c === 'granted') grant(); else revoke();
    opener?.focus();
    opener = null;
  }, { signal });

  const onClick = (e: MouseEvent) => {
    if (e.type === 'auxclick' && e.button !== 1) return; // middle-click opens links in a new tab
    const target = e.target as Element | null;
    const settings = target?.closest?.<HTMLElement>('[data-consent-open]');
    if (settings) {
      opener = settings;
      banner.hidden = false;
      banner.querySelector('button')?.focus();
      return;
    }
    const a = target?.closest?.('a[href]');
    const event = a && eventForLink(a as HTMLAnchorElement);
    if (event) send(event);
  };
  // Capture phase, so links whose own handlers stop the click are still counted.
  document.addEventListener('click', onClick, { signal, capture: true });
  document.addEventListener('auxclick', onClick, { signal, capture: true });
  // The contact page fires this after a message is accepted by the form service.
  document.addEventListener('contact:sent', (e) => {
    send({ name: 'generate_lead', params: (e as CustomEvent<Record<string, string>>).detail });
  }, { signal });

  return () => controller.abort();
}
