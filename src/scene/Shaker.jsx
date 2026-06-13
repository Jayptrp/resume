import { useGLTF } from '@react-three/drei'
import { Model } from '../components/Model'

const URL = `${import.meta.env.BASE_URL}models/shaker.glb`

export default function Shaker() {
  return <Model url={URL} targetSize={1.5} position={[-4.3, 0, 0.75]} rotation={[0, 0, 0]} />
}

useGLTF.preload(URL)
