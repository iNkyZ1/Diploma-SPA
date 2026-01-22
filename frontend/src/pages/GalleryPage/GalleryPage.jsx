const gallery = Array.from(
	{ length: 9 },
	(_, i) => `/images/gallery/gallery${i + 1}.webp`,
);

export function GalleryPage() {
	return (
		<div style={{ display: 'grid', gap: 14 }}>
			<h1>Галерея</h1>

			<section
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
					gap: 12,
				}}
			>
				{gallery.map((src) => (
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
							alt="gallery"
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
			</section>
		</div>
	);
}
