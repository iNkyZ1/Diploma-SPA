import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	logout,
	selectIsAdmin,
	selectIsAuthed,
	selectUser,
} from '../../features/auth/model/authSlice';
import { DevTools } from './DevTools';
import { Button } from '../../shared/ui/Button';

const navLinkClass = ({ isActive }) => (isActive ? 'navLink navLink--active' : 'navLink');

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
		<header className="appHeader">
			<div className="container headerRow">
				<nav className="nav">
					<NavLink to="/" className={navLinkClass}>
						Главная
					</NavLink>
					<NavLink to="/rooms" className={navLinkClass}>
						Номера
					</NavLink>
					<NavLink to="/gallery" className={navLinkClass}>
						Галерея
					</NavLink>
					<NavLink to="/services" className={navLinkClass}>
						Сервисы
					</NavLink>

					{isAuthed && (
						<NavLink to="/my-bookings" className={navLinkClass}>
							Мои брони
						</NavLink>
					)}
					{isAdmin && (
						<NavLink to="/admin" className={navLinkClass}>
							Админ
						</NavLink>
					)}
				</nav>

				<div className="headerTools">
					<DevTools />

					{isAuthed ? (
						<>
							<span style={{ fontSize: 14, opacity: 0.8 }}>
								{user?.login} ({user?.role})
							</span>
							<Button onClick={onLogout}>Выйти</Button>
						</>
					) : (
						<>
							<NavLink to="/login" className={navLinkClass}>
								Вход
							</NavLink>
							<NavLink to="/register" className={navLinkClass}>
								Регистрация
							</NavLink>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
