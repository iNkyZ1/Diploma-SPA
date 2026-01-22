import { Button } from './Button';

export function Pagination({ page, totalPages, onPageChange }) {
	if (totalPages <= 1) return null;

	const canPrev = page > 1;
	const canNext = page < totalPages;

	const go = (p) => onPageChange(p);

	return (
		<div
			style={{
				display: 'flex',
				gap: 8,
				alignItems: 'center',
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			<Button onClick={() => go(page - 1)} disabled={!canPrev}>
				←
			</Button>

			<span style={{ fontSize: 14, opacity: 0.85 }}>
				Страница <b>{page}</b> из <b>{totalPages}</b>
			</span>

			<Button onClick={() => go(page + 1)} disabled={!canNext}>
				→
			</Button>

			<div
				style={{
					display: 'flex',
					gap: 6,
					marginLeft: 8,
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
					<Button
						key={p}
						onClick={() => go(p)}
						disabled={p === page}
						className={p === page ? 'btn--active' : ''}
					>
						{p}
					</Button>
				))}
			</div>
		</div>
	);
}
