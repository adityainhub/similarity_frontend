import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, FileCode, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import CodeButton from "@/components/CodeButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Sample user data
interface UserDetail {
  id: number;
  rank: number;
  username: string;
  language: string;
  solved: boolean;
  timeSeconds: number;
  matchCount: number;
  score: number;
  submissions: number;
  profileInitials: string;
}

interface SimilarUser {
  id: number;
  rank: number;
  username: string;
  language: string;
  score: number;
}

interface SimilarityMatch {
  submissionId1: string;
  submissionId2: string;
  username1: string;
  username2: string;
  similarity: number;
  language: string;
  rank1: number;
  rank2: number;
  submission1Time: string | null;
  submission2Time: string | null;
}

interface CodeResponse {
  submissionId: string;
  submittedCode: string;
}

const SolutionDetailsPage = () => {
  const { contestId, questionId, userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeUser, setActiveUser] = useState<UserDetail | null>(null);
  const [similarUsers, setSimilarUsers] = useState<SimilarUser[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [similarityData, setSimilarityData] = useState<SimilarityMatch[]>([]);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<CodeResponse | null>(null);
  const [loadingCode, setLoadingCode] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (location.state?.similarityData) {
      const similarityData = location.state.similarityData;
      // Find the data for the searched user
      const userMatch = similarityData[0]; // Get first match
      const isUser1Searched = userMatch.username1 === userId;
      
      const activeUserData: UserDetail = {
        id: parseInt(userId || "1"),
        rank: isUser1Searched ? userMatch.rank1 : userMatch.rank2,
        username: userId || "", // Remove "user" prefix, use actual userId
        language: userMatch.language,
        solved: true,
        timeSeconds: 0, // You might want to use submission time if available
        matchCount: similarityData.length, // Number of similar solutions
        score: 0,
        submissions: 1,
        profileInitials: userId?.charAt(0).toUpperCase() || "U"
      };
      setActiveUser(activeUserData);
      setSimilarityData(similarityData);
    }
  }, [location.state, userId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleViewCode = async (submissionId: string) => {
    setLoadingCode(true);
    try {
      const response = await fetch(`http://localhost:8080/api/codes/${submissionId}`);
      const data = await response.json();
      setSelectedCode(data);
      setIsCodeModalOpen(true);
    } catch (error) {
      console.error("Error fetching code:", error);
      // You might want to add toast notification here
    } finally {
      setLoadingCode(false);
    }
  };

  if (!activeUser) {
    return (
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
          <div className="animate-pulse text-[#f59f00]">Loading solution details...</div>
        </div>
    );
  }

  // Render the user details panel
  const renderUserDetailsPanel = () => (
      <div className="h-full p-6">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col h-full"
        >
          <div className="flex items-center mb-6">
            <Avatar className="h-16 w-16 mr-4 bg-[#f59f00]">
              <AvatarFallback className="text-black font-semibold text-xl">
                {activeUser.profileInitials}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-2xl font-bold">{activeUser.username}</h2>
              <div className="flex items-center mt-1">
                {/* <Badge className="mr-2 bg-[#1e1e1e] text-white">
                  Rank #{activeUser.rank}
                </Badge> */}
                {/* <Badge className={`bg-blue-500/20 text-blue-400`}>
                  {activeUser.language}
                </Badge> */}
              </div>
            </div>
          </div>

          <Card className="bg-[#222] border-[#333] mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#f59f00]">Performance Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Rank</div>
                  <div className="text-xl font-bold mt-1">#{activeUser.rank}</div>
                </div>

                <div className="bg-[#1a1a1a] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Language</div>
                  <div className="text-xl font-bold mt-1">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                      ${activeUser.language === 'python3' ? 'bg-blue-900 text-blue-200' : ''}
                      ${activeUser.language === 'javascript' ? 'bg-yellow-900 text-yellow-200' : ''}
                      ${activeUser.language === 'cpp' ? 'bg-purple-900 text-purple-200' : ''}
                      ${activeUser.language === 'java' ? 'bg-amber-900 text-amber-200' : ''}
                    `}>
                      {activeUser.language}
                    </span>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Time</div>
                  <div className="text-xl font-bold mt-1 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {formatTime(activeUser.timeSeconds)}
                  </div>
                </div>

                <div className="bg-[#1a1a1a] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Similar Solutions</div>
                  <div className="text-xl font-bold mt-1 flex items-center">
                    <Users size={14} className="mr-1" />
                    {activeUser.matchCount}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-4">
            <CodeButton
                username={activeUser.username}
                language={activeUser.language}
                score={activeUser.score}
                isLeftPanel={true}
                submissionId={similarityData[0]?.submissionId1}
                contestId={contestId}
                rank={activeUser.rank}
            />
          </div>

          <div className="mt-auto pt-6">
            <Card className="bg-[#222] border-[#333]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg text-[#f59f00]">
                  <Trophy size={18} className="mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activeUser.rank <= 10 && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 mr-2 mb-2">
                        Top Cheater
                      </Badge>
                  )}
                  {activeUser.timeSeconds < 1800 && (
                      <Badge className="bg-green-500/20 text-green-400 mr-2 mb-2">
                        Telegram Coder
                      </Badge>
                  )}
                  {activeUser.matchCount < 4 && (
                      <Badge className="bg-purple-500/20 text-purple-400 mr-2 mb-2">
                        GPT Coder
                      </Badge>
                  )}
                  {activeUser.score > 90 && (
                      <Badge className="bg-blue-500/20 text-blue-400 mr-2 mb-2">
                       Prompt Master
                      </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
  );

  // Render the similar solutions panel
  const renderSimilarSolutionsPanel = () => (
      <div className="h-full p-6">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col h-full"
        >
          <h2 className="text-xl font-bold mb-4 text-[#f59f00]">Similar Solutions</h2>
          <p className="text-gray-400 mb-6">
            Users who submitted similar solutions to this problem
          </p>

          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
            <div className="grid grid-cols-[80px_1fr_100px_120px_80px] bg-[#222] border-b border-[#444] py-3 px-4">
              <div className="text-[#f59f00] font-semibold">Rank</div>
              <div className="text-[#f59f00] font-semibold">Username</div>
              <div className="text-[#f59f00] font-semibold">Language</div>
              <div className="text-[#f59f00] font-semibold">Similarity</div>
              <div className="text-[#f59f00] font-semibold text-center">Code</div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {similarityData.map((match, index) => {
                const isUser1Searched = match.username1 === userId;
                const displayUsername = isUser1Searched ? match.username2 : match.username1;
                const displayRank = isUser1Searched ? match.rank2 : match.rank1;
                
                return (
                  <motion.div
                    key={isUser1Searched ? match.submissionId2 : match.submissionId1}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="grid grid-cols-[80px_1fr_100px_120px_80px] items-center py-3 px-4 border-b border-[#333] hover:bg-[#222] transition-colors"
                  >
                    <div className="font-medium">{displayRank}</div>
                    <div className="font-medium truncate">{displayUsername}</div>
                    <div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                        ${match.language === 'python3' ? 'bg-blue-900 text-blue-200' : ''}
                        ${match.language === 'javascript' ? 'bg-yellow-900 text-yellow-200' : ''}
                        ${match.language === 'cpp' ? 'bg-purple-900 text-purple-200' : ''}
                        ${match.language === 'java' ? 'bg-amber-900 text-amber-200' : ''}
                      `}>
                        {match.language}
                      </span>
                    </div>
                    <div>
                      <Badge className={`
                        ${match.similarity > 0.9 ? 'bg-red-500/20 text-red-400' : ''}
                        ${match.similarity > 0.7 && match.similarity <= 0.9 ? 'bg-yellow-500/20 text-yellow-400' : ''}
                        ${match.similarity <= 0.7 ? 'bg-green-500/20 text-green-400' : ''}
                      `}>
                        {(match.similarity * 100).toFixed(1)}% Match
                      </Badge>
                    </div>
                    <div className="flex justify-center">
                      <CodeButton
                        username={displayUsername}
                        language={match.language}
                        score={match.similarity * 100}
                        submissionId={isUser1Searched ? match.submissionId2 : match.submissionId1}
                        contestId={contestId}
                        rank={displayRank}
                      />
                    </div>
                  </motion.div>
                );
              })}
              
              {similarityData.length === 0 && (
                <div className="py-8 text-center text-gray-400">
                  No similar solutions found
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
  );

  return (
      <div className="min-h-screen bg-[#121212] text-white mt-20">
        <div className="container mx-auto p-4">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
          >
            <Button
                variant="ghost"
                className="text-gray-400 hover:text-[#F59F00] active:text-[#F59F00] transition-colors duration-200 mb-6 hover:bg-transparent active:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => navigate(`/contest/${contestId}/question/${questionId}`)}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Rankings
            </Button>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
          >
            <h1 className="text-3xl font-bold text-[#f59f00]">
              Solution Details
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-[#1e1e1e] text-white border-none">{contestId}</Badge>
              <span className="text-gray-400">•</span>
              <Badge className="bg-[#1e1e1e] text-white border-none">Question {questionId}</Badge>
            </div>
          </motion.div>

          {isMobile ? (
              // Mobile view: Stack panels vertically
              <div className="flex flex-col gap-4">
                <div className="border rounded-lg border-[#333] bg-[#1a1a1a]">
                  {renderUserDetailsPanel()}
                </div>
                <div className="border rounded-lg border-[#333] bg-[#1a1a1a]">
                  {renderSimilarSolutionsPanel()}
                </div>
              </div>
          ) : (
              // Desktop view: Use ResizablePanelGroup
              <ResizablePanelGroup direction="horizontal" className="min-h-[80vh] border rounded-lg border-[#333] bg-[#1a1a1a]">
                {/* Left Panel */}
                <ResizablePanel defaultSize={40} minSize={30}>
                  {renderUserDetailsPanel()}
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Right Panel */}
                <ResizablePanel defaultSize={60} minSize={40}>
                  {renderSimilarSolutionsPanel()}
                </ResizablePanel>
              </ResizablePanelGroup>
          )}

          <Dialog open={isCodeModalOpen} onOpenChange={setIsCodeModalOpen}>
            <DialogContent className="max-w-4xl h-[80vh] bg-[#1a1a1a] border-[#333]">
              <DialogHeader>
                <DialogTitle className="text-[#f59f00]">
                  Submitted Code
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-auto flex-1">
                {loadingCode ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin text-[#f59f00]">Loading code...</div>
                  </div>
                ) : (
                  <SyntaxHighlighter
                    language={activeUser?.language.toLowerCase().replace('3', '')}
                    style={vscDarkPlus}
                    customStyle={{
                      backgroundColor: 'transparent',
                      margin: 0,
                      padding: '1rem',
                    }}
                  >
                    {selectedCode?.submittedCode || ''}
                  </SyntaxHighlighter>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
  );
};

export default SolutionDetailsPage;