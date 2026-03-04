import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
	loginThunk,
	selectAuth,
	selectIsAuthed,
} from '../../features/auth/model/authSlice';
import { validateAuth } from '../../features/auth/lib/validateAuth';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';

function getServerErrorMessage(err) {
	if (!err) return null;

	if (err.status === 401) return 'Неверный логин или пароль';
	if (err.status === 400) return 'Проверьте правильность заполнения полей';
	if (err.status === 0) return 'Сеть недоступна. Попробуйте ещё раз';

	return err.message || 'Ошибка';
}

export function AuthLoginPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const isAuthed = useAppSelector(selectIsAuthed);
	const { status, error } = useAppSelector(selectAuth);

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [touched, setTouched] = useState(false);

	const fieldErrors = useMemo(() => {
		if (!touched) return {};
		return validateAuth({ login, password });
	}, [login, password, touched]);

	const canSubmit =
		Object.keys(fieldErrors).length === 0 &&
		login &&
		password &&
		status !== 'loading';

	const from = location.state?.from || '/rooms';

	if (isAuthed) {
		navigate(from, { replace: true });
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		setTouched(true);

		const errs = validateAuth({ login, password });
		if (Object.keys(errs).length > 0) return;

		const res = await dispatch(loginThunk({ login: login.trim(), password }));
		if (loginThunk.fulfilled.match(res)) {
			navigate(from, { replace: true });
		}
	};

	return (
		<div style={{ maxWidth: 420, margin: '0 auto', display: 'grid', gap: 14 }}>
			<h1>Вход</h1>

			<form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
				<Input
					label="Логин"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					onBlur={() => setTouched(true)}
					error={fieldErrors.login}
					placeholder="например: user или admin"
					autoComplete="username"
				/>

				<Input
					label="Пароль"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onBlur={() => setTouched(true)}
					error={fieldErrors.password}
					placeholder="минимум 6 символов"
					autoComplete="current-password"
				/>

				{error && (
					<div style={{ color: 'crimson', fontSize: 14 }}>
						{getServerErrorMessage(error)}
					</div>
				)}

				<Button disabled={!canSubmit}>
					{status === 'loading' ? 'Входим...' : 'Войти'}
				</Button>
			</form>

			<div style={{ fontSize: 14 }}>
				Нет аккаунта? <Link to="/register">Регистрация</Link>
			</div>

			<div style={{ fontSize: 12, opacity: 0.7 }}>
				Пожалуйста, не вводите свои реальные данные.
			</div>
		</div>
	);
}
