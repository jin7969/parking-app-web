'use client';

import { COLORS } from '@/constants/colors';
import { CAR_TYPES } from '@/constants/vehicle';
import { BodyType } from '@/types/vehicle';
import { CarIcon } from './car-icon';

export function CarTypeSelector({
  selected,
  onChange,
}: {
  selected: BodyType;
  onChange: (type: BodyType) => void;
}) {
  return (
    <div className="flex gap-1.5 justify-between">
      {CAR_TYPES.map(({ id, label }) => {
        const active = selected === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className="flex-1 flex flex-col items-center py-2.5 px-1 rounded-xl gap-1.5 border-[1.5px] transition-all"
            style={{
              backgroundColor: active ? COLORS.primaryLight : COLORS.bg,
              borderColor: active ? COLORS.primary : 'transparent',
            }}
          >
            <CarIcon type={id} color={active ? COLORS.primary : '#94A3B8'} size={48} />
            <span
              className="text-[11px] font-medium"
              style={{ color: active ? COLORS.primary : COLORS.textSub, fontWeight: active ? 700 : 500 }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
