import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	deleteBookingThunk,
	fetchBookingsThunk,
	selectBookings,
	selectBookingsError,
	selectBookingsStatus,
	selectDeletingId,
} from '../../features/booking/model/bookingsSlice';
import { fetchRoomsThunk, selectRooms } from '../../features/rooms/model/roomsSlice';
import { BookingCard } from '../../entities/booking';
import { Alert } from '../../shared/ui/Alert';
import { Button } from '../../shared/ui/Button';
import { getApiErrorMessage } from '../../shared/lib/getApiErrorMessage';

export function MyBookingsPage() {
	const dispatch = useAppDispatch();

	const bookings = useAppSelector(selectBookings);
	const status = useAppSelector(selectBookingsStatus);
	const error = useAppSelector(selectBookingsError);
	const deletingId = useAppSelector(selectDeletingId);

	const rooms = useAppSelector(selectRooms);

	const [uiError, setUiError] = useState(null);

	const load = () => {
		setUiError(null);
		dispatch(fetchBookingsThunk());

		if (rooms.length === 0) dispatch(fetchRoomsThunk());
	};

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const roomsById = new Map(rooms.map((r) => [r.id, r]));

	const onDelete = async (bookingId) => {
		setUiError(null);
		const res = await dispatch(deleteBookingThunk(bookingId));

		if (deleteBookingThunk.rejected.match(res)) {
			setUiError(getApiErrorMessage(res.payload) || 'Ошибка удаления');
		}
	};

	return (
		<div className="stack">
			{' '}
			<h1>Мои брони</h1>
			{uiError && <Alert>{uiError}</Alert>}
			{status === 'loading' && <div>Загрузка...</div>}
			{status === 'failed' && (
				<div style={{ display: 'grid', gap: 10 }}>
					<Alert>{getApiErrorMessage(error) || 'Ошибка загрузки'}</Alert>
					<Button onClick={load}>Повторить</Button>
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
