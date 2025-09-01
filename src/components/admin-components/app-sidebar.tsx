import { Home, Inbox, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { UserDropdown } from '@/components/user-dropdown';
import { getTotalCommentsPending } from '@/actions/comments/get-total-comments';
import { auth } from '@/auth.config';

const items = [
	{ title: 'Home', url: '/admin', icon: Home },
	{ title: 'Users', url: '/admin/users', icon: User },
	{ title: 'Products', url: '/admin/products', icon: Inbox },
	{ title: 'Comments', url: '/admin/comments', icon: MessageCircle },
];

export async function AppSidebar() {
	const commentsPending = await getTotalCommentsPending();
	const session = await auth();

	return (
		<Sidebar
			collapsible='icon'
			className='bg-background/95 supports-[backdrop-filter]:bg-background/60 flex flex-col justify-between border-r backdrop-blur'
		>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
						Application
					</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className='hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all'
										>
											<span className='relative flex-shrink-0'>
												<item.icon className='text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors' />
												{item.title === 'Comments' && commentsPending > 0 && (
													<Badge
														variant='destructive'
														className='absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] font-bold shadow-sm'
													>
														{commentsPending}
													</Badge>
												)}
											</span>
											<span className='truncate'>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<div className='border-muted bg-muted/50 border-t px-3 py-4'>
				<UserDropdown session={session} />
			</div>
		</Sidebar>
	);
}
