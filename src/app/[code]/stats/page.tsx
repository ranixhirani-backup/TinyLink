'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CopyButton } from '@/components/CopyButton';

interface LinkData {
  code: string;
  targetUrl: string;
  clicks: number;
  createdAt: string;
  lastClicked: string | null;
}

export default function StatsPage({ params }: { params: { code: string } }) {
  const [link, setLink] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/links/${params.code}`);
        if (!response.ok) {
          throw new Error('Link not found');
        }
        const data = await response.json();
        setLink(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [params.code]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const shortLink = `${baseUrl}/${params.code}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !link) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-6 mt-4">
            {error || 'Link not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-8">Link Statistics</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Code */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Short Code
              </h2>
              <p className="text-2xl font-bold text-gray-900">{link.code}</p>
            </div>

            {/* Clicks */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Total Clicks
              </h2>
              <p className="text-2xl font-bold text-gray-900">{link.clicks}</p>
            </div>

            {/* Created At */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Created At
              </h2>
              <p className="text-sm text-gray-900">{formatDate(link.createdAt)}</p>
            </div>

            {/* Last Clicked */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Last Clicked
              </h2>
              <p className="text-sm text-gray-900">
                {link.lastClicked ? formatDate(link.lastClicked) : '—'}
              </p>
            </div>
          </div>

          {/* Target URL */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">
              Target URL
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 break-all">
              <a
                href={link.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {link.targetUrl}
              </a>
            </div>
          </div>

          {/* Short Link */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">
              Short Link
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={shortLink}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <CopyButton text={shortLink} />
            </div>
          </div>

          {/* QR Code Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 Tip: You can generate a QR code for <code className="bg-white px-2 py-1 rounded">{shortLink}</code> using any QR code generator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
