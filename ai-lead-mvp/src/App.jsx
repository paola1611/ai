import { useState } from 'react';
import SubmissionForm from './components/SubmissionForm';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('form');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">
              AI Lead Classifier
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage('form')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 'form'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Submit Lead
              </button>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 'dashboard'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {currentPage === 'form' && (
          <SubmissionForm
            onSuccess={() => {
              alert('Lead submitted and classified successfully!');
              setCurrentPage('dashboard');
            }}
          />
        )}
        {currentPage === 'dashboard' && <Dashboard />}
      </main>
    </div>
  );
}

export default App;
