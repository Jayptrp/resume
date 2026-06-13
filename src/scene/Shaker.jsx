import { RoundedBox } from '@react-three/drei'

// Whey protein shaker on the far left of the desk.
export default function Shaker() {
  return (
    <group position={[-4.3, 0, 0.75]}>
      {/* body */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.3, 1.1, 32]} />
        <meshStandardMaterial color="#1b1b1f" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* colored band / label */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.345, 0.345, 0.42, 32]} />
        <meshStandardMaterial color="#E8201A" roughness={0.4} />
      </mesh>
      {/* lid */}
      <mesh position={[0, 1.22, 0]} castShadow>
        <cylinderGeometry args={[0.33, 0.35, 0.26, 32]} />
        <meshStandardMaterial color="#101013" roughness={0.4} />
      </mesh>
      {/* flip spout */}
      <mesh position={[0.12, 1.4, 0]} castShadow>
        <boxGeometry args={[0.16, 0.12, 0.16]} />
        <meshStandardMaterial color="#2b2b30" roughness={0.4} />
      </mesh>
    </group>
  )
}
