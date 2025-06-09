'use server';

import prisma from '@/lib/prisma';
import { validateAdmin } from '@/lib/validate-admin';

export const aproveComment = async (
	commentId: string,
	userId: string,
	isPending: boolean,
) => {
	try {
		await validateAdmin();
		await prisma.feedback.update({
			where: {
				id: commentId,
				userId,
				type: 'comment',
			},
			data: {
				isPending,
			},
		});

		return {
			ok: true,
		};
	} catch (error) {
		console.log('aproveComment', { error });
		return {
			ok: false,
			msg:
				error instanceof Error
					? error.message
					: 'No se pudo aprovar el comentario',
		};
	}
};
