'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { VehicleFormModal } from '@/components/vehicle/vehicle-form-modal';
import { CallConfirmModal } from '@/components/vehicle/call-confirm-modal';
import { CarIcon } from '@/components/vehicle/car-icon';
import { COLORS } from '@/constants/colors';
import { INITIAL_FORM } from '@/constants/vehicle';
import { useAuth } from '@/hooks/use-auth';
import { addVehicle, deleteVehicle, subscribeVehicles, updateVehicle } from '@/lib/firestore';
import { signOutAll } from '@/lib/auth';
import { registerPushToken } from '@/lib/notifications';
import { FormState, Vehicle } from '@/types/vehicle';

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pb-16 gap-2.5">
      <div
        className="w-28 h-28 rounded-3xl flex items-center justify-center mb-2 shadow-sm"
        style={{ backgroundColor: COLORS.card }}
      >
        <CarIcon type="sedan" color="#CBD5E1" size={80} />
      </div>
      <p className="text-[17px] font-semibold" style={{ color: COLORS.text }}>등록된 차량이 없습니다</p>
      <p className="text-sm text-center" style={{ color: COLORS.textSub }}>아래 버튼을 눌러 첫 차량을 등록해보세요</p>
    </div>
  );
}

export default function VehiclesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formInitial, setFormInitial] = useState<FormState>(INITIAL_FORM);
  const [callingVehicle, setCallingVehicle] = useState<Vehicle | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace('/login'); return; }
    registerPushToken(user.uid);
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    return subscribeVehicles(user.uid, setVehicles);
  }, [user]);

  const openAdd = () => {
    setEditingId(null);
    setFormInitial(INITIAL_FORM);
    setFormVisible(true);
  };

  const openEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setFormInitial({
      plateNumber: vehicle.plateNumber,
      phoneNumber: vehicle.phoneNumber,
      bodyType: vehicle.bodyType,
      color: vehicle.color,
      description: vehicle.description ?? '',
    });
    setFormVisible(true);
  };

  const handleDelete = async () => {
    if (!user || !deleteTarget) return;
    await deleteVehicle(user.uid, deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleSubmit = async (form: FormState) => {
    if (!user) return;
    if (editingId) {
      await updateVehicle(user.uid, editingId, form);
    } else {
      await addVehicle(user.uid, form);
    }
    setFormVisible(false);
  };

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center" style={{ backgroundColor: COLORS.bg }}>
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: COLORS.bg }}>
      {/* 헤더 */}
      <header
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.border }}
      >
        <div>
          <h1 className="text-[22px] font-bold tracking-tight" style={{ color: COLORS.text }}>내 차량</h1>
          <p className="text-[13px] mt-0.5" style={{ color: COLORS.textSub }}>
            {vehicles.length > 0 ? `총 ${vehicles.length}대 등록됨` : '차량을 등록해보세요'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openAdd}
            className="px-4 py-2 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: COLORS.primary }}
          >
            + 차량 등록
          </button>
          <button
            onClick={() => signOutAll().then(() => router.replace('/login'))}
            className="px-3 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: COLORS.bg, color: COLORS.textSub }}
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* 목록 */}
      <div className="flex-1 overflow-y-auto">
        {vehicles.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="p-4 flex flex-col gap-3 pb-8">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onEdit={() => openEdit(vehicle)}
                onDelete={() => setDeleteTarget(vehicle)}
                onCall={() => setCallingVehicle(vehicle)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 차량 폼 모달 */}
      <VehicleFormModal
        visible={formVisible}
        initial={formInitial}
        editingId={editingId}
        onClose={() => setFormVisible(false)}
        onSubmit={handleSubmit}
      />

      {/* 전화 확인 모달 */}
      <CallConfirmModal vehicle={callingVehicle} onClose={() => setCallingVehicle(null)} />

      {/* 삭제 확인 모달 */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          style={{ backgroundColor: COLORS.overlay }}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 shadow-2xl"
            style={{ backgroundColor: COLORS.card }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-1" style={{ color: COLORS.text }}>차량 삭제</h2>
            <p className="text-sm mb-5" style={{ color: COLORS.textSub }}>
              {deleteTarget.plateNumber} 차량을 삭제하시겠습니까?
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3.5 rounded-2xl text-[15px] font-semibold"
                style={{ backgroundColor: COLORS.bg, color: COLORS.textSub }}
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3.5 rounded-2xl text-[15px] font-bold text-white"
                style={{ backgroundColor: COLORS.danger }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
