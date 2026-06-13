import { useEffect, useState } from 'react'
import { makeTextTexture } from '../utils/makeTextTexture'

// Sticky note pinned to the back wall. Shows just the laptop password ("2004")
// in a hand-drawn font. The texture is regenerated once the web font (Caveat)
// has loaded so it doesn't fall back to a system font on first paint.
const NOTE_OPTS = {
  bg: '#f2d45e',
  color: '#2a2a2a',
  rotate: -0.05,
  font: '700 130px "Caveat", "Segoe Print", cursive',
}

export default function StickyNote() {
  const [tex, setTex] = useState(() => makeTextTexture('2004', NOTE_OPTS))

  useEffect(() => {
    let active = true
    const fonts = document.fonts
    if (fonts?.load) {
      fonts
        .load('700 150px "Caveat"')
        .then(() => { if (active) setTex(makeTextTexture('2004', NOTE_OPTS)) })
        .catch(() => {})
    }
    return () => { active = false }
  }, [])

  return (
    <group position={[2.0, 2.5, -1.86]} rotation={[0, 0, -0.04]}>
      <mesh castShadow>
        <planeGeometry args={[0.42, 0.42]} />
        <meshStandardMaterial map={tex} roughness={0.85} />
      </mesh>
      {/* pin */}
      <mesh position={[0, 0.17, 0.02]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial color="#c0392b" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  )
}
