import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div className='p-6'>
			<div className='mb-6 flex items-center justify-between'>
				<section className='flex gap-4'>
					<Loader2 className='text-muted-foreground size-6 animate-spin' />
					<h1 className='text-2xl font-bold'>Loading products...</h1>
				</section>
				<Skeleton className='h-10 w-[100px] rounded-md' />
			</div>
			<div className='overflow-x-auto rounded-2xl shadow-lg'>
				<table className='min-w-full text-sm'>
					<thead>
						<tr className='text-muted-foreground border-b text-left uppercase'>
							<th className='px-6 py-3'>Title</th>
							<th className='px-6 py-3'>Image</th>
							<th className='px-6 py-3'>Rating</th>
							<th className='px-6 py-3'>Comments</th>
							<th className='px-6 py-3'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 8 }).map((_, i) => (
							<tr
								key={i}
								className='border-b'
							>
								<td className='px-6 py-4'>
									<Skeleton className='h-4 w-[150px]' />
								</td>
								<td className='px-6 py-4'>
									<Skeleton className='h-10 w-10 rounded-md' />
								</td>
								<td className='px-6 py-4'>
									<Skeleton className='h-4 w-[40px]' />
								</td>
								<td className='px-6 py-4'>
									<Skeleton className='h-4 w-[30px]' />
								</td>
								<td className='px-6 py-4'>
									<div className='flex gap-2'>
										<Skeleton className='h-8 w-8 rounded' />
										<Skeleton className='h-8 w-8 rounded' />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
