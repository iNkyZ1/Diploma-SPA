export function Footer() {
	return (
		<footer
			style={{
				padding: 16,
				borderTop: '1px solid rgba(0,0,0,0.08)',
				marginTop: 24,
			}}
		>
			<div
				style={{
					maxWidth: 1100,
					margin: '0 auto',
					display: 'flex',
					justifyContent: 'space-between',
					gap: 12,
					fontSize: 14,
					opacity: 0.8,
				}}
			>
				<span>Hotel Booking SPA</span>
				<span>{new Date().getFullYear()}</span>
			</div>
		</footer>
	);
}
