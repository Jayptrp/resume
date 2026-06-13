import { RoundedBox } from '@react-three/drei'

// Mouse placeholder, to the right of the laptop.
export default function Mouse() {
  return (
    <group position={[2.0, 0, 0.55]}>
      <RoundedBox args={[0.42, 0.22, 0.66]} radius={0.1} smoothness={6} position={[0, 0.11, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#2b2b30" roughness={0.35} metalness={0.3} />
      </RoundedBox>
      {/* scroll wheel groove */}
      <mesh position={[0, 0.23, -0.18]}>
        <boxGeometry args={[0.05, 0.02, 0.12]} />
        <meshStandardMaterial color="#555" roughness={0.4} />
      </mesh>
    </group>
  )
}
