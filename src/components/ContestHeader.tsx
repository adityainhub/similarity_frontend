
import React from "react";

interface ContestHeaderProps {
  contestName: string;
}

const ContestHeader = ({ contestName }: ContestHeaderProps) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-[#f59f00]">{contestName}</h1>
      <div className="mt-2 h-1 w-40 bg-gradient-to-r from-[#f59f00] to-[#f59f00]/50 mx-auto rounded-full"></div>
    </div>
  );
};

export default ContestHeader;
