import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Trophy } from "lucide-react";

const SearchTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121212] text-white mt-20 md:mt-32">
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-[#f59f00] mb-2">Choose a Search Method</h1>
          <p className="text-gray-400">Analyze solution similarities by contest or username.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1e1e1e] rounded-lg p-6 cursor-pointer hover:bg-[#2a2a2a] transition-colors"
            onClick={() => navigate("/contests")}
          >
            <div className="flex flex-col items-center text-center">
              <Trophy className="w-16 h-16 text-[#f59f00] mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Search by Contest</h2>
              <p className="text-gray-400">Browse solutions by contest name or number</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#1e1e1e] rounded-lg p-6 cursor-pointer hover:bg-[#2a2a2a] transition-colors"
            onClick={() => navigate("/username-search")}
          >
            <div className="flex flex-col items-center text-center">
              <User className="w-16 h-16 text-[#f59f00] mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Search by Username</h2>
              <p className="text-gray-400">Browse solutions by username</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SearchTypeSelection; 