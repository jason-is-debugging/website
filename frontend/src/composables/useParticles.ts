import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import type { Particle, ParticleConnection } from '@/types'

// Color palette from color_ref - icy blue and periwinkle tones
const COLORS = [
  '#cbbdffff', // periwinkle
  '#b8d0ffff', // periwinkle-4
  '#b2d6ffff', // icy-blue
  '#acdcffff', // icy-blue-2
]

export function useParticles(canvasRef: Ref<HTMLCanvasElement | null>) {
  const particles: Particle[] = []
  const connections: ParticleConnection[] = []
  
  let animationId: number | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let width = 0
  let height = 0

  const PARTICLE_COUNT = 80
  const CONNECTION_DISTANCE = 150
  const MOUSE_DISTANCE = 200

  const mouse = ref({ x: -1000, y: -1000 })

  function randomColor(): string {
    return COLORS[Math.floor(Math.random() * COLORS.length)]
  }

  function createParticle(): Particle {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: randomColor(),
    }
  }

  function initParticles() {
    particles.length = 0
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle())
    }
  }

  function resize() {
    if (!canvasRef.value) return
    width = canvasRef.value.width = window.innerWidth
    height = canvasRef.value.height = window.innerHeight
  }

  function drawParticle(particle: Particle) {
    if (!ctx) return
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    ctx.fillStyle = particle.color
    ctx.fill()
  }

  function drawConnection(conn: ParticleConnection) {
    if (!ctx) return
    ctx.beginPath()
    ctx.moveTo(conn.particle1.x, conn.particle1.y)
    ctx.lineTo(conn.particle2.x, conn.particle2.y)
    ctx.strokeStyle = `rgba(203, 189, 255, ${conn.opacity})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  function updateParticle(particle: Particle) {
    particle.x += particle.vx
    particle.y += particle.vy

    if (particle.x < 0 || particle.x > width) particle.vx *= -1
    if (particle.y < 0 || particle.y > height) particle.vy *= -1

    // Mouse interaction
    const dx = mouse.value.x - particle.x
    const dy = mouse.value.y - particle.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < MOUSE_DISTANCE) {
      const force = (MOUSE_DISTANCE - dist) / MOUSE_DISTANCE * 0.02
      particle.vx -= (dx / dist) * force
      particle.vy -= (dy / dist) * force
    }

    // Damping
    particle.vx *= 0.99
    particle.vy *= 0.99
  }

  function findConnections() {
    connections.length = 0
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECTION_DISTANCE) {
          connections.push({
            particle1: particles[i],
            particle2: particles[j],
            opacity: 1 - dist / CONNECTION_DISTANCE,
          })
        }
      }
    }
  }

  function animate() {
    if (!ctx) return
    
    ctx.clearRect(0, 0, width, height)
    
    // Update and draw particles
    particles.forEach(particle => {
      updateParticle(particle)
      drawParticle(particle)
    })

    // Find and draw connections
    findConnections()
    connections.forEach(conn => drawConnection(conn))

    animationId = requestAnimationFrame(animate)
  }

  function handleMouseMove(e: MouseEvent) {
    mouse.value = { x: e.clientX, y: e.clientY }
  }

  function handleMouseLeave() {
    mouse.value = { x: -1000, y: -1000 }
  }

  function handleResize() {
    resize()
    // Redistribute particles after resize
    particles.forEach(p => {
      if (p.x > width) p.x = Math.random() * width
      if (p.y > height) p.y = Math.random() * height
    })
  }

  onMounted(() => {
    if (!canvasRef.value) return
    ctx = canvasRef.value.getContext('2d')
    resize()
    initParticles()
    animate()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
    }
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseleave', handleMouseLeave)
  })

  return { mouse }
}
