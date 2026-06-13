import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../state/store'
import { Model } from '../components/Model'

const URL = `${import.meta.env.BASE_URL}models/lamp.glb`

// Bulb position, local to the tilted lamp body — matched to the model's shade.
const BULB = [0.0, 1.6, 0.02]

// Real lamp model. Reoriented so its shade points at the desk and it leans
// right; still owns the warm key light + click-to-toggle. Glow + light sit
// at the shade so the source matches the lamp.
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
    <group position={[-3.4, -0.05, -0.9]}>
      <group
        rotation={[0, Math.PI, -0.18]}
        onClick={(e) => { e.stopPropagation(); toggleLamp() }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
      >
        <Model url={URL} targetSize={2.2} />

        {/* glowing bulb at the shade */}
        <mesh ref={bulb} position={BULB}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#fff4e0" emissive="#ffd9a0" emissiveIntensity={0} />
        </mesh>

        {/* warm key light at the bulb */}
        <pointLight
          ref={light}
          position={BULB}
          intensity={0}
          distance={14}
          decay={2}
          color="#ffd2a1"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0005}
        />
      </group>
    </group>
  )
}

useGLTF.preload(URL)
