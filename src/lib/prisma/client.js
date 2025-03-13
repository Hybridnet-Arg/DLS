import { PrismaClient } from '@prisma/client';

const prisma =
  global?.prisma || new PrismaClient({ log: ['info', 'warn', 'error'] });

global.prisma = prisma;

export default prisma;
