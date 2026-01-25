import { Card } from '../../shared/ui/Card';
import { Button } from '../../shared/ui/Button';

export function BookingCard({ booking, room, onDelete, deleting }) {
	return (
		<Card>
			<div className="stack" style={{ gap: 8 }}>
				<div
					style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}
				>
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
					<Button onClick={() => onDelete(booking.id)} disabled={deleting}>
						{deleting ? 'Удаляем...' : 'Удалить'}
					</Button>
				</div>
			</div>
		</Card>
	);
}
