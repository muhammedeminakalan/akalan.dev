import Link from 'next/link'

import Logo from '@/components/logo'
import ModeToggle from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="bg-background/90 fixed inset-x-6 top-6 z-10 mx-auto h-14 max-w-3xl rounded-full border backdrop-blur-sm">
      <div className="grid h-full grid-cols-2 items-center px-3 md:grid-cols-3">
        <Link href="/" aria-label="Ana sayfa">
          <Logo />
        </Link>

        <div className="mx-auto hidden md:block">
          <Button variant="ghost">
            <Link href="#experience">Deneyim</Link>
          </Button>
          <Button variant="ghost">
            <Link href="#projects">Projeler</Link>
          </Button>
        </div>

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
