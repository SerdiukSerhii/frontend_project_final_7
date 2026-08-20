'use client';

import { useState } from 'react';
import ModalErrorSave from '../../../../components/ModalErrorSave/ModalErrorSave';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div>
      {isModalOpen && (
        <ModalErrorSave
          onClose={() => setIsModalOpen(false)}
          description={error.message || 'Error while saving'}
        />
      )}
    </div>
  );
}
