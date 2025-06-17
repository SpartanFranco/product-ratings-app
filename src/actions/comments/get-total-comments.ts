'use server';

import prisma from '@/lib/prisma';

export const getTotalCommentsPending = async () => {
	const count = await prisma.feedback.count({
		where: { type: 'comment', isPending: true },
	});

	return count ?? 0;
};
