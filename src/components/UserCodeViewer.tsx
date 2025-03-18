
import React from "react";
import { Check, Flag, Code } from "lucide-react";
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
}

const UserCodeViewer = ({
  username,
  score = 70,
  code,
  language,
  isOpen,
  onClose,
  isLeftPanel = false,
}: UserCodeViewerProps) => {
  const getLanguageColor = (language: string) => {
    const colorMap: Record<string, { bg: string, text: string }> = {
      "Python": { bg: "bg-blue-500/20", text: "text-blue-400" },
      "JavaScript": { bg: "bg-yellow-500/20", text: "text-yellow-400" },
      "TypeScript": { bg: "bg-blue-400/20", text: "text-blue-300" },
      "C++": { bg: "bg-purple-500/20", text: "text-purple-400" },
      "Java": { bg: "bg-orange-500/20", text: "text-orange-400" },
      "Go": { bg: "bg-teal-500/20", text: "text-teal-400" },
      "Rust": { bg: "bg-red-500/20", text: "text-red-400" },
      "Ruby": { bg: "bg-red-400/20", text: "text-red-300" },
      "Kotlin": { bg: "bg-green-500/20", text: "text-green-400" }
    };
    
    return colorMap[language] || { bg: "bg-gray-500/20", text: "text-gray-400" };
  };
  
  const { bg, text } = getLanguageColor(language);
  
  const handleReportUser = () => {
    toast.success("Report submitted", {
      description: `Thank you for reporting ${username}'s solution. We'll review it.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] bg-[#1a1a1a] border-[#333] text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-[#f59f00]">{username}'s Solution</DialogTitle>
            <Badge className={`${bg} ${text}`}>{language}</Badge>
            {!isLeftPanel && (
              <Badge className="bg-green-500/20 text-green-400">{score}% Efficiency</Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="bg-[#121212] p-4 rounded-md font-mono text-sm overflow-x-auto max-h-[50vh] overflow-y-auto">
            <pre className={`whitespace-pre-wrap ${text}`}>{code}</pre>
          </div>
        </div>
        
        {/*{!isLeftPanel && (*/}
        <div className="mt-4 flex justify-between items-center">
          <div
              className="flex items-center cursor-pointer text-white hover:text-blue-400 text-sm"
              onClick={handleReportUser}
          >
            <Flag size={14} className="mr-2" />
            Report Solution
          </div>

          {/*<div className="text-gray-400 text-sm">*/}
          {/*  Submitted on {new Date().toLocaleDateString()}*/}
          {/*</div>*/}
        </div>
        {/*)}*/}
      </DialogContent>
    </Dialog>
  );
};

export default UserCodeViewer;
