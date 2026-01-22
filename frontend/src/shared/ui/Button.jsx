export function Button({ children, disabled, ...props }) {
	return (
		<button
			{...props}
			disabled={disabled}
			style={{
				padding: '10px 14px',
				borderRadius: 10,
				border: '1px solid rgba(0,0,0,0.2)',
				background: disabled ? 'rgba(0,0,0,0.05)' : 'white',
				cursor: disabled ? 'not-allowed' : 'pointer',
			}}
		>
			{children}
		</button>
	);
}
