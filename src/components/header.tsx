import Link from 'next/link';
import { auth } from '@/auth.config';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './buttons/mode-toggle';
import { UserDropdown } from './user-dropdown';

export const Header = async ({ children }: { children?: React.ReactNode }) => {
	const session = await auth();

	return (
		<header className='flex flex-wrap items-center justify-between gap-4 border-b px-4 py-1 shadow-sm dark:shadow-[0_2px_15px_1px_rgba(255,255,255,0.08)]'>
			{children}

			{session?.user ? (
				<section className='animate-in fade-in slide-in-from-right-30 duration-700'>
					<UserDropdown session={session} />
				</section>
			) : (
				<h1 className='truncate text-base font-semibold capitalize'>
					Invitado
				</h1>
			)}

			<div className='flex flex-shrink-0 items-center gap-2'>
				{!session?.user && <InitSession />}

				<ModeToggle />
			</div>
		</header>
	);
};

const InitSession = () => {
	return (
		<div className='flex gap-2'>
			<Button
				asChild
				size='sm'
			>
				<Link href='/auth/login'>Sign in</Link>
			</Button>
			<Button
				asChild
				variant='outline'
				size='sm'
			>
				<Link href='/auth/new-account'>Sign up</Link>
			</Button>
		</div>
	);
};
