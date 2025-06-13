'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { authenticate } from '@/actions/auth/login';

import {
	Form,
	FormField,
	FormLabel,
	FormControl,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InfoIcon, LockKeyhole, User2 } from 'lucide-react';
import { UserSchema, UserType } from '@/schemas/user.schema';
import Link from 'next/link';

export default function LoginPage() {
	const form = useForm<UserType>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const [state, dispatch, pending] = useActionState(authenticate, undefined);

	useEffect(() => {
		if (state === 'Success') {
			window.location.replace('/');
		}
	}, [state]);

	return (
		<div className='bg-background rounded-xl p-8 shadow-xl backdrop-blur-md md:w-[30vw] dark:bg-white/5 dark:text-white'>
			<h1 className='mb-8 text-center text-4xl font-bold tracking-tight'>
				Bienvenido
			</h1>

			<Form {...form}>
				<form
					action={dispatch}
					className='space-y-6'
				>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-center gap-2'>
									<User2 className='h-4 w-4' /> Usuario
								</FormLabel>
								<FormControl>
									<Input
										placeholder='Tu nombre de usuario'
										className='border-white/20 bg-white/10 placeholder:text-slate-400 focus:bg-white/20 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-white/20'
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-sm text-red-400' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-center gap-2'>
									<LockKeyhole className='h-4 w-4' /> Contraseña
								</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Tu contraseña secreta'
										className='border-white/20 bg-white/10 placeholder:text-slate-400 focus:bg-white/20 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-white/20'
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-sm text-red-400' />
							</FormItem>
						)}
					/>

					{state === 'CredencialSignin' && (
						<div className='flex items-center gap-2 text-sm text-red-400'>
							<InfoIcon className='h-5 w-5' />
							<span>Credenciales inválidas</span>
						</div>
					)}

					<Button
						type='submit'
						disabled={pending}
						className='w-full bg-amber-500 text-white transition hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600'
					>
						{pending ? 'Ingresando...' : 'Iniciar Sesión'}
					</Button>

					<div className='mt-4 text-center'>
						<p className='text-sm'>
							¿No tienes una cuenta?
							<Link
								href='/auth/new-account'
								className='text-amber-500'
							>
								Crear cuenta
							</Link>
						</p>
					</div>
				</form>
			</Form>
		</div>
	);
}
