import { Home, Inbox, MessageCircle, ShoppingBag, User } from 'lucide-react';

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
import Link from 'next/link';
import { getTotalCommentsPending } from '@/actions/comments/get-total-comments';
import { Badge } from '@/components/ui/badge';
import { UserDropdown } from '@/components/user-dropdown';
import { auth } from '@/auth.config';

const items = [
	{
		title: 'Home',
		url: '/admin',
		icon: Home,
	},
	{
		title: 'Users',
		url: '/admin/users',
		icon: User,
	},
	{
		title: 'Products',
		url: '/admin/products',
		icon: Inbox,
	},
	{
		title: 'Comments',
		url: '/admin/comments',
		icon: MessageCircle,
	},
];

export async function AppSidebar() {
	const commentsPending = await getTotalCommentsPending();
	const session = await auth();

	return (
		<Sidebar
			collapsible='icon'
			className='flex flex-col justify-between'
		>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className='flex items-center gap-2'
										>
											<span className='relative'>
												<item.icon className='text-foreground' />
												{item.title === 'Comments' && commentsPending > 0 && (
													<Badge
														variant='destructive'
														className='absolute -top-1 -right-2 size-4 justify-center p-0 text-[10px]'
													>
														{commentsPending}
													</Badge>
												)}
											</span>
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<div className='border-muted bg-muted/50 border-t px-2 py-3'>
				<UserDropdown session={session} />
			</div>
		</Sidebar>
	);
}
