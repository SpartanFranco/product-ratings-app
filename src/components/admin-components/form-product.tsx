'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUploadField } from './image-uploaded-field';
import { useProductForm } from '@/hooks/use-product-form';

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
	const {
		isEditMode,
		register,
		handleSubmit,
		errors,
		onSubmit,
		isPending,
		imageRes,
		setImageRes,
		imageError,
		setImageError,
	} = useProductForm(product);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full rounded-2xl bg-white px-4 py-8 sm:px-10 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900'
		>
			<h2 className='mb-6 text-center text-2xl font-bold text-black sm:text-3xl md:text-4xl dark:text-white'>
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
					className='w-full rounded-xl bg-blue-600 py-3 text-base font-semibold text-white transition duration-200 ease-in-out hover:bg-blue-700 sm:text-lg'
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
