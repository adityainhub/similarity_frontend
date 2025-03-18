import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, ChevronLeft, ChevronRight, Filter, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import UserRankRow from "@/components/UserRankRow";
import { toast } from "sonner";

// Add interface for the submission data
interface Submission {
  username: string;
  rank: number;
  language: string;
  submissionTime: string | null;
}

const RankingsPage = () => {
  const { contestId, questionId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterLanguage, setFilterLanguage] = useState<string>("");
  const [showOnlySolved, setShowOnlySolved] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/submissions/question/${questionId}`)
      .then((response) => response.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching submissions:", error);
        setLoading(false);
      });
  }, [questionId]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.language.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = !filterLanguage || submission.language === filterLanguage;
    // All submissions are considered solved since they're in the submissions list
    const matchesSolved = !showOnlySolved || true;

    return matchesSearch && matchesLanguage && matchesSolved;
  });

  const languageList = [...new Set(submissions.map(submission => submission.language))].sort();
  const usersPerPage = 25;

  const totalPages = Math.ceil(filteredSubmissions.length / usersPerPage);

  const paginatedSubmissions = filteredSubmissions.slice(
      (currentPage - 1) * usersPerPage,
      currentPage * usersPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(1);

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 2 && currentPage > 3) {
        pageNumbers.push("...");
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pageNumbers.push("...");
      } else {
        pageNumbers.push(i);
      }
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return [...new Set(pageNumbers)];
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Scroll to top when navigating to a new page
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
      <div className="min-h-screen bg-[#121212] text-white mt-20">
        <div className="container mx-auto px-4 py-6">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
          >
            <Button
                variant="ghost"
                className="text-gray-400 hover:text-[#F59F00] active:text-[#F59F00] transition-colors duration-200 mb-6 hover:bg-transparent active:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => navigate(`/contest/${contestId}/questions`)}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Questions
            </Button>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#f59f00]">
                  Weekly Contest {contestId}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-[#1e1e1e] text-white border-none">Question {questionId}</Badge>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">
                  {filteredSubmissions.length} solved
                </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">
                  {Math.round((filteredSubmissions.length / submissions.length) * 100)}% acceptance
                </span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 flex items-center">
                  <Trophy size={18} className="text-[#f59f00] mr-2" />
                  <span className="font-medium">Top Performers</span>
                </div>
                <div className="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 flex items-center">
                  <Users size={18} className="text-[#f59f00] mr-2" />
                  <span className="font-medium">{submissions.length.toLocaleString()} Participants</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    className="pl-10 bg-[#1e1e1e] border-[#333] focus:border-[#f59f00] text-white"
                    placeholder="Search by username or language"
                    value={searchQuery}
                    onChange={handleSearch}
                />
              </div>

              <Button
                  variant="outline"
                  className="bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a] w-full lg:w-auto"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                  >
                    <div className="mt-4 p-4 bg-[#1e1e1e] border border-[#333] rounded-lg">
                      <div className="flex flex-wrap gap-6">
                        <div className="min-w-[200px]">
                          <label className="text-sm text-gray-400 mb-1 block">Programming Language</label>
                          <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                            <SelectTrigger className="bg-[#2a2a2a] border-[#444]">
                              <SelectValue placeholder="All languages" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2a2a2a] border-[#444]">
                              <SelectItem value="">All languages</SelectItem>
                              {languageList.map(lang => (
                                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center gap-2">
                          <Checkbox
                              id="solved-only"
                              checked={showOnlySolved}
                              onCheckedChange={(checked) => {
                                if (typeof checked === 'boolean') {
                                  setShowOnlySolved(checked);
                                  setCurrentPage(1);
                                }
                              }}
                              className="data-[state=checked]:bg-[#f59f00] data-[state=checked]:border-[#f59f00]"
                          />
                          <label
                              htmlFor="solved-only"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Show only solved
                          </label>
                        </div>

                        <Button
                            variant="outline"
                            className="ml-auto text-[#f59f00] border-[#f59f00] hover:bg-[#f59f00]/10"
                            onClick={() => {
                              setFilterLanguage("");
                              setShowOnlySolved(false);
                              setCurrentPage(1);
                            }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden mb-8"
          >
            {/* Table header - Improved grid layout with better spacing */}
            <div className="hidden md:grid md:grid-cols-[80px_1fr_120px_120px] bg-[#222] border-b border-[#444] py-3 px-4">
              <div className="text-[#f59f00] font-semibold">Rank</div>
              <div className="text-[#f59f00] font-semibold">Username</div>
              <div className="text-[#f59f00] font-semibold">Language</div>
              <div className="text-[#f59f00] font-semibold">Time</div>
            </div>

            {/* Mobile header */}
            <div className="md:hidden grid grid-cols-[60px_1fr_80px] bg-[#222] border-b border-[#444] py-3 px-4">
              <div className="text-[#f59f00] font-semibold">Rank</div>
              <div className="text-[#f59f00] font-semibold">User</div>
              <div className="text-[#f59f00] font-semibold text-center">Status</div>
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-400">
                Loading submissions...
              </div>
            ) : (
              <motion.div variants={container} initial="hidden" animate="show">
                {paginatedSubmissions.map((submission) => (
                  <motion.div
                    key={`${submission.username}-${submission.rank}`}
                    variants={item}
                    className="hidden md:grid md:grid-cols-[80px_1fr_120px_120px] py-3 px-4 items-center border-b border-[#333] last:border-0 hover:bg-[#222] transition-colors"
                  >
                    <div className={`font-medium ${submission.rank <= 3 ? 'text-[#f59f00]' : ''}`}>
                      #{submission.rank}
                    </div>
                    <div className="font-medium">{submission.username}</div>
                    <div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                        ${submission.language === 'python3' ? 'bg-blue-900 text-blue-200' : ''}
                        ${submission.language === 'javascript' ? 'bg-yellow-900 text-yellow-200' : ''}
                        ${submission.language === 'typescript' ? 'bg-blue-800 text-blue-200' : ''}
                        ${submission.language === 'ruby' ? 'bg-red-900 text-red-200' : ''}
                        ${submission.language === 'go' ? 'bg-teal-900 text-teal-200' : ''}
                        ${submission.language === 'rust' ? 'bg-orange-900 text-orange-200' : ''}
                        ${submission.language === 'java' ? 'bg-amber-900 text-amber-200' : ''}
                        ${submission.language === 'cpp' ? 'bg-purple-900 text-purple-200' : ''}
                        ${submission.language === 'kotlin' ? 'bg-violet-900 text-violet-200' : ''}
                      `}>
                        {submission.language}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      {submission.submissionTime ? (
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-1">⏱</span>
                          <span>{new Date(submission.submissionTime).toLocaleTimeString()}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">No time recorded</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {totalPages > 1 && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8 flex justify-center"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className="bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a] disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {getPageNumbers().map((pageNumber, index) => (
                      <React.Fragment key={index}>
                        {pageNumber === "..." ? (
                            <span className="px-2 text-gray-400">...</span>
                        ) : (
                            <Button
                                variant={currentPage === pageNumber ? "default" : "outline"}
                                className={
                                  currentPage === pageNumber
                                      ? "bg-[#f59f00] hover:bg-[#e08e00] text-black"
                                      : "bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a]"
                                }
                                onClick={() => setCurrentPage(pageNumber as number)}
                            >
                              {pageNumber}
                            </Button>
                        )}
                      </React.Fragment>
                  ))}

                  <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a] disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
          )}
        </div>
      </div>
  );
};

export default RankingsPage;