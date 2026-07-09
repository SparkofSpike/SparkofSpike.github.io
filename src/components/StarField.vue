<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId = 0

const PALETTE = [
  { r: 180, g: 140, b: 240 }, // purple
  { r: 240, g: 180, b: 100 }, // orange/gold
  { r: 120, g: 180, b: 240 }, // blue
  { r: 100, g: 210, b: 200 }, // teal
  { r: 240, g: 150, b: 200 }, // pink
]

interface Star {
  x: number; y: number; size: number; alpha: number
  twinkleSpeed: number; twinklePhase: number
  driftX: number; driftY: number
  neighbors: number[]
  color: { r: number; g: number; b: number }
}

interface ShootingStar {
  active: boolean; x: number; y: number
  vx: number; vy: number; life: number; maxLife: number
  trail: { x: number; y: number }[]
}

const STARS_COUNT = 380
const CONSTELLATION_DIST = 165
const MOUSE_CONNECT_DIST = 220
const SHOOTING_STAR_INTERVAL = 5000

let stars: Star[] = []
let shootingStar: ShootingStar = {
  active: false, x: 0, y: 0,
  vx: 0, vy: 0, life: 0, maxLife: 0, trail: []
}
let lastShootingStarAttempt = 0
let mouseX = -9999
let mouseY = -9999
let mouseOnCanvas = false

function initStars(w: number, h: number) {
  const s: Star[] = []
  for (let i = 0; i < STARS_COUNT; i++) {
    s.push({
      x: Math.random() * w, y: Math.random() * h,
      size: Math.random() * 2.2 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 2 + 0.5,
      twinklePhase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.12,
      driftY: (Math.random() - 0.5) * 0.12,
      neighbors: [],
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
    })
  }
  for (let i = 0; i < s.length; i++)
    for (let j = i + 1; j < s.length; j++) {
      const dx = s[i].x - s[j].x, dy = s[i].y - s[j].y
      if (Math.sqrt(dx * dx + dy * dy) < CONSTELLATION_DIST) {
        s[i].neighbors.push(j); s[j].neighbors.push(i)
      }
    }
  stars = s
}

function spawnShootingStar(w: number, h: number) {
  shootingStar = {
    active: true,
    x: Math.random() * w * 0.8 + w * 0.1, y: Math.random() * h * 0.3,
    vx: (Math.random() * 3 + 2) * (Math.random() > 0.5 ? 1 : -1),
    vy: Math.random() * 3 + 2, life: 0,
    maxLife: Math.random() * 40 + 30, trail: []
  }
}

