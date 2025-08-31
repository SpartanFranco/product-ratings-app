import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from '@/components/providers/provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Product Ratings App | Product Reviews & Feedback',
	description:
		'A modern product rating app built with Next.js, Prisma, and Cloudinary. Share reviews, rate products.',
	keywords: [
		'Next.js',
		'Prisma',
		'Ratings',
		'Reviews',
		'Products',
		'Cloudinary',
	],

	creator: 'Geovani Franco',
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<Provider>
						<main className='text-foreground bg-background'>{children}</main>
					</Provider>
				</ThemeProvider>
			</body>
		</html>
	);
}
