'use client';

import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}
