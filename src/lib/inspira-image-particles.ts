interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}
interface Origin {
  x: number
  y: number
  color: Uint8ClampedArray
}
interface Touch {
  x: number
  y: number
  force: number
}

export const inspiraImageParticles = () => {
  class InspiraImageParticle {
    private width = 0
    private height = 0
    private particles: Particle[] = []
    private origins: Origin[] = []
    private touches: Touch[] = []

    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private imgSource: HTMLImageElement
    private animationId: number | null = null

    private readonly gap = 3
    private readonly mouseForce = 30
    private speed = 0
    private friction = 0

    constructor(element: HTMLImageElement) {
      this.imgSource = element
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!

      if (this.imgSource.parentElement) {
        this.imgSource.parentElement.appendChild(this.canvas)
        this.imgSource.style.display = 'none'
      }

      this._animate = this._animate.bind(this)
      this._handleTouch = this._handleTouch.bind(this)
      this._handleMouse = this._handleMouse.bind(this)
      this._clearTouches = this._clearTouches.bind(this)

      this._loadAndStart()
    }

    private _loadAndStart() {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = this.imgSource.src

      img.onload = () => {
        const parent = this.imgSource.parentElement
        this.width = parent?.clientWidth || img.naturalWidth
        this.height = parent?.clientHeight || img.naturalHeight

        this.canvas.width = this.width
        this.canvas.height = this.height

        this._initOrigins(img)
        this._startInteraction()
        this._animate()
      }
    }

    private _initOrigins(img: HTMLImageElement) {
      const ratio = Math.min(
        this.width / img.naturalWidth,
        this.height / img.naturalHeight
      )
      const w = Math.floor(img.naturalWidth * ratio)
      const h = Math.floor(img.naturalHeight * ratio)
      const x = Math.floor((this.width - w) / 2)
      const y = Math.floor((this.height - h) / 2)

      this.ctx.drawImage(img, x, y, w, h)
      const data = this.ctx.getImageData(0, 0, this.width, this.height).data

      this.origins = []
      this.particles = []

      for (let i = 0; i < this.width; i += this.gap) {
        for (let j = 0; j < this.height; j += this.gap) {
          const idx = (i + j * this.width) * 4
          if (data[idx + 3] > 0) {
            const origin = { x: i, y: j, color: data.subarray(idx, idx + 4) }
            this.origins.push(origin)
            this.particles.push({ x: i, y: j, vx: 0, vy: 0 })
          }
        }
      }

      this.speed = Math.log(this.origins.length) / 10
      this.friction = 1 - 0.08 * this.speed
    }

    private _animate() {
      const len = this.particles.length

      for (let i = 0; i < len; i++) {
        const p = this.particles[i]
        const o = this.origins[i]
        const dx = o.x - p.x + (Math.random() - 0.5) * 10
        const dy = o.y - p.y + (Math.random() - 0.5) * 10
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const force = dist * 0.01

        p.vx += force * (dx / dist) * this.speed
        p.vy += force * (dy / dist) * this.speed

        for (const t of this.touches) {
          const tx = p.x - t.x
          const ty = p.y - t.y
          const tDist = Math.sqrt(tx * tx + ty * ty)
          if (tDist > 0.1) {
            const tForce = (this.mouseForce * t.force) / tDist
            p.vx += tForce * (tx / tDist) * this.speed
            p.vy += tForce * (ty / tDist) * this.speed
          }
        }

        p.vx *= this.friction
        p.vy *= this.friction
        p.x += p.vx
        p.y += p.vy
      }

      const imgData = this.ctx.createImageData(this.width, this.height)
      const data = imgData.data

      for (let i = 0; i < len; i++) {
        const p = this.particles[i]
        const x = ~~p.x
        const y = ~~p.y
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          const idx = (x + y * this.width) * 4
          const c = this.origins[i].color
          data[idx] = c[0]
          data[idx + 1] = c[1]
          data[idx + 2] = c[2]
          data[idx + 3] = c[3]
        }
      }
      this.ctx.putImageData(imgData, 0, 0)

      this.animationId = requestAnimationFrame(this._animate)
    }

    private _startInteraction() {
      const isTouch = 'ontouchstart' in window
      if (isTouch) {
        document.body.addEventListener('touchstart', this._handleTouch)
        document.body.addEventListener('touchmove', this._handleTouch, {
          passive: false
        })
        document.body.addEventListener('touchend', this._clearTouches)
      } else {
        this.canvas.addEventListener('mousemove', this._handleMouse)
        this.canvas.addEventListener('mouseout', this._clearTouches)
      }
    }

    stop() {
      if (this.animationId) cancelAnimationFrame(this.animationId)
      document.body.removeEventListener('touchstart', this._handleTouch)
      document.body.removeEventListener('touchmove', this._handleTouch)
      document.body.removeEventListener('touchend', this._clearTouches)
      this.canvas.removeEventListener('mousemove', this._handleMouse)
      this.canvas.removeEventListener('mouseout', this._clearTouches)
    }

    private _handleMouse(e: MouseEvent) {
      this.touches = [{ x: e.offsetX, y: e.offsetY, force: 1 }]
    }

    private _handleTouch(e: TouchEvent) {
      e.preventDefault()
      const rect = this.canvas.getBoundingClientRect()
      this.touches = []
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i]
        this.touches.push({
          x: t.clientX - rect.left,
          y: t.clientY - rect.top,
          force: 1
        })
      }
    }

    private _clearTouches() {
      this.touches = []
    }
  }

  return { InspiraImageParticle }
}
