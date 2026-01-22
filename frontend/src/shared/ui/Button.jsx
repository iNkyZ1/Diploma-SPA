export function Button({
	children,
	className = '',
	fullWidth = false,
	disabled,
	...props
}) {
	const classes = ['btn', fullWidth ? 'btn--block' : '', className]
		.filter(Boolean)
		.join(' ');

	return (
		<button {...props} disabled={disabled} className={classes}>
			{children}
		</button>
	);
}
