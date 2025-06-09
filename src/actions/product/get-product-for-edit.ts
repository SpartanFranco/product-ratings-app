'use server';

import prisma from '@/lib/prisma';
import { validateAdmin } from '@/lib/validate-admin';

export const getProductForEdit = async (slug: string) => {
	try {
		await validateAdmin();

		const product = await prisma.product.findFirst({
			where: { slug },
			select: {
				id: true,
				title: true,
				slug: true,
				image: true,
				public_id: true,
			},
		});
		if (!product) {
			return {
				ok: false,
				msg: `El producto con slug ${slug} no existe`,
			};
		}
		return {
			ok: true,
			product,
		};
	} catch (error) {
		return { ok: false, msg: 'No se pudo obtener el producto' };
	}
};
