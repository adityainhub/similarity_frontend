import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutUsPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block mb-12">
          <span className="text-white text-lg font-medium">Our Creative Minds</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          The People Behind The Magic
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <TeamMember 
            name="Vyom Goyal"
            role="Samsung R&D Intern"
            secondaryRole="ACM ICPC 2024 Regionalist"
            image="/public/uploads/websiteAboutUsVyom.jpeg"
          />
          
          <TeamMember 
            name="Saifullah Beigh"
            role="Senior @ BMSCE"
            secondaryRole="Samsung R&D Intern"
            image="/public/uploads/websiteAboutUsSaif.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

const TeamMember = ({ name, role, secondaryRole, image }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-72 w-72 rounded-lg overflow-hidden mb-6">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      
      <h3 className="text-2xl font-bold mb-4">{name}</h3>
      
      <div className="flex items-center justify-center space-x-4 mb-4">
        <a href="#" className="bg-[#1e1e1e] h-8 w-8 rounded-full flex items-center justify-center border border-[#333]">
          <img src="https://cdn.simpleicons.org/linkedin/white" alt="LinkedIn" className="h-4 w-4" />
        </a>
        <a href="#" className="bg-[#1e1e1e] h-8 w-8 rounded-full flex items-center justify-center border border-[#333]">
          <img src="https://cdn.simpleicons.org/instagram/white" alt="Instagram" className="h-4 w-4" />
        </a>
        <a href="#" className="bg-[#1e1e1e] h-8 w-8 rounded-full flex items-center justify-center border border-[#333]">
          <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" className="h-4 w-4" />
        </a>
      </div>
      
      <p className="text-gray-400">{role}</p>
      <p className="text-gray-400">{secondaryRole}</p>
    </div>
  );
};

export default AboutUsPage;
