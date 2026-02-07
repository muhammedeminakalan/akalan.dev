import Link from 'next/link'

import Logo from '@/components/logo'
import ModeToggle from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
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

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
