import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	fetchRoomsThunk,
	selectRooms,
	selectRoomsError,
	selectRoomsStatus,
} from '../../features/rooms/model/roomsSlice';
import { RoomCard } from '../../entities/room';

function getErrorText(err) {
	if (!err) return null;
	if (err.status === 0) return 'Сеть недоступна. Попробуйте ещё раз.';
	return err.message || 'Ошибка загрузки';
}

export function RoomsListPage() {
	const dispatch = useAppDispatch();
	const rooms = useAppSelector(selectRooms);
	const status = useAppSelector(selectRoomsStatus);
	const error = useAppSelector(selectRoomsError);

	const load = () => dispatch(fetchRoomsThunk({ status: 'available' }));

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div style={{ display: 'grid', gap: 14 }}>
			<h1>Доступные номера</h1>

			{status === 'loading' && <div>Загрузка...</div>}

			{status === 'failed' && (
				<div style={{ display: 'grid', gap: 10 }}>
					<div style={{ color: 'crimson' }}>{getErrorText(error)}</div>
					<button onClick={load} style={{ width: 'fit-content' }}>
						Повторить
					</button>
				</div>
			)}

			{status === 'succeeded' && rooms.length === 0 && (
				<div>Нет доступных номеров.</div>
			)}

			{status === 'succeeded' && rooms.length > 0 && (
				<section
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
						gap: 12,
					}}
				>
					{rooms.map((room) => (
						<RoomCard key={room.id} room={room} />
					))}
				</section>
			)}
		</div>
	);
}
