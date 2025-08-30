'use client';

import { useState } from 'react';
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from '@/actions/product/delete-product';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
	productId: string;
}

export const ProductDeleteButton = ({ productId }: Props) => {
	const [open, setOpen] = useState(false);

	const { mutateAsync, isSuccess } = useMutation({
		mutationFn: async (id: string) => {
			const res = await deleteProduct(id);
			if (!res.ok) throw new Error(res.msg);
			return res;
		},
		mutationKey: ['delete-product'],
	});

	const router = useRouter();

	const handleDelete = () => {
		toast.promise(mutateAsync(productId), {
			loading: 'Removing product...',
			success: (data) => {
				setOpen(false);
				router.refresh();
				return data.msg;
			},
			error: (error) => error.message || 'Delete error',
		});
	};

	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
			<AlertDialogTrigger asChild>
				<Button
					variant='destructive'
					size='sm'
				>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete product?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently remove the product from the database.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
