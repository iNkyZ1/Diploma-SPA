import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/header/Header';

export function AppLayout() {
	return (
		<div style={{ minHeight: '100vh' }}>
			<Header />
			<main style={{ padding: 16, maxWidth: 1100, margin: '0 auto' }}>
				<Outlet />
			</main>
		</div>
	);
}
