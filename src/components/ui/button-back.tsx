'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { usePathname, useRouter } from 'next/navigation';

export const ButtonBack = () => {
	const pathname = usePathname();
	const router = useRouter();
	if (pathname !== '/')
		return (
			<Button
				variant='outline'
				onClick={() => router.back()}
				className='text-white hover:text-slate-950'
			>
				<ArrowLeft className='size-6' />
			</Button>
		);
};
