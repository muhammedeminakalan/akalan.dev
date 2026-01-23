import Link from 'next/link'

import {
  GithubIcon,
  LinkedinIcon,
  NewTwitterIcon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/muhammetakalan' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/muhammetakalan' },
  { icon: NewTwitterIcon, href: 'https://x.com/muhammetakalann' }
]

const Navbar = () => {
  return (
    <nav className="bg-background/90 fixed inset-x-6 top-6 z-10 mx-auto h-14 max-w-3xl rounded-full border backdrop-blur-sm">
      <div className="mx-auto grid h-full grid-cols-2 items-center px-3 md:grid-cols-3">
        <Link href="/">
          <Logo />
        </Link>

        <div className="mx-auto hidden md:block">
          <div className={cn('flex data-[orientation=vertical]:items-start')}>
            <div className="gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
              <Button variant="ghost">
                <Link href="#experience">Deneyim</Link>
              </Button>
              <Button variant="ghost">
                <Link href="#projects">Projeler</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="ml-auto flex gap-2">
          {socialLinks.map(({ icon, href }, index) => (
            <a href={href} target="_blank" key={index}>
              <Button
                variant="outline"
                className="inline-flex rounded-full shadow-none"
                size="icon"
              >
                <HugeiconsIcon icon={icon} className="h-5 w-5" />
              </Button>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
