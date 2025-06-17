import { getComments } from '@/actions/comments/get-comments';
import { CommentRow } from './ui/comment-row';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircleOff } from 'lucide-react';

export default async function CommentsPage() {
	const res = await getComments();
	const comments = res.comments ?? [];

	return (
		<div className='animate-fade-in'>
			<h1 className='mb-6 text-2xl font-bold'>Comentarios</h1>

			<Card className='bg-muted'>
				<CardContent className='p-0'>
					{comments.length === 0 ? (
						<div className='text-muted-foreground flex flex-col items-center justify-center gap-4 py-10 text-center'>
							<MessageCircleOff className='size-10' />
							<h2 className='text-lg font-semibold'>No hay comentarios</h2>
							<p className='text-sm'>
								Aún no se han realizado comentarios sobre los productos.
							</p>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow className='text-muted-foreground'>
									<TableHead>Usuario</TableHead>
									<TableHead>Producto</TableHead>
									<TableHead>Rating</TableHead>
									<TableHead>Comentario</TableHead>
									<TableHead>Estado</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{comments.map((comment, index) => (
									<CommentRow
										key={index}
										comment={comment}
									/>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
