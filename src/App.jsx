import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './scene/Scene'
import CameraRig from './scene/CameraRig'

export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 4.0, 10.4], fov: 46 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#050505']} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      {/* Cursor-driven head sway — replaces draggable orbit controls. */}
      <CameraRig />
    </Canvas>
  )
}
