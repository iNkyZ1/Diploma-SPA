import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	fetchRoomDetailsThunk,
	selectCurrentRoom,
	selectRoomsError,
	selectRoomsStatus,
} from '../../features/rooms/model/roomsSlice';

import { Card } from '../../shared/ui/Card';
import { Alert } from '../../shared/ui/Alert';
import { Button } from '../../shared/ui/Button';
import { Loader } from '../../shared/ui/Loader';
import { getApiErrorMessage } from '../../shared/lib/getApiErrorMessage';

import { BookingForm } from '../../features/booking/ui/BookingForm';

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

	if (status === 'loading') return <Loader />;

	if (status === 'failed') {
		return (
			<div className="stack">
				<Alert>{getApiErrorMessage(error) || 'Ошибка загрузки'}</Alert>
				<Button onClick={load}>Повторить</Button>
			</div>
		);
	}

	if (!room) return null;

	return (
		<div className="stack">
			<div style={{ display: 'grid', gap: 12 }}>
				<h1 style={{ margin: 0 }}>{room.title}</h1>
				<div style={{ fontSize: 14, opacity: 0.75 }}>
					№ {room.number} • {room.price} ₽ / ночь • Статус: <b>{room.status}</b>
				</div>
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
					gap: 14,
					alignItems: 'start',
				}}
			>
				<Card>
					<div className="stack">
						<div
							style={{
								height: 360,
								borderRadius: 14,
								overflow: 'hidden',
								border: '1px solid rgba(0,0,0,0.10)',
								background: 'rgba(0,0,0,0.04)',
							}}
						>
							<img
								src={room.image}
								alt={room.title}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									display: 'block',
								}}
							/>
						</div>

						<div style={{ fontSize: 14, opacity: 0.9 }}>
							{room.description}
						</div>

						{Array.isArray(room.amenities) && room.amenities.length > 0 && (
							<div style={{ fontSize: 14, opacity: 0.9 }}>
								<b>Удобства:</b> {room.amenities.join(', ')}
							</div>
						)}

						{Array.isArray(room.gallery) && room.gallery.length > 0 && (
							<div style={{ display: 'grid', gap: 10 }}>
								<div style={{ fontSize: 14, opacity: 0.85 }}>
									<b>Галерея номера</b>
								</div>

								<div
									style={{
										display: 'grid',
										gridTemplateColumns:
											'repeat(auto-fit, minmax(140px, 1fr))',
										gap: 10,
									}}
								>
									{room.gallery.map((src) => (
										<div
											key={src}
											style={{
												height: 90,
												borderRadius: 12,
												overflow: 'hidden',
												border: '1px solid rgba(0,0,0,0.10)',
												background: 'rgba(0,0,0,0.04)',
											}}
										>
											<img
												src={src}
												alt="gallery"
												style={{
													width: '100%',
													height: '100%',
													objectFit: 'cover',
													display: 'block',
												}}
												loading="lazy"
											/>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</Card>

				<BookingForm roomId={room.id} roomStatus={room.status} onBooked={load} />
			</div>
		</div>
	);
}
