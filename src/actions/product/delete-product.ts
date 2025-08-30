'use server';

import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { validateAdminOrSuperAdmin } from '@/lib/validate-admin';

export const deleteProduct = async (id: string) => {
	try {
		await validateAdminOrSuperAdmin();
		const product = await prisma.product.findFirst({ where: { id } });
		if (!product) {
			return { ok: false, msg: 'The product does not exist for that ID.' };
		}

		if (product.public_id) {
			const result = await cloudinary.uploader.destroy(product.public_id);
			if (result.result !== 'ok' && result.result !== 'not found') {
				return {
					ok: false,
					msg: 'Could not delete image from Cloudinary',
				};
			}
		}

		await prisma.product.delete({ where: { id } });

		return {
			ok: true,
			msg: 'The product was successfully removed',
		};
	} catch (error) {
		console.error('[delete-product]', error);
		console.log('[delete-product] current UTC time:', new Date().toISOString());

		return {
			ok: false,
			msg:
				error instanceof Error
					? error.message
					: 'The product could not be deleted',
		};
	}
};
