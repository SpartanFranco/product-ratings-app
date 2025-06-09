'use client';

import { SkeletonCardImage } from './skeleton-card-image';

export const CardsGridSkeleton = () => {
	return (
		<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
			{Array.from({ length: 12 }).map((_, i) => (
				<SkeletonCardImage key={i} />
			))}
		</div>
	);
};
