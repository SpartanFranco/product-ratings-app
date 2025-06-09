'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ProductSchema, ProductType } from '@/schemas/product.schema';
import { createOrUpdateProduct } from '@/actions/product/create-or-update-product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';
import { ImageUploadField } from './image-uploaded-field';

interface Props {
	product?:
		| {
				id: string;
				slug: string;
				title: string;
				image: string | null;
				public_id: string | null;
		  }
		| undefined;
}

export const ProductForm = ({ product }: Props) => {
	const isEditMode = !!product?.slug;
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductType>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			title: product?.title ?? '',
			slug: product?.slug ?? '',
		},
	});

	const [imageRes, setImageRes] = useState({
		url: product?.image ?? '',
		public_id: product?.public_id ?? '',
	});
	const [imageError, setImageError] = useState<string | null>(null);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (data: ProductType) => {
			const res = await createOrUpdateProduct({
				productId: product?.id,
				title: data.title,
				slug: data.slug,
				image: imageRes.url,
				public_id: imageRes.public_id,
			});
			if (!res?.ok) throw new Error(res?.msg || 'Algo pasó en el servidor');
			return res;
		},
	});

	const onSubmit = (data: ProductType) => {
		if (!imageRes.url) {
			setImageError('Debes subir una imagen primero');
			return;
		}
		toast.promise(
			mutateAsync(data).then((res) => {
				if (!isEditMode) {
					reset();
				}
				return res;
			}),
			{
				loading: 'Enviando datos...',
				success: (data) => data.msg,
				error: (error) => error.message || 'Algo pasó en el servidor',
			},
		);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl sm:px-10 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900'
		>
			<h2 className='mb-6 text-center text-3xl font-bold text-black sm:text-4xl dark:text-white'>
				{isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
			</h2>

			<div className='grid gap-6'>
				<div>
					<label className='mb-1 block text-sm font-semibold text-gray-800 dark:text-slate-200'>
						Título
					</label>
					<Input
						type='text'
						{...register('title')}
						className='border-gray-300 bg-gray-100 text-black placeholder:text-gray-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400'
						placeholder='Ej: Camiseta Negra'
					/>
					{errors.title && (
						<p className='mt-1 text-sm text-red-500 dark:text-red-400'>
							{errors.title.message}
						</p>
					)}
				</div>

				<div>
					<label className='mb-1 block text-sm font-semibold text-gray-800 dark:text-slate-200'>
						Slug
					</label>
					<Input
						type='text'
						{...register('slug')}
						className='border-gray-300 bg-gray-100 text-black placeholder:text-gray-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400'
						placeholder='Ej: camiseta-negra'
					/>
					{errors.slug && (
						<p className='mt-1 text-sm text-red-500 dark:text-red-400'>
							{errors.slug.message}
						</p>
					)}
				</div>

				<div>
					<ImageUploadField
						value={imageRes}
						onChange={(val) => setImageRes(val)}
						onError={(msg) => setImageError(msg)}
						resetError={() => setImageError(null)}
					/>
					{imageError && (
						<p className='mt-2 text-sm text-red-500 dark:text-red-400'>
							{imageError}
						</p>
					)}
				</div>

				<Button
					type='submit'
					disabled={isPending}
					className='w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition duration-200 ease-in-out hover:bg-blue-700'
				>
					{isPending
						? isEditMode
							? 'Actualizando...'
							: 'Creando...'
						: isEditMode
							? 'Actualizar Producto'
							: 'Crear Producto'}
				</Button>
			</div>
		</form>
	);
};
