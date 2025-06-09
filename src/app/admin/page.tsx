'use client';

import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminPage() {
	return (
		<div className='grid h-full place-content-center px-4 py-10'>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4 }}
				className='bg-card mx-auto max-w-xl rounded-2xl border p-8 text-center shadow-xl'
			>
				<div className='mb-4 flex justify-center'>
					<ShieldCheck className='text-primary h-12 w-12' />
				</div>
				<h1 className='text-foreground mb-2 text-3xl font-bold'>
					¡Hola, Admin! 👋
				</h1>
				<p className='text-muted-foreground text-lg'>
					Bienvenido al panel de administración. Esperamos que tengas un
					excelente día gestionando tu plataforma.
				</p>
			</motion.div>
		</div>
	);
}
