import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
	TableCell,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div className='space-y-6 p-6'>
			<div className='flex items-center gap-3'>
				<Loader2 className='text-muted-foreground size-6 animate-spin' />
				<h1 className='text-foreground text-2xl font-bold'>Loading users...</h1>
			</div>

			<Table>
				<TableHeader>
					<TableRow className='text-muted-foreground'>
						<TableHead>User</TableHead>
						<TableHead>Ratings</TableHead>
						<TableHead>Comments</TableHead>
						<TableHead>Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 5 }).map((_, index) => (
						<TableRow key={index}>
							<TableCell>
								<div className='flex items-center gap-2'>
									<Skeleton className='h-8 w-8 rounded-full' />
									<Skeleton className='h-4 w-[100px]' />
								</div>
							</TableCell>
							<TableCell>
								<Skeleton className='h-4 w-[120px]' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4 w-[40px]' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4 w-[200px]' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4 w-[60px]' />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
