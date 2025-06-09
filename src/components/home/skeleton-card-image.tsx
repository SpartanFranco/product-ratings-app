import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCardImage = () => {
	return (
		<Card className='bg-background text-foreground w-full max-w-xl border shadow'>
			<CardHeader>
				<div className='relative h-[320px] w-full overflow-hidden rounded-xl'>
					<Skeleton className='h-full w-full rounded-xl' />
				</div>
			</CardHeader>

			<CardContent className='space-y-6'>
				<Skeleton className='mx-auto h-6 w-1/2 rounded' />

				<div className='flex justify-center gap-4'>
					<Skeleton className='h-6 w-6 rounded-full' />
					<Skeleton className='h-6 w-6 rounded-full' />
					<Skeleton className='h-6 w-10 rounded' />
				</div>
			</CardContent>
		</Card>
	);
};
