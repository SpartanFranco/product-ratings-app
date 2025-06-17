import Image from 'next/image';

import { Product } from '@/interfaces/product';
import { MessageSquare, Star } from 'lucide-react';
import { MessageComponent } from './message-component';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Rating } from './rating';

interface Props {
	product: Product;
}

export const CardImage = ({ product }: Props) => {
	const { id, image, title, slug, averageRating, userRating, countComments } =
		product;

	return (
		<div className='animate-in fade-in-0 flex items-center justify-center duration-75'>
			<Card className='bg-background text-foreground w-full max-w-xl border shadow-lg'>
				<CardHeader>
					<div className='relative h-[320px] w-full overflow-hidden rounded-xl'>
						<Image
							src={image ?? '/placeholder.jpg'}
							alt={slug}
							fill
							className='object-cover'
							sizes='100vw'
							priority
						/>
					</div>
				</CardHeader>

				<CardContent className='space-y-6'>
					<h2 className='text-center text-xl font-bold'>{title}</h2>

					<div className='flex flex-wrap items-center justify-center gap-4'>
						<Rating
							productId={id}
							rating={userRating}
						/>

						<MessageComponent
							icon={MessageSquare}
							count={countComments}
							slug={slug}
						/>

						<div className='flex items-center gap-1 text-sm text-yellow-500'>
							<Star className='size-4 fill-yellow-400' />
							<p className='font-bold'>{averageRating?.toFixed(1) ?? '0.0'}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
