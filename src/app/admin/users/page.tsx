import { getUsers } from '@/actions/users/get-users';
import { Card, CardContent } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { UserXIcon } from 'lucide-react';

import { UserRow } from './ui/user-row';

export default async function UsersPage() {
	const res = await getUsers();
	const users = res.users ?? [];

	return (
		<div className='animate-fade-in'>
			<h1 className='mb-6 text-2xl font-bold'>Usuarios</h1>

			<Card className='bg-muted'>
				<CardContent className='p-0'>
					{users.length === 0 ? (
						<div className='text-muted-foreground flex flex-col items-center justify-center gap-4 py-10 text-center'>
							<UserXIcon className='size-10' />
							<h2 className='text-lg font-semibold'>No hay Usuarios</h2>
							<p className='text-sm'>Aún no se han creado cuentas.</p>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow className='text-muted-foreground'>
									<TableHead>Usuario</TableHead>
									<TableHead>Calificaciones</TableHead>
									<TableHead>Comentarios</TableHead>
									<TableHead>Role</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user, index) => (
									<UserRow
										key={index}
										user={user}
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
