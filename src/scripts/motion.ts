/**
 * Page-wide motion: reveal `.rv` elements as they scroll into view, compact the header
 * after scrolling, and open `details[data-smooth]` panels smoothly. Reveal styles only apply
 * under `html.js`, so content stays visible if this script never runs. Photos never move on scroll.
 */
export function initMotion(): void {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const revealables = document.querySelectorAll<HTMLElement>('.rv');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealables.forEach((el) => observer.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('in'));
  }
  // Tells the inline fallback in BaseLayout that reveal is wired up, so it keeps html.js.
  document.documentElement.dataset.motion = 'ready';

  const nav = document.querySelector('.nav');
  const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!reduced) document.querySelectorAll<HTMLDetailsElement>('details[data-smooth]').forEach(smoothDetails);
}

/**
 * Opens and closes a <details> panel by animating its height and fade, instead of jumping.
 * The panel is the element after <summary>. Without JavaScript the native instant toggle still works.
 */
function smoothDetails(details: HTMLDetailsElement): void {
  const summary = details.querySelector('summary');
  const panel = summary?.nextElementSibling as HTMLElement | null;
  if (!summary || !panel) return;
  let running: Animation | null = null;

  summary.addEventListener('click', (e) => {
    e.preventDefault();
    running?.cancel();
    const closing = details.open && !details.classList.contains('closing');
    if (closing) {
      details.classList.add('closing');
      const gap = getComputedStyle(panel).marginTop;
      running = panel.animate(
        [{ height: `${panel.offsetHeight}px`, marginTop: gap, opacity: 1 }, { height: '0px', marginTop: '0px', opacity: 0 }],
        { duration: 260, easing: 'cubic-bezier(.4, 0, .2, 1)' },
      );
      running.onfinish = () => { details.open = false; details.classList.remove('closing'); running = null; };
    } else {
      details.classList.remove('closing');
      details.open = true;
      const gap = getComputedStyle(panel).marginTop;
      running = panel.animate(
        [{ height: '0px', marginTop: '0px', opacity: 0 }, { height: `${panel.offsetHeight}px`, marginTop: gap, opacity: 1 }],
        { duration: 340, easing: 'cubic-bezier(.2, .7, .2, 1)' },
      );
      running.onfinish = () => { running = null; };
    }
  });
}
