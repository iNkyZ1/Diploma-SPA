import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	logout,
	selectIsAdmin,
	selectIsAuthed,
	selectUser,
} from '../../features/auth/model/authSlice';
import { DevTools } from './DevTools';

const linkStyle = ({ isActive }) => ({
	textDecoration: 'none',
	padding: '8px 10px',
	borderRadius: 8,
	color: 'inherit',
	background: isActive ? 'rgba(0,0,0,0.06)' : 'transparent',
});

export function Header() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const isAuthed = useAppSelector(selectIsAuthed);
	const isAdmin = useAppSelector(selectIsAdmin);
	const user = useAppSelector(selectUser);

	const onLogout = () => {
		dispatch(logout());
		navigate('/rooms');
	};

	return (
		<header style={{ padding: 16, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
			<div
				style={{
					maxWidth: 1100,
					margin: '0 auto',
					display: 'flex',
					gap: 12,
					alignItems: 'center',
				}}
			>
				<nav style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 1 }}>
					<NavLink to="/rooms" style={linkStyle}>
						Номера
					</NavLink>

					{isAuthed && (
						<NavLink to="/my-bookings" style={linkStyle}>
							Мои брони
						</NavLink>
					)}

					{isAdmin && (
						<NavLink to="/admin" style={linkStyle}>
							Админ
						</NavLink>
					)}
				</nav>

				<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<DevTools />

					{isAuthed ? (
						<>
							<span style={{ fontSize: 14, opacity: 0.8 }}>
								{user?.login} ({user?.role})
							</span>
							<button onClick={onLogout}>Выйти</button>
						</>
					) : (
						<>
							<NavLink to="/login" style={linkStyle}>
								Вход
							</NavLink>
							<NavLink to="/register" style={linkStyle}>
								Регистрация
							</NavLink>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
