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
		.min(5, 'Comment must be at least 5 characters')
		.max(500, 'Comment must not exceed 500 characters'),
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
				toast.success(res.msg || 'Comment submitted successfully');
				form.reset();
			} else {
				toast.error(res.msg || 'Failed to submit comment');
			}
		},
		onError: () => {
			toast.error('An error occurred while submitting the comment');
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
							<FormLabel>Comment</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Write your comment...'
									className='mt-2 min-h-[100px] bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100'
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
					{mutation.isPending ? 'Submitting...' : 'Submit Comment'}
				</Button>
			</form>
		</Form>
	);
};
