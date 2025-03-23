import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ContestCard from "@/components/ContestCard";

interface Contest {
  contestId: string;
  title: string;
  startDate: string;
  participantCount: number;
}

const ContestSelection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://similarity-czdzezbugrb9g2gy.southindia-01.azurewebsites.net//api/contests")
        .then((response) => response.json())
        .then((data) => {
          setContests(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching contests:", error);
          setLoading(false);
        });
  }, []);

  const filteredContests = contests.filter(
      (contest) =>
          contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contest.contestId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
      <div className="min-h-screen bg-[#121212] text-white mt-20">
        <div className="container mx-auto px-4 py-10">
          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold text-[#f59f00] mb-2">LeetCode Contests</h1>
            <p className="text-gray-400">Select a contest to explore questions and rankings</p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                  className="pl-10 bg-[#1e1e1e] border-[#333] focus:border-[#f59f00] text-white"
                  placeholder="Search contests by name or number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {loading ? (
              <p className="text-center text-gray-400">Loading contests...</p>
          ) : (
              <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredContests.map((contest) => (
                    <ContestCard
                        key={contest.contestId}
                        contest={{
                            id: contest.contestId,
                            name: contest.title,
                            startDate: contest.startDate,
                            participantCount: contest.participantCount
                        }}
                        onClick={() => navigate(`/contest/${contest.contestId}/questions`, {
                            state: {
                                contestDetails: {
                                    contestId: contest.contestId,
                                    title: contest.title,
                                    startDate: contest.startDate,
                                    participantCount: contest.participantCount
                                }
                            }
                        })}
                    />
                ))}
              </motion.div>
          )}

          {!loading && filteredContests.length === 0 && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center py-10"
              >
                <p className="text-gray-400 text-lg">No contests found matching your search criteria</p>
              </motion.div>
          )}
        </div>
      </div>
  );
};

export default ContestSelection;
