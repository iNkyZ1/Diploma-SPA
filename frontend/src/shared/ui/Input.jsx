export function Input({ label, error, className = '', ...props }) {
	const inputClass = ['input', error ? 'input--error' : '', className]
		.filter(Boolean)
		.join(' ');

	return (
		<label className="field">
			{label && <span className="field__label">{label}</span>}
			<input {...props} className={inputClass} />
			{error && <span className="field__error">{error}</span>}
		</label>
	);
}
