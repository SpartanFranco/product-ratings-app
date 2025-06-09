import { z } from 'zod';

export const ProductSchema = z.object({
	title: z.string().min(1, 'El título es obligatorio'),
	slug: z.string().min(1, 'El slug es obligatorio'),
	image: z
		.string()
		.url({ message: 'La imagen debe ser una URL válida' })
		.optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
