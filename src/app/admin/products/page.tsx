import { getProducts } from '@/actions/product/get-products';
import { Button } from '@/components/ui/button';
import { PlusCircle, PencilIcon, PackageX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductDeleteButton } from './ui/product-delete-button';

export default async function ProductsAdminPage() {
	const products = await getProducts();

	return (
		<div className='bg-background text-foreground p-6'>
			<section className='mb-6 flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Productos</h1>
				<Button
					asChild
					className='bg-green-600 text-white hover:bg-green-700'
				>
					<Link
						href='/admin/product/new'
						className='flex items-center gap-2'
					>
						<PlusCircle className='size-5' />
						Agregar
					</Link>
				</Button>
			</section>

			{products.length === 0 ? (
				<div className='border-muted text-muted-foreground flex flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center'>
					<PackageX className='mb-4 size-10' />
					<h2 className='mb-2 text-lg font-semibold'>
						No hay productos disponibles
					</h2>
					<p className='mb-4 text-sm'>Comienza creando tu primer producto.</p>
					<Button asChild>
						<Link href='/admin/product/new'>
							<PlusCircle className='mr-2 size-4' />
							Agregar producto
						</Link>
					</Button>
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
											width={40}
											height={40}
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
											<Button
												asChild
												size='icon'
												className='bg-yellow-500 hover:bg-yellow-600'
											>
												<Link href={`/admin/product/${p.slug}`}>
													<PencilIcon className='size-4 text-white' />
												</Link>
											</Button>

											<ProductDeleteButton productId={p.id} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
