import { getProducts } from '@/actions/product/get-products';
import { CardImage } from '@/components/home/card-image';

export const CardsGrid = async () => {
	const { products } = await getProducts();

	return (
		<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
			{products.map((p) => (
				<CardImage
					key={p.id}
					product={p}
				/>
			))}
		</div>
	);
};
