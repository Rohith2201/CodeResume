import React, { useState } from 'react';
import { Trash2, CheckCircle2, Archive, MoreVertical, Building2, Calendar, ChevronDown } from 'lucide-react';
import type { JobScan } from '../../types/jobScan';

interface JobScanHistoryProps {
  scans: JobScan[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: 'applied' | 'saved' | 'archived') => void;
}

export function JobScanHistory({ scans, onDelete, onUpdateStatus }: JobScanHistoryProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'saved':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'archived':
        return 'bg-gray-50 text-gray-700 border-gray-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleMenuClick = (id: string) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(id);
    }
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && !(event.target as Element).closest('.menu-container')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Application History</h2>
        <div className="space-y-4">
          {scans.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No job scans yet</h3>
              <p className="text-gray-500">
                Start by analyzing a job description to track your applications
              </p>
            </div>
          ) : (
            scans.map((scan) => (
              <div
                key={scan.id}
                className="border rounded-lg p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{scan.jobTitle}</h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {scan.companyName}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Scanned on {formatDate(scan.dateScanned)}</span>
                      </div>
                      <div className={`font-medium ${getScoreColor(scan.matchScore)}`}>
                        {scan.matchScore}% Match
                      </div>
                    </div>
                  </div>
                  <div className="relative menu-container">
                    <button
                      onClick={() => handleMenuClick(scan.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                    {openMenuId === scan.id && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 animate-fadeIn">
                        <button
                          onClick={() => {
                            onUpdateStatus(scan.id, 'applied');
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Mark as Applied
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(scan.id, 'archived');
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Archive className="h-4 w-4 text-gray-500" />
                          Archive
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={() => {
                            onDelete(scan.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      scan.status
                    )}`}
                  >
                    {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}