import { ShieldCheck } from 'lucide-react';

export default function AdminPage() {
	return (
		<div className='animate-fade-in h-full pt-[10%]'>
			<div className='bg-card mx-auto max-w-xl rounded-2xl border p-8 text-center shadow-xl'>
				<div className='mb-4 flex justify-center'>
					<ShieldCheck className='text-primary h-12 w-12' />
				</div>
				<h1 className='mb-2 text-3xl font-bold'>Hello Admin! 👋</h1>
				<p className='text-muted-foreground text-lg'>
					Welcome to the administration panel. We hope you have a excellent day
					managing your platform.
				</p>
			</div>
		</div>
	);
}
