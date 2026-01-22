import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';

export function RoomCard({ room }) {
	return (
		<article
			style={{
				border: '1px solid rgba(0,0,0,0.10)',
				borderRadius: 16,
				padding: 14,
				display: 'flex',
				flexDirection: 'column',
				gap: 12,
				minHeight: 340,
				background: '#fff',
				boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
				transition: 'transform 160ms ease, box-shadow 160ms ease',
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = 'translateY(-2px)';
				e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.09)';
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = 'translateY(0)';
				e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
			}}
		>
			<div
				style={{
					height: 190,
					borderRadius: 14,
					overflow: 'hidden',
					border: '1px solid rgba(0,0,0,0.10)',
					background: 'rgba(0,0,0,0.04)',
				}}
			>
				<img
					src={room.image}
					alt={room.title}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						display: 'block',
					}}
					loading="lazy"
				/>
			</div>

			<div style={{ display: 'grid', gap: 6 }}>
				<div
					style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}
				>
					<strong style={{ fontSize: 16 }}>{room.title}</strong>
					<span style={{ fontSize: 12, opacity: 0.7 }}>№ {room.number}</span>
				</div>

				<div style={{ fontSize: 14, opacity: 0.85 }}>{room.price} ₽ / ночь</div>
			</div>

			<div style={{ marginTop: 'auto' }}>
				<Link to={`/rooms/${room.id}`} style={{ textDecoration: 'none' }}>
					<Button fullWidth>Открыть</Button>
				</Link>
			</div>
		</article>
	);
}
