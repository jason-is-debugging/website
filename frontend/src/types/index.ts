// Particle system types
export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export interface ParticleConnection {
  particle1: Particle
  particle2: Particle
  opacity: number
}

// Router types
export interface RouteConfig {
  path: string
  name: string
  component: string
}

// Navbar types
export interface NavItem {
  label: string
  icon?: string
  to: string
}

export interface NavbarProps {
  websiteName: string
}

export interface NavbarEmits {
  (e: 'login-click'): void
}

// App types
export interface AppEmits {
  (e: 'login-click'): void
}
