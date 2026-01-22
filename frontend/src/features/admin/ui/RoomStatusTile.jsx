export function RoomStatusTile({ item, onToggle, isUpdating }) {
	const isReserved = item.status === 'reserved';

	return (
		<button
			onClick={() => onToggle(item)}
			disabled={isUpdating}
			style={{
				width: 64,
				height: 64,
				borderRadius: 14,
				border: '1px solid rgba(0,0,0,0.2)',
				cursor: isUpdating ? 'not-allowed' : 'pointer',
				background: isReserved ? 'rgba(0,0,0,0.10)' : 'white',
				display: 'grid',
				gap: 4,
				placeItems: 'center',
			}}
			title={`Статус: ${item.status}`}
		>
			<div style={{ fontWeight: 700 }}>{item.number}</div>
			<div style={{ fontSize: 10, opacity: 0.7 }}>
				{isReserved ? 'занят' : 'свободен'}
			</div>
		</button>
	);
}
