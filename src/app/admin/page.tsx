import {
	ShieldCheck,
	Users,
	Package,
	MessageCircle,
	LucideProps,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { getDataForCards } from '@/actions/admin-data/getDataForCards';

const buttons = [
	{ href: '/admin/users', name: 'users' },
	{ href: '/admin/products', name: 'products' },
	{ href: '/admin/comments', name: 'comments' },
];
interface Card {
	title: string;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>;
	count: number;
	description: string;
}
export default async function AdminPage() {
	const data = await getDataForCards();
	const cards: Card[] = [
		{
			title: 'Total users',
			icon: Users,
			count: data?.users ?? 0,
			description: '+5% from last week',
		},
		{
			title: 'Products',
			icon: Package,
			count: data?.products ?? 0,
			description: '12 new this week',
		},
		{
			title: 'Pending Comments',
			icon: MessageCircle,
			count: data?.messages ?? 0,
			description: 'Need moderation',
		},
	];
	return (
		<>
			{/* Header */}
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

			{/* Quick Actions */}
			<div className='mb-12 flex justify-center gap-4'>
				{buttons.map((b, i) => (
					<Button
						key={i}
						size='lg'
						className='rounded-xl shadow'
					>
						<Link href={b.href}>
							Manage <span>{b.name}</span>
						</Link>
					</Button>
				))}
			</div>

			{/* Stats Cards */}
			<div className='grid gap-6 md:grid-cols-3'>
				{cards.map((c) => (
					<div key={c.title}>
						<Card className='rounded-2xl shadow-md transition hover:shadow-xl'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>{c.title}</CardTitle>
								<c.icon className='text-muted-foreground h-5 w-5' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{c.count}</div>
								<p className='text-muted-foreground text-xs'>{c.description}</p>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</>
	);
}
