'use client';

import { Comment } from '@/interfaces/comment';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { aproveComment } from '@/actions/comments/aprove-comment';
import { toast } from 'sonner';
import { TableRow, TableCell } from '@/components/ui/table';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface Props {
	comment: Comment;
}

export const CommentRow = ({ comment }: Props) => {
	const [expanded, setExpanded] = useState(false);
	const shortText = comment.comment!.slice(0, 80);

	const { mutate: updateStatus, isPending: isUpdating } = useMutation({
		mutationFn: ({
			commentId,
			userId,
			isPending,
		}: {
			commentId: string;
			userId: string;
			isPending: boolean;
		}) => aproveComment(commentId, userId, isPending),
		onSuccess: (data) => {
			if (!data.ok) return toast.error(data.msg);
			toast.success('Estado del comentario actualizado correctamente');
		},
		onError: () => {
			toast.error('Error al actualizar el estado del comentario');
		},
	});

	const handleStatusChange = (value: string) => {
		const newStatus = value === 'true';
		updateStatus({
			commentId: comment.id,
			userId: comment.user.id,
			isPending: newStatus,
		});
	};

	return (
		<TableRow className='transition-colors hover:bg-slate-700/30'>
			<TableCell>{comment.user.username}</TableCell>
			<TableCell>{comment.product.title}</TableCell>
			<TableCell>{comment.product.averageRating ?? '—'}</TableCell>
			<TableCell className='max-w-xs'>
				<p className='text-sm text-slate-800 dark:text-slate-300'>
					{expanded || comment.comment!.length <= 80
						? comment.comment!
						: shortText + '...'}
				</p>
				{comment.comment!.length > 80 && (
					<button
						onClick={() => setExpanded(!expanded)}
						className='mt-1 text-xs text-blue-400 hover:underline'
					>
						{expanded ? 'Leer menos' : 'Leer más'}
					</button>
				)}
			</TableCell>

			<TableCell>
				<Select
					defaultValue={comment.isPending ? 'true' : 'false'}
					disabled={isUpdating}
					onValueChange={handleStatusChange}
				>
					<SelectTrigger className='bg-background text-foreground w-[140px]'>
						<SelectValue placeholder='Estado' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='true'>🕒 Pendiente</SelectItem>
						<SelectItem value='false'>✅ Aprobado</SelectItem>
					</SelectContent>
				</Select>
			</TableCell>
		</TableRow>
	);
};
