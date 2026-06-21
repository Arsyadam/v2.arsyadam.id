export const TRANSIT_BUS_PROGRESS = "transit-bus-progress";

export type TransitBusProgressDetail = {
  progress: number;
  nearContact: boolean;
};

export function dispatchTransitBusProgress(detail: TransitBusProgressDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<TransitBusProgressDetail>(TRANSIT_BUS_PROGRESS, { detail })
  );
}

export function onTransitBusProgress(
  handler: (detail: TransitBusProgressDetail) => void
) {
  const listener = (event: Event) => {
    handler((event as CustomEvent<TransitBusProgressDetail>).detail);
  };
  window.addEventListener(TRANSIT_BUS_PROGRESS, listener);
  return () => window.removeEventListener(TRANSIT_BUS_PROGRESS, listener);
}

/** Main spine bus progress where the contact CTA surprise should trigger */
export const CONTACT_REVEAL_PROGRESS = 0.88;

export const PERSPECTIVES_FOCUS = "perspectives-focus";

export type PerspectivesFocusDetail = {
  inSection: boolean;
  /** Combined index: videos first, then medium articles */
  activeIndex: number;
  focus: number;
  scrollProgress: number;
};

export function dispatchPerspectivesFocus(detail: PerspectivesFocusDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<PerspectivesFocusDetail>(PERSPECTIVES_FOCUS, { detail })
  );
}

export function onPerspectivesFocus(
  handler: (detail: PerspectivesFocusDetail) => void
) {
  const listener = (event: Event) => {
    handler((event as CustomEvent<PerspectivesFocusDetail>).detail);
  };
  window.addEventListener(PERSPECTIVES_FOCUS, listener);
  return () => window.removeEventListener(PERSPECTIVES_FOCUS, listener);
}
