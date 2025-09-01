'use server';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const sendComment = async (productId: string, comment: string) => {
	const session = await auth();
	if (!session?.user) {
		return { ok: false, msg: 'You must be logged in to comment' };
	}

	try {
		const product = await prisma.product.findFirst({
			where: { id: productId },
		});
		if (!product) {
			return {
				ok: false,
				msg: `The product with id ${productId} does not exist`,
			};
		}
		await prisma.feedback.create({
			data: {
				type: 'comment',
				comment,
				productId,
				userId: session.user.id,
			},
		});

		return {
			ok: true,
			msg: 'The comment has been sent. Before viewing it in the post, please wait while the administrator reviews it.',
		};
	} catch (error) {
		console.log('sendComment', { error });
		return {
			ok: false,
			msg: 'The comment could not be sent.',
		};
	}
};
