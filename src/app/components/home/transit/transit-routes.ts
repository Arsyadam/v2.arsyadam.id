import { buildRoundedTransitPath, type PathPoint } from "./transit-path";

export const MAP_VIEWBOX = { width: 1200, height: 900 } as const;
export const CORNER_RADIUS = 22;

export type SectionId =
  | "hero"
  | "experience"
  | "showcase"
  | "education"
  | "achievement"
  | "perspectives"
  | "contact";

export type TransitStop = {
  id: SectionId;
  label: string;
  x: number;
  y: number;
  labelAngle?: number;
};

export type TransitRoute = {
  id: string;
  number: number;
  color: string;
  points: PathPoint[];
  opacity: number;
  highlightOnExperience?: boolean;
  ambient?: boolean;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
};

/** Page scroll order */
export const SECTION_IDS: SectionId[] = [
  "hero",
  "experience",
  "showcase",
  "education",
  "achievement",
  "perspectives",
  "contact",
];

export const stops: TransitStop[] = [
  { id: "hero", label: "Halte Bundaran HI", x: 130, y: 95, labelAngle: -35 },
  { id: "experience", label: "Halte Transjakarta", x: 290, y: 265, labelAngle: -25 },
  { id: "showcase", label: "Halte Proyek", x: 510, y: 690, labelAngle: 15 },
  { id: "education", label: "Halte Kampus", x: 470, y: 430, labelAngle: 0 },
  { id: "achievement", label: "Halte Prestasi", x: 330, y: 575, labelAngle: -30 },
  { id: "perspectives", label: "Halte Perspektif", x: 370, y: 785, labelAngle: -35 },
  { id: "contact", label: "Halte Terminal", x: 240, y: 855, labelAngle: -40 },
];

export const LEGACY_MAP = { width: 1200, height: 900 } as const;

export const routeDefinitions: TransitRoute[] = [
  {
    id: "route-1",
    number: 1,
    color: "#d22129",
    points: [
      { x: 130, y: 95 },
      { x: 130, y: 180 },
      { x: 210, y: 180 },
      { x: 210, y: 265 },
      { x: 290, y: 265 },
      { x: 290, y: 380 },
      { x: 400, y: 380 },
      { x: 400, y: 520 },
      { x: 510, y: 520 },
      { x: 510, y: 690 },
      { x: 510, y: 760 },
      { x: 420, y: 760 },
      { x: 420, y: 480 },
      { x: 470, y: 480 },
      { x: 470, y: 430 },
      { x: 380, y: 430 },
      { x: 330, y: 500 },
      { x: 330, y: 575 },
      { x: 360, y: 575 },
      { x: 360, y: 700 },
      { x: 370, y: 785 },
      { x: 300, y: 785 },
      { x: 300, y: 855 },
      { x: 240, y: 855 },
    ],
    opacity: 0.38,
    highlightOnExperience: true,
  },
  {
    id: "route-2",
    number: 2,
    color: "#1565C0",
    points: [
      { x: 1020, y: 70 },
      { x: 1020, y: 250 },
      { x: 900, y: 250 },
      { x: 900, y: 420 },
      { x: 980, y: 420 },
      { x: 980, y: 580 },
      { x: 880, y: 580 },
      { x: 880, y: 740 },
      { x: 960, y: 740 },
      { x: 960, y: 870 },
    ],
    opacity: 0.26,
    ambient: true,
    hideOnMobile: true,
  },
  {
    id: "route-3",
    number: 3,
    color: "#F9A825",
    points: [
      { x: 1080, y: 160 },
      { x: 920, y: 160 },
      { x: 920, y: 320 },
      { x: 1080, y: 320 },
      { x: 1080, y: 480 },
      { x: 760, y: 480 },
      { x: 760, y: 640 },
      { x: 1000, y: 640 },
      { x: 1000, y: 800 },
      { x: 680, y: 800 },
      { x: 680, y: 870 },
    ],
    opacity: 0.24,
    ambient: true,
    hideOnTablet: true,
  },
  {
    id: "route-4",
    number: 4,
    color: "#2E7D32",
    points: [
      { x: 60, y: 260 },
      { x: 540, y: 260 },
      { x: 540, y: 420 },
      { x: 80, y: 420 },
      { x: 80, y: 580 },
      { x: 560, y: 580 },
      { x: 560, y: 740 },
      { x: 120, y: 740 },
      { x: 120, y: 870 },
    ],
    opacity: 0.22,
    hideOnMobile: true,
  },
  {
    id: "route-5",
    number: 5,
    color: "#6A1B9A",
    points: [
      { x: 1100, y: 110 },
      { x: 1100, y: 270 },
      { x: 620, y: 270 },
      { x: 620, y: 430 },
      { x: 1100, y: 430 },
      { x: 1100, y: 590 },
      { x: 560, y: 590 },
      { x: 560, y: 750 },
      { x: 1060, y: 750 },
      { x: 1060, y: 870 },
    ],
    opacity: 0.2,
    ambient: true,
    hideOnTablet: true,
  },
];

export type TransitRouteWithPath = TransitRoute & { path: string };

export const routes: TransitRouteWithPath[] = routeDefinitions.map((def) => ({
  ...def,
  path: buildRoundedTransitPath(def.points, CORNER_RADIUS),
}));

export const mainRoute = routes[0];

export const routeLegend = routes.map(({ id, number, color }) => ({
  id,
  number,
  color,
}));

export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function getPointOnPath(
  pathEl: SVGPathElement,
  progress: number
): { x: number; y: number; angle: number } {
  const length = pathEl.getTotalLength();
  const clamped = Math.max(0, Math.min(1, progress));
  const at = clamped * length;
  const point = pathEl.getPointAtLength(at);
  const ahead = pathEl.getPointAtLength(Math.min(at + 5, length));
  const angle =
    (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
  return { x: point.x, y: point.y, angle };
}
