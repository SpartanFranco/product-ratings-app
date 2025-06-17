'use client';

import { sendRatingProduct } from '@/actions/product/send-rating-product';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
	productId: string;
	totalStars?: number;
	rating: number | null;
}

export const Rating = ({
	productId,
	totalStars = 5,

	rating,
}: Props) => {
	const [hovered, setHovered] = useState<number | null>(null);
	const [selected, setSelected] = useState<number>(rating ?? 0);
	const router = useRouter();
	const { mutate, isPending } = useMutation({
		mutationFn: async (rating: number) => {
			const res = await sendRatingProduct(productId, rating);
			if (!res.ok) throw new Error(res.msg);
			return res;
		},
		onSuccess: (data, rating) => {
			setSelected(rating);
			toast.success(data.msg || 'Calificación enviada correctamente');
			router.refresh();
		},
		onError: (error) => {
			setSelected(0);
			toast.warning(error.message || 'No hay sesión de usuario', {
				action: {
					label: 'Iniciar sesión',
					onClick: () => router.push('/auth/login'),
				},
			});
		},
	});
	const handleMouseEnter = (index: number) => () => setHovered(index);
	const handleMouseLeave = () => setHovered(null);
	const handleClick = (index: number) => () => mutate(index + 1);
	return (
		<div
			className={cn(
				'flex cursor-pointer gap-1',
				isPending && 'pointer-events-none opacity-50',
			)}
		>
			{Array.from({ length: totalStars }, (_, i) => (
				<div
					key={i}
					onMouseEnter={handleMouseEnter(i + 1)}
					onMouseLeave={handleMouseLeave}
					onClick={handleClick(i)}
				>
					<Star
						className={cn(
							'size-6 transition-colors duration-200',
							(hovered ?? selected) > i
								? 'fill-yellow-400 text-yellow-400'
								: 'text-muted-foreground',
						)}
					/>
				</div>
			))}
		</div>
	);
};
