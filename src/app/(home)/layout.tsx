import { Header } from '@/components/header';

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='grid h-screen grid-rows-[4rem_1fr]'>
			<Header />
			{children}
		</div>
	);
}
