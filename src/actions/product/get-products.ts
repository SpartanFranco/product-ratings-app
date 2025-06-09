'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getProducts = async () => {
	const session = await auth();
	const userId = session?.user?.id;

	const products = await prisma.product.findMany({
		orderBy: {
			createdAt: 'asc',
		},
		include: {
			Feedback: {
				where: {
					OR: [
						{ type: 'comment' },
						userId ? { type: 'rating', userId } : { type: 'rating' },
					],
				},
				select: {
					type: true,
					rating: true,
					isPending: true,
					userId: true,
					user: {
						select: {
							username: true,
						},
					},
				},
			},
		},
	});

	const formatted = products
		.map((product) => {
			const feedback = product.Feedback;

			const userRating = userId
				? (feedback.find((f) => f.type === 'rating' && f.userId === userId)
						?.rating ?? null)
				: null;

			const countComments = feedback.filter(
				(f) => f.type === 'comment' && !f.isPending,
			).length;

			return {
				id: product.id,
				title: product.title,
				slug: product.slug,
				image: product.image,
				averageRating: product.averageRating,
				totalRatings: product.totalRatings,
				userRating,
				countComments,
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title));

	return formatted;
};
