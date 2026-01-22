import { Link } from 'react-router-dom';

export function HomePage() {
	return (
		<div style={{ display: 'grid', gap: 14 }}>
			<h1>Отель “Жемчужина Байкала”</h1>

			<div
				style={{
					height: 360,
					borderRadius: 16,
					overflow: 'hidden',
					border: '1px solid rgba(0,0,0,0.12)',
					background: 'rgba(0,0,0,0.06)',
				}}
			>
				<img
					src="/images/homepage-bg.webp"
					alt="Hotel"
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						display: 'block',
					}}
				/>
			</div>

			<div style={{ fontSize: 14, opacity: 0.85, maxWidth: 760 }}>
				Комфортные номера, уютная атмосфера и сервис для отдыха на Байкале.
			</div>

			<Link to="/rooms" style={{ width: 'fit-content' }}>
				<button>Перейти к номерам</button>
			</Link>
		</div>
	);
}
