import { auth } from '@/auth.config';
import { Role } from '@/generated/prisma';

export const validateAdminOrSuperAdmin = async (
	allowedRoles: Role[] = [Role.admin, Role.superAdmin],
) => {
	const session = await auth();

	if (!session || !allowedRoles.includes(session.user.role as Role)) {
		if (allowedRoles.length === 1 && allowedRoles[0] === Role.superAdmin) {
			throw new Error('Esta acción requiere permisos de Super Admin');
		}

		throw new Error('No hay session de administrador');
	}
};
