'use client';

import Link from 'next/link';
import { CopyButton } from './CopyButton';
import { DeleteButton } from './DeleteButton';

interface LinkData {
  code: string;
  targetUrl: string;
  clicks: number;
  createdAt: string;
  lastClicked: string | null;
}

interface LinksTableProps {
  links: LinkData[];
  onDelete?: () => void;
  searchQuery?: string;
}

export function LinksTable({
  links,
  onDelete,
  searchQuery = '',
}: LinksTableProps) {
  const filteredLinks = links.filter(
    (link) =>
      link.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.targetUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (links.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">No links yet. Create one to get started!</p>
      </div>
    );
  }

  if (filteredLinks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No links match your search.</p>
      </div>
    );
  }

  const truncateUrl = (url: string, maxLength: number = 50) => {
    return url.length > maxLength ? url.slice(0, maxLength) + '...' : url;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Code
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Target URL
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Clicks
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Created
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Last Clicked
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredLinks.map((link) => (
            <tr key={link.code} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <Link
                  href={`/${link.code}/stats`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {link.code}
                </Link>
              </td>
              <td className="px-6 py-4">
                <div
                  title={link.targetUrl}
                  className="text-gray-600 text-sm truncate"
                >
                  {truncateUrl(link.targetUrl)}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-900 font-medium">{link.clicks}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(link.createdAt)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {link.lastClicked ? formatDate(link.lastClicked) : '—'}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <CopyButton
                    text={`${baseUrl}/${link.code}`}
                  />
                  <DeleteButton code={link.code} onSuccess={onDelete} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
