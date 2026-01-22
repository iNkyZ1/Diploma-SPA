import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectIsAuthed } from '../../../features/auth/model/authSlice';

export function RequireAuth() {
	const isAuthed = useAppSelector(selectIsAuthed);
	const location = useLocation();

	if (!isAuthed) {
		return <Navigate to="/login" replace state={{ from: location.pathname }} />;
	}

	return <Outlet />;
}
