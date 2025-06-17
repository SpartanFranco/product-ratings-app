import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

(async () => {
	try {
		await prisma.user.deleteMany();
		await prisma.user.create({
			data: {
				username: '@geovani',
				password: bcrypt.hashSync('123456', 10),
				role: 'superAdmin',
			},
		});
		console.log('se ejecuto el seed correctamente');
	} catch (error) {
		console.log('No se pudo ejecutar el seed', { error });
	}
})();
