'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const registerUser = async (username: string, password: string) => {
	try {
		const userExist = await prisma.user.findUnique({ where: { username } });
		if (userExist) {
			return {
				ok: false,
				message: `Username ${username} it is already in use`,
			};
		}

		const user = await prisma.user.create({
			data: {
				username,
				password: bcrypt.hashSync(password, 10),
			},
			select: {
				id: true,
				username: true,
				password: true,
				role: true,
			},
		});

		return {
			ok: true,
			user: user,
			message: 'User created',
		};
	} catch (error) {
		console.log({ error });

		return {
			ok: false,
			message: 'The user could not be created',
		};
	}
};
