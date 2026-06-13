import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../state/store'

// Articulated desk lamp (placeholder geometry). Owns the warm key light.
// Click the shade to toggle. Intensity + bulb glow ramp smoothly so the
// intro "click on" reads as the light warming up.
export default function Lamp() {
  const lampOn = useStore((s) => s.lampOn)
  const toggleLamp = useStore((s) => s.toggleLamp)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const light = useRef()
  const bulb = useRef()

  useFrame((_, dt) => {
    const target = lampOn ? 14 : 0
    light.current.intensity = THREE.MathUtils.damp(light.current.intensity, target, 4, dt)
    const glow = lampOn ? 3 : 0
    bulb.current.material.emissiveIntensity = THREE.MathUtils.damp(
      bulb.current.material.emissiveIntensity, glow, 4, dt,
    )
  })

  const metal = <meshStandardMaterial color="#c0392b" roughness={0.35} metalness={0.4} />

  return (
    <group position={[-3.4, 0, -0.9]}>
      {/* base */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.46, 0.12, 32]} />
        {metal}
      </mesh>
      {/* stem */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2.0, 16]} />
        {metal}
      </mesh>
      {/* arm reaching toward desk */}
      <mesh position={[0.55, 1.95, 0.25]} rotation={[0, 0, -1.0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.4, 16]} />
        {metal}
      </mesh>

      {/* shade — clickable toggle */}
      <group
        position={[1.05, 1.78, 0.45]}
        rotation={[0.55, 0, 0.5]}
        onClick={(e) => { e.stopPropagation(); toggleLamp() }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
      >
        <mesh castShadow>
          <coneGeometry args={[0.5, 0.6, 32, 1, true]} />
          <meshStandardMaterial color="#d94d3a" roughness={0.4} metalness={0.4} side={THREE.DoubleSide} />
        </mesh>
        {/* bulb */}
        <mesh ref={bulb} position={[0, -0.05, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#fff4e0" emissive="#ffd9a0" emissiveIntensity={0} />
        </mesh>
      </group>

      {/* warm key light at the bulb */}
      <pointLight
        ref={light}
        position={[1.05, 1.6, 0.5]}
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
