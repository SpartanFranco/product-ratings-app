import { Role } from '@/generated/prisma';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			username: string;
			role: Role;
			image: string;
		} & DefaultSession['user'];
	}
}
