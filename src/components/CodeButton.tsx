
import React, { useState } from "react";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserCodeViewer from "./UserCodeViewer";

interface CodeButtonProps {
  username: string;
  score?: number;
  language: string;
  isLeftPanel?: boolean;
}

const CodeButton = ({ username, score, language, isLeftPanel = false }: CodeButtonProps) => {
  const [showCode, setShowCode] = useState(false);
  
  // Mock code based on language
  const getLanguageCode = (language: string) => {
    switch(language) {
      case "Python":
        return `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices: return 0
        
        max_profit = 0
        min_price = float('inf')
        
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
                
        return max_profit`;
      case "JavaScript":
        return `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfit = 0;
    let minPrice = Infinity;
    
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    
    return maxProfit;
};`;
      case "C++":
        return `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) return 0;
        
        int maxProfit = 0;
        int minPrice = INT_MAX;
        
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        
        return maxProfit;
    }
};`;
      default:
        return `// ${language} solution for the problem\n// Maximum profit calculation algorithm`;
    }
  };
  
  return (
    <>
      <Button 
        variant={isLeftPanel ? "default" : "outline"}
        size={isLeftPanel ? "default" : "sm"}
        className={isLeftPanel ? "bg-[#f59f00] hover:bg-[#e08e00] text-black" : "bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a]"}
        onClick={() => setShowCode(true)}
      >
        <Code size={isLeftPanel ? 18 : 14} className={isLeftPanel ? "mr-2" : "mr-1"} />
        {isLeftPanel ? "View Code" : "Code"}
      </Button>
      
      <UserCodeViewer
        username={username}
        score={score}
        language={language}
        code={getLanguageCode(language)}
        isOpen={showCode}
        onClose={() => setShowCode(false)}
        isLeftPanel={isLeftPanel}
      />
    </>
  );
};

export default CodeButton;
