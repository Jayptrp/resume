import { useGLTF } from '@react-three/drei'
import { Model } from '../components/Model'

const URL = `${import.meta.env.BASE_URL}models/pencil.glb`

export default function Pencil() {
  return <Model url={URL} targetSize={1.0} position={[-2.15, 0.04, 1.75]} rotation={[0, 1.1, 0]} />
}

useGLTF.preload(URL)
