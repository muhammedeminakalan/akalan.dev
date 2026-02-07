import Image from 'next/image'

import { DocumentValidationIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProfileImageProps {
  className?: string
}

function ProfileImage({ className, ...props }: ProfileImageProps) {
  return (
    <div
      className={cn('h-52 w-52 md:h-[300px] md:w-[300px]', className)}
      {...props}
    >
      <div className="bg-accent overflow-hidden rounded-2xl grayscale transition duration-1000 hover:grayscale-0">
        <Image
          src="/muhammedeminakalan.jpg"
          alt="Muhammed Emin Akalan"
          width={300}
          height={300}
          priority
        />
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="px-6 pt-40">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-6 md:flex-row-reverse md:gap-12">
          <ProfileImage />

          <div className="flex-1 md:text-left">
            <h2 className="text-4xl font-bold tracking-tight">
              Muhammed Emin Akalan
              <span className="text-muted-foreground block text-lg font-medium">
                Full Stack Engineer
              </span>
            </h2>
            <p className="text-muted-foreground mt-4">
              Ürün geliştirirken sadelik, kararlılık ve yalınlık benim mizacımın
              ayrılmaz parçası. Gereksiz karmaşayı ayıklayarak öz ve işlevsel
              çözümler tasarlamayı severim.
            </p>
            <p className="text-muted-foreground mt-4">
              İş dışında doğal olan her şeye ilgi duyar ve tefekkür etmekten
              büyük keyif alırım.
            </p>
            <a href="/resume.pdf" target="_blank" className="mt-6 inline-block">
              <Button>
                <HugeiconsIcon icon={DocumentValidationIcon} />
                Özgeçmiş
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
