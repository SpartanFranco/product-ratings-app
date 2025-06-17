'use server';

import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { validateAdminOrSuperAdmin } from '@/lib/validate-admin';

export const deleteProduct = async (id: string) => {
	try {
		await validateAdminOrSuperAdmin();
		const product = await prisma.product.findFirst({ where: { id } });
		if (!product) {
			return { ok: false, msg: 'No existe el producto por ese ID' };
		}

		if (product.public_id) {
			const result = await cloudinary.uploader.destroy(product.public_id);
			if (result.result !== 'ok' && result.result !== 'not found') {
				return {
					ok: false,
					msg: 'No se pudo eliminar la imagen de Cloudinary',
				};
			}
		}

		await prisma.product.delete({ where: { id } });

		return {
			ok: true,
			msg: 'Se eliminó el producto exitosamente',
		};
	} catch (error) {
		console.error('[delete-product]', error);
		console.log('[delete-product] current UTC time:', new Date().toISOString());

		return {
			ok: false,
			msg:
				error instanceof Error
					? error.message
					: 'No se pudo borrar el producto',
		};
	}
};
