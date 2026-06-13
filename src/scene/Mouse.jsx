import { useGLTF } from '@react-three/drei'
import { Model } from '../components/Model'

const URL = `${import.meta.env.BASE_URL}models/mouse.glb`

export default function Mouse() {
  return <Model url={URL} targetSize={0.8} position={[2.4, 0, 0.7]} rotation={[0, Math.PI, 0]} />
}

useGLTF.preload(URL)
