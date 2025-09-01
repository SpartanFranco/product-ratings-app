import { Skeleton } from '@/components/ui/skeleton';
import { Avatar } from '@/components/ui/avatar';

export default function ProductPageLoading() {
	return (
		<div className='h-full w-full bg-gray-50 dark:bg-gray-900'>
			<div className='flex h-full flex-col lg:flex-row'>
				{/* Imagen placeholder izquierda */}
				<div className='hidden lg:block lg:w-1/2'>
					<Skeleton className='h-full w-full' />
				</div>

				{/* Contenido derecho */}
				<div className='flex w-full flex-col justify-start gap-6 p-8 lg:w-1/2 lg:p-16'>
					{/* Título y avatar */}
					<div className='flex items-center justify-between'>
						<div className='flex flex-col gap-2'>
							<Skeleton className='h-8 w-64' />
							<Skeleton className='h-4 w-40' />
						</div>
						<Avatar>
							<Skeleton className='h-12 w-12 rounded-full' />
						</Avatar>
					</div>

					{/* Ratings placeholder */}
					<Skeleton className='h-4 w-32' />

					{/* Separator */}
					<div className='my-4 border-t border-gray-300 dark:border-gray-700' />

					{/* Comments placeholder */}
					<div className='space-y-4'>
						<Skeleton className='h-5 w-40' />
						{[...Array(3)].map((_, idx) => (
							<div
								key={idx}
								className='space-y-2'
							>
								<div className='flex items-center gap-3'>
									<Avatar>
										<Skeleton className='h-8 w-8 rounded-full' />
									</Avatar>
									<div className='flex flex-col gap-1'>
										<Skeleton className='h-3 w-24' />
										<Skeleton className='h-2 w-16' />
									</div>
								</div>
								<Skeleton className='h-4 w-full' />
							</div>
						))}
					</div>

					{/* Formulario placeholder */}
					<div className='mt-6 space-y-2'>
						<Skeleton className='h-10 w-full rounded-md' />
						<Skeleton className='h-10 w-1/2 rounded-md' />
					</div>
				</div>
			</div>
		</div>
	);
}
