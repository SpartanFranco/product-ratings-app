'use server';

import prisma from '@/lib/prisma';
import { validateAdminOrSuperAdmin } from '@/lib/validate-admin';

export const getComments = async () => {
	try {
		await validateAdminOrSuperAdmin();

		const comments = await prisma.feedback.findMany({
			where: {
				type: 'comment',
			},
			select: {
				id: true,
				comment: true,
				isPending: true,
				createdAt: true,
				product: {
					select: {
						image: true,
						title: true,
						averageRating: true,
					},
				},
				user: {
					select: {
						id: true,
						username: true,
					},
				},
			},
		});
		return {
			ok: true,
			comments,
		};
	} catch (error) {
		console.log('getComments', { error });
		return {
			ok: false,
			msg:
				error instanceof Error
					? error.message
					: 'No se pudo obtener los comentarios',
		};
	}
};
