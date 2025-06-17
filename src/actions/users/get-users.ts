'use server';

import prisma from '@/lib/prisma';
import { validateAdminOrSuperAdmin } from '@/lib/validate-admin';

export const getUsers = async () => {
	try {
		await validateAdminOrSuperAdmin();

		const users = await prisma.user.findMany({
			where: {
				role: {
					not: 'superAdmin',
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
			include: {
				Feedback: {
					select: {
						type: true,
					},
				},
			},
		});

		const usersWithFeedback = users.map((user) => {
			const totalRatings = user.Feedback.filter(
				(f) => f.type == 'rating',
			).length;
			const totalComments = user.Feedback.filter(
				(f) => f.type == 'comment',
			).length;
			return {
				...user,
				totalRatings,
				totalComments,
			};
		});

		return {
			ok: true,
			users: usersWithFeedback,
		};
	} catch (error) {
		return {
			ok: false,
			msg: error instanceof Error ? error.message : 'Error al obtener usuarios',
		};
	}
};
