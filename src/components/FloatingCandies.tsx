export interface CandyConfig {
  emoji: string
  position: { top?: string; bottom?: string; left?: string; right?: string }
  animation: "float" | "float-delayed" | "float-slow"
  size: string
}

const animClass: Record<string, string> = {
  float: "animate-float",
  "float-delayed": "animate-float-delayed",
  "float-slow": "animate-float-slow",
}

export default function FloatingCandies({ candies }: { candies: CandyConfig[] }) {
  return (
    <>
      {candies.map((c, i) => (
        <span
          key={i}
          className={`absolute ${animClass[c.animation]} ${c.size} opacity-60 pointer-events-none`}
          style={{
            top: c.position.top,
            bottom: c.position.bottom,
            left: c.position.left,
            right: c.position.right,
          }}
        >
          {c.emoji}
        </span>
      ))}
    </>
  )
}
