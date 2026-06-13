import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Scene from './scene/Scene'

export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 3.4, 8.2], fov: 42 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#050505']} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      {/* Dev inspection controls — constrained; locked down in a later step. */}
      <OrbitControls
        target={[0, 0.6, 0]}
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  )
}
