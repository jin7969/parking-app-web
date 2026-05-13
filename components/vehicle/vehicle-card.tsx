'use client';

import { COLORS } from '@/constants/colors';
import { CAR_COLORS, CAR_TYPES } from '@/constants/vehicle';
import { Vehicle } from '@/types/vehicle';
import { isLightColor, formatPhone } from '@/utils/format';
import { CarIcon } from './car-icon';

export function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
  onCall,
}: {
  vehicle: Vehicle;
  onEdit: () => void;
  onDelete: () => void;
  onCall: () => void;
}) {
  const typeName = CAR_TYPES.find((t) => t.id === vehicle.bodyType)?.label ?? '';
  const colorName = CAR_COLORS.find((c) => c.hex === vehicle.color)?.label ?? '';

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: COLORS.card }}>
      <div className="flex p-4 gap-3.5">
        <div
          className="w-22 h-22 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: COLORS.bg, width: 88, height: 88 }}
        >
          <CarIcon type={vehicle.bodyType} color={vehicle.color} size={64} />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
          <p className="text-xl font-bold tracking-tight" style={{ color: COLORS.text }}>
            {vehicle.plateNumber}
          </p>
          <div className="flex gap-1.5 flex-wrap">
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-md"
              style={{ backgroundColor: COLORS.bg, color: COLORS.textSub }}
            >
              {typeName}
            </span>
            <span
              className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md"
              style={{ backgroundColor: vehicle.color + '22', color: COLORS.textSub }}
            >
              <span
                className="w-2 h-2 rounded-full border"
                style={{
                  backgroundColor: vehicle.color,
                  borderColor: isLightColor(vehicle.color) ? '#CBD5E1' : 'transparent',
                }}
              />
              {colorName}
            </span>
          </div>
          <p className="text-sm font-medium" style={{ color: COLORS.textSub }}>
            {formatPhone(vehicle.phoneNumber)}
          </p>
          {!!vehicle.description && (
            <p className="text-[13px] truncate" style={{ color: COLORS.textMuted }}>
              {vehicle.description}
            </p>
          )}
        </div>
      </div>

      <div
        className="flex items-center justify-between px-4 py-2.5 border-t"
        style={{ borderColor: COLORS.border }}
      >
        <button
          onClick={onCall}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: COLORS.successLight, color: COLORS.success }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          전화 연결
        </button>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: COLORS.bg }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: COLORS.dangerLight }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.danger} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
