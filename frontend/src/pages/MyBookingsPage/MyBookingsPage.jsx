import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	deleteBookingThunk,
	fetchBookingsThunk,
	selectBookings,
	selectBookingsError,
	selectBookingsStatus,
	selectDeletingId,
} from '../../features/bookings/model/bookingsSlice';
import { fetchRoomsThunk, selectRooms } from '../../features/rooms/model/roomsSlice';
import { BookingCard } from '../../entities/booking/BookingCard';

function getErrorText(err) {
	if (!err) return null;
	if (err.status === 401) return 'Нужно войти в аккаунт';
	if (err.status === 0) return 'Сеть недоступна. Попробуйте ещё раз.';
	return err.message || 'Ошибка';
}

export function MyBookingsPage() {
	const dispatch = useAppDispatch();

	const bookings = useAppSelector(selectBookings);
	const status = useAppSelector(selectBookingsStatus);
	const error = useAppSelector(selectBookingsError);
	const deletingId = useAppSelector(selectDeletingId);

	const rooms = useAppSelector(selectRooms);

	const load = () => {
		dispatch(fetchBookingsThunk());
		if (rooms.length === 0) dispatch(fetchRoomsThunk());
	};

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const roomsById = new Map(rooms.map((r) => [r.id, r]));

	const onDelete = async (bookingId) => {
		const res = await dispatch(deleteBookingThunk(bookingId));
		if (deleteBookingThunk.rejected.match(res)) {
			alert(getErrorText(res.payload) || 'Ошибка удаления');
		}
	};

	return (
		<div style={{ display: 'grid', gap: 14 }}>
			<h1>Мои брони</h1>

			{status === 'loading' && <div>Загрузка...</div>}

			{status === 'failed' && (
				<div style={{ display: 'grid', gap: 10 }}>
					<div style={{ color: 'crimson' }}>{getErrorText(error)}</div>
					<button onClick={load} style={{ width: 'fit-content' }}>
						Повторить
					</button>
				</div>
			)}

			{status === 'succeeded' && bookings.length === 0 && (
				<div>У вас пока нет броней.</div>
			)}

			{status === 'succeeded' && bookings.length > 0 && (
				<section style={{ display: 'grid', gap: 12 }}>
					{bookings.map((b) => (
						<BookingCard
							key={b.id}
							booking={b}
							room={roomsById.get(b.roomId)}
							onDelete={onDelete}
							deleting={deletingId === b.id}
						/>
					))}
				</section>
			)}
		</div>
	);
}
