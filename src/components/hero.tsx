import Image from 'next/image'

import { DocumentValidationIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProfileImageProps {
  className?: string
}

const ProfileImage = ({ className, ...props }: ProfileImageProps) => (
  <div className={cn('h-52 w-52 md:h-72 md:w-72', className)} {...props}>
    <div className="bg-accent relative h-full w-full overflow-hidden rounded-2xl grayscale transition duration-1000 hover:grayscale-0">
      <Image
        src="/muhammedeminakalan.jpg"
        alt="@muhammedeminakalan"
        width={288}
        height={288}
      />
    </div>
  </div>
)

export default function Hero() {
  return (
    <section id="hero" className="px-6 pt-40">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-12 md:flex-row-reverse">
          <ProfileImage className="hidden md:block" />

          <div className="flex-1 md:text-left">
            <ProfileImage className="mb-8 block md:hidden" />
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Muhammed Emin Akalan
              <span className="text-muted-foreground block text-lg font-medium">
                Full Stack Engineer
              </span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Ürün geliştirirken sadelik, kararlılık ve yalınlık benim mizacımın
              ayrılmaz parçası. Gereksiz karmaşayı ayıklayarak öz ve işlevsel
              çözümler tasarlamayı severim.
            </p>
            <p className="text-muted-foreground mb-6">
              İş dışında doğal olan her şeye ilgi duyar ve tefekkür etmekten
              büyük keyif alırım.
            </p>
            <a href="/resume.pdf" target="_blank">
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
