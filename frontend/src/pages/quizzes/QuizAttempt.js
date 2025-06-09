"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useParams, useNavigate } from "react-router-dom"

function QuizAttempt() {
  const { currentUser } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [hasPermission, setHasPermission] = useState(currentUser?.role === "student")
  const [isViewMode, setIsViewMode] = useState(false)

  const quizzes = [
    {
      id: 1,
      title: "CS101 Quiz 2: Programming Fundamentals",
      course: "CS101",
      startDate: "2023-05-15",
      startTime: "10:00",
      duration: 30,
      totalPoints: 20,
      status: "Available",
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          text: "Which of the following is not a primitive data type in JavaScript?",
          points: 2,
          options: [
            { id: 1, text: "String", isCorrect: false },
            { id: 2, text: "Number", isCorrect: false },
            { id: 3, text: "Boolean", isCorrect: false },
            { id: 4, text: "Array", isCorrect: true },
          ],
        },
        {
          id: 2,
          type: "true_false",
          text: "JavaScript is a statically typed language.",
          points: 2,
          answer: "false",
        },
        {
          id: 3,
          type: "multiple_choice",
          text: "Which method is used to add an element to the end of an array in JavaScript?",
          points: 2,
          options: [
            { id: 1, text: "push()", isCorrect: true },
            { id: 2, text: "append()", isCorrect: false },
            { id: 3, text: "add()", isCorrect: false },
            { id: 4, text: "insert()", isCorrect: false },
          ],
        },
        {
          id: 4,
          type: "short_answer",
          text: "What does DOM stand for in web development?",
          points: 2,
          answer: "Document Object Model",
        },
        {
          id: 5,
          type: "multiple_choice",
          text: "Which of the following is used to declare a variable in JavaScript?",
          points: 2,
          options: [
            { id: 1, text: "var", isCorrect: false },
            { id: 2, text: "let", isCorrect: false },
            { id: 3, text: "const", isCorrect: false },
            { id: 4, text: "All of the above", isCorrect: true },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "CS201 Midterm: Data Structures",
      course: "CS201",
      startDate: "2023-05-20",
      startTime: "14:00",
      duration: 60,
      totalPoints: 50,
      status: "Upcoming",
    },
  ]

  useEffect(() => {
    setHasPermission(currentUser?.role === "student")
  }, [currentUser])

  useEffect(() => {
    if (id) {
      const quiz = quizzes.find(q => q.id === parseInt(id))
      if (quiz) {
        setSelectedQuiz(quiz)
        setIsViewMode(true)
      } else {
        navigate("/student/quizzes/attempt")
      }
    }
  }, [id, navigate])

  useEffect(() => {
    let timer
    if (quizStarted && timeRemaining > 0 && !quizSubmitted) {
      timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
    } else if (quizStarted && timeRemaining === 0 && !quizSubmitted) {
      handleSubmitQuiz()
    }

    return () => clearTimeout(timer)
  }, [quizStarted, timeRemaining, quizSubmitted])

  const handleStartQuiz = () => {
    const initialAnswers = {}
    selectedQuiz.questions.forEach((q) => (initialAnswers[q.id] = ""))
    setAnswers(initialAnswers)
    setTimeRemaining(selectedQuiz.duration * 60)
    setQuizStarted(true)
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmitQuiz = () => {
    console.log("Quiz submitted:", {
      quizId: selectedQuiz.id,
      answers,
    })
    setQuizSubmitted(true)
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  if (!hasPermission) {
    return <div className="text-center p-8">You don't have permission to view this page.</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isViewMode ? "View Quiz" : "Take Quiz"}
      </h1>

      {!selectedQuiz ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Quizzes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quiz</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td className="px-6 py-4">{quiz.title}</td>
                    <td className="px-6 py-4">{quiz.course}</td>
                    <td className="px-6 py-4">{new Date(`${quiz.startDate}T${quiz.startTime}`).toLocaleString()}</td>
                    <td className="px-6 py-4">{quiz.duration} minutes</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          quiz.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : quiz.status === "Upcoming"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {quiz.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/student/quizzes/${quiz.id}/view`)}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        View
                      </button>
                      {quiz.status === "Available" && (
                        <button
                          onClick={() => setSelectedQuiz(quiz)}
                          className="ml-2 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Start
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : quizSubmitted ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Submitted Successfully!</h3>
          <p className="text-gray-500 mb-6">Your answers have been recorded.</p>
          <button
            onClick={() => {
              setSelectedQuiz(null)
              setQuizSubmitted(false)
              setQuizStarted(false)
            }}
            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Back to Quizzes
          </button>
        </div>
      ) : isViewMode ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedQuiz.title}</h2>
          <div className="space-y-4">
            <p><strong>Course:</strong> {selectedQuiz.course}</p>
            <p><strong>Date & Time:</strong> {new Date(`${selectedQuiz.startDate}T${selectedQuiz.startTime}`).toLocaleString()}</p>
            <p><strong>Duration:</strong> {selectedQuiz.duration} minutes</p>
            <p><strong>Total Points:</strong> {selectedQuiz.totalPoints}</p>
            <p><strong>Status:</strong> {selectedQuiz.status}</p>
          </div>
          <div className="mt-6 space-x-4">
            <button
              onClick={() => navigate("/student/quizzes/attempt")}
              className="px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              Back to Quizzes
            </button>
            {selectedQuiz.status === "Available" && (
              <button
                onClick={() => {
                  setIsViewMode(false)
                  handleStartQuiz()
                }}
                className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Start Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmitQuiz()
          }}
          className="space-y-6"
        >
          <div className="text-right font-bold text-red-600">
            Time Remaining: {formatTime(timeRemaining)}
          </div>
          {selectedQuiz.questions.map((q, i) => (
            <div key={q.id} className="border p-4 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Question {i + 1}</h4>
              <p className="text-gray-700 mb-3">{q.text}</p>
              {q.type === "multiple_choice" && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label key={`${q.id}-opt-${opt.id}`} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.id}
                        checked={answers[q.id] === opt.id.toString()}
                        onChange={() => handleAnswerChange(q.id, opt.id.toString())}
                        className="text-red-600"
                      />
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>
              )}
              {q.type === "true_false" && (
                <div className="flex space-x-4">
                  {["true", "false"].map((val) => (
                    <label key={`${q.id}-${val}`} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={val}
                        checked={answers[q.id] === val}
                        onChange={() => handleAnswerChange(q.id, val)}
                        className="text-red-600"
                      />
                      <span>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
                    </label>
                  ))}
                </div>
              )}
              {q.type === "short_answer" && (
                <input
                  type="text"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  className="mt-2 border p-2 rounded w-full"
                  placeholder="Your answer..."
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  )
}

export default QuizAttempt
