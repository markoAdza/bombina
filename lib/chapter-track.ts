/**
 * There is exactly one pinned chapter track on the page, so its controls
 * live in a module singleton rather than being threaded through context.
 * That lets the header — which sits outside the track in the tree — drive
 * it without a provider wrapping the whole document.
 */

type Controller = {
  /** Scroll the window so that chapter `index` fills the viewport. */
  goTo: (index: number) => void;
  count: number;
};

let controller: Controller | null = null;
let active = 0;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function registerTrack(next: Controller | null) {
  controller = next;
}

/**
 * Returns false when the track is not mounted or not currently pinned
 * (mobile, or reduced motion), so callers can fall back to a plain anchor.
 */
export function goToChapter(index: number): boolean {
  if (!controller) return false;
  controller.goTo(index);
  return true;
}

export function setActiveChapter(next: number) {
  if (next === active) return;
  active = next;
  emit();
}

export function getActiveChapter() {
  return active;
}

export function subscribeChapter(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
