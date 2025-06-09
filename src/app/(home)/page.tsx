import { CardsGrid } from '@/components/home/cards-grid';
import { CardsGridSkeleton } from '@/components/home/cards-grid-skeleton';
import { Suspense } from 'react';

export default function HomePage() {
	return (
		<div className='p-6'>
			<Suspense fallback={<CardsGridSkeleton />}>
				<CardsGrid />
			</Suspense>
		</div>
	);
}
