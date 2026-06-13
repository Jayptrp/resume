import { useGLTF } from '@react-three/drei'
import { Model } from '../components/Model'

const URL = `${import.meta.env.BASE_URL}models/wrench.glb`

export default function Wrench() {
  return <Model url={URL} targetSize={1.7} position={[4.2, 0, 0.95]} rotation={[0, -0.5, 0]} />
}

useGLTF.preload(URL)
