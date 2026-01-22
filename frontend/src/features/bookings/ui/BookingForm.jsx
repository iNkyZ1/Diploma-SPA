import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectIsAuthed } from '../../auth/model/authSlice';
import { createBookingThunk } from '../../bookings/model/bookingsSlice';
import { validateBooking } from '../lib/validateBooking';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

function getErrorText(err) {
	if (!err) return null;
	if (err.status === 401) return 'Нужно войти в аккаунт, чтобы забронировать';
	if (err.status === 409) return 'Номер сейчас недоступен для бронирования';
	if (err.status === 0) return 'Сеть недоступна. Попробуйте ещё раз';
	return err.message || 'Ошибка';
}

export function BookingForm({ roomId, roomStatus, onBooked }) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const isAuthed = useAppSelector(selectIsAuthed);

	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [guests, setGuests] = useState(1);

	const [touched, setTouched] = useState(false);
	const [serverError, setServerError] = useState(null);
	const [success, setSuccess] = useState(false);

	const fieldErrors = useMemo(() => {
		if (!touched) return {};
		return validateBooking({ checkIn, checkOut });
	}, [checkIn, checkOut, touched]);

	const disabledByStatus = roomStatus !== 'available';
	const canSubmit =
		!disabledByStatus && Object.keys(fieldErrors).length === 0 && checkIn && checkOut;

	const onSubmit = async (e) => {
		e.preventDefault();
		setTouched(true);
		setServerError(null);

		if (!isAuthed) {
			navigate('/login', { replace: true, state: { from: location.pathname } });
			return;
		}

		const errs = validateBooking({ checkIn, checkOut });
		if (Object.keys(errs).length > 0) return;

		const res = await dispatch(
			createBookingThunk({
				roomId,
				checkIn,
				checkOut,
				guests: Number(guests),
			}),
		);

		if (createBookingThunk.fulfilled.match(res)) {
			setSuccess(true);
			onBooked?.();
		} else {
			setServerError(res.payload);
		}
	};

	if (success) {
		return (
			<div
				style={{
					display: 'grid',
					gap: 10,
					padding: 12,
					borderRadius: 14,
					border: '1px solid rgba(0,0,0,0.12)',
				}}
			>
				<strong>Забронировано!</strong>
				<div style={{ fontSize: 14, opacity: 0.85 }}>
					Проверь в разделе <Link to="/my-bookings">Мои брони</Link>.
				</div>
			</div>
		);
	}

	return (
		<form
			onSubmit={onSubmit}
			style={{
				display: 'grid',
				gap: 10,
				padding: 12,
				borderRadius: 14,
				border: '1px solid rgba(0,0,0,0.12)',
			}}
		>
			<strong>Бронирование</strong>

			{disabledByStatus && (
				<div style={{ fontSize: 14, color: 'crimson' }}>
					Этот номер недоступен (статус: {roomStatus})
				</div>
			)}

			<Input
				label="Дата заезда"
				type="date"
				value={checkIn}
				onChange={(e) => setCheckIn(e.target.value)}
				onBlur={() => setTouched(true)}
				error={fieldErrors.checkIn}
			/>

			<Input
				label="Дата выезда"
				type="date"
				value={checkOut}
				onChange={(e) => setCheckOut(e.target.value)}
				onBlur={() => setTouched(true)}
				error={fieldErrors.checkOut}
			/>

			<label style={{ display: 'grid', gap: 6 }}>
				<span style={{ fontSize: 14 }}>Гостей</span>
				<input
					type="number"
					min={1}
					max={10}
					value={guests}
					onChange={(e) => setGuests(e.target.value)}
					style={{
						padding: '10px 12px',
						borderRadius: 10,
						border: '1px solid rgba(0,0,0,0.2)',
					}}
				/>
			</label>

			{serverError && (
				<div style={{ color: 'crimson', fontSize: 14 }}>
					{getErrorText(serverError)}
				</div>
			)}

			<Button disabled={!canSubmit}>Забронировать</Button>
		</form>
	);
}
