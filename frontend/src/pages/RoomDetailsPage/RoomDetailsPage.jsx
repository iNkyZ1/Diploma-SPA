import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	fetchRoomDetailsThunk,
	selectCurrentRoom,
	selectRoomsError,
	selectRoomsStatus,
} from '../../features/rooms/model/roomsSlice';
import { BookingForm } from '../../features/booking/ui/BookingForm';

function getErrorText(err) {
	if (!err) return null;
	if (err.status === 404) return 'Номер не найден';
	if (err.status === 0) return 'Сеть недоступна. Попробуйте ещё раз.';
	return err.message || 'Ошибка';
}

export function RoomDetailsPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const room = useAppSelector(selectCurrentRoom);
	const status = useAppSelector(selectRoomsStatus);
	const error = useAppSelector(selectRoomsError);

	const load = () => dispatch(fetchRoomDetailsThunk(id));

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (status === 'loading') return <div>Загрузка...</div>;

	if (status === 'failed') {
		return (
			<div style={{ display: 'grid', gap: 10 }}>
				<div style={{ color: 'crimson' }}>{getErrorText(error)}</div>
				<button onClick={load} style={{ width: 'fit-content' }}>
					Повторить
				</button>
			</div>
		);
	}

	if (!room) return null;

	return (
		<div style={{ display: 'grid', gap: 14 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
				<h1 style={{ margin: 0 }}>{room.title}</h1>
				<div style={{ fontSize: 14, opacity: 0.7 }}>№ {room.number}</div>
			</div>

			<div style={{ display: 'grid', gap: 6 }}>
				<div style={{ fontSize: 14, opacity: 0.85 }}>{room.description}</div>
				<div style={{ fontSize: 14 }}>
					<b>{room.price} ₽</b> / ночь
				</div>
				<div style={{ fontSize: 14, opacity: 0.85 }}>
					Статус: <b>{room.status}</b>
				</div>
			</div>

			<div
				style={{
					height: 220,
					borderRadius: 14,
					background: 'rgba(0,0,0,0.06)',
					display: 'grid',
					placeItems: 'center',
					opacity: 0.85,
				}}
			>
				Фото
			</div>

			<BookingForm roomId={room.id} roomStatus={room.status} onBooked={load} />
		</div>
	);
}
