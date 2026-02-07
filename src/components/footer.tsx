import Link from 'next/link'

import { GithubIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Separator } from '@/components/ui/separator'

import ParticleImage from './particle-image'

export default function Footer() {
  const socialLinks = [
    { icon: GithubIcon, href: 'https://github.com/muhammedeminakalan' }
  ]

  return (
    <footer className="mt-20 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="my-24 flex h-46 justify-center mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] invert dark:invert-0">
          <ParticleImage imageSrc="/logo.png" canvasHeight={184} />
        </div>
        <Separator />
        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-6 sm:flex-row xl:px-0">
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}
          </span>

          <div className="text-muted-foreground flex items-center gap-5">
            {socialLinks.map(({ icon, href }, index) => (
              <Link key={index} href={href} target="_blank">
                <HugeiconsIcon icon={icon} className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
