'use client';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
	currentPage: number;
	totalPages: number;
	basePath?: string;
}

export const DynamicPagination = ({
	currentPage,
	totalPages,
	basePath = '',
}: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const goToPage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`${basePath}?${params.toString()}`);
	};

	const getPages = (): (number | 'ellipsis')[] => {
		const pages: (number | 'ellipsis')[] = [];

		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			pages.push(1);

			if (currentPage > 3) pages.push('ellipsis');

			const start = Math.max(2, currentPage - 1);
			const end = Math.min(totalPages - 1, currentPage + 1);

			for (let i = start; i <= end; i++) pages.push(i);

			if (currentPage < totalPages - 2) pages.push('ellipsis');

			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<Pagination>
			<PaginationContent>
				{/* Previous */}
				<PaginationItem>
					<button
						onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
						disabled={currentPage === 1}
						className={cn(
							'rounded px-3 py-1',
							currentPage === 1 && 'cursor-not-allowed opacity-50',
						)}
					>
						<PaginationPrevious />
					</button>
				</PaginationItem>

				{/* Pages */}
				{getPages().map((page, idx) => (
					<PaginationItem key={idx}>
						{page === 'ellipsis' ? (
							<PaginationEllipsis />
						) : (
							<button
								onClick={() => goToPage(page)}
								className={cn(
									'rounded px-3 py-1',
									page === currentPage && 'font-bold underline',
								)}
							>
								<PaginationLink isActive={page === currentPage}>
									{page}
								</PaginationLink>
							</button>
						)}
					</PaginationItem>
				))}

				{/* Next */}
				<PaginationItem>
					<button
						onClick={() =>
							currentPage < totalPages && goToPage(currentPage + 1)
						}
						disabled={currentPage === totalPages}
						className={cn(
							'rounded px-3 py-1',
							currentPage === totalPages && 'cursor-not-allowed opacity-50',
						)}
					>
						<PaginationNext />
					</button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
