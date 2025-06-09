'use client';

import { logout } from '@/actions/auth/logout';
import { Button } from '../ui/button';

export const ButtonLogout = () => {
	return (
		<Button
			onClick={logout}
			className='w-full bg-red-600 hover:bg-red-700'
		>
			Logout
		</Button>
	);
};
