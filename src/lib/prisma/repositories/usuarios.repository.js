// eslint-disable-next-line no-unused-vars
import { Prisma } from '@prisma/client';
import prisma from '../client';
import { ApiError } from '@/utils/handlers/apiError.handler';

/**
 * Returns a usuario by id.
 *
 * @param {number} id - The id of the usuario to find.
 * @param {Prisma.usuariosFindUniqueArgs} findUniqueArgs - Arguments to pass to prisma.usuarios.findUnique.
 * @returns The usuario with the given id.
 */
export const findUsuarioById = async (id, options = {}) => {
  if (!id) throw new ApiError(400, 'El id del usuario es requerido');
  return await prisma.perforadores.findUniqueOrThrow({
    where: { id },
    ...options,
  });
};
