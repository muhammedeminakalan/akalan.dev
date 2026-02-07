import { CalendarIcon, NewJobIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Badge } from '@/components/ui/badge'

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

const ExperienceItem = ({
  title,
  company,
  period,
  description,
  technologies
}: ExperienceItemProps) => {
  return (
    <div className="relative pl-8 not-last:pb-12">
      <div className="bg-muted absolute top-2.5 left-0 h-full w-[2px] group-first:top-6 group-first:h-[calc(100%-24px)]">
        <div className="border-primary bg-background absolute top-0 -left-[5px] h-3 w-3 rounded-full border-2" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-accent flex size-9 shrink-0 items-center justify-center rounded-full">
            <HugeiconsIcon
              icon={NewJobIcon}
              className="text-muted-foreground size-5"
            />
          </div>
          <span className="text-lg font-semibold">{company}</span>
        </div>
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <HugeiconsIcon icon={CalendarIcon} className="size-4" />
            <span>{period}</span>
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const experiences = [
    {
      title: 'Co-Founder',
      company: 'İşletmem',
      period: '2025 - Devam Ediyor',
      description:
        'Kurucu ortağı olduğum işletmemde CTO olarak görev alıyorum. Modern web teknolojileri ile ölçeklenebilir uygulamalar geliştiriyorum.',
      technologies: [
        'Next.js',
        'Monorepo',
        'TypeScript',
        'PostgreSQL',
        'Redis',
        'MiniO',
        'Tailwind CSS',
        'Docker',
        'VPS',
        'CI/CD'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'AtomUp',
      period: '2024 - 2026',
      description:
        "İstanbul merkezli AtomUp'ta full stack geliştirici olarak çalıştım. Modern web teknolojileri ile ölçeklenebilir uygulamalar geliştirdim.",
      technologies: ['React', 'Node.js', 'TypeScript', 'Next.js', 'PostgreSQL']
    },
    {
      title: 'Frontend Developer',
      company: 'Vemlo TV',
      period: '2024',
      description:
        'Uzaktan çalışma modeliyle Vemlo TV platformunun frontend geliştirmelerinde görev aldım. Kullanıcı deneyimini iyileştiren özellikler geliştirdim.',
      technologies: ['React', 'JavaScript', 'CSS', 'REST API']
    },
    {
      title: 'Frontend Developer',
      company: 'Magician of Meta Teknoloji',
      period: '2023 - 2024',
      description:
        "İstanbul'da Magician of Meta Teknoloji'de frontend geliştirici olarak çalıştım. Web uygulamalarının kullanıcı arayüzlerini geliştirdim.",
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux']
    },
    {
      title: 'Intern',
      company: 'Fintech Yazılım',
      period: '2022',
      description:
        "Sakarya'da Fintech Yazılım'da stajyer olarak yazılım geliştirme süreçlerini öğrendim ve projelerde yer aldım.",
      technologies: ['JavaScript', 'HTML', 'CSS', 'Git']
    }
  ]

  return (
    <section id="experience" className="relative px-6 pt-40">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Deneyim
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Profesyonel Yolculuğum
          </h2>
          <p className="text-muted-foreground mt-2 text-lg sm:mt-4">
            Profesyonel gelişimim ve önemli başarılarımın zaman çizelgesi
          </p>
        </div>

        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceItem key={index} {...experience} />
          ))}
        </div>
      </div>
    </section>
  )
}
