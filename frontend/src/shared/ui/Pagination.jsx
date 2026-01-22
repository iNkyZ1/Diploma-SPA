export function Pagination({ page, totalPages, onPageChange }) {
	if (totalPages <= 1) return null;

	const canPrev = page > 1;
	const canNext = page < totalPages;

	const go = (p) => onPageChange(p);

	return (
		<div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
			<button onClick={() => go(page - 1)} disabled={!canPrev}>
				←
			</button>

			<span style={{ fontSize: 14, opacity: 0.85 }}>
				Страница <b>{page}</b> из <b>{totalPages}</b>
			</span>

			<button onClick={() => go(page + 1)} disabled={!canNext}>
				→
			</button>

			<div style={{ display: 'flex', gap: 6, marginLeft: 8, flexWrap: 'wrap' }}>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
					<button
						key={p}
						onClick={() => go(p)}
						disabled={p === page}
						style={{
							minWidth: 38,
							background: p === page ? 'rgba(0,0,0,0.06)' : 'white',
						}}
					>
						{p}
					</button>
				))}
			</div>
		</div>
	);
}
