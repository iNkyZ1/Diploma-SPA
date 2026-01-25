import { Link } from 'react-router-dom';
import { Button } from '../../shared/ui/Button';

export function HomePage() {
	return (
		<div
			style={{
				width: '100vw',
				marginLeft: 'calc(50% - 50vw)',
				marginRight: 'calc(50% - 50vw)',

				minHeight: '72vh',
				backgroundImage: "url('/images/homepage-bg.webp')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				position: 'relative',
				display: 'grid',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.10) 100%)',
				}}
			/>

			<div
				style={{
					position: 'relative',
					maxWidth: 1100,
					margin: '0 auto',
					width: '100%',
					padding: '28px 16px',
					display: 'grid',
					gap: 14,
				}}
			>
				<div style={{ display: 'grid', gap: 10, maxWidth: 620 }}>
					<h1
						style={{
							margin: 0,
							color: 'white',
							fontSize: 42,
							lineHeight: 1.1,
							letterSpacing: 0.2,
							textShadow: '0 2px 12px rgba(0,0,0,0.35)',
						}}
					>
						Отель “Жемчужина Байкала”
					</h1>

					<div
						style={{
							background: 'rgba(255,255,255,0.18)',
							border: '1px solid rgba(255,255,255,0.25)',
							borderRadius: 14,
							padding: '12px 14px',
							color: 'rgba(255,255,255,0.92)',
							backdropFilter: 'blur(6px)',
						}}
					>
						<div style={{ fontSize: 14, opacity: 0.95 }}>
							Комфортные номера, уютная атмосфера и сервис для отдыха на
							Байкале.
						</div>
					</div>

					<Link to="/rooms" style={{ width: 'fit-content' }}>
						<Button>Перейти к номерам</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
