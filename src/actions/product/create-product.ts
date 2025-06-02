'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { ProductType } from '@/schemas/product.schema';

export const createProduct = async ({ title, slug, image }: ProductType) => {
	const session = await auth();
	if (session?.user.role !== 'admin') {
		return { ok: false, msg: 'No hay session de administrador' };
	}
	try {
		const product = await prisma.product.findFirst({ where: { slug } });
		if (product) {
			return {
				ok: false,
				msg: `El producto ${title} ya existe`,
			};
		}
		await prisma.product.create({ data: { title, slug, image } });
	} catch (error) {
		console.log('create-product', { error });
		return {
			ok: false,
			msg: 'No se pudo crear el producto',
		};
	}
};