function drawCanvas(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  ctx.clearRect(0, 0, w, h)

  // Update positions
  for (const star of stars) {
    star.x += star.driftX; star.y += star.driftY
    if (star.x < 0) star.x = w; if (star.x > w) star.x = 0
    if (star.y < 0) star.y = h; if (star.y > h) star.y = 0
  }

  // Rebuild neighbors
  const doRebuild = Math.floor(time * 10) % 100 === 0
  if (doRebuild) {
    for (const star of stars) star.neighbors = []
    for (let i = 0; i < stars.length; i++)
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y
        if (Math.sqrt(dx * dx + dy * dy) < CONSTELLATION_DIST) {
          stars[i].neighbors.push(j); stars[j].neighbors.push(i)
        }
      }
  }

  // Constellation lines
  for (const star of stars) {
    const flicker = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5
    const alpha = star.alpha * (0.4 + flicker * 0.6)
    for (const ni of star.neighbors) {
      const nb = stars[ni]
      const starIdx = stars.indexOf(star)
      if (starIdx >= ni) continue
      const dx = star.x - nb.x, dy = star.y - nb.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist >= CONSTELLATION_DIST) continue
      const lineAlpha = (1 - dist / CONSTELLATION_DIST) * 0.35 * alpha
      ctx.beginPath(); ctx.moveTo(star.x, star.y); ctx.lineTo(nb.x, nb.y)
      ctx.strokeStyle = `rgba(180, 170, 210, ${lineAlpha})`
      ctx.lineWidth = 1.0; ctx.stroke()
    }
  }

  // Mouse connection lines
  if (mouseOnCanvas) {
    for (const star of stars) {
      const dx = star.x - mouseX, dy = star.y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > MOUSE_CONNECT_DIST) continue
      const flicker = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5
      const alpha = star.alpha * (0.4 + flicker * 0.6)
      const lineAlpha = (1 - dist / MOUSE_CONNECT_DIST) * 0.6 * alpha
      ctx.beginPath(); ctx.moveTo(star.x, star.y); ctx.lineTo(mouseX, mouseY)
      ctx.strokeStyle = `rgba(201, 168, 76, ${lineAlpha})`
      ctx.lineWidth = 1.5; ctx.stroke()
    }
    ctx.beginPath(); ctx.arc(mouseX, mouseY, 2, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(201, 168, 76, 0.5)'; ctx.fill()
    ctx.beginPath(); ctx.arc(mouseX, mouseY, 12, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(201, 168, 76, 0.03)'; ctx.fill()
  }

  // Draw stars
  for (const star of stars) {
    const flicker = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5
    const alpha = star.alpha * (0.4 + flicker * 0.6)
    const dx = star.x - mouseX, dy = star.y - mouseY
    const dMouse = Math.sqrt(dx * dx + dy * dy)
    const boost = mouseOnCanvas && dMouse < MOUSE_CONNECT_DIST ? 0.4 : 0
    const fa = Math.min(alpha + boost, 1)
    ctx.beginPath(); ctx.arc(star.x, star.y, star.size + (boost > 0 ? 0.5 : 0), 0, Math.PI * 2)
    const c = star.color
    ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${fa})`; ctx.fill()
    if (star.size > 1.6) {
      ctx.beginPath(); ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${fa * 0.08})`; ctx.fill()
    }
  }

  // Shooting star
  const now = Date.now()
  if (!shootingStar.active && now - lastShootingStarAttempt > SHOOTING_STAR_INTERVAL) {
    spawnShootingStar(w, h); lastShootingStarAttempt = now
  }
  if (shootingStar.active) {
    shootingStar.life++
    shootingStar.trail.push({ x: shootingStar.x, y: shootingStar.y })
    if (shootingStar.trail.length > 20) shootingStar.trail.shift()
    shootingStar.x += shootingStar.vx; shootingStar.y += shootingStar.vy
    if (shootingStar.trail.length > 1) {
      ctx.beginPath()
      ctx.moveTo(shootingStar.trail[0].x, shootingStar.trail[0].y)
      for (let i = 1; i < shootingStar.trail.length; i++)
        ctx.lineTo(shootingStar.trail[i].x, shootingStar.trail[i].y)
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.5)'; ctx.lineWidth = 1.2; ctx.stroke()
      ctx.beginPath(); ctx.arc(shootingStar.x, shootingStar.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(201, 168, 76, 0.85)'; ctx.fill()
      ctx.beginPath(); ctx.arc(shootingStar.x, shootingStar.y, 7, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(201, 168, 76, 0.12)'; ctx.fill()
    }
    if (shootingStar.life > shootingStar.maxLife ||
        shootingStar.x < -50 || shootingStar.x > w + 50 ||
        shootingStar.y > h + 50) shootingStar.active = false
  }
}

function startAnim() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  if (!ctx) return
  const w = window.innerWidth, h = window.innerHeight
  canvas.width = w; canvas.height = h
  initStars(w, h)
  const startTime = Date.now()
  function frame() {
    drawCanvas(ctx, w, h, (Date.now() - startTime) / 1000)
    animId = requestAnimationFrame(frame)
  }
  frame()
}

function handleResize() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth; canvas.height = window.innerHeight
  initStars(canvas.width, canvas.height)
}

function handleMouseMove(e: MouseEvent) {
  mouseX = e.clientX; mouseY = e.clientY; mouseOnCanvas = true
}
function handleMouseLeave() { mouseOnCanvas = false }

onMounted(() => {
  startAnim()
  window.addEventListener('resize', handleResize)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<template>
  <canvas ref="canvasRef" class="starfield-canvas" />
</template>

<style scoped>
.starfield-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
