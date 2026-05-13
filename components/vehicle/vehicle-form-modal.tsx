'use client';

import { useState, useEffect, useRef } from 'react';

import { COLORS } from '@/constants/colors';
import { FormState, BodyType } from '@/types/vehicle';
import { CarIcon } from './car-icon';
import { CarTypeSelector } from './car-type-selector';
import { ColorPicker } from './color-picker';
import { formatPhone } from '@/utils/format';

type FormErrors = Partial<Record<keyof FormState, string>>;

export function VehicleFormModal({
  visible,
  initial,
  editingId,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  initial: FormState;
  editingId: string | null;
  onClose: () => void;
  onSubmit: (form: FormState) => void;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      setForm(initial);
      setErrors({});
    }
  }, [visible, initial]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  if (!visible) return null;

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.plateNumber.trim()) next.plateNumber = '차량 번호를 입력해주세요';
    if (!form.phoneNumber.trim()) next.phoneNumber = '전화 번호를 입력해주세요';
    else if (form.phoneNumber.replace(/\D/g, '').length < 9) next.phoneNumber = '올바른 전화 번호를 입력해주세요';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(form);
  };

  const isEdit = editingId !== null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ backgroundColor: COLORS.overlay }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="w-full rounded-t-3xl flex flex-col"
        style={{ backgroundColor: COLORS.card, maxHeight: '92dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 핸들 */}
        <div className="flex justify-center pt-2.5">
          <div className="w-9 h-1 rounded-full" style={{ backgroundColor: COLORS.border }} />
        </div>

        {/* 헤더 */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{ borderColor: COLORS.border }}
        >
          <button onClick={onClose} className="min-w-12 text-[15px]" style={{ color: COLORS.textSub }}>
            취소
          </button>
          <span className="text-[17px] font-bold" style={{ color: COLORS.text }}>
            {isEdit ? '차량 수정' : '차량 등록'}
          </span>
          <button
            onClick={handleSubmit}
            className="min-w-12 text-right text-[15px] font-bold"
            style={{ color: COLORS.primary }}
          >
            {isEdit ? '저장' : '등록'}
          </button>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* 미리보기 */}
          <div
            className="flex items-center justify-center rounded-2xl py-6 mb-6"
            style={{ backgroundColor: COLORS.bg }}
          >
            <CarIcon type={form.bodyType} color={form.color} size={88} />
          </div>

          {/* 차체 타입 */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2.5" style={{ color: COLORS.text }}>
              차체 타입 <span style={{ color: COLORS.danger }}>*</span>
            </label>
            <CarTypeSelector selected={form.bodyType} onChange={(t: BodyType) => set('bodyType', t)} />
          </div>

          {/* 색상 */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2.5" style={{ color: COLORS.text }}>
              색상 <span style={{ color: COLORS.danger }}>*</span>
            </label>
            <ColorPicker selected={form.color} onChange={(hex) => set('color', hex)} />
          </div>

          {/* 차량 번호 */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2.5" style={{ color: COLORS.text }}>
              차량 번호 <span style={{ color: COLORS.danger }}>*</span>
            </label>
            <input
              type="text"
              placeholder="예: 123가 4567"
              value={form.plateNumber}
              onChange={(e) => set('plateNumber', e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl text-base outline-none border-[1.5px] transition-colors"
              style={{
                backgroundColor: errors.plateNumber ? COLORS.dangerLight : COLORS.inputBg,
                borderColor: errors.plateNumber ? COLORS.danger : COLORS.border,
                color: COLORS.text,
              }}
            />
            {errors.plateNumber && (
              <p className="text-xs mt-1 ml-1" style={{ color: COLORS.danger }}>{errors.plateNumber}</p>
            )}
          </div>

          {/* 전화 번호 */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2.5" style={{ color: COLORS.text }}>
              전화 번호 <span style={{ color: COLORS.danger }}>*</span>
            </label>
            <input
              type="tel"
              placeholder="예: 010-1234-5678"
              value={form.phoneNumber}
              onChange={(e) => set('phoneNumber', e.target.value.replace(/\D/g, '').slice(0, 11))}
              className="w-full px-3.5 py-3 rounded-xl text-base outline-none border-[1.5px] transition-colors"
              style={{
                backgroundColor: errors.phoneNumber ? COLORS.dangerLight : COLORS.inputBg,
                borderColor: errors.phoneNumber ? COLORS.danger : COLORS.border,
                color: COLORS.text,
              }}
            />
            {form.phoneNumber.length > 0 && (
              <p className="text-xs mt-1 ml-1 font-medium" style={{ color: COLORS.primary }}>
                {formatPhone(form.phoneNumber)}
              </p>
            )}
            {errors.phoneNumber && (
              <p className="text-xs mt-1 ml-1" style={{ color: COLORS.danger }}>{errors.phoneNumber}</p>
            )}
          </div>

          {/* 설명 */}
          <div className="mb-10">
            <label className="block text-sm font-semibold mb-2.5" style={{ color: COLORS.text }}>
              설명 <span className="font-normal" style={{ color: COLORS.textMuted }}>(선택)</span>
            </label>
            <input
              type="text"
              placeholder="예: 201호, 옆집 차량 등"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl text-base outline-none border-[1.5px]"
              style={{
                backgroundColor: COLORS.inputBg,
                borderColor: COLORS.border,
                color: COLORS.text,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
