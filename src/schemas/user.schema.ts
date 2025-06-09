import { z } from 'zod';

export const UserSchema = z.object({
	username: z.string().min(3, 'Username is required').max(15),
	password: z.string().min(3, 'Password is required').max(20),
});

export type UserType = z.infer<typeof UserSchema>;
