import React, { useState } from "react";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserCodeViewer from "./UserCodeViewer";

interface CodeButtonProps {
  username: string;
  score?: number;
  language: string;
  isLeftPanel?: boolean;
  submissionId: string;
  onButtonClick?: () => void;
}

interface CodeResponse {
  submissionId: string;
  submittedCode: string;
}

const CodeButton = ({ username, score, language, isLeftPanel = false, submissionId, onButtonClick }: CodeButtonProps) => {
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    if (onButtonClick) {
      onButtonClick();
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/codes/${submissionId}`);
      const data: CodeResponse = await response.json();
      setCode(data.submittedCode);
      setShowCode(true);
    } catch (error) {
      console.error("Error fetching code:", error);
      // You might want to add toast notification here
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Button 
        variant={isLeftPanel ? "default" : "outline"}
        size={isLeftPanel ? "default" : "sm"}
        className={isLeftPanel ? "bg-[#f59f00] hover:bg-[#e08e00] text-black" : "bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a]"}
        onClick={handleClick}
        disabled={loading}
      >
        <Code size={isLeftPanel ? 18 : 14} className={isLeftPanel ? "mr-2" : "mr-1"} />
        {isLeftPanel ? (loading ? "Loading..." : "View Code") : (loading ? "..." : "Code")}
      </Button>
      
      <UserCodeViewer
        username={username}
        score={score}
        language={language}
        code={code}
        isOpen={showCode}
        onClose={() => setShowCode(false)}
        isLeftPanel={isLeftPanel}
      />
    </>
  );
};

export default CodeButton;
