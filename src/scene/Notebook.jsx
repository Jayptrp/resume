import { useMemo } from 'react'
import * as THREE from 'three'

// Open notebook with a pencil resting on it, front-left of the desk.
// The "pencil sketching a portrait" page art is a placeholder line drawing
// for now; the self-drawing sketch animation lands in a later step.
export default function Notebook() {
  const sketch = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#f3ecdd'
    ctx.fillRect(0, 0, 256, 256)
    // faint ruled lines
    ctx.strokeStyle = '#d9cfb8'
    ctx.lineWidth = 1
    for (let y = 30; y < 256; y += 26) {
      ctx.beginPath(); ctx.moveTo(12, y); ctx.lineTo(244, y); ctx.stroke()
    }
    // rough portrait scribble
    ctx.strokeStyle = '#555'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.ellipse(128, 120, 48, 62, 0, 0, Math.PI * 2) // head
    ctx.moveTo(150, 170); ctx.quadraticCurveTo(128, 210, 106, 170) // jaw
    ctx.stroke()
    const t = new THREE.CanvasTexture(c)
    t.anisotropy = 4
    return t
  }, [])

  return (
    <group position={[-2.95, 0.01, 1.15]} rotation={[0, 0.5, 0]}>
      {/* two pages forming a slight V */}
      <mesh position={[-0.62, 0.02, 0]} rotation={[-Math.PI / 2, 0, -0.06]} castShadow receiveShadow>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial color="#f3ecdd" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.62, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0.06]} castShadow receiveShadow>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial map={sketch} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* spine */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.06, 0.05, 1.5]} />
        <meshStandardMaterial color="#7a5c3a" roughness={0.7} />
      </mesh>
      {/* pencil resting diagonally on the right page */}
      <mesh position={[0.6, 0.05, 0.1]} rotation={[0, 0.6, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.1, 6]} />
        <meshStandardMaterial color="#e8b53a" roughness={0.5} />
      </mesh>
      <mesh position={[0.97, 0.05, 0.42]} rotation={[0, 0.6, Math.PI / 2]}>
        <coneGeometry args={[0.035, 0.12, 6]} />
        <meshStandardMaterial color="#3a2c20" roughness={0.6} />
      </mesh>
    </group>
  )
}
