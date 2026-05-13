export type BodyType = 'compact' | 'sedan' | 'suv' | 'van' | 'truck';

export interface Vehicle {
  id: string;
  plateNumber: string;
  phoneNumber: string;
  bodyType: BodyType;
  color: string;
  description?: string;
}

export interface FormState {
  plateNumber: string;
  phoneNumber: string;
  bodyType: BodyType;
  color: string;
  description: string;
}
