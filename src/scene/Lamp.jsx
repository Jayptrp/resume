import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../state/store'
import { Model } from '../components/Model'

const URL = `${import.meta.env.BASE_URL}models/lamp.glb`

// Real lamp model, but it still owns the warm key light + click-to-toggle.
// The bulb glow and pointlight are positioned to sit at the lamp's head
// (tuned against the model in-scene).
export default function Lamp() {
  const lampOn = useStore((s) => s.lampOn)
  const toggleLamp = useStore((s) => s.toggleLamp)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const light = useRef()
  const bulb = useRef()

  useFrame((_, dt) => {
    light.current.intensity = THREE.MathUtils.damp(light.current.intensity, lampOn ? 14 : 0, 4, dt)
    bulb.current.material.emissiveIntensity = THREE.MathUtils.damp(
      bulb.current.material.emissiveIntensity, lampOn ? 3 : 0, 4, dt,
    )
  })

  return (
    <group position={[-3.4, 0, -0.9]}>
      <group
        onClick={(e) => { e.stopPropagation(); toggleLamp() }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
      >
        <Model url={URL} targetSize={2.2} />
      </group>

      {/* glow + key light at the lamp head (positions tuned to the model) */}
      <mesh ref={bulb} position={[0.45, 1.5, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#fff4e0" emissive="#ffd9a0" emissiveIntensity={0} />
      </mesh>
      <pointLight
        ref={light}
        position={[0.45, 1.4, 0.55]}
        intensity={0}
        distance={14}
        decay={2}
        color="#ffd2a1"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
    </group>
  )
}

useGLTF.preload(URL)
