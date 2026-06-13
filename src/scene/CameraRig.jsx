import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Subtle "living head" camera. The user can't drag/orbit; instead the camera
// gently leans toward the cursor and always looks at the desk, giving a small
// parallax sway like a person shifting their head.
const BASE = new THREE.Vector3(0, 3.0, 8.3)
const TARGET = new THREE.Vector3(0, 0.5, 0)
const SWAY_X = 1.9 // horizontal lean (world units)
const SWAY_Y = 0.85 // vertical lean

export default function CameraRig() {
  const camera = useThree((s) => s.camera)

  useFrame((state, dt) => {
    // state.pointer is normalized to [-1, 1] across the canvas.
    // Lean away from the cursor so the scene pans toward where you hover.
    const targetX = BASE.x - state.pointer.x * SWAY_X
    const targetY = BASE.y - state.pointer.y * SWAY_Y
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.5, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.5, dt)
    camera.position.z = BASE.z
    camera.lookAt(TARGET)
  })

  return null
}
