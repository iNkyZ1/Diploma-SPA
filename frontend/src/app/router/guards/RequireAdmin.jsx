import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectIsAdmin, selectIsAuthed } from '../../../features/auth/model/authSlice';

export function RequireAdmin() {
	const isAuthed = useAppSelector(selectIsAuthed);
	const isAdmin = useAppSelector(selectIsAdmin);

	if (!isAuthed) return <Navigate to="/login" replace />;
	if (!isAdmin) return <Navigate to="/rooms" replace />;

	return <Outlet />;
}
