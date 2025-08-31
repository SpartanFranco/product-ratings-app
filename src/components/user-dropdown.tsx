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
import { usePathname, useRouter } from 'next/navigation';

interface Props {
	session: Session | null;
}

export const UserDropdown = ({ session }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const { username, email, role, image } = session?.user ?? {};
	const isAdmin = role === 'admin' || role === 'superAdmin';

	const handleSignOut = () => {
		const isInAdmin = pathname?.startsWith('/admin');
		signOut({
			...(isInAdmin && { callbackUrl: '/' }),
		});
		router.refresh();
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
						<span className='max-w-[160px] truncate text-sm font-medium'>
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
					<Link href='/profile'>Profile</Link>
				</DropdownMenuItem>

				{isAdmin &&
					(pathname.startsWith('/admin') ? (
						<DropdownMenuItem asChild>
							<Link href='/'>Go to Product-Ratings-App</Link>
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
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
