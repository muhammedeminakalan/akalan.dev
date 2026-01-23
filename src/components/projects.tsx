'use client'

import Image from 'next/image'

import { CopyLinkIcon, GithubIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl
}: ProjectCardProps) => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border grayscale transition duration-1000 select-none hover:grayscale-0">
      <div className="relative aspect-square h-48">
        <Image
          src={image}
          alt={title}
          className="bg-accent object-cover"
          fill
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex gap-3">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="rounded-full">
                <HugeiconsIcon icon={CopyLinkIcon} className="mr-1 h-4 w-4" />
                İncele
              </Button>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full shadow-none">
                <HugeiconsIcon icon={GithubIcon} className="mr-1 h-4 w-4" />
                Kodu Görüntüle
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const projects = [
    {
      title: 'Darulhikmet',
      description: 'İslami içeriklere odaklanan kapsamlı bir web platformu.',
      image: '/darulhikmet.svg',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://darulhikmet.com',
      githubUrl: 'https://github.com/darulhikmet'
    },
    {
      title: 'Boykot',
      description:
        'Marka boykot sorgulamak için geliştirilmiş bir Android uygulama.',
      image: '/boycott.svg',
      technologies: ['Kotlin', 'Firebase'],
      githubUrl: 'https://github.com/muhammetakalan/boycott'
    },
    {
      title: 'Watch App',
      description:
        'Kişisel film arşivimi yönetmek için geliştirdiğim bir Android uygulama.',
      image: '/watch-app.svg',
      technologies: ['React Native', 'Firebase', 'TMDB API'],
      liveUrl:
        'https://github.com/muhammetakalan/watch-app/releases/tag/v1.0.0',
      githubUrl: 'https://github.com/muhammetakalan/watch-app'
    },
    {
      title: 'TrekBlends',
      description:
        'Kişiye özel seyahat planları oluşturmak için geliştirilmiş bir web uygulaması.',
      image: '/trekblends.svg',
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'shadcn/ui',
        'MDX',
        'SEO'
      ],
      liveUrl: 'https://trekblends.com'
    },
    {
      title: 'Movie App',
      description: 'Filmleri keşfetmenizi sağlayan bir web uygulaması.',
      image: '/movie-app.svg',
      technologies: ['Next.js', 'Module CSS', 'TMDB API'],
      liveUrl: 'https://movie-app-tmoviedb.netlify.app',
      githubUrl: 'https://github.com/muhammetakalan/movie-app'
    },
    {
      title: 'Cilper',
      description:
        'Veri dosyalarını tarayıcıda SQL ile analiz etmenizi sağlayan bir web uygulaması.',
      image: '/cilper.svg',
      technologies: [
        'Vite.js',
        'Tailwind CSS',
        'shadcn/ui',
        'DuckDB',
        'SQL',
        'WASM',
        'PWA'
      ],
      liveUrl: 'https://cilper.com'
    },
    {
      title: 'Parapin',
      description:
        'Gelir ve giderlerinizi takip edip analiz etmenizi sağlayan, finans uygulaması.',
      image: '/parapin.svg',
      technologies: [
        'Kotlin',
        'Material 3',
        'Gemini AI',
        'OpenRouter',
        'Express.js'
      ],
      liveUrl:
        'https://play.google.com/store/apps/details?id=com.tahrir.glowguys'
    },
    {
      title: 'İşletmem.app',
      description: 'İşletmenizi dijitale taşıyan bir web uygulaması.',
      image: '/isletmem.svg',
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'shadcn/ui',
        'Monorepo',
        'Docker'
      ],
      liveUrl: 'https://isletmem.app'
    },
    {
      title: 'Dijital Kumbara',
      description:
        'Temassız ödeme ile bağış toplamayı kolaylaştıran bir mobil uygulama.',
      image: '/dijitalkumbara.svg',
      technologies: ['Kotlin'],
      liveUrl: 'https://dijitalkumbara.com/product/dk'
    }
  ]

  return (
    <section id="projects" className="relative px-6 pt-40">
      <div className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">
          Projeler
        </Badge>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Öne Çıkan İşler
        </h2>
        <p className="text-muted-foreground mt-2 text-lg sm:mt-4">
          En iyi projelerim ve teknik başarılarımdan bazılarını sergiliyorum
        </p>
      </div>

      <Carousel opts={{ dragFree: true }} className="mx-auto max-w-3xl">
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem key={index} className="flex lg:basis-1/2">
              <ProjectCard key={index} {...project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
