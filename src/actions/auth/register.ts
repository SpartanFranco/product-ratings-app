'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const registerUser = async (username: string, password: string) => {
	try {
		const userExist = await prisma.user.findUnique({ where: { username } });
		if (userExist) {
			return {
				ok: false,
				message: `El username ${username} ya esta en uso`,
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
			message: 'Usuario creado',
		};
	} catch (error) {
		console.log({ error });

		return {
			ok: false,
			message: 'No se pudo crear el usuario',
		};
	}
};
