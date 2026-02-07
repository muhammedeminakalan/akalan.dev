import Image from 'next/image'

import { CopyLinkIcon, GithubIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

function ProjectCard({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl
}: ProjectCardProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border">
      <Image
        src={image}
        alt={title}
        className="bg-accent h-[192px] object-cover grayscale transition duration-1000 hover:grayscale-0"
        height={192}
        width={370}
      />

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
      title: 'İşletmem',
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

      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  )
}
