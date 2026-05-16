import { useEffect, useRef } from 'react'

type Gear = {
  cx: number
  cy: number
  R: number
  r: number
  teeth: number
  fill: string
  cls: string
  label: string[]
  lc: string
  fontSize: number
}

const GEARS: Gear[] = [
  {
    cx: 405, cy: 358, R: 148, r: 112, teeth: 14,
    fill: '#F5A623', cls: 'g-lg',
    label: ['Fundamental', 'Presales Skills'], lc: '#5c3506', fontSize: 20,
  },
  {
    cx: 308, cy: 118, R: 94, r: 71, teeth: 11,
    fill: '#C4722A', cls: 'g-tp',
    label: ['Biz Domain', 'Basics'], lc: '#3d1e06', fontSize: 18,
  },
  {
    cx: 152, cy: 258, R: 108, r: 82, teeth: 12,
    fill: '#F5D170', cls: 'g-lt',
    label: ['Cognitive', 'Excellence'], lc: '#6b4700', fontSize: 18,
  },
]

const ARROWS = [
  'M 370 35 C 520 12 592 155 562 298',
  'M 58 322 C 16 184 76 78 218 46',
  'M 522 452 C 548 520 388 538 228 512',
]

function gearPath(cx: number, cy: number, R: number, r: number, teeth: number): string {
  const step = (2 * Math.PI) / teeth
  const h = step * 0.27
  const pts: [number, number][] = []
  for (let i = 0; i < teeth; i++) {
    const a = i * step - Math.PI / 2
    pts.push(
      [r, a - h * 1.18], [R, a - h * 0.48],
      [R, a + h * 0.48], [r, a + h * 1.18],
    )
  }
  return (
    pts
      .map(([rad, ang], j) => {
        const x = (cx + rad * Math.cos(ang)).toFixed(2)
        const y = (cy + rad * Math.sin(ang)).toFixed(2)
        return `${j === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ') + ' Z'
  )
}

const FONT = '"Segoe UI", system-ui, -apple-system, Arial, sans-serif'

type PresalesGearsProps = {
  width?: string
  className?: string
}

export default function PresalesGears({ width = '100%', className = '' }: PresalesGearsProps) {
  const cwRef1 = useRef<SVGGElement>(null)
  const ccwRef = useRef<SVGGElement>(null)
  const cwRef2 = useRef<SVGGElement>(null)

  useEffect(() => {
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (noMotion) return

    const animate = (el: SVGGElement | null, duration: number, direction: number) => {
      if (!el) return
      let start: number | null = null
      let raf: number
      const step = (ts: number) => {
        if (!start) start = ts
        const progress = ((ts - start) / duration) % 1
        const deg = direction * progress * 360
        const { cx, cy } = el.dataset
        el.setAttribute(
          'transform',
          `rotate(${deg.toFixed(2)}, ${cx}, ${cy})`,
        )
        raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }

    const cleanups = [
      animate(cwRef1.current, 24000, 1),
      animate(ccwRef.current, 19000, -1),
      animate(cwRef2.current, 21000, 1),
    ]
    return () => cleanups.forEach((fn) => fn?.())
  }, [])

  return (
    <svg
      width={width}
      viewBox="0 0 680 540"
      role="img"
      aria-label="Three interlocking gears representing Fundamental Presales Skills, Biz Domain Basics, and Cognitive Excellence"
      className={className}
      style={{ display: 'block' }}
    >
      <defs>
        <marker
          id="gear-arrow"
          viewBox="0 0 10 10"
          refX="8" refY="5"
          markerWidth="8" markerHeight="8"
          orient="auto"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="#7EC8E3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {ARROWS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#7EC8E3"
          strokeWidth="5.5"
          strokeLinecap="round"
          markerEnd="url(#gear-arrow)"
        />
      ))}

      {GEARS.map((g, i) => {
        const refs = [cwRef1, ccwRef, cwRef2]
        return (
          <g
            key={g.cls}
            ref={refs[i]}
            data-cx={g.cx}
            data-cy={g.cy}
          >
            <path d={gearPath(g.cx, g.cy, g.R, g.r, g.teeth)} fill={g.fill} />
            <circle
              cx={g.cx} cy={g.cy}
              r={Math.round(g.R * 0.27)}
              fill="white"
              fillOpacity="0.22"
            />
          </g>
        )
      })}

      {GEARS.map((g) => {
        const lh = 21
        return g.label.map((line, i) => (
          <text
            key={`${g.cls}-${i}`}
            x={g.cx}
            y={g.cy - ((g.label.length - 1) * lh) / 2 + i * lh}
            textAnchor="middle"
            dominantBaseline="central"
            fill={g.lc}
            fontSize={g.fontSize}
            fontWeight="700"
            fontFamily={FONT}
            letterSpacing="0.2"
          >
            {line}
          </text>
        ))
      })}
    </svg>
  )
}
