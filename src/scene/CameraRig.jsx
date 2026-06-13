import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Subtle "living head" camera. The user can't drag/orbit; instead the camera
// gently leans toward the cursor and always looks at the desk, giving a small
// parallax sway like a person shifting their head.
const BASE = new THREE.Vector3(0, 4.0, 10.4)
const TARGET = new THREE.Vector3(0, 0.6, 0)
const SWAY_X = 0.9 // horizontal lean (world units)
const SWAY_Y = 0.45 // vertical lean

export default function CameraRig() {
  const camera = useThree((s) => s.camera)

  useFrame((state, dt) => {
    // state.pointer is normalized to [-1, 1] across the canvas.
    const targetX = BASE.x + state.pointer.x * SWAY_X
    const targetY = BASE.y + state.pointer.y * SWAY_Y
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.5, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.5, dt)
    camera.position.z = BASE.z
    camera.lookAt(TARGET)
  })

  return null
}
