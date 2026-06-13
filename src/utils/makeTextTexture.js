import * as THREE from 'three'

// Draws text onto a 2D canvas and returns it as a texture. Used for the
// sticky note ("2004") so we stay dependency-free (no runtime font fetch).
export function makeTextTexture(
  text,
  {
    width = 256,
    height = 256,
    bg = '#f4d96b',
    color = '#222',
    font = 'bold 90px "Comic Sans MS", system-ui, sans-serif',
    rotate = -0.04,
    sub = '',
  } = {},
) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, width, height)

  ctx.save()
  ctx.translate(width / 2, height / 2)
  ctx.rotate(rotate)
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  if (sub) {
    ctx.font = '24px system-ui, sans-serif'
    ctx.fillText(sub, 0, -56)
  }
  ctx.font = font
  ctx.fillText(text, 0, sub ? 16 : 0)
  ctx.restore()

  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 4
  tex.needsUpdate = true
  return tex
}
