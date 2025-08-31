import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin-components/app-sidebar';
import { ModeToggle } from '@/components/buttons/mode-toggle';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin Dashboard',
	description: 'Product Ratings App administration panel',
};

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (session?.user.role !== 'admin' && session?.user.role !== 'superAdmin') {
		redirect('/');
	}
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='bg-background text-foreground grid h-screen w-full grid-rows-[3.5rem_1fr]'>
				<section className='flex w-full justify-between border-b px-4 py-3'>
					<SidebarTrigger />
					<ModeToggle />
				</section>
				<div className='p-6'>{children}</div>
			</main>
		</SidebarProvider>
	);
}
