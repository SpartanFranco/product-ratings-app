import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white'>
			{/* Imagen de fondo */}

			{/* Contenido */}
			<div className='relative z-10 space-y-6 text-center'>
				<h1 className='text-8xl font-extrabold tracking-tight drop-shadow-lg'>
					404
				</h1>
				<p className='text-2xl font-medium drop-shadow-md'>
					😢 Oops… La página que buscas no existe
				</p>

				<div className='mt-6 flex justify-center gap-4'>
					<Link href='/'>
						<Button
							size='lg'
							className='rounded-2xl shadow-lg transition-transform hover:scale-105'
						>
							🔙 Volver al inicio
						</Button>
					</Link>

					<Link href='/contact'>
						<Button
							size='lg'
							variant='secondary'
							className='rounded-2xl shadow-lg transition-transform hover:scale-105'
						>
							📩 Contáctanos
						</Button>
					</Link>
				</div>
			</div>

			{/* Glow decorativo */}
			<div className='absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black' />
		</div>
	);
}
