'use client';

import { useState, useEffect } from 'react';
import { LinkForm } from '@/components/LinkForm';
import { LinksTable } from '@/components/LinksTable';

interface Link {
  code: string;
  targetUrl: string;
  clicks: number;
  createdAt: string;
  lastClicked: string | null;
}

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLinks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/links');
      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }
      const data = await response.json();
      setLinks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Manage and track your shortened URLs
          </p>
        </div>

        <LinkForm onSuccess={fetchLinks} />

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by code or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading links...</p>
          </div>
        ) : (
          <LinksTable
            links={links}
            onDelete={fetchLinks}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </div>
  );
}
