export function validateBooking({ checkIn, checkOut }) {
	const errors = {};
	if (!checkIn) errors.checkIn = 'Укажите дату заезда';
	if (!checkOut) errors.checkOut = 'Укажите дату выезда';
	if (checkIn && checkOut && checkOut <= checkIn)
		errors.checkOut = 'Дата выезда должна быть позже даты заезда';
	return errors;
}
