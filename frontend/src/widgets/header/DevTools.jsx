import { resetDb } from '../../shared/api/mock/mockDb';

export function DevTools() {
	if (!import.meta.env.DEV) return null;

	const onReset = () => {
		resetDb();
		window.location.reload();
	};

	return (
		<button onClick={onReset} title="Сбросить мок-данные (dev)">
			Reset DB
		</button>
	);
}
