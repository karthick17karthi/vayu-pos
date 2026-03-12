import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { getThemeConfig } from '../theme/designSystem.js';

export default function Table({ columns, data, title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'success':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'failed':
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`${themeConfig.classes['table-style']} shadow-md transition-theme duration-theme ease-theme`}>
      {/* Header */}
      {title && (
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 md:px-6 py-3 text-left text-xs md:text-xs font-semibold text-slate-600 dark:text-slate-200 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-200 animate-fade-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {columns.map((col) => (
                  <td
                    key={`${idx}-${col}`}
                    className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-700 dark:text-slate-200"
                  >
                    {col.toLowerCase() === 'status' ? (
                      <span
                        className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          row[col]
                        )}`}
                      >
                        {row[col]}
                      </span>
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-3 md:px-6 py-4 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length}
          </span>
          <div className="flex gap-1 md:gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1 md:p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} className="md:w-5 md:h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium ${
                  currentPage === page
                    ? 'bg-teal-500 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1 md:p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
