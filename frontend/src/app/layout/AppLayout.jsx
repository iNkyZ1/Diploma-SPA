import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/header/Header';
import { Footer } from '../../widgets/footer/Footer';

export function AppLayout() {
	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header />
			<main
				className="container"
				style={{ paddingTop: 16, paddingBottom: 16, flex: 1 }}
			>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
