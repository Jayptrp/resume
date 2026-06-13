import { RoundedBox } from '@react-three/drei'

// Laptop placeholder: base + hinged screen + a power button.
// The power button glows faintly so it reads as the primary call-to-action.
// Real open/boot/password behaviour comes in the interactions step.
export default function Laptop() {
  return (
    <group position={[0, 0, -0.05]}>
      {/* base */}
      <RoundedBox args={[2.8, 0.12, 1.9]} radius={0.04} smoothness={4} position={[0, 0.06, 0.1]} castShadow receiveShadow>
        <meshStandardMaterial color="#2b2b30" roughness={0.4} metalness={0.6} />
      </RoundedBox>

      {/* keyboard deck inset */}
      <mesh position={[0, 0.121, 0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 1.15]} />
        <meshStandardMaterial color="#1c1c20" roughness={0.6} />
      </mesh>

      {/* trackpad */}
      <mesh position={[0, 0.122, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.7, 0.45]} />
        <meshStandardMaterial color="#34343a" roughness={0.5} />
      </mesh>

      {/* power button (top-right of deck) */}
      <mesh position={[1.05, 0.13, -0.2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.03, 24]} />
        <meshStandardMaterial color="#444" emissive="#E8201A" emissiveIntensity={0.4} roughness={0.4} />
      </mesh>

      {/* hinged screen — open ~110 degrees */}
      <group position={[0, 0.12, -0.85]} rotation={[-0.35, 0, 0]}>
        <RoundedBox args={[2.8, 1.8, 0.08]} radius={0.04} smoothness={4} position={[0, 0.9, 0]} castShadow>
          <meshStandardMaterial color="#2b2b30" roughness={0.4} metalness={0.6} />
        </RoundedBox>
        {/* dark display panel */}
        <mesh position={[0, 0.9, 0.05]}>
          <planeGeometry args={[2.55, 1.55]} />
          <meshStandardMaterial color="#0a0a0d" roughness={0.2} metalness={0.1} emissive="#0a0a12" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  )
}
