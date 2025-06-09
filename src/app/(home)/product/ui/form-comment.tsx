'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { sendComment } from '@/actions/comments/send-comment';
import { toast } from 'sonner';

import {
	Form,
	FormField,
	FormControl,
	FormMessage,
	FormLabel,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const commentSchema = z.object({
	text: z
		.string()
		.min(5, 'El comentario debe tener al menos 5 caracteres')
		.max(500, 'El comentario no debe superar los 500 caracteres'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface Props {
	productId: string;
}

export const FormComment = ({ productId }: Props) => {
	const form = useForm<CommentFormData>({
		resolver: zodResolver(commentSchema),
		defaultValues: { text: '' },
	});

	const mutation = useMutation({
		mutationFn: (data: CommentFormData) => sendComment(productId, data.text),
		onSuccess: (res) => {
			if (res.ok) {
				toast.success(res.msg || 'Comentario enviado correctamente');
				form.reset();
			} else {
				toast.error(res.msg || 'No se pudo enviar el comentario');
			}
		},
		onError: () => {
			toast.error('Ocurrió un error al enviar el comentario');
		},
	});

	const onSubmit = (data: CommentFormData) => {
		mutation.mutate(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mt-6 space-y-4'
			>
				<FormField
					control={form.control}
					name='text'
					render={({ field }) => (
						<div>
							<FormLabel>Comentario</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Escribe tu comentario...'
									className='min-h-[100px] bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100'
								/>
							</FormControl>
							<FormMessage />
						</div>
					)}
				/>

				<Button
					type='submit'
					disabled={mutation.isPending}
					className='w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
				>
					{mutation.isPending ? 'Enviando...' : 'Enviar comentario'}
				</Button>
			</form>
		</Form>
	);
};
