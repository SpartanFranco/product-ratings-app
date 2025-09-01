import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const buttons = [
	{ href: '/admin/users', name: 'users' },
	{ href: '/admin/products', name: 'products' },
	{ href: '/admin/comments', name: 'comments' },
];
export default function Loading() {
	return (
		<div className='animate-fade-in'>
			{/* Header Skeleton */}
			<div className='mb-10 text-center'>
				<div className='from-primary to-primary/70 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr shadow-lg'>
					<ShieldCheck className='h-8 w-8 text-white' />
				</div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Welcome back, Admin 👋
				</h1>
				<p className='text-muted-foreground mt-2 text-lg'>
					Manage your platform efficiently with the tools below.
				</p>
			</div>

			{/* Quick Actions Skeleton */}
			<div className='mb-12 flex justify-center gap-4'>
				{buttons.map((b, i) => (
					<Button
						key={i}
						size='lg'
						className='rounded-xl shadow'
						asChild
					>
						<Link href={b.href}>
							Manage <span>{b.name}</span>
						</Link>
					</Button>
				))}
			</div>

			{/* Stats Cards Skeleton */}
			<div className='grid gap-6 md:grid-cols-3'>
				{[...Array(3)].map((_, i) => (
					<Card
						key={i}
						className='rounded-2xl shadow-md'
					>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<Skeleton className='h-5 w-24 rounded-md' />
							<Skeleton className='h-5 w-5 rounded-md' />
						</CardHeader>
						<CardContent>
							<Skeleton className='mb-2 h-7 w-16 rounded-md' />
							<Skeleton className='h-4 w-32 rounded-md' />
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
