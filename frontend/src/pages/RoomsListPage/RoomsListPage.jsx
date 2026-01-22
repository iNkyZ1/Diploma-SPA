import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	fetchRoomsThunk,
	selectRooms,
	selectRoomsError,
	selectRoomsStatus,
} from '../../features/rooms/model/roomsSlice';
import { RoomCard } from '../../entities/room';
import { Pagination } from '../../shared/ui/Pagination';
import { Alert } from '../../shared/ui/Alert';
import { Button } from '../../shared/ui/Button';
import { getApiErrorMessage } from '../../shared/lib/getApiErrorMessage';

const PAGE_SIZE = 9;

function clampPage(value, totalPages) {
	const n = Number(value);
	if (!Number.isFinite(n) || n < 1) return 1;
	if (totalPages > 0 && n > totalPages) return totalPages;
	return n;
}

export function RoomsListPage() {
	const dispatch = useAppDispatch();
	const rooms = useAppSelector(selectRooms);
	const status = useAppSelector(selectRoomsStatus);
	const error = useAppSelector(selectRoomsError);

	const [searchParams, setSearchParams] = useSearchParams();

	const load = () => dispatch(fetchRoomsThunk({ status: 'available' }));

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const totalPages = useMemo(
		() => Math.max(1, Math.ceil(rooms.length / PAGE_SIZE)),
		[rooms.length],
	);

	const pageFromQuery = searchParams.get('page') ?? '1';
	const page = clampPage(pageFromQuery, totalPages);

	useEffect(() => {
		if (String(page) !== String(pageFromQuery)) {
			setSearchParams({ page: String(page) }, { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, pageFromQuery]);

	const pagedRooms = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return rooms.slice(start, start + PAGE_SIZE);
	}, [rooms, page]);

	const onPageChange = (nextPage) => {
		setSearchParams({ page: String(nextPage) });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 14,
				minHeight: '70vh',
			}}
		>
			<h1>Доступные номера</h1>

			{status === 'loading' && <div>Загрузка...</div>}

			{status === 'failed' && (
				<div style={{ display: 'grid', gap: 10 }}>
					<Alert>{getApiErrorMessage(error) || 'Ошибка загрузки'}</Alert>
					<Button onClick={load}>Повторить</Button>
				</div>
			)}

			{status === 'succeeded' && rooms.length === 0 && (
				<div>Нет доступных номеров.</div>
			)}

			{status === 'succeeded' && rooms.length > 0 && (
				<>
					<section
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
							gap: 14,
							width: '100%',
							alignItems: 'stretch',
						}}
					>
						{pagedRooms.map((room) => (
							<RoomCard key={room.id} room={room} />
						))}
					</section>

					<div
						style={{
							marginTop: 'auto',
							display: 'grid',
							gap: 10,
							justifyItems: 'center',
							paddingTop: 12,
						}}
					>
						<Pagination
							page={page}
							totalPages={totalPages}
							onPageChange={onPageChange}
						/>
						<div style={{ fontSize: 12, opacity: 0.7 }}>
							Показано {pagedRooms.length} из {rooms.length}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
