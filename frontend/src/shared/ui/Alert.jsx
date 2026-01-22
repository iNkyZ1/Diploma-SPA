export function Alert({ children, tone = 'danger' }) {
	const isDanger = tone === 'danger';
	return (
		<div
			style={{
				padding: 10,
				borderRadius: 12,
				border: `1px solid ${isDanger ? 'crimson' : 'rgba(0,0,0,0.15)'}`,
				background: isDanger ? 'rgba(220,20,60,0.06)' : 'rgba(0,0,0,0.03)',
				color: isDanger ? 'crimson' : 'inherit',
				fontSize: 14,
			}}
		>
			{children}
		</div>
	);
}
