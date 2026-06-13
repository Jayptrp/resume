import * as THREE from 'three'

// Wrench lying on the right side of the desk. Placeholder shape:
// handle + open-end head. Swapped for a real model later.
export default function Wrench() {
  const metal = (
    <meshStandardMaterial color="#9aa0a6" roughness={0.3} metalness={0.85} />
  )
  return (
    <group position={[2.95, 0.06, 0.95]} rotation={[0, -0.5, 0]}>
      {/* handle */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.07, 1.6, 16]} />
        {metal}
      </mesh>
      {/* open-end head */}
      <mesh position={[0.85, 0, 0]} castShadow>
        <torusGeometry args={[0.16, 0.06, 12, 24, Math.PI * 1.4]} />
        {metal}
      </mesh>
      {/* box-end head */}
      <mesh position={[-0.85, 0, 0]} castShadow>
        <torusGeometry args={[0.15, 0.06, 12, 24]} />
        {metal}
      </mesh>
    </group>
  )
}
