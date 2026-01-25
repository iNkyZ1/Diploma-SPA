import { Button } from '../../../shared/ui/Button';

export function RoomStatusTile({ item, onToggle, isUpdating }) {
	const isReserved = item.status === 'reserved';

	return (
		<Button
			onClick={() => onToggle(item)}
			disabled={isUpdating}
			className={`btn--tile ${isReserved ? 'btn--tileReserved' : ''}`}
			title={`Статус: ${item.status}`}
		>
			<div style={{ fontWeight: 700 }}>{item.number}</div>
			<div style={{ fontSize: 10, opacity: 0.7 }}>
				{isReserved ? 'занят' : 'свободен'}
			</div>
		</Button>
	);
}
