
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block mb-12">
          <span className="text-white text-lg font-medium">Need to Know</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-[#333] rounded-lg overflow-hidden bg-[#1a1a1a]">
              <AccordionTrigger className="px-6 py-4 text-xl font-medium hover:no-underline">
                What Makes LcPlag Different From Other Solutions?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-400">
                LcPlag stands out with its innovative approach to detecting plagiarism in coding contests. Unlike traditional solutions, 
                we focus on blending cutting-edge technology with tailored strategies to optimize your contest management processes, 
                ensuring maximum efficiency and fairness.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-[#333] rounded-lg overflow-hidden bg-[#1a1a1a]">
              <AccordionTrigger className="px-6 py-4 text-xl font-medium hover:no-underline">
                How Does AI Enhance The Services Provided By LcPlag?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-400">
                Our AI-powered systems analyze code submissions using advanced pattern recognition and machine learning algorithms to 
                identify similarities that may indicate plagiarism, even when code has been modified to avoid detection.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-[#333] rounded-lg overflow-hidden bg-[#1a1a1a]">
              <AccordionTrigger className="px-6 py-4 text-xl font-medium hover:no-underline">
                How Does LcPlag Ensure The Quality Of Its AI Solutions?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-400">
                We employ rigorous testing and validation processes for all our AI models, continuously training them on diverse datasets 
                to ensure accuracy and reliability in detecting plagiarism across different programming languages and coding styles.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border border-[#333] rounded-lg overflow-hidden bg-[#1a1a1a]">
              <AccordionTrigger className="px-6 py-4 text-xl font-medium hover:no-underline">
                Does LcPlag Offer Customized Solutions?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-400">
                Yes, we offer tailored solutions to meet the specific needs of different contest platforms and organizations, 
                with customizable parameters and integration options to fit seamlessly into your existing systems.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
