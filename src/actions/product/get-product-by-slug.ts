'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
	const session = await auth();
	const userId = session?.user.id;

	try {
		const product = await prisma.product.findFirst({
			where: { slug },
			include: {
				Feedback: {
					where: {
						OR: [
							{ type: 'comment' },
							userId ? { type: 'rating', userId } : { type: 'rating' }, // Solo si hay sesión
						],
					},
					select: {
						type: true,
						rating: true,
						comment: true,
						createdAt: true,
						user: {
							select: {
								username: true,
							},
						},
					},
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});

		if (!product) {
			return {
				ok: false,
				msg: `El producto ${slug} no existe`,
			};
		}

		// Separa feedback por tipo
		const comments = product.Feedback.filter((f) => f.type === 'comment');
		const ratings = product.Feedback.filter((f) => f.type === 'rating');

		return {
			ok: true,
			product: {
				...product,
				comments,
				ratingByUser: userId ? (ratings[0]?.rating ?? null) : null,
			},
		};
	} catch (error) {
		console.error('getProductBySlug', { error });
		return {
			ok: false,
			msg: 'No se pudo obtener el producto',
		};
	}
};
