import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/header/Header';
import { Footer } from '../../widgets/footer/Footer';

export function AppLayout() {
	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header />
			<main
				style={{
					padding: 16,
					maxWidth: 1100,
					margin: '0 auto',
					width: '100%',
					flex: 1,
				}}
			>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
