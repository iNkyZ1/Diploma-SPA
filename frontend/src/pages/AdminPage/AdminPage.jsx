import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	fetchRoomStatusesThunk,
	selectAdminError,
	selectAdminStatus,
	selectAdminStatuses,
	selectAdminUpdatingId,
	setRoomStatusThunk,
} from '../../features/admin/model/adminSlice';
import { RoomStatusTile } from '../../features/admin/ui/RoomStatusTile';

function getErrorText(err) {
	if (!err) return null;
	if (err.status === 403) return 'Недостаточно прав (нужен admin)';
	if (err.status === 401) return 'Нужно войти';
	if (err.status === 0) return 'Сеть недоступна. Попробуйте ещё раз.';
	return err.message || 'Ошибка';
}

export function AdminPage() {
	const dispatch = useAppDispatch();

	const items = useAppSelector(selectAdminStatuses);
	const status = useAppSelector(selectAdminStatus);
	const error = useAppSelector(selectAdminError);
	const updatingId = useAppSelector(selectAdminUpdatingId);

	const load = () => dispatch(fetchRoomStatusesThunk());

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onToggle = async (item) => {
		const nextStatus = item.status === 'available' ? 'reserved' : 'available';
		const res = await dispatch(
			setRoomStatusThunk({ roomId: item.roomId, status: nextStatus }),
		);

		if (setRoomStatusThunk.rejected.match(res)) {
			alert(getErrorText(res.payload) || 'Ошибка обновления статуса');
		}
	};

	return (
		<div style={{ display: 'grid', gap: 14 }}>
			<h1>Панель администратора</h1>
			<div style={{ fontSize: 14, opacity: 0.8 }}>
				Клик по номеру переключает статус: <b>свободен</b> ↔ <b>занят</b>
			</div>

			{status === 'loading' && <div>Загрузка...</div>}

			{status === 'failed' && (
				<div style={{ display: 'grid', gap: 10 }}>
					<div style={{ color: 'crimson' }}>{getErrorText(error)}</div>
					<button onClick={load} style={{ width: 'fit-content' }}>
						Повторить
					</button>
				</div>
			)}

			{status === 'succeeded' && items.length === 0 && (
				<div>Нет данных по номерам.</div>
			)}

			{status === 'succeeded' && items.length > 0 && (
				<section
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
						gap: 12,
						maxWidth: 520,
					}}
				>
					{items
						.slice()
						.sort((a, b) => a.number - b.number)
						.map((item) => (
							<RoomStatusTile
								key={item.roomId}
								item={item}
								onToggle={onToggle}
								isUpdating={updatingId === item.roomId}
							/>
						))}
				</section>
			)}
		</div>
	);
}
