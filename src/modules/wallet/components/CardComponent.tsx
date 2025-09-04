import type { CardInfo } from '../types/index';

interface CardComponentProps {
  card: CardInfo;
}

const Logo = () => (
  <svg className="logo" width="71" height="40" viewBox="0 0 71 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M70.5882 11.3319C70.5882 17.5656 65.4932 22.6653 59.2651 22.6653H48.3227L70.5882 40H55.3943L32.5438 22.6653H30.7979L30.0911 26.3852L27.5031 40H6.68511C3.00823 40 0 36.989 0 33.3088V6.69118C0 3.01096 3.00823 0 6.68511 0H35.1067L32.6731 12.8072H13.5539C12.8397 12.8072 12.2548 13.3927 12.2548 14.1075V25.0864C12.2548 25.8013 12.8397 26.3867 13.5539 26.3867H22.4537L23.3193 22.5829H18.1713L19.2779 16.7081H53.9026C54.974 16.7081 55.8513 15.83 55.8513 14.7577C55.8513 13.6854 54.974 12.8072 53.9026 12.8072H38.3472L40.7823 0H59.2651C65.4932 0 70.5882 5.09965 70.5882 11.3334V11.3319Z" fill="#fff"></path>
  </svg>
);

export function CardComponent({ card }: CardComponentProps) {
  return (
    <div
      className="relative m-auto h-52 w-80 sm:h-60 sm:w-96 rounded-3xl shadow-2xl overflow-hidden group cursor-pointer select-none transition-transform duration-300 ease-[cubic-bezier(.4,1.6,.4,1)] focus:outline-none"
      style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
      tabIndex={0}
      role="button"
      aria-label="Tarjeta de usuario"
    >
      {/* Escalado animado al hover/click, sin borde, sombra más fuerte */}
      <style>{`
        .group:hover, .group:focus {
          transform: scale(1.08);
          box-shadow: 0 12px 48px 0 rgba(0,0,0,0.35), 0 2px 8px 0 rgba(0,0,0,0.10);
        }
        .group:active {
          transform: scale(1.12);
          box-shadow: 0 20px 60px 0 rgba(0,0,0,0.40);
        }
      `}</style>
  {/* Fondo glassmorphism y decoraciones */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 via-blue-700/80 to-[#0033cc]/95 backdrop-blur-xl z-0" />  {/* Brillo animado */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl animate-pulse z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl z-10" />
  {/* Líneas decorativas SVG */}
      <svg className="absolute left-0 top-0 w-full h-full z-20 pointer-events-none" width="100%" height="100%" viewBox="0 0 400 240" fill="none">
        <defs>
          <linearGradient id="cardLine" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity="0.15" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d="M20 60 Q200 0 380 60" stroke="url(#cardLine)" strokeWidth="3" fill="none" />
        <path d="M30 180 Q200 240 370 180" stroke="url(#cardLine)" strokeWidth="2" fill="none" />
      </svg>
  {/* Contenido principal */}
      <div className="relative z-30 h-full w-full flex flex-col justify-between px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-light text-xs text-blue-100/80 tracking-wide">Titular</p>
            <p className="font-semibold tracking-widest text-lg text-white drop-shadow-lg">{card.userName}</p>
          </div>
          <Logo />
        </div>
        <div className="pt-2">
          <p className="font-light text-xs text-blue-100/80">Nº Tarjeta</p>
          <p className="tracking-widest font-bold text-xl text-white/90 drop-shadow-lg select-all">
            {card.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
          </p>
        </div>
        <div className="flex justify-between items-end pt-4">
          <div>
            <p className="text-xs font-light text-blue-100/80">Saldo</p>
            <p className="text-lg font-bold tracking-widest text-green-200 drop-shadow">€{card.balance.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs font-light text-blue-100/80">Vence</p>
            <p className="text-base font-semibold tracking-widest text-white/80">
              {new Date(card.expiryDate).toLocaleDateString('es-ES', { month: '2-digit', year: '2-digit' })}
            </p>
          </div>
          <div>
            <p className="text-xs font-light text-blue-100/80">Estado</p>
            <p className={`tracking-widest text-sm font-bold ${
              card.status === 'active'
                ? 'text-green-300'
                : card.status === 'inactive'
                ? 'text-yellow-200'
                : 'text-red-300'
            } drop-shadow`}
            >
              {card.status === 'active'
                ? 'Activa'
                : card.status === 'inactive'
                ? 'Inactiva'
                : 'Bloqueada'}
            </p>
          </div>
        </div>
      </div>
  {/* Efecto de reflejo animado */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-40">
        <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-gradient-to-br from-white/30 to-transparent rounded-3xl blur-2xl opacity-60 animate-pulse" />
      </div>
  {/* Eliminado borde animado para un look más limpio */}
  </div>
  );
}