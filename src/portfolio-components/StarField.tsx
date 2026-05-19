'use client'

import { useId, useEffect, useState } from 'react'
import clsx from 'clsx'

type Star = [x: number, y: number, dim?: boolean, blur?: boolean]

function createRandom(seed: number) {
  return function random() {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function generateStars(seed: number, count: number) {
  let random = createRandom(seed)
  return Array.from({ length: count }, () => {
    let x = Math.round(random() * 881)
    let y = Math.round(random() * 211)
    let dim = random() > 0.28
    let blur = random() > 0.62
    return [x, y, dim, blur] satisfies Star
  })
}

function generateConstellations(seed: number, count: number) {
  let random = createRandom(seed + 173)
  return Array.from({ length: count }, () => {
    let pointCount = Math.floor(random() * 3) + 4
    let originX = 80 + random() * 720
    let originY = 34 + random() * 138
    let points = Array.from({ length: pointCount }, (_, pointIndex) => {
      let angle = random() * Math.PI * 2 + pointIndex * 0.5
      let distance = 24 + random() * 56
      let x = Math.round(Math.min(Math.max(originX + Math.cos(angle) * distance, 8), 873))
      let y = Math.round(Math.min(Math.max(originY + Math.sin(angle) * distance, 8), 203))
      return [x, y] satisfies Star
    })
    if (random() > 0.55) points.push(points[1])
    return points
  })
}

function generateAriesConstellations(seed: number, count: number) {
  let random = createRandom(seed + 401)
  return Array.from({ length: count }, () => {
    let originX = 110 + random() * 640
    let originY = 34 + random() * 142
    let scale = 0.65 + random() * 0.55
    let direction = random() > 0.5 ? 1 : -1
    let tilt = (random() - 0.5) * 20
    let ariesShape = [[0, 0], [34, -24], [73, -16], [112, 10], [148, 4]]
    return ariesShape.map(([x, y]) => {
      let tiltedX = x * direction - y * Math.sin((tilt * Math.PI) / 180)
      let tiltedY = y + x * Math.sin((tilt * Math.PI) / 180) * 0.35
      return [
        Math.round(Math.min(Math.max(originX + tiltedX * scale, 8), 873)),
        Math.round(Math.min(Math.max(originY + tiltedY * scale, 8), 203)),
      ] satisfies Star
    })
  })
}

export function StarField({
  className,
  seed = 1,
  starCount = 96,
  constellationCount = 3,
  ariesCount = 0,
  tiny = false,
  animated = true,
}: {
  className?: string
  seed?: number
  starCount?: number
  constellationCount?: number
  ariesCount?: number
  tiny?: boolean
  animated?: boolean
}) {
  let blurId = useId()
  let [visible, setVisible] = useState(false)
  let stars = generateStars(seed, starCount)
  let constellations = [
    ...generateConstellations(seed, constellationCount),
    ...generateAriesConstellations(seed, ariesCount),
  ]

  useEffect(() => {
    let timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <svg
      viewBox="0 0 881 211"
      fill="white"
      aria-hidden="true"
      className={clsx(
        'pointer-events-none absolute w-220.25 origin-top-right rotate-30 overflow-visible opacity-70',
        className,
      )}
    >
      <defs>
        <filter id={blurId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation=".5" />
        </filter>
      </defs>

      {constellations.map((points, i) => {
        let uniquePoints = points.filter(
          (point, j) => points.findIndex((p) => String(p) === String(point)) === j,
        )
        let isFilled = uniquePoints.length !== points.length
        return (
          <g key={`c-${i}`}>
            <path
              stroke="white"
              strokeOpacity="0.2"
              strokeDasharray={1}
              strokeDashoffset={visible ? 0 : 1}
              pathLength={1}
              fill={isFilled && visible ? 'rgb(255 255 255 / 0.02)' : 'transparent'}
              d={`M ${points.join('L')}`}
              style={{ transition: 'stroke-dashoffset 5s ease, fill 1s ease 5s' }}
            />
            {uniquePoints.map((point, j) => (
              <circle
                key={j}
                cx={point[0]}
                cy={point[1]}
                r={1}
                className={clsx(
                  animated && 'transition-opacity duration-1000',
                  visible ? 'opacity-75' : 'opacity-0',
                )}
                style={{
                  animation: animated ? `star-twinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate` : undefined,
                  animationDelay: animated ? `${Math.random() * 4}s` : undefined,
                  transformOrigin: `${point[0] / 16}rem ${point[1] / 16}rem`,
                }}
                filter={(point as any)[3] ? `url(#${blurId})` : undefined}
              />
            ))}
          </g>
        )
      })}

      {stars.map((point, i) => (
        <g
          key={`s-${i}`}
          style={{
            transform: tiny ? 'scale(0.7)' : undefined,
            transformOrigin: `${point[0] / 16}rem ${point[1] / 16}rem`,
          }}
        >
          {animated ? (
            <circle
              cx={point[0]}
              cy={point[1]}
              r={1}
              className={clsx(
                visible ? 'opacity-100' : 'opacity-0',
                'transition-opacity duration-[2000ms]',
              )}
              style={{
                animation: `star-twinkle ${point[2] ? 4 + Math.random() * 2 : 2 + Math.random() * 3}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 4}s`,
                transformOrigin: `${point[0] / 16}rem ${point[1] / 16}rem`,
                opacity: point[2] ? 0.28 : 0.75,
              }}
              filter={(point as any)[3] ? `url(#${blurId})` : undefined}
            />
          ) : (
            <circle
              cx={point[0]}
              cy={point[1]}
              r={1}
              opacity={point[2] ? 0.28 : 0.75}
              filter={(point as any)[3] ? `url(#${blurId})` : undefined}
            />
          )}
        </g>
      ))}
    </svg>
  )
}
