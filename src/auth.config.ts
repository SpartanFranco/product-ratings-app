import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './lib/prisma';
import bcrypt from 'bcrypt';
import { UserSchema } from './schemas/user.schema';

export const authConfig: NextAuthConfig = {
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/new-account',
	},

	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;
			const isOnProtectedPage = nextUrl.pathname.startsWith('/dashboard'); // más específico

			if (isOnProtectedPage && !isLoggedIn) {
				return false;
			}

			// No redirigir desde aquí. Solo dejar pasar o no.
			return true;
		},
		jwt: ({ token, user }) => {
			if (user) {
				token.data = user;
			}
			return token;
		},
		session: ({ session, token, user }) => {
			// console.log({ session, token, user });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			session.user = token.data as any;
			return session;
		},
	},

	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = UserSchema.safeParse(credentials);

				if (!parsedCredentials.success) return null;

				const { username, password } = parsedCredentials.data;
				console.log(parsedCredentials.data);

				//Buscar email
				const user = await prisma.user.findUnique({
					where: { username: username.toLowerCase() },
				});
				if (!user) return null;
				//comparar contraseñas
				if (!bcrypt.compareSync(password, user.password)) return null;

				//regresar el usuario
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password: _, ...rest } = user;

				return rest;
			},
		}),
	],
	secret: process.env.AUTH_SECRET,
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
