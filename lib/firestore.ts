import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '@/lib/firebase';
import { FormState, Vehicle } from '@/types/vehicle';
import { AppUser } from '@/types/user';

export async function saveUser(uid: string, data: Partial<AppUser>) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { ...data, address: null, fcmToken: null, createdAt: serverTimestamp() });
  }
}

export async function getUser(uid: string): Promise<AppUser | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as AppUser) : null;
}

export async function updateUser(uid: string, data: Partial<AppUser>) {
  await updateDoc(doc(db, 'users', uid), data);
}

export function subscribeVehicles(uid: string, onData: (vehicles: Vehicle[]) => void) {
  return onSnapshot(collection(db, 'users', uid, 'vehicles'), (snap) => {
    const vehicles = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Vehicle));
    onData(vehicles);
  });
}

export async function addVehicle(uid: string, form: FormState) {
  await addDoc(collection(db, 'users', uid, 'vehicles'), {
    ...form,
    description: form.description || null,
    createdAt: serverTimestamp(),
  });
}

export async function updateVehicle(uid: string, vehicleId: string, form: FormState) {
  await updateDoc(doc(db, 'users', uid, 'vehicles', vehicleId), {
    ...form,
    description: form.description || null,
  });
}

export async function deleteVehicle(uid: string, vehicleId: string) {
  await deleteDoc(doc(db, 'users', uid, 'vehicles', vehicleId));
}
