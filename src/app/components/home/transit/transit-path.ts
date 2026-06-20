export type PathPoint = { x: number; y: number };

/**
 * Builds an SVG path from orthogonal/diagonal points with rounded fillets at each
 * corner — matching schematic transit maps (straight segments + smooth turns).
 */
export function buildRoundedTransitPath(
  points: PathPoint[],
  radius = 22
): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];

    const v1x = p0.x - p1.x;
    const v1y = p0.y - p1.y;
    const v2x = p2.x - p1.x;
    const v2y = p2.y - p1.y;
    const len1 = Math.hypot(v1x, v1y);
    const len2 = Math.hypot(v2x, v2y);

    if (len1 === 0 || len2 === 0) continue;

    const r = Math.min(radius, len1 / 2 - 0.5, len2 / 2 - 0.5);
    if (r <= 0) {
      d += ` L ${p1.x} ${p1.y}`;
      continue;
    }

    const n1x = v1x / len1;
    const n1y = v1y / len1;
    const n2x = v2x / len2;
    const n2y = v2y / len2;

    const sx = p1.x + n1x * r;
    const sy = p1.y + n1y * r;
    const ex = p1.x + n2x * r;
    const ey = p1.y + n2y * r;

    d += ` L ${sx} ${sy}`;
    d += ` Q ${p1.x} ${p1.y} ${ex} ${ey}`;
  }

  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}
