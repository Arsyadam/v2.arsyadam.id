"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import RouteBus from "./RouteBus";
import {
  buildPageRoutes,
  getMapViewBox,
  SECTION_TITLE_Y_OFFSET,
  TRANSIT_RED,
  type PageRoute,
} from "./buildPageRoutes";
import { useLandingTransitLayout } from "./useLandingTransitLayout";
import { getPointOnPath } from "./transit-routes";
import { useTransitScroll } from "./useTransitScroll";
import { MAP_WIDTH } from "./useLandingTransitLayout";

type TransitMapBackgroundProps = {
  rootId?: string;
};

function MapGrid({ height }: { height: number }) {
  const lines: ReactNode[] = [];
  const step = 80;

  for (let x = 0; x <= MAP_WIDTH; x += step) {
    lines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke="#e5e5e5"
        strokeWidth={0.5}
      />
    );
  }

  for (let y = 0; y <= height; y += step) {
    lines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={MAP_WIDTH}
        y2={y}
        stroke="#e5e5e5"
        strokeWidth={0.5}
      />
    );
  }

  return <g opacity={0.45}>{lines}</g>;
}

type PathSamples = { pts: { x: number; y: number; len: number }[]; total: number };

function samplePath(path: SVGPathElement, n = 600): PathSamples {
  const total = path.getTotalLength();
  const pts: { x: number; y: number; len: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const len = (total * i) / n;
    const p = path.getPointAtLength(len);
    pts.push({ x: p.x, y: p.y, len });
  }
  return { pts, total };
}

function progressForPoint(sample: PathSamples, x: number, y: number): number {
  let bestLen = 0;
  let bestDist = Infinity;
  for (const p of sample.pts) {
    const d = (p.x - x) ** 2 + (p.y - y) ** 2;
    if (d < bestDist) {
      bestDist = d;
      bestLen = p.len;
    }
  }
  return sample.total > 0 ? bestLen / sample.total : 0;
}

function targetProgressFromHaltes(
  haltes: { pageY: number; progress: number }[],
  anchorY: number
): number {
  if (haltes.length === 0) return 0;

  if (anchorY <= haltes[0].pageY) {
    const t =
      haltes[0].pageY > 0 ? Math.max(0, Math.min(1, anchorY / haltes[0].pageY)) : 0;
    return haltes[0].progress * t;
  }

  for (let i = 0; i < haltes.length - 1; i++) {
    const a = haltes[i];
    const b = haltes[i + 1];
    if (anchorY <= b.pageY) {
      const span = b.pageY - a.pageY;
      const t = span > 0 ? (anchorY - a.pageY) / span : 0;
      return a.progress + (b.progress - a.progress) * t;
    }
  }

  return haltes[haltes.length - 1].progress;
}

function setBusTransform(el: SVGGElement | null, x: number, y: number, scaleX: number) {
  if (!el) return;
  el.setAttribute("transform", `translate(${x}, ${y}) scale(${scaleX}, 1)`);
}

