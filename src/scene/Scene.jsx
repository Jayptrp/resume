import { useEffect } from 'react'
import { useStore, INTRO_LAMP_DELAY } from '../state/store'
import Lighting from './Lighting'
import Desk from './Desk'
import Lamp from './Lamp'
import Laptop from './Laptop'
import Mouse from './Mouse'
import StickyNote from './StickyNote'
import Notebook from './Notebook'
import Shaker from './Shaker'
import Wrench from './Wrench'

// The whole desk scene + the opening beat: room starts dark, lamp clicks
// on by itself after INTRO_LAMP_DELAY.
export default function Scene() {
  const setLampOn = useStore((s) => s.setLampOn)

  useEffect(() => {
    const t = setTimeout(() => setLampOn(true), INTRO_LAMP_DELAY)
    return () => clearTimeout(t)
  }, [setLampOn])

  return (
    <group>
      <Lighting />
      <Desk />
      <Lamp />
      <Laptop />
      <Mouse />
      <StickyNote />
      <Notebook />
      <Shaker />
      <Wrench />
    </group>
  )
}
