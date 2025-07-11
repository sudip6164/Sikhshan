import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import GradingFeedback from '../../components/GradingFeedback';

// Mock quiz data with multiple submissions
const mockQuiz = {
  id: 1,
  title: 'Programming Basics Quiz',
  course: 'CS101',
  courseName: 'Introduction to Computer Science',
  startDate: '2024-03-20',
  totalPoints: 20,
  description: 'Test your knowledge of basic programming concepts.',
  submissions: [
    {
      id: 1,
      studentName: 'John Doe',
      submittedAt: '2024-03-19T15:00:00',
      grade: 18,
      feedback: 'Great answers!'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      submittedAt: '2024-03-19T16:30:00',
      grade: null,
      feedback: ''
    },
    {
      id: 3,
      studentName: 'Alex Lee',
      submittedAt: '2024-03-20T09:10:00',
      grade: 20,
      feedback: 'Perfect score!'
    },
  ],
};

const sortOptions = [
  { value: 'studentName', label: 'Student Name' },
  { value: 'submittedAt', label: 'Submission Time' },
  { value: 'grade', label: 'Grade' },
];

export default function FacultyQuizView() {
  const { id } = useParams();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [sortBy, setSortBy] = useState('studentName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  // Sorting and filtering logic
  const filteredSubmissions = mockQuiz.submissions
    .filter(sub => sub.studentName.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === 'submittedAt') {
        valA = new Date(valA);
        valB = new Date(valB);
      }
      if (valA === null) return 1;
      if (valB === null) return -1;
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleGradeSubmit = ({ grade, feedback }) => {
    if (!selectedSubmission) return;
    selectedSubmission.grade = grade;
    selectedSubmission.feedback = feedback;
    setSelectedSubmission({ ...selectedSubmission });
    // Here you would call the backend API
    alert(`Grade submitted: ${grade}\nFeedback: ${feedback}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Link to="/faculty/quizzes" className="text-primary hover:underline mb-4 block">&larr; Back to Quizzes</Link>
        <h1 className="text-3xl font-bold text-gray-800">{mockQuiz.title}</h1>
        <p className="text-gray-600">{mockQuiz.course} - {mockQuiz.courseName}</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Filter by student name..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full md:w-64"
        />
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="ml-1 px-2 py-1 border rounded-md text-xs bg-gray-100 hover:bg-gray-200"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.map(sub => (
              <tr key={sub.id} className="hover:bg-primary-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{sub.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(sub.submittedAt).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sub.grade !== null ? sub.grade : <span className="text-gray-400">Not graded</span>}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/faculty/quizzes/${mockQuiz.id}/grade/${sub.id}`}
                    className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark text-sm"
                  >
                    {sub.grade !== null ? 'View/Edit Grade' : 'Grade'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grading Modal */}
      {/* Removed modal, grading is now a separate page */}
    </div>
  );
} 