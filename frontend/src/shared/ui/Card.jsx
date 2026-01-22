export function Card({ children }) {
	return (
		<div
			style={{
				border: '1px solid rgba(0,0,0,0.12)',
				borderRadius: 14,
				padding: 12,
			}}
		>
			{children}
		</div>
	);
}
