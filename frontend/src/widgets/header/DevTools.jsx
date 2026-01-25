import { resetDb } from '../../shared/api/mock/mockDb';
import { Button } from '../../shared/ui/Button';

export function DevTools() {
	if (!import.meta.env.DEV) return null;

	const onReset = () => {
		resetDb();
		window.location.reload();
	};

	return (
		<Button onClick={onReset} title="Сбросить мок-данные (dev)">
			Reset DB
		</Button>
	);
}
