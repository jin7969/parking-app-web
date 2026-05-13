import { BodyType, FormState } from '@/types/vehicle';

export const CAR_TYPES: { id: BodyType; label: string }[] = [
  { id: 'compact', label: '경차' },
  { id: 'sedan', label: '세단' },
  { id: 'suv', label: 'SUV' },
  { id: 'van', label: '밴' },
  { id: 'truck', label: '트럭' },
];

export const CAR_COLORS: { hex: string; label: string }[] = [
  { hex: '#F5F5F5', label: '흰색' },
  { hex: '#F0EAD6', label: '아이보리' },
  { hex: '#C0C4CC', label: '실버' },
  { hex: '#6B7280', label: '회색' },
  { hex: '#1C1C1E', label: '검정' },
  { hex: '#E53E3E', label: '빨강' },
  { hex: '#3B82F6', label: '파랑' },
  { hex: '#1E3A8A', label: '네이비' },
  { hex: '#16A34A', label: '초록' },
  { hex: '#6B3F2A', label: '브라운' },
];

export const INITIAL_FORM: FormState = {
  plateNumber: '',
  phoneNumber: '',
  bodyType: 'sedan',
  color: '#C0C4CC',
  description: '',
};
