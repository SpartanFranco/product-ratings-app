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
		await login(username.toLowerCase(), password);
		window.location.replace('/');
	};

	return (
		<div className='mx-auto w-[30rem] rounded-md border border-amber-50 bg-slate-950/70 p-8 text-slate-50'>
			<h1 className='mb-6 text-center text-3xl font-extrabold'>
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
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter your username'
										className='bg-slate-400/10 focus:bg-slate-400/30'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Enter your password'
										className='bg-slate-400/10 focus:bg-slate-400/30'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{errorMessage && (
						<p className='text-center text-sm text-red-500'>{errorMessage}</p>
					)}

					<Button
						type='submit'
						className='w-full'
					>
						Create
					</Button>
				</form>
			</Form>
		</div>
	);
}
