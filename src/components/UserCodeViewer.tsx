import React from "react";
import { Check, Flag, Code, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface UserCodeViewerProps {
  username: string;
  score?: number;
  code: string;
  language: string;
  isOpen: boolean;
  onClose: () => void;
  isLeftPanel?: boolean;
  contestId?: string;
  rank?: number;
}

const UserCodeViewer = ({
  username,
  score = 70,
  code,
  language,
  isOpen,
  onClose,
  isLeftPanel = false,
  contestId = 'biweekly-contest-147',
  rank = 1,
}: UserCodeViewerProps) => {
  const getLanguageColor = (language: string) => {
    // Normalize the language string to handle different formats
    const normalizedLang = language.toLowerCase();

    const colorMap: Record<string, { bg: string, text: string }> = {
      "python": { bg: "bg-blue-900", text: "text-blue-200" },
      "python3": { bg: "bg-blue-900", text: "text-blue-200" },
      "javascript": { bg: "bg-yellow-900", text: "text-yellow-200" },
      "typescript": { bg: "bg-blue-800", text: "text-blue-200" },
      "ruby": { bg: "bg-red-900", text: "text-red-200" },
      "go": { bg: "bg-teal-900", text: "text-teal-200" },
      "rust": { bg: "bg-orange-900", text: "text-orange-200" },
      "java": { bg: "bg-amber-900", text: "text-amber-200" },
      "cpp": { bg: "bg-purple-900", text: "text-green-200" },
      "c++": { bg: "bg-purple-900", text: "text-green-200" },
      "c": { bg: "bg-indigo-900", text: "text-indigo-200" },
      "csharp": { bg: "bg-green-900", text: "text-purple-200" },
      "kotlin": { bg: "bg-violet-900", text: "text-violet-200" },
      "swift": { bg: "bg-pink-900", text: "text-pink-200" },
      "scala": { bg: "bg-red-800", text: "text-red-100" }
    };

    return colorMap[normalizedLang] || { bg: "bg-gray-500/20", text: "text-gray-400" };
  };

  const { bg, text } = getLanguageColor(language);

  const handleReportUser = () => {
    toast.success("Report submitted", {
      description: `Thank you for reporting ${username}'s solution. We'll review it.`,
    });

    // Open the LeetCode ranking page
    const pageNumber = Math.ceil(rank / 25);
    const leetcodeUrl = `https://leetcode.com/contest/${contestId}/ranking/${pageNumber}/?region=global_v2`;
    window.open(leetcodeUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] bg-[#1a1a1a] border-[#333] text-white w-[calc(100vw-2rem)] sm:w-auto overflow-hidden">
        <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full overflow-hidden">
            <DialogTitle className="text-[#f59f00] truncate max-w-full">{username}'s Solution</DialogTitle>
            <div className="flex flex-wrap gap-2">
              <Badge className={`${bg} ${text} text-xs sm:text-sm`}>{language}</Badge>
              {!isLeftPanel && (
                <Badge className="bg-green-500/20 text-green-400 text-xs sm:text-sm">{score}% Match</Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <div className="bg-[#121212] p-2 sm:p-4 rounded-md font-mono text-xs sm:text-sm overflow-x-auto max-h-[50vh] overflow-y-auto">
            <pre className={`whitespace-pre-wrap ${text}`}>{code}</pre>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer text-white hover:text-blue-400 text-xs sm:text-sm"
            onClick={handleReportUser}
          >
            <Flag size={14} className="mr-2" />
            Report Solution
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// The button component for the View Code button at the top of the UI
export const ViewCodeButton = ({ 
  username, 
  language,
  onClick,
  contestId = 'biweekly-contest-147',
  rank = 1, 
}: { 
  username: string; 
  language: string;
  onClick: () => void;
  contestId?: string;
  rank?: number;
}) => {
  const getLanguageColor = (language: string) => {
    const normalizedLang = language.toLowerCase();
    const colorMap: Record<string, { bg: string, text: string }> = {
      "python": { bg: "bg-blue-900", text: "text-blue-200" },
      "python3": { bg: "bg-blue-900", text: "text-blue-200" },
      "javascript": { bg: "bg-yellow-900", text: "text-yellow-200" },
      "typescript": { bg: "bg-blue-800", text: "text-blue-200" },
      "ruby": { bg: "bg-red-900", text: "text-red-200" },
      "go": { bg: "bg-teal-900", text: "text-teal-200" },
      "rust": { bg: "bg-orange-900", text: "text-orange-200" },
      "java": { bg: "bg-amber-900", text: "text-amber-200" },
      "cpp": { bg: "bg-purple-900", text: "text-green-200" },
      "c++": { bg: "bg-purple-900", text: "text-green-200" },
      "c": { bg: "bg-indigo-900", text: "text-indigo-200" },
      "csharp": { bg: "bg-green-900", text: "text-purple-200" },
      "kotlin": { bg: "bg-violet-900", text: "text-violet-200" },
      "swift": { bg: "bg-pink-900", text: "text-pink-200" },
      "scala": { bg: "bg-red-800", text: "text-red-100" }
    };

    return colorMap[normalizedLang] || { bg: "bg-gray-500/20", text: "text-gray-400" };
  };

  const { bg, text } = getLanguageColor(language);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
      <div className="flex-1 min-w-0">
        <div className="text-base font-semibold truncate max-w-full">{username}</div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={`${bg} ${text} text-xs`}>{language}</Badge>
        <Button 
          onClick={onClick} 
          size="sm" 
          className="flex items-center gap-1 text-xs p-1 px-2 h-7 bg-blue-600 hover:bg-blue-700"
        >
          <Code size={14} />
          <span className="hidden sm:inline">View Code</span>
        </Button>
      </div>
    </div>
  );
};

export default UserCodeViewer;