import { useMemo } from 'react'
import { makeTextTexture } from '../utils/makeTextTexture'

// Sticky note pinned to the back wall. Shows the laptop password ("2004").
export default function StickyNote() {
  const tex = useMemo(
    () => makeTextTexture('2004', { sub: 'psst', bg: '#f2d45e', rotate: -0.05 }),
    [],
  )

  return (
    <group position={[1.7, 2.5, -1.86]} rotation={[0, 0, -0.04]}>
      <mesh castShadow>
        <planeGeometry args={[0.95, 0.95]} />
        <meshStandardMaterial map={tex} roughness={0.85} />
      </mesh>
      {/* little pin */}
      <mesh position={[0, 0.4, 0.02]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#c0392b" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  )
}
