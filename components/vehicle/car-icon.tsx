import { BodyType } from '@/types/vehicle';

interface CarIconProps {
  type: BodyType;
  color?: string;
  size?: number;
}

function CompactIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path
        d="M6 30 Q6 22 10 22 L14 16 Q16 13 20 13 L28 13 Q32 13 34 16 L38 22 Q42 22 42 30 L42 35 Q42 37 40 37 L8 37 Q6 37 6 35 Z"
        fill={color}
      />
      <path d="M34 22 L31 15 Q29.5 13.5 28 13.5 L20 13.5 Q18.5 13.5 17 15 L14 22 Z" fill="rgba(255,255,255,0.3)" />
      <rect x="7" y="35" width="8" height="3" rx="1.5" fill={color} />
      <rect x="33" y="35" width="8" height="3" rx="1.5" fill={color} />
      <circle cx="14" cy="37" r="5" fill="#374151" />
      <circle cx="14" cy="37" r="2.5" fill="#9CA3AF" />
      <circle cx="34" cy="37" r="5" fill="#374151" />
      <circle cx="34" cy="37" r="2.5" fill="#9CA3AF" />
    </svg>
  );
}

function SedanIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="4" y="30" width="40" height="8" rx="2" fill={color} />
      <path d="M11 30 L13 20 Q14 17 17 17 L31 17 Q34 17 35 20 L37 30 Z" fill={color} />
      <path d="M35 30 L33.5 21 Q32.5 18 31 18 L28 18 L26 30 Z" fill="rgba(255,255,255,0.3)" />
      <path d="M13 30 L14.5 21 Q15.5 18 17 18 L20 18 L22 30 Z" fill="rgba(255,255,255,0.3)" />
      <path d="M37 30 L40 30 Q43 30 43 33 L43 35 L37 35 Z" fill={color} />
      <path d="M11 30 L8 30 Q5 30 5 33 L5 35 L11 35 Z" fill={color} />
      <circle cx="13" cy="38" r="5" fill="#374151" />
      <circle cx="13" cy="38" r="2.5" fill="#9CA3AF" />
      <circle cx="35" cy="38" r="5" fill="#374151" />
      <circle cx="35" cy="38" r="2.5" fill="#9CA3AF" />
    </svg>
  );
}

function SuvIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="4" y="26" width="40" height="10" rx="2" fill={color} />
      <rect x="9" y="14" width="30" height="13" rx="2" fill={color} />
      <path d="M36 27 L37 18 L34 15 L34 27 Z" fill="rgba(255,255,255,0.3)" />
      <path d="M12 27 L11 18 L14 15 L14 27 Z" fill="rgba(255,255,255,0.3)" />
      <rect x="10" y="13" width="28" height="2" rx="1" fill={color} />
      <rect x="38" y="28" width="5" height="6" rx="1" fill={color} />
      <rect x="5" y="28" width="5" height="6" rx="1" fill={color} />
      <circle cx="13" cy="37" r="6" fill="#374151" />
      <circle cx="13" cy="37" r="3" fill="#9CA3AF" />
      <circle cx="35" cy="37" r="6" fill="#374151" />
      <circle cx="35" cy="37" r="3" fill="#9CA3AF" />
    </svg>
  );
}

function VanIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="4" y="16" width="40" height="20" rx="2" fill={color} />
      <rect x="31" y="18" width="10" height="9" rx="1.5" fill="rgba(255,255,255,0.3)" />
      <rect x="17" y="18" width="12" height="9" rx="1.5" fill="rgba(255,255,255,0.3)" />
      <line x1="16" y1="16" x2="16" y2="36" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <line x1="29" y1="16" x2="29" y2="36" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <rect x="40" y="28" width="4" height="6" rx="1" fill={color} />
      <rect x="4" y="28" width="4" height="6" rx="1" fill={color} />
      <circle cx="12" cy="37" r="5.5" fill="#374151" />
      <circle cx="12" cy="37" r="2.5" fill="#9CA3AF" />
      <circle cx="36" cy="37" r="5.5" fill="#374151" />
      <circle cx="36" cy="37" r="2.5" fill="#9CA3AF" />
    </svg>
  );
}

function TruckIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="4" y="20" width="24" height="16" rx="1.5" fill={color} />
      <rect x="4" y="20" width="24" height="3" rx="1" fill="rgba(0,0,0,0.15)" />
      <line x1="12" y1="20" x2="12" y2="36" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <line x1="20" y1="20" x2="20" y2="36" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <rect x="28" y="22" width="16" height="14" rx="2" fill={color} />
      <rect x="30" y="24" width="12" height="8" rx="1.5" fill="rgba(255,255,255,0.3)" />
      <rect x="29" y="20" width="14" height="3" rx="1" fill={color} />
      <rect x="42" y="28" width="3" height="7" rx="1" fill={color} />
      <circle cx="12" cy="37" r="5.5" fill="#374151" />
      <circle cx="12" cy="37" r="2.5" fill="#9CA3AF" />
      <circle cx="37" cy="37" r="5.5" fill="#374151" />
      <circle cx="37" cy="37" r="2.5" fill="#9CA3AF" />
    </svg>
  );
}

export function CarIcon({ type, color = '#3B82F6', size = 48 }: CarIconProps) {
  switch (type) {
    case 'compact': return <CompactIcon color={color} size={size} />;
    case 'sedan':   return <SedanIcon color={color} size={size} />;
    case 'suv':     return <SuvIcon color={color} size={size} />;
    case 'van':     return <VanIcon color={color} size={size} />;
    case 'truck':   return <TruckIcon color={color} size={size} />;
  }
}
