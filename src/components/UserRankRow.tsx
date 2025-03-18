
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Clock, FileCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  rank: number;
  username: string;
  language: string;
  solved: boolean;
  timeSeconds: number;
  solutionSize: number;
}

interface UserRankRowProps {
  user: User;
  variants: any;
  formatTime: (seconds: number) => string;
  onCheckClick: () => void;
  contestId?: string;
  questionId?: string;
}

const UserRankRow = ({ user, variants, formatTime, onCheckClick, contestId, questionId }: UserRankRowProps) => {
  const navigate = useNavigate();
  
  const getLanguageColor = (language: string) => {
    const colorMap: Record<string, { bg: string, text: string }> = {
      "Python": { bg: "bg-blue-500/20", text: "text-blue-400" },
      "JavaScript": { bg: "bg-yellow-500/20", text: "text-yellow-400" },
      "TypeScript": { bg: "bg-blue-400/20", text: "text-blue-300" },
      "C++": { bg: "bg-purple-500/20", text: "text-purple-400" },
      "Java": { bg: "bg-orange-500/20", text: "text-orange-400" },
      "Go": { bg: "bg-teal-500/20", text: "text-teal-400" },
      "Rust": { bg: "bg-red-500/20", text: "text-red-400" },
      "Ruby": { bg: "bg-red-400/20", text: "text-red-300" },
      "Kotlin": { bg: "bg-green-500/20", text: "text-green-400" }
    };
    
    return colorMap[language] || { bg: "bg-gray-500/20", text: "text-gray-400" };
  };
  
  const { bg, text } = getLanguageColor(user.language);
  
  const handleCheckClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.solved) {
      onCheckClick();
      if (contestId && questionId) {
        navigate(`/contest/${contestId}/question/${questionId}/solution/${user.id}`);
      }
    }
  };
  
  return (
    <motion.div
      variants={variants}
      className="grid grid-cols-[80px_minmax(150px,1fr)_130px_130px_80px] items-center py-3 px-4 border-b border-[#333] hover:bg-[#222] transition-colors"
    >
      <div className="font-medium">
        {user.rank < 4 ? (
          <span className={`font-bold ${
            user.rank === 1 
              ? "text-yellow-400" 
              : user.rank === 2 
                ? "text-gray-300" 
                : "text-amber-600"
          }`}>
            #{user.rank}
          </span>
        ) : (
          <span>#{user.rank}</span>
        )}
      </div>
      
      <div className="font-medium truncate">{user.username}</div>
      
      <div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
          {user.language}
        </span>
      </div>
      
      <div className="flex space-x-4 text-sm text-gray-400">
        {user.solved ? (
          <>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {formatTime(user.timeSeconds)}
            </div>
            <div className="flex items-center">
              <FileCode size={14} className="mr-1" />
              {user.solutionSize}B
            </div>
          </>
        ) : (
          <span>-</span>
        )}
      </div>
      
      <div className="flex justify-center">
        <Button 
          className={user.solved ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          size="sm"
          onClick={handleCheckClick}
          disabled={!user.solved}
        >
          {user.solved ? <Check size={16} /> : <span className="text-xs">X</span>}
        </Button>
      </div>
    </motion.div>
  );
};

export default UserRankRow;
