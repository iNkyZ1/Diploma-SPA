export function Footer() {
	return (
		<footer className="appFooter">
			<div className="container footerRow">
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
