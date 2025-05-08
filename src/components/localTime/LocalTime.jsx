'use client';
import { useLocalTime } from '@/utils/useLocalTime';
import { Loader } from 'lucide-react';

export default function LocalTime() {
  const localTime = useLocalTime();

  return !localTime ? (
    <Loader size={20} className="animate-spin text-white mx-4" />
  ) : (
    <p className="m-0 font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap px-4">
      Fecha y hora servidor DMS: {localTime}
    </p>
  );
}
