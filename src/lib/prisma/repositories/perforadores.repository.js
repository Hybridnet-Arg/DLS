import prisma from '../client';

export const findPerforador = async (filters = {}, options = {}) => {
  return await prisma.perforadores.findFirstOrThrow({
    where: filters,
    ...options,
  });
};
