
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Users, Zap } from "lucide-react";

const WhyUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block mb-12">
          <span className="text-white text-lg font-medium">Why Us</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Effortless Detection
        </h2>

        <h3 className="text-4xl md:text-5xl font-bold text-center mb-10">
          Uncompromised Integrity
        </h3>

        <p className="text-xl text-gray-400 text-center mb-20">
          We make identifying plagiarism fast, simple, and effective
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <FeatureCard
            icon={<Brain className="h-8 w-8 text-white" />}
            title="Innovative Approach"
            description="No complexity—just a clean, intuitive dashboard to get results instantly"
          />

          <FeatureCard
            icon={<Zap className="h-8 w-8 text-white" />}
            title="Seamless Experience"
            description="A seamless user experience across all devices, ensuring every interaction connects with the user."
          />

          <FeatureCard
            icon={<Users className="h-8 w-8 text-white" />}
            title="Ongoing Partnership"
            description="Find a new partner easily, not just providers, who offer ongoing support even after the project ends."
          />
        </div>

        <div className="flex justify-center mt-20">
          <Button
            className="bg-[#f59f00] hover:bg-[#e67700] text-black font-medium py-6 px-8 rounded-md text-lg flex items-center gap-2"
            onClick={() => navigate('/contests')}
          >
            Contests <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-[#f59f00] h-24 w-24 rounded-full flex items-center justify-center mb-10">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default WhyUsPage;
