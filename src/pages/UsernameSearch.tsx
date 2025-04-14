import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ContestCard from "@/components/ContestCard";
import { searchContestsByUsername, Contest } from "@/services/usernameSearch";

const UsernameSearch = () => {
  const navigate = useNavigate();
  const { username: urlUsername } = useParams();
  const { toast } = useToast();
  const [username, setUsername] = useState(urlUsername || "");
  const [loading, setLoading] = useState(false);
  const [contests, setContests] = useState<Contest[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (urlUsername) {
      handleSearch(urlUsername);
    }
  }, [urlUsername]);

  const handleSearch = async (searchUsername?: string) => {
    const usernameToSearch = searchUsername || username;
    if (!usernameToSearch.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    // Update URL if it's different from current username
    if (usernameToSearch !== urlUsername) {
      navigate(`/username-search/${usernameToSearch}`);
      return; // The useEffect will handle the search
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const data = await searchContestsByUsername(usernameToSearch);
      setContests(data);
      
      if (data.length === 0) {
        toast({
          title: "No results found",
          description: `No contests found for username: ${usernameToSearch}`,
        });
      }
    } catch (error) {
      console.error("Error fetching contests by username:", error);
      toast({
        title: "Error",
        description: "Failed to fetch contests for this username",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-4xl font-bold text-[#f59f00] mb-2">Search by Username</h1>
          <p className="text-gray-400">Enter a LeetCode username to find their contest history</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10 bg-[#1e1e1e] border-[#333] focus:border-[#f59f00] text-white"
                placeholder="Enter LeetCode username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={() => handleSearch()}
              disabled={loading}
              className="bg-[#f59f00] hover:bg-[#d88a00] text-white"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </motion.div>

        {hasSearched && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {contests.map((contest) => (
              <ContestCard
                key={contest.contestId}
                contest={{
                  id: contest.contestId,
                  name: contest.contestTitle,
                  startDate: contest.contestDate,
                  participantCount: contest.participantCount
                }}
                onClick={() => navigate(`/username-search/${username}/${contest.contestId}`, {
                  state: {
                    contestDetails: {
                      contestId: contest.contestId,
                      contestTitle: contest.contestTitle,
                      contestDate: contest.contestDate,
                      participantCount: contest.participantCount
                    }
                  }
                })}
              />
            ))}
          </motion.div>
        )}

        {hasSearched && !loading && contests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-10"
          >
            <p className="text-gray-400 text-lg">No contests found for username: {username}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UsernameSearch; 