'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/actions/auth/login';
import { registerUser } from '@/actions/auth/register';
import { UserSchema, UserType } from '@/schemas/user.schema';

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewAccountPage() {
	const [errorMessage, setErrorMessage] = useState<string | undefined>('');

	const form = useForm<UserType>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = async (data: UserType) => {
		const { username, password } = data;
		const resp = await registerUser(username, password);

		if (!resp.ok) {
			setErrorMessage(resp.message);
			return;
		}

		setErrorMessage('');
		await login(username, password);
	};

	return (
		<div className='bg-background rounded-xl p-8 shadow-xl backdrop-blur-md md:w-[30vw] dark:bg-white/5 dark:text-white'>
			<h1 className='mb-8 text-center text-4xl font-bold tracking-tight'>
				Create account
			</h1>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-center gap-2'>
									Username
								</FormLabel>
								<FormControl>
									<Input
										placeholder='Your username'
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
									Password
								</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Your secret password'
										className='border-white/20 bg-white/10 placeholder:text-slate-400 focus:bg-white/20 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-white/20'
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-sm text-red-400' />
							</FormItem>
						)}
					/>

					{errorMessage && (
						<p className='text-center text-sm text-red-500'>{errorMessage}</p>
					)}

					<Button
						type='submit'
						className='w-full bg-amber-500 text-white transition hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600'
					>
						Create account
					</Button>

					<div className='mt-4 text-center'>
						<p className='text-sm'>
							Already have an account?
							<Link
								href='/auth/login'
								className='text-amber-500'
							>
								Login
							</Link>
						</p>
					</div>
				</form>
			</Form>
		</div>
	);
}
