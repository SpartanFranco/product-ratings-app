import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

(async () => {
	const data = [
		{
			title: 'Black shirt',
			slug: 'black-shirt',
			image: '/products/1549268-00-A_2.jpg',
		},
		{
			title: 'Socks',
			slug: 'socks',
			image: '/products/1741617-00-A_1_2000.jpg',
		},
		{
			title: 'Black shirt cyberpunk',
			slug: 'black-shirt-cyberpunk',
			image: '/products/8529336-00-A_1.jpg',
		},

		{
			title: 'Black coat',
			slug: 'black-coat',
			image: '/products/8529107-00-A_0_2000.jpg',
		},
		{
			title: 'Red shirt',
			slug: 'red-shirt',
			image: '/products/100042307_alt_2000.jpg',
		},
		{
			title: 'Black tesla shirt',
			slug: 'black-tesla-shirt',
			image: '/products/8529354-00-A_0_2000.jpg',
		},
		{
			title: 'Tesla-vest',
			slug: 'tesla-vest',
			image: '/products/1506211-00-A_0_2000.jpg',
		},
		{
			title: 'Cyberpunk quilted',
			slug: 'cyberpunk-quilted',
			image: '/products/1742694-00-A_1_2000.jpg',
		},
	];
	try {
		await Promise.all([
			await prisma.user.deleteMany(),
			await prisma.product.deleteMany(),
		]);

		await prisma.user.create({
			data: {
				username: '@geovani',
				password: bcrypt.hashSync('123456', 10),
				role: 'superAdmin',
			},
		});

		await prisma.product.createMany({
			data,
		});
		console.log('se ejecuto el seed correctamente');
	} catch (error) {
		console.log('No se pudo ejecutar el seed', { error });
	}
})();
