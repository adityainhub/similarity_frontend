import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, FileCode, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import CodeButton from "@/components/CodeButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample user data
interface UserDetail {
  id: number;
  rank: number;
  username: string;
  language: string;
  solved: boolean;
  timeSeconds: number;
  solutionSize: number;
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

const SolutionDetailsPage = () => {
  const { contestId, questionId, userId } = useParams();
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState<UserDetail | null>(null);
  const [similarUsers, setSimilarUsers] = useState<SimilarUser[]>([]);
  const [isMobile, setIsMobile] = useState(false);

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
    // In a real app, fetch data from API based on userId
    // For now, generate mock data
    setTimeout(() => {
      const mockUser: UserDetail = {
        id: parseInt(userId || "1"),
        rank: parseInt(userId || "1") % 100 + 1,
        username: `user${userId}`,
        language: ["Python", "JavaScript", "C++", "Java", "TypeScript"][parseInt(userId || "1") % 5],
        solved: true,
        timeSeconds: 1200 + (parseInt(userId || "1") % 1800),
        solutionSize: 300 + (parseInt(userId || "1") % 500),
        score: 70 + (parseInt(userId || "1") % 30),
        submissions: 2 + (parseInt(userId || "1") % 3),
        profileInitials: `U${userId?.charAt(0) || "1"}`
      };

      setActiveUser(mockUser);

      // Generate similar users
      const mockSimilarUsers: SimilarUser[] = Array(10).fill(null).map((_, i) => ({
        id: 100 + i,
        rank: 5 + i,
        username: `similar_user${i + 1}`,
        language: ["Python", "JavaScript", "C++", "Java", "TypeScript"][i % 5],
        score: 65 + (i % 35)
      }));

      setSimilarUsers(mockSimilarUsers);
    }, 300);
  }, [userId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                <Badge className="mr-2 bg-[#1e1e1e] text-white">
                  Rank #{activeUser.rank}
                </Badge>
                <Badge className={`bg-blue-500/20 text-blue-400`}>
                  {activeUser.language}
                </Badge>
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
                  <div className="text-sm text-gray-400">Score</div>
                  <div className="text-xl font-bold mt-1">{activeUser.score}%</div>
                </div>

                <div className="bg-[#1a1a1a] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Submissions</div>
                  <div className="text-xl font-bold mt-1">{activeUser.submissions}</div>
                </div>

                <div className="bg-[#1a1a1a] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Time</div>
                  <div className="text-xl font-bold mt-1 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {formatTime(activeUser.timeSeconds)}
                  </div>
                </div>

                <div className="bg-[#1a1a1a] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Size</div>
                  <div className="text-xl font-bold mt-1 flex items-center">
                    <FileCode size={14} className="mr-1" />
                    {activeUser.solutionSize}B
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
                  {activeUser.solutionSize < 400 && (
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
            Users who solved this problem with similar approaches
          </p>

          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
            <div className="grid grid-cols-[80px_1fr_100px_100px] bg-[#222] border-b border-[#444] py-3 px-4">
              <div className="text-[#f59f00] font-semibold">Rank</div>
              <div className="text-[#f59f00] font-semibold">Username</div>
              <div className="text-[#f59f00] font-semibold">Score</div>
              <div className="text-[#f59f00] font-semibold text-center">Code</div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {similarUsers.map((user, index) => (
                  <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="grid grid-cols-[80px_1fr_100px_100px] items-center py-3 px-4 border-b border-[#333] hover:bg-[#222] transition-colors"
                  >
                    <div className="font-medium">#{user.rank}</div>
                    <div className="font-medium truncate">{user.username}</div>
                    <div className="text-sm">
                      <Badge className="bg-green-500/20 text-green-400">
                        {user.score}%
                      </Badge>
                    </div>
                    <div className="flex justify-center">
                      <CodeButton
                          username={user.username}
                          language={user.language}
                          score={user.score}
                      />
                    </div>
                  </motion.div>
              ))}
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
              <Badge className="bg-[#1e1e1e] text-white border-none">Contest {contestId}</Badge>
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
        </div>
      </div>
  );
};

export default SolutionDetailsPage;