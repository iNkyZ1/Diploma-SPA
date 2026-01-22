export function getApiErrorMessage(err) {
	if (!err) return null;

	if (err.status === 0) return 'Сеть недоступна. Попробуйте ещё раз.';
	if (err.status === 400) return 'Проверьте правильность заполнения полей.';
	if (err.status === 401) return 'Нужно войти в аккаунт.';
	if (err.status === 403) return 'Недостаточно прав.';
	if (err.status === 404) return 'Не найдено.';
	if (err.status === 409) return 'Конфликт данных. Попробуйте ещё раз.';

	return err.message || 'Ошибка';
}
