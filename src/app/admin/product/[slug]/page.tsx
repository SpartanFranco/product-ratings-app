import { notFound, redirect } from 'next/navigation';
import { ProductForm } from '../ui/form-product';
import { getProductForEdit } from '@/actions/product/get-product-for-edit';

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function ProductBySlugPage({ params }: Props) {
	const { slug } = await params;

	if (slug === 'new') {
		<div className='flex items-center'>
			<ProductForm />
		</div>;
	}

	const product = await getProductForEdit(slug);

	if (!product) {
		notFound();
	}
	return (
		<div className='flex items-center'>
			<ProductForm product={product.product} />
		</div>
	);
}
