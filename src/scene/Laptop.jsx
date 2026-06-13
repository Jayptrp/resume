import { useGLTF } from '@react-three/drei'
import { Model } from '../components/Model'

const URL = `${import.meta.env.BASE_URL}models/laptop.glb`

// Real laptop model (Poly Pizza, CC-BY). Orientation/scale tuned so the open
// screen faces the camera and it sits centred on the desk.
export default function Laptop() {
  return <Model url={URL} targetSize={3.0} position={[0, 0, 0]} rotation={[0, 0, 0]} />
}

useGLTF.preload(URL)
