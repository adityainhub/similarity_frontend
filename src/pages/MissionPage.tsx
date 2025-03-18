
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MissionPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block mb-12">
          <span className="text-white text-lg font-medium">Our Mission</span>
        </div>
        
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            We Drive <span className="text-[#f59f00]">Businesses</span>
          </h2>
          
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            To The <span className="text-[#f59f00]">Forefront</span> Of The Industries
          </h3>
          
          <h4 className="text-4xl md:text-5xl font-bold mb-4">
            Through Comprehensive
          </h4>
          
          <h5 className="text-4xl md:text-5xl font-bold mb-16">
            AI <span className="text-[#f59f00]">Automation.</span>
          </h5>
          
          <p className="text-xl text-gray-400 mb-4">
            First impressions matter. That's why our mission is to create clean, enduring designs that elevate.
          </p>
          
          <p className="text-xl text-gray-400 mb-16">
            First impressions matter. That's why our mission.
          </p>
          
          <Button 
            className="bg-transparent hover:bg-[#f59f00]/10 text-[#f59f00] border border-[#f59f00] rounded-md py-3 px-6 flex items-center gap-2 mx-auto"
          >
            Book A Call <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;
