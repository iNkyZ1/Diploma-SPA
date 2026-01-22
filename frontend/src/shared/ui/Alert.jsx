export function Alert({ children, tone = 'danger', className = '' }) {
	const classes = ['alert', tone === 'danger' ? 'alert--danger' : '', className]
		.filter(Boolean)
		.join(' ');
	return <div className={classes}>{children}</div>;
}
