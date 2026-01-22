export function validateAuth({ login, password }) {
	const errors = {};

	if (!login || login.trim().length < 3)
		errors.login = 'Логин должен быть минимум 3 символа';
	if (!password || password.length < 6)
		errors.password = 'Пароль должен быть минимум 6 символов';

	return errors;
}
