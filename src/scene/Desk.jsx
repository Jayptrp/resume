import { RoundedBox } from '@react-three/drei'

// Desk slab + legs, a back wall, and a floor. Grounds the scene and
// catches the lamp's shadow. Placeholder materials for now.
export default function Desk() {
  const legX = 4.2
  const legZ = 1.4
  const Leg = ({ x, z }) => (
    <mesh position={[x, -1.1, z]} castShadow receiveShadow>
      <boxGeometry args={[0.22, 1.8, 0.22]} />
      <meshStandardMaterial color="#3a2c20" roughness={0.8} />
    </mesh>
  )

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#171419" roughness={1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.5, -1.9]} receiveShadow>
        <planeGeometry args={[40, 14]} />
        <meshStandardMaterial color="#241f28" roughness={1} />
      </mesh>

      {/* Desk top */}
      <RoundedBox args={[9.6, 0.32, 3.6]} radius={0.06} smoothness={4} position={[0, -0.16, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#6b4a32" roughness={0.55} />
      </RoundedBox>

      <Leg x={-legX} z={legZ} />
      <Leg x={legX} z={legZ} />
      <Leg x={-legX} z={-legZ} />
      <Leg x={legX} z={-legZ} />
    </group>
  )
}
