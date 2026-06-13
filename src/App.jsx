import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

// Placeholder object — proves the R3F pipeline renders + builds + deploys.
// Gets replaced by the actual desk scene in step 2.
function SpinningBox() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.6
    ref.current.rotation.x += delta * 0.2
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial color="#E8201A" roughness={0.35} metalness={0.1} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [3, 2, 4], fov: 50 }} shadows>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 6, 5]} intensity={1.3} castShadow />
      <SpinningBox />
      <OrbitControls enablePan={false} />
    </Canvas>
  )
}
