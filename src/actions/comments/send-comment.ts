'use server';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const sendComment = async (productId: string, comment: string) => {
	const session = await auth();
	if (!session?.user) {
		return { ok: false, msg: 'Debes iniciar sesión para poder comentar' };
	}
	try {
		const product = await prisma.product.findFirst({
			where: { id: productId },
		});
		if (!product) {
			return {
				ok: false,
				msg: `El producto con el id ${productId} no existe`,
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
			msg: 'Se ha enviado el comentario,antes de verlo en la publicación por favor espere mientras el administrador lo revisa ',
		};
	} catch (error) {
		console.log('sendComment', { error });
		return {
			ok: false,
			msg: 'No se pudo enviar el comentario',
		};
	}
};
