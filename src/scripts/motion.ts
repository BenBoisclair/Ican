/**
 * Page-wide motion: reveal `.rv` elements as they scroll into view, compact the header
 * after scrolling, and drift project photos slightly (parallax). Reveal styles only apply
 * under `html.js`, so content stays visible if this script never runs.
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
  const photos = Array.from(document.querySelectorAll<HTMLImageElement>('.tile img'));
  let queued = false;

  const drift = () => {
    queued = false;
    const vh = window.innerHeight;
    for (const photo of photos) {
      const box = photo.parentElement!.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) continue;
      const offset = ((box.top + box.height / 2 - vh / 2) / vh) * -28;
      photo.style.setProperty('--py', `${offset.toFixed(1)}px`);
    }
  };

  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 10);
    if (!reduced && photos.length && !queued) {
      queued = true;
      requestAnimationFrame(drift);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
