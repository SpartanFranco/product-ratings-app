import Image from 'next/image';
import { getProductBySlug } from '@/actions/product/get-product-by-slug';
import { FormComment } from '../ui/form-comment';
import { auth } from '@/auth.config';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const res = await getProductBySlug(slug);

	if (!res.ok || !res.product) {
		return {
			title: 'Product not found',
			description: 'This product does not exist.',
		};
	}

	const product = res.product;

	return {
		title: product.title,
		description: `Read reviews and rate the product "${product.title}". Average: ${product.averageRating ?? '0.0'}`,
	};
}
export default async function ProductPage({ params }: Props) {
	const { slug } = await params;
	const res = await getProductBySlug(slug);
	const session = await auth();

	if (!res.ok) {
		notFound();
	}

	const product = res.product;

	if (!product) {
		return (
			<div className='flex min-h-screen items-center justify-center text-gray-500'>
				Loading product...
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-900/60 px-4 py-10'>
			<Card className='mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900'>
				<CardHeader className='flex items-center gap-4'>
					<Avatar className='h-12 w-12 bg-gray-300 dark:bg-gray-700'>
						<AvatarFallback>👤</AvatarFallback>
					</Avatar>
					<div>
						<h2 className='text-xl font-bold text-gray-800 dark:text-white'>
							{product.title}
						</h2>
						<p className='text-sm text-gray-500 dark:text-gray-400'>
							Published on {new Date(product.createdAt).toLocaleDateString()}
						</p>
					</div>
				</CardHeader>

				{product.image && (
					<div className='relative h-64 w-full sm:h-80 md:h-[400px]'>
						<Image
							src={product.image}
							alt={product.title}
							fill
							className='rounded-none object-cover'
							sizes='(max-width: 768px) 100vw, 600px'
							priority
						/>
					</div>
				)}

				<CardContent className='space-y-6 p-6'>
					<p className='text-sm text-gray-600 dark:text-gray-300'>
						⭐ Average: <strong>{product.averageRating ?? '0.0'}</strong> |
						Total ratings: {product.totalRatings}
					</p>

					<Separator />

					<div>
						<h3 className='mb-4 text-base font-semibold text-gray-800 dark:text-white'>
							Comments
						</h3>

						{product.comments.length === 0 ? (
							<p className='text-sm text-gray-400'>
								{session?.user ? 'Be the first to comment.' : 'No comments yet'}
							</p>
						) : (
							product.comments.map((comment, idx) => (
								<div
									key={idx}
									className='mb-6'
								>
									<div className='flex items-center gap-3'>
										<Avatar className='h-8 w-8 bg-gray-300 dark:bg-gray-700'>
											<AvatarFallback>
												{comment.user.username.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className='text-sm font-semibold text-gray-800 dark:text-gray-100'>
												{comment.user.username}
											</p>
											<p className='text-xs text-gray-400 dark:text-gray-500'>
												{new Date(comment.createdAt).toLocaleDateString()}
											</p>
										</div>
									</div>
									<p className='mt-2 text-sm text-gray-700 dark:text-gray-200'>
										{comment.comment}
									</p>
								</div>
							))
						)}
					</div>

					{session?.user && <FormComment productId={product.id} />}
				</CardContent>
			</Card>
		</div>
	);
}
