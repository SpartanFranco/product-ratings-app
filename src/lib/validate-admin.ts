import { auth } from '@/auth.config';

export const validateAdmin = async () => {
	const session = await auth();

	if (!session || session.user.role !== 'admin') {
		throw new Error('No hay session de administrador');
	}
};
