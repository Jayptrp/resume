import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../state/store'

// Ambient / fill lighting. Near-black when the lamp is off (the "dark room"
// the user first sees), gently warming up when the lamp turns on.
// The lamp's own pointlight lives in Lamp.jsx so it sits at the bulb.
export default function Lighting() {
  const lampOn = useStore((s) => s.lampOn)
  const fill = useRef()
  const moon = useRef()
  const right = useRef()

  useFrame((_, dt) => {
    // Warm fill rises with the lamp.
    const fillTarget = lampOn ? 0.38 : 0.0
    fill.current.intensity = THREE.MathUtils.damp(fill.current.intensity, fillTarget, 3, dt)
    // Faint cool "moonlight" so the dark room isn't pure black before the lamp.
    const moonTarget = lampOn ? 0.04 : 0.08
    moon.current.intensity = THREE.MathUtils.damp(moon.current.intensity, moonTarget, 3, dt)
    // Soft fill from the right so the mouse/wrench read against the dark.
    const rightTarget = lampOn ? 0.32 : 0.0
    right.current.intensity = THREE.MathUtils.damp(right.current.intensity, rightTarget, 3, dt)
  })

  return (
    <>
      <ambientLight ref={fill} intensity={0} color="#ffe7c4" />
      <directionalLight ref={moon} position={[-4, 6, 6]} intensity={0.08} color="#5a6f9c" />
      <directionalLight ref={right} position={[6, 4, 5]} intensity={0} color="#ffe9cf" />
    </>
  )
}
