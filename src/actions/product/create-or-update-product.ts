'use server';

import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { validateAdmin } from '@/lib/validate-admin';
import { ProductType } from '@/schemas/product.schema';

interface Data extends ProductType {
	public_id: string;
	productId?: string;
	image: string;
}

export const createOrUpdateProduct = async ({
	title,
	slug,
	image,
	public_id,
	productId,
}: Data) => {
	try {
		await validateAdmin();
		if (productId) {
			const product = await prisma.product.findUnique({
				where: { id: productId },
			});
			if (!product) {
				return { ok: false, msg: 'El producto no existe' };
			}

			if (product.public_id && product.public_id !== public_id) {
				const result = await cloudinary.uploader.destroy(product.public_id);
				if (result.result !== 'ok' && result.result !== 'not found') {
					return {
						ok: false,
						msg: 'No se pudo eliminar la imagen anterior de Cloudinary',
					};
				}
			}

			await prisma.product.update({
				where: { id: productId },
				data: { title, slug, image, public_id },
			});
		} else {
			await prisma.product.create({
				data: { title, slug, image, public_id },
			});
		}

		return {
			ok: true,
			msg: productId
				? 'El producto se actualizó correctamente'
				: 'El producto se creó correctamente',
		};
	} catch (error) {
		console.error('createOrProduct error:', error);
		return {
			ok: false,
			msg:
				error instanceof Error
					? error.message
					: 'No se pudo procesar el producto',
		};
	}
};
