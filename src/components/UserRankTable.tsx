
import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  rank: number;
  username: string;
  language: string;
  solved: boolean;
}

interface UserRankTableProps {
  users: User[];
}

const UserRankTable = ({ users }: UserRankTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1e1e1e] border-b border-[#333]">
            <th className="py-3 px-4 text-left text-[#f59f00] font-semibold">Rank</th>
            <th className="py-3 px-4 text-left text-[#f59f00] font-semibold">Username</th>
            <th className="py-3 px-4 text-left text-[#f59f00] font-semibold">Language</th>
            <th className="py-3 px-4 text-center text-[#f59f00] font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user.id} 
              className="border-b border-[#333] hover:bg-[#252525] transition-colors"
            >
              <td className="py-3 px-4 text-left">{user.rank}</td>
              <td className="py-3 px-4 text-left font-medium">{user.username}</td>
              <td className="py-3 px-4 text-left">
                <span className="px-2 py-1 bg-[#2a2a2a] rounded text-sm">{user.language}</span>
              </td>
              <td className="py-3 px-4 text-center">
                <Button 
                  variant="ghost"
                  size="sm"
                  className={user.solved ? "text-green-500 hover:text-green-600" : "text-red-500 hover:text-red-600"}
                >
                  {user.solved ? <Check size={18} /> : <X size={18} />}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRankTable;
