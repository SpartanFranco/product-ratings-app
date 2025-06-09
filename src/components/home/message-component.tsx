import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface Props {
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	>;
	count?: number;
	slug: string;
	tooltipText?: string;
}

export const MessageComponent = ({
	icon: Icon,
	count = 0,
	slug,
	tooltipText = 'Ver comentarios',
}: Props) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					href={`/product/${slug}`}
					className='text-muted-foreground hover:text-foreground relative inline-block transition-transform hover:scale-110'
				>
					<Icon className='size-5 transition-colors' />
					{count > 0 && (
						<Badge
							variant='destructive'
							className={cn(
								'absolute -top-2 -right-2 size-4 justify-center rounded-full p-0 text-[10px] font-bold shadow',
								'bg-red-500 text-white dark:bg-red-600',
							)}
						>
							{count}
						</Badge>
					)}
				</Link>
			</TooltipTrigger>
			<TooltipContent side='top'>
				<p>{tooltipText}</p>
			</TooltipContent>
		</Tooltip>
	);
};
