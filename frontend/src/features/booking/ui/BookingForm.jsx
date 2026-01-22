import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectIsAuthed } from '../../auth/model/authSlice';
import { createBookingThunk } from '../model/bookingsSlice';
import { validateBooking } from '../lib/validateBooking';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { Alert } from '../../../shared/ui/Alert';
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage';

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
			<Card>
				<div className="stack">
					<strong>Забронировано!</strong>
					<div style={{ fontSize: 14, opacity: 0.85 }}>
						Проверь в разделе <Link to="/my-bookings">Мои брони</Link>.
					</div>
				</div>
			</Card>
		);
	}

	return (
		<Card>
			<form onSubmit={onSubmit} className="stack">
				<strong>Бронирование</strong>

				{disabledByStatus && (
					<Alert>Этот номер недоступен (статус: {roomStatus})</Alert>
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

				<label className="field">
					<span className="field__label">Гостей</span>
					<input
						type="number"
						min={1}
						max={10}
						value={guests}
						onChange={(e) => setGuests(e.target.value)}
						className="input"
					/>
				</label>

				{serverError && (
					<Alert>
						{getApiErrorMessage(serverError) || 'Ошибка бронирования'}
					</Alert>
				)}

				<Button fullWidth disabled={!canSubmit}>
					Забронировать
				</Button>
			</form>
		</Card>
	);
}
