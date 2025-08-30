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
			const isOnProtectedPage = nextUrl.pathname.startsWith('/dashboard');

			if (isOnProtectedPage && !isLoggedIn) {
				return false;
			}

			return true;
		},
		jwt: ({ token, user }) => {
			if (user) {
				token.data = user;
			}
			return token;
		},
		session: ({ session, token, user }) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			session.user = token.data as any;
			return session;
		},
	},

	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				username: {
					label: 'username',
					type: 'tex',
				},
				password: {
					label: 'password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				const parsedCredentials = UserSchema.safeParse(credentials);

				if (!parsedCredentials.success) return null;

				const { username, password } = parsedCredentials.data;

				const user = await prisma.user.findUnique({
					where: { username },
				});

				if (!user) return null;

				const isValidPassword = await bcrypt.compare(password, user.password);
				if (!isValidPassword) return null;

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password: _, ...rest } = user;

				return rest;
			},
		}),
	],
	secret: process.env.AUTH_SECRET,
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
