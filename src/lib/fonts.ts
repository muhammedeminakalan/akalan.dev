import { GeistMono } from 'geist/font/mono'
import { GeistPixelSquare } from 'geist/font/pixel'
import { GeistSans } from 'geist/font/sans'

import { cn } from '@/lib/utils'

const fontSans = GeistSans.variable
const fontMono = GeistMono.variable
const fontPixelSquare = GeistPixelSquare.variable

export const fontVariables = cn(fontSans, fontMono, fontPixelSquare)
