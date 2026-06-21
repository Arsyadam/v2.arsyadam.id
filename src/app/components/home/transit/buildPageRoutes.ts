import { buildRoundedTransitPath, type PathPoint } from "./transit-path";
import {
  CORNER_RADIUS,
  LEGACY_MAP,
  routeDefinitions,
} from "./transit-routes";
import { MAP_WIDTH, type LandingLayout, type SectionBand } from "./useLandingTransitLayout";

/** Primary transit red — matches brand */
export const TRANSIT_RED = "#d22129";

/** X (viewBox units) of the left rail the bus rides through the Perspectives section. */
export const PERSPECTIVES_RAIL_X = MAP_WIDTH * 0.06;

export type PageRoute = {
  id: string;
  number: number;
  color: string;
  path: string;
  opacity: number;
  ambient?: boolean;
  busRoute?: boolean;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
};

function toPath(points: PathPoint[]) {
  if (points.length < 2) return "";
  return buildRoundedTransitPath(points, CORNER_RADIUS);
}

/** Map legacy 1200×900 coords into a specific vertical band (hero, etc.) */
function mapPointToBand(
  p: PathPoint,
  band: SectionBand,
  yScale = 0.92,
  yOffset = 0.04
): PathPoint {
  return {
    x: (p.x / LEGACY_MAP.width) * MAP_WIDTH,
    y: band.top + (p.y / LEGACY_MAP.height) * band.height * yScale + band.height * yOffset,
  };
}

/** Decorative colored routes that live only in the hero band (not the red main). */
function buildHeroDecorRoutes(layout: LandingLayout): PageRoute[] {
  const hero = layout.sections.hero;
  if (!hero) return [];

  return routeDefinitions
    .filter((route) => route.id !== "route-1")
    .map((route) => ({
      id: `hero-${route.id}`,
      number: route.number,
      color: route.color,
      path: toPath(route.points.map((p) => mapPointToBand(p, hero))),
      opacity: Math.min(route.opacity + 0.24, 0.55),
      ambient: true,
      hideOnMobile: route.hideOnMobile,
      hideOnTablet: route.hideOnTablet,
    }));
}

/** Extra long flowing routes that span multiple sections on the right half. */
function buildExtraRoutes(layout: LandingLayout): PageRoute[] {
  const { hero, experience: exp, education: edu, contact } = layout.sections;
  const last = contact ?? edu ?? exp;
  if (!hero || !last) return [];

  const topY = hero.top + hero.height * 0.4;
  const botY = last.bottom - 40;

  const colorA = "#1565C0";
  const colorB = "#6A1B9A";
  const colorC = "#F9A825";

  const routeA: PathPoint[] = [
    { x: MAP_WIDTH * 0.82, y: topY },
    { x: MAP_WIDTH * 0.62, y: topY + (botY - topY) * 0.25 },
    { x: MAP_WIDTH * 0.84, y: topY + (botY - topY) * 0.5 },
    { x: MAP_WIDTH * 0.6, y: topY + (botY - topY) * 0.75 },
    { x: MAP_WIDTH * 0.8, y: botY },
  ];

  const routeB: PathPoint[] = [
    { x: MAP_WIDTH * 0.92, y: topY + 60 },
    { x: MAP_WIDTH * 0.92, y: topY + (botY - topY) * 0.4 },
    { x: MAP_WIDTH * 0.72, y: topY + (botY - topY) * 0.6 },
    { x: MAP_WIDTH * 0.92, y: botY - 40 },
  ];

  const routeC: PathPoint[] = [
    { x: MAP_WIDTH * 0.5, y: topY + 20 },
    { x: MAP_WIDTH * 0.72, y: topY + (botY - topY) * 0.3 },
    { x: MAP_WIDTH * 0.52, y: topY + (botY - topY) * 0.55 },
    { x: MAP_WIDTH * 0.7, y: botY - 20 },
  ];

  return [
    {
      id: "extra-a",
      number: 7,
      color: colorA,
      path: toPath(routeA),
      opacity: 0.26,
      ambient: true,
      hideOnMobile: true,
    },
    {
      id: "extra-b",
      number: 8,
      color: colorB,
      path: toPath(routeB),
      opacity: 0.22,
      ambient: true,
      hideOnTablet: true,
    },
    {
      id: "extra-c",
      number: 9,
      color: colorC,
      path: toPath(routeC),
      opacity: 0.2,
      ambient: true,
      hideOnTablet: true,
    },
  ];
}

/** Y coordinate of the h2 title row inside a section band. */
export const SECTION_TITLE_Y_OFFSET = 118;

function sectionTitleRowY(band: SectionBand) {
  return band.top + SECTION_TITLE_Y_OFFSET;
}

/**
 * One continuous red route from the hero map all the way down through
 * Experience → (left edge through Projects) → Education. This is the single
 * "line" the bus rides; the timeline borders sit exactly on top of it.
 */
