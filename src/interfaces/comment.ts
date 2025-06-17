export interface Comment {
	user: {
		id: string;
		username: string;
	};
	product: {
		title: string;
		image: string | null;
		averageRating: number | null;
	};
	id: string;
	comment: string | null;
	isPending: boolean | null;
	createdAt: Date;
}
