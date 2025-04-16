import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Contest {
  id: string;
  name: string;
  startDate: string;
  participantCount: number;
}

interface ContestCardProps {
  contest: Contest;
  onClick: () => void;
  isLatest?: boolean;
}

const ContestCard = ({ contest, onClick, isLatest = false }: ContestCardProps) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] border border-[#333] rounded-lg overflow-hidden cursor-pointer hover:border-[#f59f00]/50 transition-colors duration-300 shadow-lg relative"
      onClick={onClick}
    >
      {isLatest && (
        <div className="absolute top-3 right-3"> 
          <Badge className="bg-[#f59f00] text-black font-semibold">Updated</Badge>
        </div>
      )}
      <div className="p-6">
        <div className="bg-[#f59f00]/10 rounded-lg px-3 py-1 inline-block mb-3">
          <span className="text-[#f59f00] font-semibold">{contest.id}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{contest.name}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-300 mt-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#f59f00]" />
            <span>{new Date(contest.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#f59f00]" />
            <span>{contest.participantCount.toLocaleString()} participants</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#f59f00]/20 to-[#f08c00]/20 px-6 py-3">
        <p className="text-white font-medium">View Contest Details</p>
      </div>
    </motion.div>
  );
};

export default ContestCard;
