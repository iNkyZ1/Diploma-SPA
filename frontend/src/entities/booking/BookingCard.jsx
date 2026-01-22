export function BookingCard({ booking, room, onDelete, deleting }) {
	return (
		<article
			style={{
				border: '1px solid rgba(0,0,0,0.12)',
				borderRadius: 14,
				padding: 12,
				display: 'grid',
				gap: 8,
			}}
		>
			<div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
				<strong>
					{room
						? `${room.title} (№ ${room.number})`
						: `Номер: ${booking.roomId}`}
				</strong>
				<span style={{ fontSize: 12, opacity: 0.7 }}>{booking.status}</span>
			</div>

			<div style={{ fontSize: 14, opacity: 0.85 }}>
				{booking.checkIn} → {booking.checkOut}
			</div>

			<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
				<button onClick={() => onDelete(booking.id)} disabled={deleting}>
					{deleting ? 'Удаляем...' : 'Удалить'}
				</button>
			</div>
		</article>
	);
}
