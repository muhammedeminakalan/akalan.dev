export interface ParticleOptions {
  width?: number | string
  height?: number | string
  image?: HTMLImageElement
  wrapperElement?: HTMLElement
  canvas?: HTMLCanvasElement
  context?: CanvasRenderingContext2D
}

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

interface Origin {
  x: number
  y: number
  z: number
  color: number[]
}

interface TouchPoint {
  x: number
  y: number
  z: number
  force: number
}

export const inspiraImageParticles = () => {
  class InspiraImageParticle {
    state: 'stopped' | 'running' = 'stopped'
    touches: TouchPoint[] = []
    particles: Particle[] = []
    origins: Origin[] = []

    width = 0
    height = 0
    imageWidth = 0
    imageHeight = 0
    canvas: HTMLCanvasElement | null = null
    context: CanvasRenderingContext2D | null = null
    image: HTMLImageElement | null = null
    srcImage: HTMLImageElement | null = null
    wrapperElement: HTMLElement | null = null
    animationFrameId: number | null = null

    readonly gravity = 0.08
    readonly particleGap = 3
    readonly noise = 10
    readonly mouseForce = 30

    speed = 0
    gravityFactor = 0

    constructor(optionsParam: any = {}) {
      let options: ParticleOptions = { ...optionsParam }

      if (optionsParam instanceof HTMLElement) {
        options = { ...optionsParam.dataset, ...options }

        if (optionsParam.nodeName === 'IMG') {
          options.image = optionsParam as HTMLImageElement
        } else {
          options.wrapperElement = optionsParam
        }
      }

      this._mouseHandler = this._mouseHandler.bind(this)
      this._touchHandler = this._touchHandler.bind(this)
      this._clearTouches = this._clearTouches.bind(this)
      this._animate = this._animate.bind(this)

      this._initImage(options)
    }

    start() {
      if (this.canvas) {
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.style.display = ''
      }

      this._initOrigins()
      this._initParticles()

      if (this.state !== 'running') {
        this.state = 'running'
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
          document.body.addEventListener('touchstart', this._touchHandler)
          document.body.addEventListener('touchmove', this._touchHandler, {
            passive: false
          })
          document.body.addEventListener('touchend', this._clearTouches)
        } else {
          this.canvas?.addEventListener('mousemove', this._mouseHandler)
          this.canvas?.addEventListener('mouseout', this._clearTouches)
        }
        this._animate()
      }
    }

    stop() {
      this.state = 'stopped'
      document.body.removeEventListener('touchstart', this._touchHandler)
      document.body.removeEventListener('touchmove', this._touchHandler)
      document.body.removeEventListener('touchend', this._clearTouches)

      if (this.canvas) {
        this.canvas.removeEventListener('mousemove', this._mouseHandler)
        this.canvas.removeEventListener('mouseout', this._clearTouches)
      }

      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
        this.animationFrameId = null
      }
    }

    private _animate() {
      if (this.state === 'stopped') return
      this._calculate()
      this._draw()
      this.animationFrameId = requestAnimationFrame(this._animate)
    }

    private _calculate() {
      const len = this.particles.length

      for (let i = 0; i < len; i++) {
        const origin = this.origins[i]
        const particle = this.particles[i]

        const dX = origin.x - particle.x + (Math.random() - 0.5) * this.noise
        const dY = origin.y - particle.y + (Math.random() - 0.5) * this.noise
        const dZ =
          origin.z - particle.z + ((Math.random() - 0.5) * this.noise) / 1000

        const distance = Math.sqrt(dX * dX + dY * dY + dZ * dZ)
        const force = distance * 0.01

        particle.vx += force * (dX / distance) * this.speed
        particle.vy += force * (dY / distance) * this.speed
        particle.vz += force * (dZ / distance) * this.speed

        for (const touch of this.touches) {
          const tX = particle.x - touch.x
          const tY = particle.y - touch.y
          const tZ = particle.z - touch.z
          const tDist = Math.sqrt(tX * tX + tY * tY + tZ * tZ)

          if (tDist > 0.1) {
            const tForce = (this.mouseForce * touch.force) / tDist
            particle.vx += tForce * (tX / tDist) * this.speed
            particle.vy += tForce * (tY / tDist) * this.speed
            particle.vz += tForce * (tZ / tDist) * this.speed
          }
        }

        particle.vx *= this.gravityFactor
        particle.vy *= this.gravityFactor
        particle.vz *= this.gravityFactor

        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz
      }
    }

    private _draw() {
      if (!this.context) return
      const imageData = this.context.createImageData(this.width, this.height)
      const data = imageData.data
      const len = this.origins.length

      for (let i = 0; i < len; i++) {
        const particle = this.particles[i]
        const x = particle.x | 0
        const y = particle.y | 0

        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          const origin = this.origins[i]
          const index = (x + y * this.width) * 4
          data[index] = origin.color[0]
          data[index + 1] = origin.color[1]
          data[index + 2] = origin.color[2]
          data[index + 3] = origin.color[3]
        }
      }
      this.context.putImageData(imageData, 0, 0)
    }

    private _initParticles() {
      this.particles = this.origins.map((origin) => ({
        x: origin.x,
        y: origin.y,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0
      }))
    }

    private _initOrigins() {
      if (!this.image) return
      const canvas = document.createElement('canvas')
      const imageRatio = this.imageWidth / this.imageHeight
      const canvasRatio = this.width / this.height

      let renderWidth, renderHeight
      if (canvasRatio < imageRatio) {
        renderWidth = this.width
        renderHeight = renderWidth / imageRatio
      } else {
        renderHeight = this.height
        renderWidth = renderHeight * imageRatio
      }

      const offsetX = ((this.width - renderWidth) / 2) | 0
      const offsetY = ((this.height - renderHeight) / 2) | 0

      canvas.width = renderWidth
      canvas.height = renderHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(this.image, 0, 0, renderWidth, renderHeight)

      const data = ctx.getImageData(0, 0, renderWidth, renderHeight).data
      this.origins = []

      for (let x = 0; x < renderWidth; x += this.particleGap) {
        for (let y = 0; y < renderHeight; y += this.particleGap) {
          const index = (x + y * renderWidth) * 4
          const a = data[index + 3]

          if (a > 0) {
            this.origins.push({
              x: offsetX + x,
              y: offsetY + y,
              z: 50,
              color: [data[index], data[index + 1], data[index + 2], a]
            })
          }
        }
      }

      if (this.origins.length > 0) {
        this.speed = Math.log(this.origins.length) / 10
      } else {
        this.speed = 0
      }

      this.gravityFactor = 1 - this.gravity * this.speed
    }

    private _initImage(options: ParticleOptions) {
      this.srcImage = options.image || null
      if (!this.srcImage) return

      this.image = document.createElement('img')
      this.wrapperElement =
        options.wrapperElement || this.srcImage.parentElement
      this.image.crossOrigin = 'Anonymous'
      this.image.onload = () => this._onImageLoaded(options)
      this.image.src = this.srcImage.src
    }

    private _onImageLoaded(options: ParticleOptions) {
      if (!this.image) return

      this.imageWidth = this.image.naturalWidth || this.image.width
      this.imageHeight = this.image.naturalHeight || this.image.height

      const optWidth =
        typeof options.width === 'string'
          ? parseInt(options.width)
          : options.width
      const optHeight =
        typeof options.height === 'string'
          ? parseInt(options.height)
          : options.height

      this.width = optWidth || this.imageWidth
      this.height = optHeight || this.imageHeight

      if (this.srcImage) this.srcImage.style.display = 'none'

      this._initContext(options)
      this.start()
    }

    private _initContext(options: ParticleOptions) {
      this.canvas = options.canvas || null
      if (!this.canvas && this.wrapperElement) {
        this.canvas = document.createElement('canvas')
        this.wrapperElement.appendChild(this.canvas)
      }
      if (this.canvas) {
        this.context = options.context || this.canvas.getContext('2d')
      }
    }

    private _mouseHandler(e: MouseEvent) {
      this.touches = [{ x: e.offsetX, y: e.offsetY, z: 49, force: 1 }]
    }

    private _touchHandler(e: TouchEvent) {
      this.touches = []
      const rect = this.canvas?.getBoundingClientRect()
      if (!rect) return

      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i]
        if (touch.target === this.canvas) {
          this.touches.push({
            x: touch.pageX - rect.left,
            y: touch.pageY - rect.top,
            z: 49,
            force: touch.force || 1
          })
          e.preventDefault()
        }
      }
    }

    private _clearTouches() {
      this.touches = []
    }
  }

  return { InspiraImageParticle }
}
