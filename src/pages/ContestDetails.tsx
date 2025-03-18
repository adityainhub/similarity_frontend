
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import ContestHeader from "@/components/ContestHeader";
import QuestionSelector from "@/components/QuestionSelector";
import UserRankTable from "@/components/UserRankTable";

const ContestDetails = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(2);
  
  // Mock data for the table - in a real app this would come from an API
  const mockUsers = Array(100).fill(null).map((_, i) => ({
    id: i + 1,
    rank: i + 1,
    username: `user${i + 1}`,
    language: ["Python", "JavaScript", "C++", "Java", "Go"][Math.floor(Math.random() * 5)],
    solved: Math.random() > 0.3
  }));
  
  const usersPerPage = 25;
  const totalPages = Math.ceil(mockUsers.length / usersPerPage);
  
  const filteredUsers = mockUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.language.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };
  
  const handleQuestionChange = (questionNumber: number) => {
    setSelectedQuestion(questionNumber);
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-8">
        <ContestHeader contestName={`LeetCode Weekly Contest ${contestId || '438'}`} />
        
        <div className="mt-6">
          <QuestionSelector 
            selectedQuestion={selectedQuestion} 
            onQuestionChange={handleQuestionChange} 
          />
        </div>
        
        <div className="mt-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 bg-[#1e1e1e] border-[#333] focus:border-[#f59f00] text-white"
              placeholder="Search by username or language"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <UserRankTable users={paginatedUsers} />
        </div>
        
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
