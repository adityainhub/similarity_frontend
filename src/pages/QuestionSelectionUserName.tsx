import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Award, BarChart3, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE_URL = import.meta.env.VITE_API_BASE;

interface Question {
  questionId: number;
  questionNumber: number;
  title: string;
  difficulty: string;
  points: number;
}

interface ContestDetails {
  contestId: string;
  contestTitle: string;
  contestDate: string;
  participantCount: number;
}

const QuestionSelectionUserName = () => {
  const { username, contestId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const contestDetails = location.state?.contestDetails as ContestDetails;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username && contestId) {
      fetch(`${BASE_URL}/api/contests/username-search/${username}/${contestId}`)
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          setLoading(false);
        });
    }
  }, [username, contestId]);

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case "EASY": return "bg-green-500/20 text-green-400";
      case "MEDIUM": return "bg-yellow-500/20 text-yellow-400";
      case "HARD": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  // Calculate total points
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-6 md:mt-20 md:pt-0">
      <div className="container mx-auto px-4 py-4 md:py-10">
        {/* Back button */}
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-[#F59F00] active:text-[#F59F00] transition-colors duration-200 mb-4 md:mb-6 hover:bg-transparent active:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={() => navigate(`/username-search/${username}`)}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to User's Contests
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#f59f00] mb-2">
            {contestDetails?.contestTitle}
          </h1>
          <p className="text-gray-400 mb-4">Questions attempted by {username}</p>

          {/* Stats section */}
          <div className="hidden md:inline-flex gap-6 bg-[#1e1e1e] border border-[#333] rounded-full px-8 py-3 mb-8">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-[#f59f00]" />
              <span className="text-gray-300">{totalPoints} points total</span>
            </div>
            <div className="flex items-center gap-2">
              <Code size={18} className="text-[#f59f00]" />
              <span className="text-gray-300">{questions.length} questions</span>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading questions...</div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto grid gap-4 md:gap-6"
          >
            {questions.map((question) => (
              <motion.div
                key={question.questionId}
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-[#1e1e1e] border border-[#333] rounded-xl overflow-hidden cursor-pointer hover:border-[#f59f00]/50 transition-colors duration-300"
                onClick={() => navigate(`/username-search/${username}/${contestId}/${question.questionId}/solution`, {
                  state: {
                    contestDetails,
                    questionDetails: {
                      questionId: question.questionId,
                      questionNumber: question.questionNumber,
                      title: question.title
                    }
                  }
                })}
              >
                {/* Desktop layout */}
                <div className="hidden sm:flex items-center p-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#f59f00]/10 text-[#f59f00] font-bold rounded-lg mr-4">
                    Q{question.questionNumber}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{question.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className={`text-xs font-medium rounded-full px-3 py-1 ${getDifficultyClass(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span className="text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full px-3 py-1">
                        {question.points} Points
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#f59f00]">
                    <BarChart3 size={20} />
                    <span className="font-medium">View Solution</span>
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="flex flex-col sm:hidden p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#f59f00]/10 text-[#f59f00] font-bold rounded-lg mr-4">
                      {question.questionNumber}
                    </div>
                    <h3 className="text-lg font-semibold">{question.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs font-medium rounded-full px-3 py-1 ${getDifficultyClass(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    <span className="text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full px-3 py-1">
                      {question.points} Points
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#f59f00]">
                    <BarChart3 size={20} />
                    <span className="font-medium">View Solution</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestionSelectionUserName; 