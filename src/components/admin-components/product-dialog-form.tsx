'use client';

import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { ProductForm } from './form-product';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { useEffect, useState } from 'react';
import { deleteTempImageIfNeeded } from '@/lib/deleteTempImageIfNeed';

interface Props {
	product?: {
		id: string;
		slug: string;
		title: string;
		image: string | null;
		public_id: string | null;
	};
	mode: 'create' | 'edit';
}

export const ProductDialogForm = ({ product, mode }: Props) => {
	const isEdit = mode === 'edit';

	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleUnload = async () => {
			await deleteTempImageIfNeeded(product?.public_id ?? undefined);
		};

		window.addEventListener('beforeunload', handleUnload);

		return () => {
			window.removeEventListener('beforeunload', handleUnload);
		};
	}, []);

	const handleOpenChange = async (isOpen: boolean) => {
		if (!isOpen) {
			await deleteTempImageIfNeeded(product?.public_id ?? undefined);
		}

		setOpen(isOpen);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={handleOpenChange}
		>
			<DialogTrigger asChild>
				<Button
					size='sm'
					className={`flex items-center gap-1 ${
						isEdit
							? 'bg-yellow-400 text-black hover:bg-yellow-500'
							: 'bg-green-500 text-white hover:bg-green-600'
					}`}
				>
					{isEdit ? (
						<>
							<Pencil className='h-4 w-4' />
							Edit
						</>
					) : (
						<>
							<Plus className='h-4 w-4' />
							Create Product
						</>
					)}
				</Button>
			</DialogTrigger>

			<DialogContent className='max-h-screen w-full overflow-y-auto rounded-xl bg-white p-6 sm:max-w-2xl dark:bg-slate-800'>
				<DialogHeader>
					<DialogTitle className='text-lg font-bold text-gray-800 sm:text-xl dark:text-white'>
						{isEdit ? `Edit: ${product?.title ?? ''}` : 'Create Product'}
					</DialogTitle>
				</DialogHeader>
				<ProductForm product={product} />
			</DialogContent>
		</Dialog>
	);
};
