'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	session: Session | null;
}

export const UserDropdown = ({ session }: Props) => {
	const pathname = usePathname();

	const { username, email, role, image } = session?.user ?? {};
	const isAdmin = role === 'admin';

	const handleSignOut = () => {
		const isInAdmin = pathname?.startsWith('/admin');
		signOut({
			...(isInAdmin && { callbackUrl: '/' }),
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='hover:bg-muted flex max-w-full cursor-pointer items-center gap-3 rounded-md p-1 transition'>
					<Avatar className='size-8'>
						<AvatarImage
							src={image}
							alt={username}
						/>
						<AvatarFallback>
							{username ? username.slice(0, 2).toUpperCase() : 'IN'}
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col overflow-hidden text-left'>
						<span className='text-foreground max-w-[160px] truncate text-sm font-medium'>
							{username}
						</span>
						{email && (
							<span className='text-muted-foreground max-w-[160px] truncate text-xs'>
								{email}
							</span>
						)}
					</div>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='w-56'
				align='end'
			>
				<DropdownMenuLabel className='truncate'>{username}</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href='/profile'>Perfil</Link>
				</DropdownMenuItem>

				{isAdmin &&
					(pathname === '/admin' ? (
						<DropdownMenuItem asChild>
							<Link href='/'>Ir a App-Rating</Link>
						</DropdownMenuItem>
					) : (
						<DropdownMenuItem asChild>
							<Link href='/admin'>Dashboard</Link>
						</DropdownMenuItem>
					))}

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={handleSignOut}
					className='text-red-500 focus:text-red-600'
				>
					Cerrar sesión
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
