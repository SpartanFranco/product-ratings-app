import { FeedbackType } from '@/generated/prisma';

export interface UserResponse {
	totalRatings: number;
	totalComments: number;
	Feedback: {
		type: FeedbackType;
	}[];
	id: string;
	username: string;
	password: string;
	role: AdminOrUser;
	createdAt: Date;
	updatedAt: Date | null;
}

export type AdminOrUser = 'admin' | 'user';
