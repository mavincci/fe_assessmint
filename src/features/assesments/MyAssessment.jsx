import React from 'react';

const ResultsRanking = () => {
  // Hardcoded data matching the image
  const candidates = [
    { rank: 1, name: 'John Doe', email: 'john@example.com', score: '96/100', timeSpent: '56 min', status: 'Passed' },
    { rank: 2, name: 'John Doe', email: 'john@example.com', score: '90/100', timeSpent: '58 min', status: 'Passed' },
    { rank: 3, name: 'John Doe', email: 'john@example.com', score: '89/100', timeSpent: '1 hr', status: 'Passed' },
    { rank: 4, name: 'John Doe', email: 'john@example.com', score: '80/100', timeSpent: '1:10 hr', status: 'Passed' },
    { rank: 5, name: 'John Doe', email: 'john@example.com', score: '70/100', timeSpent: '1:20 hr', status: 'Passed' },
    { rank: 6, name: 'John Doe', email: 'john@example.com', score: '60/100', timeSpent: '1:22 hr', status: 'Passed' },
    { rank: 7, name: 'John Doe', email: 'john@example.com', score: '50/100', timeSpent: '1:24 hr', status: 'Passed' },
    { rank: 8, name: 'John Doe', email: 'john@example.com', score: '40/100', timeSpent: '1:26 hr', status: 'Failed' },
  ];

  // Function to render rank with icons for top 3
  const renderRank = (rank) => {
    if (rank === 1) return <span className="text-yellow-500 text-xl">🏆 {rank}</span>;
    if (rank === 2) return <span className="text-gray-400 text-xl">🥈 {rank}</span>;
    if (rank === 3) return <span className="text-yellow-600 text-xl">🥉 {rank}</span>;
    return <span className="text-gray-500">#{rank}</span>;
  };

  // Function to render status badges
  const renderStatus = (status) => {
    if (status === 'Passed') {
      return <span className="badge badge-success text-white">Passed</span>;
    } else if (status === 'Failed') {
      return <span className="badge badge-error text-white">Failed</span>;
    }
    return <span className="badge badge-warning text-gray-800">Pending</span>;
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Results Ranking
        <span className="text-sm font-normal text-gray-500 ml-2">
          performance by their assessment
        </span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr className="text-gray-600">
              <th className="text-sm">Rank</th>
              <th className="text-sm">Candidate</th>
              <th className="text-sm">Score</th>
              <th className="text-sm">Time Spent</th>
              <th className="text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.rank} className="hover:bg-gray-100">
                <td>{renderRank(candidate.rank)}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar placeholder">
                      <div className="bg-gray-200 text-gray-500 rounded-full w-10">
                        <span className="text-sm">
                          {candidate.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{candidate.name}</div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td className="text-gray-800">{candidate.score}</td>
                <td className="text-gray-800">{candidate.timeSpent}</td>
                <td>{renderStatus(candidate.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsRanking;