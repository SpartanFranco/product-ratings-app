import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ProductSchema, ProductType } from '@/schemas/product.schema';
import { createOrUpdateProduct } from '@/actions/product/create-or-update-product';
import { useTempImageCleaner } from './use-temp-image-cleanner';

export const useProductForm = (product?: {
	id: string;
	slug: string;
	title: string;
	image: string | null;
	public_id: string | null;
}) => {
	const isEditMode = !!product?.slug;
	const router = useRouter();

	const [imageRes, setImageRes] = useState({
		url: product?.image || '',
		public_id: product?.public_id || '',
	});
	const [imageError, setImageError] = useState<string | null>(null);

	useTempImageCleaner(true);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductType>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			title: product?.title || '',
			slug: product?.slug || '',
		},
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (data: ProductType) => {
			const res = await createOrUpdateProduct({
				productId: product?.id,
				title: data.title,
				slug: data.slug,
				image: imageRes.url,
				public_id: imageRes.public_id,
			});
			if (!res?.ok) throw new Error(res?.msg || 'Error en el servidor');
			return res;
		},
	});

	const isProductDataEqual = (
		a: ProductType & { image: string; public_id: string },
		b: typeof product,
	) => {
		if (!b) return false;
		return (
			a.title.trim() === b.title?.trim() &&
			a.slug.trim() === b.slug?.trim() &&
			a.image === b.image &&
			a.public_id === b.public_id
		);
	};

	const onSubmit = async (data: ProductType) => {
		if (!imageRes.url) {
			setImageError('Debes subir una imagen primero');
			return;
		}

		const combinedData = {
			...data,
			image: imageRes.url,
			public_id: imageRes.public_id,
		};

		if (isEditMode && product && isProductDataEqual(combinedData, product)) {
			toast.info('No se detectaron cambios en el producto.');
			return;
		}

		toast.promise(
			mutateAsync(data).then((res) => {
				reset();
				setImageRes({ url: '', public_id: '' });

				localStorage.removeItem('temp_uploaded_public_id');
				router.refresh();
				return res;
			}),
			{
				loading: 'Enviando datos...',
				success: (data) => data.msg,
				error: (error) => error.message || 'Algo pasó en el servidor',
			},
		);
	};

	return {
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
	};
};
