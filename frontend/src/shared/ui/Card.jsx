export function Card({ children, className = '' }) {
	return (
		<div className={['card', className].filter(Boolean).join(' ')}>{children}</div>
	);
}