export default function TransitMapBackground({
  rootId = "landing-page",
}: TransitMapBackgroundProps) {
  const layout = useLandingTransitLayout(rootId);
  const { prefersReducedMotion, isMobile, isTablet } = useTransitScroll();

  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const svgRef = useRef<SVGSVGElement>(null);
  const mainBusRef = useRef<SVGGElement>(null);
  const ambientRefs = useRef<Map<string, SVGGElement>>(new Map());
  const busScaleXRef = useRef(1);
  const [busElevated, setBusElevated] = useState(false);

  const sampleRef = useRef<PathSamples | null>(null);
  const haltesRef = useRef<{ pageY: number; progress: number }[]>([]);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const elevatedRef = useRef(false);
  const animStartRef = useRef(0);

  const pageRoutes = useMemo(
    () => (layout ? buildPageRoutes(layout) : []),
    [layout]
  );

  const visibleRoutes = pageRoutes.filter((route) => {
    if (isMobile && route.hideOnMobile) return false;
    if (isTablet && route.hideOnTablet) return false;
    return true;
  });

  const ambientRoutes = useMemo(
    () => visibleRoutes.filter((route) => route.ambient),
    [visibleRoutes]
  );

  useEffect(() => {
    if (!layout) return;
    const root = document.getElementById(rootId);

    const measure = () => {
      const path = pathRefs.current["spine-main"];
      if (!root || !path) return;

      const sample = samplePath(path, 800);
      sampleRef.current = sample;

      const rootRect = root.getBoundingClientRect();
      const rootTop = rootRect.top + window.scrollY;
      const rootLeft = rootRect.left;
      const rootWidth = Math.max(rootRect.width, 1);

      const dots = Array.from(
        root.querySelectorAll<HTMLElement>("[data-transit-halte]")
      );

      const haltes = dots.map((dot) => {
        const r = dot.getBoundingClientRect();
        const centerX = r.left + r.width / 2;
        const pageY = r.top + window.scrollY - rootTop + r.height / 2;
        const vbX = ((centerX - rootLeft) / rootWidth) * MAP_WIDTH;
        return { pageY, progress: progressForPoint(sample, vbX, pageY) };
      });

      const ach = layout.sections.achievement;
      if (ach) {
        const y =
          layout.sectionTitleY?.achievement ??
          ach.top + SECTION_TITLE_Y_OFFSET;
        haltes.push({
          pageY: y,
          progress: progressForPoint(sample, MAP_WIDTH * 0.87, y),
        });
      }
      const persp = layout.sections.perspectives;
      if (persp) {
        const y =
          layout.sectionTitleY?.perspectives ??
          persp.top + SECTION_TITLE_Y_OFFSET;
        haltes.push({
          pageY: y,
          progress: progressForPoint(sample, MAP_WIDTH * 0.13, y),
        });
      }

      haltes.unshift({ pageY: 0, progress: 0 });
      haltes.sort((a, b) => a.pageY - b.pageY);
      haltesRef.current = haltes;
    };

    measure();
    const id = requestAnimationFrame(() => requestAnimationFrame(measure));
    return () => cancelAnimationFrame(id);
  }, [layout, rootId, pageRoutes]);

  useEffect(() => {
    if (!layout) return;
    const root = document.getElementById(rootId);
    if (!root) return;

    const onScroll = () => {
      const haltes = haltesRef.current;
      if (haltes.length === 0) return;
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const anchorY = window.scrollY + window.innerHeight * 0.36 - rootTop;
      targetProgress.current = targetProgressFromHaltes(haltes, anchorY);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [layout, rootId]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !layout) return;

    const measure = () => {
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const renderScaleX = rect.width / MAP_WIDTH;
      const renderScaleY = rect.height / layout.pageHeight;
      busScaleXRef.current = renderScaleY / renderScaleX;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(svg);
    return () => ro.disconnect();
  }, [layout]);

  // Single rAF loop — update bus transforms directly (no per-frame setState).
  useEffect(() => {
    if (!layout) return;

    animStartRef.current = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const scaleX = busScaleXRef.current;
      const spine = pathRefs.current["spine-main"];

      if (spine) {
        const cur = currentProgress.current;
        const diff = targetProgress.current - cur;
        const speed = 0.09 + Math.min(Math.abs(diff) * 1.5, 0.28);
        const next =
          Math.abs(diff) < 0.00015 ? targetProgress.current : cur + diff * speed;
        currentProgress.current = next;

        const p = spine.getPointAtLength(next * spine.getTotalLength());
        setBusTransform(mainBusRef.current, p.x, p.y, scaleX);

        const threshold = elevatedRef.current ? 0.034 : 0.022;
        let nearHalte = false;
        for (const h of haltesRef.current) {
          if (Math.abs(next - h.progress) < threshold) {
            nearHalte = true;
            break;
          }
        }
        if (nearHalte !== elevatedRef.current) {
          elevatedRef.current = nearHalte;
          setBusElevated(nearHalte);
        }
      }

      if (!prefersReducedMotion) {
        const elapsed = (now - animStartRef.current) / 1000;
        ambientRoutes.forEach((route, i) => {
          const path = pathRefs.current[route.id];
          const el = ambientRefs.current.get(route.id);
          if (!path || !el) return;
          const speed = 0.012 + (i % 3) * 0.004;
          const progress = (elapsed * speed + i * 0.27) % 1;
          const { x, y } = getPointOnPath(path, progress);
          setBusTransform(el, x, y, scaleX);
        });
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [layout, prefersReducedMotion, ambientRoutes]);

  if (!layout) return null;

  const viewBox = getMapViewBox(layout);

  const getRouteStyle = (route: PageRoute) => {
    const isSpine = route.id.startsWith("spine");
    return {
      strokeWidth: isSpine ? 6 : 4,
      opacity: route.opacity,
    };
  };

  return (
    <>
      <div
        className="transit-map-layer pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          preserveAspectRatio="none"
          className="h-full w-full"
          shapeRendering="geometricPrecision"
        >
          <g>
            <MapGrid height={viewBox.height} />

            {visibleRoutes.map((route) => {
              const { strokeWidth, opacity } = getRouteStyle(route);
              return (
                <path
                  key={route.id}
                  ref={(el) => {
                    pathRefs.current[route.id] = el;
                  }}
                  d={route.path}
                  fill="none"
                  stroke={route.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={opacity}
                />
              );
            })}

            {!prefersReducedMotion &&
              ambientRoutes.map((route) => (
                <RouteBus
                  key={route.id}
                  ref={(el) => {
                    if (el) ambientRefs.current.set(route.id, el);
                    else ambientRefs.current.delete(route.id);
                  }}
                  x={0}
                  y={0}
                  number={route.number}
                  color={route.color}
                  size={20}
                  scaleX={1}
                  className="opacity-[0.85]"
                />
              ))}
          </g>
        </svg>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${busElevated ? "z-20" : "z-[5]"}`}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          preserveAspectRatio="none"
          className="h-full w-full"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <filter
              id="transit-bus-elevated-shadow"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#000000"
                floodOpacity="0.25"
              />
            </filter>
          </defs>
          <RouteBus
            ref={mainBusRef}
            x={130}
            y={95}
            number={1}
            color={TRANSIT_RED}
            size={isMobile ? 26 : 32}
            elevated={busElevated}
            scaleX={1}
          />
        </svg>
      </div>
    </>
  );
}
