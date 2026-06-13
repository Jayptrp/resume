import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

// Generic GLTF prop loader. Auto-centers on X/Z, sits the model's bottom on
// y=0, and scales so its largest dimension equals `targetSize` — so sourced
// models (which come in wildly different scales/origins) drop onto the desk
// predictably. `position` then places it; `rotation` orients it.
export function Model({ url, targetSize = 1, position = [0, 0, 0], rotation = [0, 0, 0], ...props }) {
  const { scene } = useGLTF(url)

  const obj = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
      }
    })
    return clone
  }, [scene])

  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(obj)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return {
      scale: targetSize / maxDim,
      offset: [-center.x, -box.min.y, -center.z],
    }
  }, [obj, targetSize])

  return (
    <group position={position} rotation={rotation} {...props}>
      <group scale={scale}>
        <primitive object={obj} position={offset} />
      </group>
    </group>
  )
}
