"use client";

import { forwardRef } from "react";

type RouteBusProps = {
  x: number;
  y: number;
  number: number;
  color: string;
  size?: number;
  elevated?: boolean;
  className?: string;
  scaleX?: number;
};

const RouteBus = forwardRef<SVGGElement, RouteBusProps>(function RouteBus(
  {
    x,
    y,
    number,
    color,
    size = 28,
    elevated = false,
    className = "",
    scaleX = 1,
  },
  ref
) {
  const r = size / 2;
  const filterId = elevated ? "transit-bus-elevated-shadow" : undefined;

  return (
    <g
      ref={ref}
      className={`transit-bus ${className}`}
      transform={`translate(${x}, ${y}) scale(${scaleX}, 1)`}
      filter={filterId ? `url(#${filterId})` : undefined}
    >
      <circle r={r + 4} fill="white" />
      <circle r={r} fill={color} />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={size * 0.5}
        fontWeight={700}
        fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
      >
        {number}
      </text>
    </g>
  );
});

export default RouteBus;
