export function GrainOverlay() {
  // renders nothing — handled by body.grain::before in index.css
  return null
}

export function Spotlight() {
  if (typeof window === 'undefined') return null
  return <div className="spotlight" aria-hidden />
}
