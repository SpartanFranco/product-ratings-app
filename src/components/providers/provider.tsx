'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from '../ui/sonner';

export const Provider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				{children}
				<Toaster />
			</SessionProvider>
		</QueryClientProvider>
	);
};
