'use client'

import React, { useEffect, useRef } from 'react'

import { inspiraImageParticles } from '@/lib/inspira-image-particles'

interface ParticleImageProps {
  imageSrc: string
  canvasWidth?: number
  canvasHeight?: number
}

export default function ParticleImage({
  imageSrc,
  canvasWidth,
  canvasHeight
}: ParticleImageProps) {
  const imageParticleRef = useRef(null)

  useEffect(() => {
    const { InspiraImageParticle } = inspiraImageParticles()

    if (imageParticleRef.current) {
      new InspiraImageParticle(imageParticleRef.current)
    }
  }, [])

  return (
    // eslint-disable-next-line
    <img
      ref={imageParticleRef}
      src={imageSrc}
      className="hidden"
      data-width={canvasWidth}
      data-height={canvasHeight}
      alt="logo"
    />
  )
}
