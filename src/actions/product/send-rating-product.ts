'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const sendRatingProduct = async (productId: string, rating: number) => {
	const session = await auth();
	if (!session?.user) {
		return { ok: false, msg: 'Debes iniciar sesión para calificar productos.' };
	}

	const userId = session.user.id;

	if (isNaN(rating) || rating < 1 || rating > 5) {
		return { ok: false, msg: 'El rating debe estar entre 1 y 5' };
	}

	try {
		const user = await prisma.user.findFirst({ where: { id: userId } });
		if (!user) throw new Error('El usuario no existe');

		const product = await prisma.product.findUnique({
			where: { id: productId },
			select: { id: true },
		});

		if (!product) {
			return { ok: false, msg: 'El producto no existe' };
		}

		await prisma.feedback.upsert({
			where: {
				type_userId_productId: {
					type: 'rating',
					userId,
					productId,
				},
			},
			update: {
				rating,
			},
			create: {
				type: 'rating',
				userId,
				productId,
				rating,
			},
		});

		// Recalcular rating promedio desde Feedback
		const aggregate = await prisma.feedback.aggregate({
			where: { productId, type: 'rating' },
			_avg: { rating: true },
			_count: true,
		});

		await prisma.product.update({
			where: { id: productId },
			data: {
				averageRating: parseFloat((aggregate._avg.rating || 0).toFixed(1)),
				totalRatings: aggregate._count,
			},
		});

		return { ok: true, msg: '¡Gracias por calificar este producto!' };
	} catch (error) {
		console.error('sendRatingProduct', { error });
		return { ok: false, msg: 'Ocurrió un error al enviar la calificación' };
	}
};
