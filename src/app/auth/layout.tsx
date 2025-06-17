import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (session?.user) {
		redirect('/');
	}
	return (
		<div className='text-foreground grid h-screen w-full place-content-center'>
			{children}
		</div>
	);
}
