'use server';

import { signIn } from '@/auth.config';

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', {
			...Object.fromEntries(formData),
			redirect: false,
		});
		return 'Success';
	} catch (error) {
		return 'CredencialSignin';
	}
}

export const login = async (username: string, password: string) => {
	try {
		await signIn('credentials', { username, password, redirectTo: '/' });

		return {
			ok: true,
		};
	} catch (error) {
		console.log({ error });
	}
};
