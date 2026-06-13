import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Model } from '../components/Model'

const URL = `${import.meta.env.BASE_URL}models/openbook.glb`

// Hand-drawn portrait sketch, drawn on a transparent canvas so the book's
// own page shows through underneath. Replayable later as a "drawing" anim.
function makeSketchTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, 256, 256)
  ctx.strokeStyle = 'rgba(45,40,38,0.95)'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  ctx.lineWidth = 3
  ctx.beginPath(); ctx.ellipse(128, 124, 50, 64, 0, 0, Math.PI * 2); ctx.stroke() // head
  ctx.beginPath(); ctx.moveTo(150, 176); ctx.quadraticCurveTo(128, 218, 106, 176); ctx.stroke() // jaw
  ctx.beginPath(); ctx.moveTo(80, 98); ctx.quadraticCurveTo(128, 44, 176, 98); ctx.stroke() // hair

  ctx.lineWidth = 2
  ctx.beginPath(); ctx.ellipse(110, 118, 9, 5, 0, 0, Math.PI * 2); ctx.stroke() // eye L
  ctx.beginPath(); ctx.ellipse(146, 118, 9, 5, 0, 0, Math.PI * 2); ctx.stroke() // eye R
  ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(123, 144); ctx.lineTo(132, 144); ctx.stroke() // nose
  ctx.beginPath(); ctx.moveTo(114, 158); ctx.quadraticCurveTo(128, 166, 142, 158); ctx.stroke() // mouth

  const t = new THREE.CanvasTexture(c)
  t.anisotropy = 4
  return t
}

export default function Notebook() {
  const sketch = useMemo(makeSketchTexture, [])

  return (
    <group position={[-2.95, 0, 1.15]} rotation={[0, 0.5, 0]}>
      <Model url={URL} targetSize={1.8} />
      {/* portrait sketch laid flat on the right-hand page */}
      <mesh position={[0.34, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.55, 0.72]} />
        <meshStandardMaterial map={sketch} transparent roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

useGLTF.preload(URL)
