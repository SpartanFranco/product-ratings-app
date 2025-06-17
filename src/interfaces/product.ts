export interface Product {
	id: string;
	title: string;
	slug: string;
	image: string | null;
	averageRating: number | null;
	totalRatings: number;
	userRating: number | null;
	countComments: number;
}
