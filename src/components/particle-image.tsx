'use client'

import React, { useEffect, useRef } from 'react'

import { inspiraImageParticles } from '@/lib/inspira-image-particles'

interface ParticleImageProps {
  src: string
}

export default function ParticleImage({ src }: ParticleImageProps) {
  const imageParticleRef = useRef(null)

  useEffect(() => {
    const { InspiraImageParticle } = inspiraImageParticles()

    if (imageParticleRef.current) {
      new InspiraImageParticle(imageParticleRef.current)
    }
  }, [])

  return (
    // eslint-disable-next-line
    <img ref={imageParticleRef} src={src} alt="Logo" className="hidden" />
  )
}
