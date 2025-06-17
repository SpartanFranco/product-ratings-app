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
			loading: 'Eliminando producto...',
			success: (data) => {
				setOpen(false);
				router.refresh();
				return data.msg;
			},
			error: (error) => error.message || 'Error al eliminar',
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
					Eliminar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
					<AlertDialogDescription>
						Esto eliminará permanentemente el producto de la base de datos.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
