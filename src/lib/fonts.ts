import { Geist, Geist_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'

const fontSans = Geist({
  variable: '--font-sans',
  subsets: ['latin']
})

const fontMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin']
})

export const fontVariables = cn(fontSans.variable, fontMono.variable)
