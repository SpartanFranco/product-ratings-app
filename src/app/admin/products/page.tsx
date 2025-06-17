import { getProducts } from '@/actions/product/get-products';
import { PackageX } from 'lucide-react';
import Image from 'next/image';
import { ProductDeleteButton } from '../../../components/admin-components/product-delete-button';
import { DynamicPagination } from '@/components/pagination/dinamyc-pagination';
import { ProductDialogForm } from '@/components/admin-components/product-dialog-form';

interface Props {
	searchParams: {
		page?: string;
	};
}

export default async function ProductsAdminPage({ searchParams }: Props) {
	const currentPage = Number(searchParams?.page ?? 1);
	const totalPages = 1;
	const { products } = await getProducts();

	return (
		<div className='animate-fade-in'>
			<section className='mb-6 flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Productos</h1>
				{products.length > 1 && <ProductDialogForm mode='create' />}
			</section>

			{products.length === 0 ? (
				<div className='border-muted text-muted-foreground flex flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center'>
					<PackageX className='mb-4 size-10' />
					<h2 className='mb-2 text-lg font-semibold'>
						No hay productos disponibles
					</h2>
					<p className='mb-4 text-sm'>Comienza creando tu primer producto.</p>
					<ProductDialogForm mode='create' />
				</div>
			) : (
				<div className='overflow-x-auto rounded-2xl shadow-lg'>
					<table className='bg-background min-w-full rounded-2xl text-sm'>
						<thead>
							<tr className='border-border text-muted-foreground border-b text-left uppercase'>
								<th className='px-6 py-3'>Título</th>
								<th className='px-6 py-3'>Imagen</th>
								<th className='px-6 py-3'>Rating</th>
								<th className='px-6 py-3'>Comentarios</th>
								<th className='px-6 py-3'>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{products.map((p) => (
								<tr
									key={p.id}
									className='border-border hover:bg-muted border-b transition-colors'
								>
									<td className='px-6 py-4 font-semibold'>{p.title}</td>
									<td className='px-6 py-4'>
										<Image
											src={p.image ?? '/placeholder.jpg'}
											width={50}
											height={50}
											alt={p.slug}
											className='rounded-md object-cover'
										/>
									</td>
									<td className='px-6 py-4'>
										{p.averageRating?.toFixed(1) ?? '0.0'}
									</td>
									<td className='px-6 py-4'>{p.countComments}</td>
									<td className='px-6 py-4'>
										<div className='flex items-center gap-2'>
											<ProductDialogForm
												mode='edit'
												product={p}
											/>

											<ProductDeleteButton productId={p.id} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{totalPages > 1 && (
				<DynamicPagination
					currentPage={currentPage}
					totalPages={1}
				/>
			)}
		</div>
	);
}