function buildMainSpine(layout: LandingLayout): PathPoint[] {
  const { hero, experience: exp, showcase: show, education: edu } =
    layout.sections;
  if (!exp || !edu) return [];

  const xExp = layout.experienceTimelineX;
  const xEdu = layout.educationTimelineX;

  const heroPoints: PathPoint[] = hero
    ? [
        { x: xExp + 360, y: hero.top + hero.height * 0.22 },
        { x: xExp + 230, y: hero.top + hero.height * 0.42 },
        { x: xExp + 110, y: hero.top + hero.height * 0.6 },
        { x: xExp, y: hero.top + hero.height * 0.78 },
      ]
    : [];

  const points: PathPoint[] = [
    ...heroPoints,
    { x: xExp, y: exp.top + 48 },
    { x: xExp, y: exp.bottom - 20 },
  ];

  // Bridge from the Experience timeline X to the Education timeline X,
  // running down the far-left edge through the Projects band (away from cards).
  if (show) {
    points.push({ x: xEdu, y: show.top + 20 });
    points.push({ x: xEdu, y: show.bottom - 20 });
  } else {
    points.push({ x: xEdu, y: exp.bottom + 40 });
  }

  points.push({ x: xEdu, y: edu.top + 48 });
  points.push({ x: xEdu, y: edu.bottom - 20 });

  // Lower loop: right side of Achievement → horizontal bridge → left through
  // Perspectives → curve to Contact ("Let's Connect"), matching annotated layout.
  const { achievement: ach, perspectives: persp, contact } = layout.sections;
  if (ach) {
    const xRight = MAP_WIDTH * 0.87;
    const xLeft = MAP_WIDTH * 0.13;
    const achTitleY =
      layout.sectionTitleY?.achievement ?? sectionTitleRowY(ach);

    // edu → ach title (horizontal) → down right → under perspective cards → contact
    points.push({ x: xEdu, y: edu.bottom + 16 });
    points.push({ x: xLeft, y: achTitleY });
    points.push({ x: xRight, y: achTitleY });
    points.push({ x: xRight, y: ach.bottom - ach.height * 0.06 });

    if (persp) {
      // One clean vertical rail on the far-left edge — the bus rides straight down
      // it as you scroll the section. Never crosses the cards or the title.
      points.push({ x: xRight, y: ach.bottom + 12 });
      points.push({ x: PERSPECTIVES_RAIL_X, y: persp.top + 80 });
      points.push({ x: PERSPECTIVES_RAIL_X, y: persp.bottom - 80 });
    }

    if (contact) {
      const connectY = contact.top + contact.height * 0.2;
      points.push({ x: PERSPECTIVES_RAIL_X, y: contact.top + 12 });
      points.push({ x: MAP_WIDTH * 0.38, y: connectY });
      points.push({ x: MAP_WIDTH * 0.5, y: connectY });
    }
  }

  return points;
}

/** Full-height decorative routes on the far right — solid lines with moving buses */
function buildSideDecorative(
  layout: LandingLayout,
  index: number
): PathPoint[] {
  const { hero, contact } = layout.sections;
  const topY = hero ? hero.top + hero.height * 0.35 : 200;
  const botY = contact ? contact.bottom - 60 : layout.pageHeight - 80;
  const span = botY - topY;

  const baseX = MAP_WIDTH * (0.72 + index * 0.08);
  const midY = topY + span * (0.28 + index * 0.12);

  return [
    { x: baseX, y: topY },
    { x: baseX + 120, y: midY },
    { x: baseX - 40, y: topY + span * (0.55 + index * 0.05) },
    { x: baseX + 80, y: botY },
  ];
}

function buildLowerDecorRoutes(layout: LandingLayout): PageRoute[] {
  const colors = ["#1565C0", "#F9A825", "#2E7D32", "#6A1B9A"];

  return [0, 1, 2].map((i) => ({
    id: `side-${i}`,
    number: i + 2,
    color: colors[i % colors.length],
    path: toPath(buildSideDecorative(layout, i)),
    opacity: 0.32,
    ambient: true,
    hideOnMobile: i > 0,
    hideOnTablet: i > 1,
  }));
}

export function buildPageRoutes(layout: LandingLayout): PageRoute[] {
  const routes: PageRoute[] = [
    ...buildHeroDecorRoutes(layout),
    ...buildExtraRoutes(layout),
    {
      id: "spine-main",
      number: 1,
      color: TRANSIT_RED,
      path: toPath(buildMainSpine(layout)),
      opacity: 0.9,
      busRoute: true,
    },
    ...buildLowerDecorRoutes(layout),
  ];

  return routes.filter((route) => route.path.length > 0);
}

export function getMapViewBox(layout: LandingLayout) {
  return {
    width: MAP_WIDTH,
    height: layout.pageHeight,
  };
}

