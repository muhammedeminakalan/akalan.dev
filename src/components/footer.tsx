import Link from 'next/link'

import { GithubIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Separator } from '@/components/ui/separator'

import ParticleImage from './particle-image'

export default function Footer() {
  const socialLinks = [
    {
      icon: GithubIcon,
      href: 'https://github.com/muhammedeminakalan',
      label: 'GitHub'
    }
  ]

  return (
    <footer className="mt-20 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="my-24 flex h-48 justify-center mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] invert dark:invert-0">
          <ParticleImage src="/logo.png" />
        </div>
        <Separator />
        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-6 sm:flex-row xl:px-0">
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}
          </span>

          <div className="text-muted-foreground flex items-center gap-5">
            {socialLinks.map(({ icon, href, label }, index) => (
              <Link key={index} href={href} aria-label={label} target="_blank">
                <HugeiconsIcon icon={icon} className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
