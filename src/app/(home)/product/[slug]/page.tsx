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
		<div className='h-full w-full bg-gray-900/60'>
			<div className='flex h-full flex-col lg:flex-row'>
				{/* Imagen ocupa el lado izquierdo completo */}
				{product.image && (
					<div className='relative h-96 w-full lg:h-full lg:w-1/2'>
						<Image
							src={product.image}
							alt={product.title}
							fill
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 50vw'
							priority
						/>
					</div>
				)}

				{/* Lado derecho: contenido minimalista */}
				<div className='flex w-full flex-col justify-start gap-6 p-8 lg:w-1/2 lg:p-16'>
					{/* Título y avatar */}
					<div className='flex items-center justify-between'>
						<div className='flex flex-col'>
							<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
								{product.title}
							</h1>
							<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
								Published on {new Date(product.createdAt).toLocaleDateString()}
							</p>
						</div>
						<Avatar className='h-12 w-12 bg-gray-300 dark:bg-gray-700'>
							<AvatarFallback>👤</AvatarFallback>
						</Avatar>
					</div>

					{/* Ratings */}
					<p className='text-sm text-gray-600 dark:text-gray-300'>
						⭐ Average: <strong>{product.averageRating ?? '0.0'}</strong> |
						Total ratings: {product.totalRatings}
					</p>

					<Separator className='border-gray-200 dark:border-gray-700' />

					{/* Comments */}
					<div className='space-y-4 overflow-y-auto'>
						<h3 className='text-lg font-medium text-gray-900 dark:text-white'>
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
									className='space-y-1'
								>
									<div className='flex items-center gap-3'>
										<Avatar className='h-8 w-8 bg-gray-300 dark:bg-gray-700'>
											<AvatarFallback>
												{comment.user.username.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className='text-sm font-semibold text-gray-900 dark:text-white'>
												{comment.user.username}
											</p>
											<p className='text-xs text-gray-400 dark:text-gray-500'>
												{new Date(comment.createdAt).toLocaleDateString()}
											</p>
										</div>
									</div>
									<p className='text-sm text-gray-700 dark:text-gray-200'>
										{comment.comment}
									</p>
								</div>
							))
						)}
					</div>

					{/* Formulario */}
					{session?.user && <FormComment productId={product.id} />}
				</div>
			</div>
		</div>
	);
}
