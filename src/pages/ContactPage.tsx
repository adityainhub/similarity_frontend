
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block mb-12">
          <span className="text-white text-lg font-medium">Let's Connect</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          Get in Touch
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden p-8 relative">
            {/* Terminal dots */}
            <div className="flex space-x-2 absolute top-4 left-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="mt-8 text-center mb-8">
              <p className="text-gray-400">
                Whether you're a recruiter looking to hire, or a developer looking to collaborate, I'm always happy to chat.
              </p>
            </div>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <Input id="name" placeholder="Your Full Name" className="bg-[#222] border-[#333] text-white" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <Input id="email" type="email" placeholder="Your Email" className="bg-[#222] border-[#333] text-white" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Your Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Hi, Your website looks so good, so I am sending you the job offer!" 
                  className="bg-[#222] border-[#333] text-white min-h-[120px]" 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#f59f00] hover:bg-[#e67700] text-black font-medium py-6 rounded-md text-lg flex items-center justify-center gap-2"
              >
                Send Message <ArrowRight size={16} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
