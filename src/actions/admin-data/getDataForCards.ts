'use server';
import prisma from '@/lib/prisma';

export const getDataForCards = async () => {
	try {
		const [totalUsers, totalProducts, messagesPending] = await Promise.all([
			prisma.user.count({
				where: {
					NOT: {
						role: 'superAdmin',
					},
				},
			}),
			prisma.product.count(),
			prisma.product.count({
				where: {
					Feedback: {
						some: {
							type: 'comment',
							isPending: true,
						},
					},
				},
			}),
		]);

		return {
			users: totalUsers,
			products: totalProducts,
			messages: messagesPending,
		};
	} catch (error) {
		console.log(error);
	}
};
