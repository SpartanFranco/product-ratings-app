'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { sleep } from '@/lib/sleep';

export const getProducts = async () => {
	const session = await auth();
	const userId = session?.user?.id;
	await sleep(4000);
	const total = await prisma.product.count();

	const isProducts = await prisma.product.count();
	if (isProducts === 0) {
		return {
			totalPages: 1,
			products: [],
		};
	}

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
				public_id: product.public_id,
				averageRating: product.averageRating,
				totalRatings: product.totalRatings,
				userRating,
				countComments,
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title));

	return {
		products: formatted,
	};
};
