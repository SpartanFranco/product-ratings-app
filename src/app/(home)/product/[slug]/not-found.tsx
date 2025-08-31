import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center px-4 text-center'>
			<h1 className='text-destructive mb-4 text-6xl font-bold'>404</h1>
			<p className='text-muted-foreground mb-6 text-lg'>Product not found.</p>
			<Link href='/'>
				<Button variant='outline'>Back to top</Button>
			</Link>
		</div>
	);
}
