'use client';

import { COLORS } from '@/constants/colors';
import { CAR_TYPES } from '@/constants/vehicle';
import { Vehicle } from '@/types/vehicle';
import { formatPhone } from '@/utils/format';

export function CallConfirmModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle | null;
  onClose: () => void;
}) {
  if (!vehicle) return null;

  const typeName = CAR_TYPES.find((t) => t.id === vehicle.bodyType)?.label ?? '';

  const handleCall = () => {
    window.location.href = `tel:${vehicle.phoneNumber}`;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{ backgroundColor: COLORS.overlay }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl p-7 flex flex-col items-center gap-1.5 shadow-2xl"
        style={{ backgroundColor: COLORS.card }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-1.5"
          style={{ backgroundColor: COLORS.successLight }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill={COLORS.success}>
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </div>
        <p className="text-lg font-bold" style={{ color: COLORS.text }}>전화 연결</p>
        <p className="text-2xl font-extrabold tracking-tight mt-0.5" style={{ color: COLORS.text }}>
          {vehicle.plateNumber}
        </p>
        <p className="text-sm" style={{ color: COLORS.textSub }}>
          {typeName} · {formatPhone(vehicle.phoneNumber)}
        </p>
        {!!vehicle.description && (
          <span
            className="text-[13px] px-3 py-1 rounded-lg"
            style={{ backgroundColor: COLORS.bg, color: COLORS.textMuted }}
          >
            {vehicle.description}
          </span>
        )}
        <p className="text-sm text-center mt-2 leading-5" style={{ color: COLORS.textSub }}>
          위 번호로 전화를 연결하시겠습니까?
        </p>

        <div className="flex gap-2.5 mt-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl text-[15px] font-semibold"
            style={{ backgroundColor: COLORS.bg, color: COLORS.textSub }}
          >
            취소
          </button>
          <button
            onClick={handleCall}
            className="py-3.5 rounded-2xl text-[15px] font-bold text-white"
            style={{ backgroundColor: COLORS.success, flex: 1.5 }}
          >
            전화 연결
          </button>
        </div>
      </div>
    </div>
  );
}
