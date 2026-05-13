'use client';

import { COLORS } from '@/constants/colors';
import { CAR_COLORS } from '@/constants/vehicle';
import { isLightColor } from '@/utils/format';

export function ColorPicker({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (hex: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {CAR_COLORS.map(({ hex, label }) => {
        const active = selected === hex;
        const light = isLightColor(hex);
        return (
          <button
            key={hex}
            type="button"
            onClick={() => onChange(hex)}
            className="flex flex-col items-center gap-1"
            style={{ width: '17%' }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: hex,
                border: active
                  ? `2.5px solid ${COLORS.primary}`
                  : light
                  ? `1.5px solid ${COLORS.border}`
                  : 'none',
              }}
            >
              {active && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8L6.5 11.5L13 5"
                    stroke={light ? '#374151' : '#FFFFFF'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              className="text-[9px] text-center"
              style={{ color: active ? COLORS.primary : COLORS.textMuted, fontWeight: active ? 600 : 400 }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
