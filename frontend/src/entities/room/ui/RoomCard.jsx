import { Link } from 'react-router-dom';

export function RoomCard({ room }) {
	return (
		<article
			style={{
				border: '1px solid rgba(0,0,0,0.12)',
				borderRadius: 14,
				padding: 14,
				display: 'flex',
				flexDirection: 'column',
				gap: 12,
				minHeight: 320,
			}}
		>
			<div
				style={{
					height: 170,
					borderRadius: 12,
					background: 'rgba(0,0,0,0.06)',
					display: 'grid',
					placeItems: 'center',
					fontSize: 14,
					opacity: 0.8,
					overflow: 'hidden',
				}}
			>
				Фото
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
					<button style={{ width: '100%' }}>Открыть</button>
				</Link>
			</div>
		</article>
	);
}
