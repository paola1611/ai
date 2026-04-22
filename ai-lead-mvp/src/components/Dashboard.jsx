import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/dashboard');

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'Sales':
        return 'bg-green-100 text-green-800';
      case 'Support':
        return 'bg-blue-100 text-blue-800';
      case 'Other':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h2>
        <button
          onClick={fetchSubmissions}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading && !error ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No submissions yet. Submit a lead to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-50 border-b-2 border-indigo-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Classification
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr
                  key={submission.id || index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {submission.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <a
                      href={`mailto:${submission.email}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {submission.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">
                    {submission.message}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full font-medium ${getClassificationColor(
                        submission.classification
                      )}`}
                    >
                      {submission.classification}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(submission.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Total Submissions:</span> {submissions.length}
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Sales:</span>{' '}
          {submissions.filter((s) => s.classification === 'Sales').length} |
          <span className="font-semibold ml-4">Support:</span>{' '}
          {submissions.filter((s) => s.classification === 'Support').length} |
          <span className="font-semibold ml-4">Other:</span>{' '}
          {submissions.filter((s) => s.classification === 'Other').length}
        </p>
      </div>
    </div>
  );
}
