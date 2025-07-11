import { PrismaClient } from '@/shared/libs/generated/prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: [
      { emit: 'stdout', level: 'query' },
      { emit: 'stdout', level: 'info' },
      { emit: 'stdout', level: 'warn' },
      { emit: 'stdout', level: 'error' },
    ],
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma
