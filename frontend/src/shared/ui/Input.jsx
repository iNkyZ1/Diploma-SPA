export function Input({ label, error, ...props }) {
	return (
		<label style={{ display: 'grid', gap: 6 }}>
			{label && <span style={{ fontSize: 14 }}>{label}</span>}
			<input
				{...props}
				style={{
					padding: '10px 12px',
					borderRadius: 10,
					border: `1px solid ${error ? 'crimson' : 'rgba(0,0,0,0.2)'}`,
					outline: 'none',
				}}
			/>
			{error && <span style={{ color: 'crimson', fontSize: 12 }}>{error}</span>}
		</label>
	);
}
