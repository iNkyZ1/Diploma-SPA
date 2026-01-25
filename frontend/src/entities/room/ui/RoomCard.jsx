import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';

export function RoomCard({ room }) {
	return (
		<article className="roomCard">
			<div className="roomCard__media">
				<img
					src={room.image}
					alt={room.title}
					className="roomCard__img"
					loading="lazy"
				/>
			</div>

			<div className="roomCard__meta">
				<div className="roomCard__row">
					<strong className="roomCard__title">{room.title}</strong>
					<span className="roomCard__number">№ {room.number}</span>
				</div>

				<div className="roomCard__price">{room.price} ₽ / ночь</div>
			</div>

			<div className="roomCard__actions">
				<Link to={`/rooms/${room.id}`} style={{ textDecoration: 'none' }}>
					<Button fullWidth>Открыть</Button>
				</Link>
			</div>
		</article>
	);
}
