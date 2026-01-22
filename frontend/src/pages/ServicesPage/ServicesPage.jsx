const services = [
	{
		title: 'Баня',
		images: [
			'/images/services/banya1.webp',
			'/images/services/banya2.webp',
			'/images/services/banya3.webp',
		],
	},
	{
		title: 'Экскурсии',
		images: [
			'/images/services/excursion1.webp',
			'/images/services/excursion2.webp',
			'/images/services/excursion3.webp',
		],
	},
	{
		title: 'Кухня',
		images: [
			'/images/services/kitchen1.webp',
			'/images/services/kitchen2.webp',
			'/images/services/kitchen3.webp',
		],
	},
];

export function ServicesPage() {
	return (
		<div style={{ display: 'grid', gap: 14 }}>
			<h1>Сервисы</h1>

			{services.map((s) => (
				<div key={s.title} style={{ display: 'grid', gap: 10 }}>
					<h2 style={{ margin: 0, fontSize: 18 }}>{s.title}</h2>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
							gap: 12,
						}}
					>
						{s.images.map((src) => (
							<div
								key={src}
								style={{
									borderRadius: 14,
									overflow: 'hidden',
									border: '1px solid rgba(0,0,0,0.12)',
									background: 'rgba(0,0,0,0.06)',
									height: 180,
								}}
							>
								<img
									src={src}
									alt={s.title}
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
										display: 'block',
									}}
									loading="lazy"
								/>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
