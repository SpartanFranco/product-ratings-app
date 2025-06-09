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
import { InfoIcon } from 'lucide-react';
import { UserSchema, UserType } from '@/schemas/user.schema';

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
		<div className='mx-auto w-[30rem] rounded-md border border-amber-50 bg-slate-950/70 p-8 text-slate-50'>
			<h1 className='mb-6 text-center text-3xl font-extrabold'>Login</h1>

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

					{state === 'CredencialSignin' && (
						<div className='flex items-center gap-2 text-sm text-red-500'>
							<InfoIcon className='h-5 w-5' />
							<span>Invalid credentials</span>
						</div>
					)}

					<Button
						type='submit'
						disabled={pending}
						className='w-full'
					>
						{pending ? 'Logging in...' : 'Login'}
					</Button>
				</form>
			</Form>
		</div>
	);
}
