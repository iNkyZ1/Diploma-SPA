export function Footer() {
	return (
		<footer
			style={{
				padding: 16,
				borderTop: '1px solid rgba(0,0,0,0.08)',
				marginTop: 24,
				background: 'white',
			}}
		>
			<div
				className="container"
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: 12,
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				<div style={{ display: 'grid', gap: 4 }}>
					<div style={{ fontSize: 12, opacity: 0.8 }}>
						Телефон: +7 (3952) 123-456
					</div>
					<div style={{ fontSize: 12, opacity: 0.8 }}>
						Email: info@example.ru
					</div>
				</div>

				<div style={{ fontSize: 12, opacity: 0.7 }}>
					© {new Date().getFullYear()} Отель "Жемчужина Байкала"
				</div>
			</div>
		</footer>
	);
}
