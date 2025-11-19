'use client';

import { useState } from 'react';

interface DeleteButtonProps {
  code: string;
  onSuccess?: () => void;
}

export function DeleteButton({ code, onSuccess }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this link?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/links/${code}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete link');
      }

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1 rounded text-sm font-medium bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </>
  );
}
