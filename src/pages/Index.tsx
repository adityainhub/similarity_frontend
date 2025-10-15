import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Users, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BASE_URL = import.meta.env.VITE_API_BASE;

const Index = () => {
  const navigate = useNavigate();
  
  const sections = [
    { id: "home", component: <HomeSection /> },
    { id: "why-us", component: <WhyUsSection /> },
    { id: "mission", component: <MissionSection /> },
    { id: "about-us", component: <AboutUsSection /> },
    { id: "faq", component: <FAQSection /> },
    { id: "contact", component: <ContactSection /> },
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animatedElements = entry.target.querySelectorAll('.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeInRight');
          animatedElements.forEach((el, index) => {
            setTimeout(() => {
              if (el.classList.contains('animate-fadeInUp')) {
                el.classList.add('animate-visible');
              } else if (el.classList.contains('animate-fadeInLeft')) {
                el.classList.add('animate-visible-left');
              } else if (el.classList.contains('animate-fadeInRight')) {
                el.classList.add('animate-visible-right');
              }
            }, index * 150); // Stagger the animations
          });
        }
      });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="relative">
        {/* Background image container with opacity */}
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-70"
            style={{ backgroundImage: "url('/uploads/heroBackgroudImg.png')" }}
        ></div>

        {/* Your existing dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern-overlay z-0"></div>

        {/* Navbar would go here with z-index */}
        {/* <Navbar className="relative z-10" /> */}

        {/* Home section */}
        <section id="home" className="min-h-screen py-16 relative z-10">
          <HomeSection />
        </section>
      </div>

      {sections.filter(section => section.id !== "home").map((section) => (
          <section key={section.id} id={section.id} className="min-h-screen py-16">
            {section.component}
          </section>
      ))}
    </div>
  );
};

const HomeSection = () => {
  const navigate = useNavigate();

  return (
      <div className="max-w-7xl mx-auto px-6 pt-32 flex flex-col items-center min-h-screen relative -mt-7">
        {/* Your existing dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern-overlay z-0"></div>

        <div className="text-center relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#222]/60 border border-[#333] rounded-full py-1.5 px-5 inline-block mb-8"
          >
          <span className="flex items-center text-sm">
            <span className="bg-green-500 h-2 w-2 rounded-full mr-2 animate-blink"></span>
            <span className="text-gray-300">Version 1.3 launching soon</span>
          </span>
          </motion.div>

          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-[#f59f00]">Similarity </span>
            <span> Unmasked</span>

          </motion.h1>

          <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold"
          >
            Beyond <span className="inline-block mx-2">✦</span> Imitation.
          </motion.h2>

          <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-4xl md:text-5xl font-bold mt-6 text-[#f59f00]"
          >
            Justice in Code
          </motion.h3>

          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg text-gray-400 mt-8 max-w-3xl mx-auto"
          >
            Exposing similar solutions after every contest
          </motion.p>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-12"
          >
            <Button
                className="bg-[#1e1e1e] border border-[#333] text-white py-5 px-6 rounded-md text-base"
                onClick={() => {
                  const element = document.getElementById('why-us');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
              Learn More ↓
            </Button>
          </motion.div>
        </div>
      </div>
  );
};

const WhyUsSection = () => {
  const navigate = useNavigate();
  const [defaultContestId, setDefaultContestId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the latest contest when component mounts
    const fetchLatestContest = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/contests`);
        if (!response.ok) throw new Error('Failed to fetch contests');
        const contests = await response.json();
        if (contests && contests.length > 0) {
          setDefaultContestId(contests[0].id); // Assuming the first contest is the latest
        }
      } catch (error) {
        console.error('Error fetching latest contest:', error);
      }
    };

    fetchLatestContest();
  }, []);

  const handleContestClick = () => {
    if (defaultContestId) {
      navigate(`/contest/${defaultContestId}`);
    } else {
      console.error('No contest available');
      // Optionally show a toast message to user
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      <div className="flex justify-center mb-12">
        <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block animate-fadeInUp">
          <span className="text-white text-lg font-medium">Why Us</span>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-fadeInUp">
        Effortless Detection
      </h2>
      
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 animate-fadeInUp">
      Uncompromised Integrity
      </h3>
      
      <p className="text-lg text-gray-400 text-center mb-20 animate-fadeInUp">
      We make identifying plagiarism fast, simple, and effective.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        <div className="animate-fadeInLeft">
          <FeatureCard 
            icon={<Brain className="h-8 w-8 text-white" />}
            title="User-Friendly Interface"
            description="No complexity—just a clean, intuitive dashboard to get results instantly."
          />
        </div>
        
        <div className="animate-fadeInUp">
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-white" />}
            title="Swift & Accurate Reports"
            description="Expose unfair play with detailed reports, ready to take action."
          />
        </div>
        
        <div className="animate-fadeInRight">
          <FeatureCard 
            icon={<Users className="h-8 w-8 text-white" />}
            title="Fair Play, Every Time"
            description="We help maintain a level playing field, ensuring rightful rankings without compromise."
          />
        </div>
      </div>
      
      <div className="flex justify-center mt-20 animate-fadeInUp">
        {/* <Button 
          className="bg-[#f59f00] hover:bg-[#e67700] text-black font-medium py-5 px-6 rounded-md text-base flex items-center gap-2"
          onClick={handleContestClick}
        >
          Contests <ArrowRight size={16} />
        </Button> */}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-[#f59f00] h-20 w-20 rounded-full flex items-center justify-center mb-8">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const MissionSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      <div className="flex justify-center mb-12">
        <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block animate-fadeInUp">
          <span className="text-white text-lg font-medium">Our Mission</span>
        </div>
      </div>
      
      <div className="text-center max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">
        Exposing<span className="text-[#f59f00]"> Deception 🔍</span>
        </h2>
        
        <h3 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">
        Ensuring<span className="text-[#f59f00]"> Fair Play 🏆</span>
        </h3>

        <p className="text-lg text-gray-400 mb-4 animate-fadeInUp">
        We unveil plagiarism with precision, safeguarding the integrity of coding contests.
        </p>
        
        <p className="text-lg text-gray-400 mb-20 animate-fadeInUp">
        By upholding fairness, we empower genuine talent to rise above imitation.
        </p>
        
        <div className="animate-fadeInUp">
          <Button 
            className="bg-transparent hover:bg-[#f59f00]/10 text-[#f59f00] border border-[#f59f00] rounded-md py-3 px-6 flex items-center gap-2 mx-auto"
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Us <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const AboutUsSection = () => {
  return (
      <div className="max-w-7xl mx-auto px-6 pt-20">
        <div className="flex justify-center mb-12">
          <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block animate-fadeInUp">
            <span className="text-white text-lg font-medium">About Us</span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-fadeInUp">
          The People Behind The Magic
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">

          <div className="animate-fadeInRight">
            <TeamMember
                name="Syed Saifullah Beigh"
                role="Final Year @BMSCE"
                secondaryRole="Samsung R&D Intern"
                image="/uploads/websiteAboutUsSaif.jpg"
                linkedinUrl="https://www.linkedin.com/in/saifullah-syed-8a4a7b275"
                instagramUrl="https://www.instagram.com/icysaif"
                githubUrl="https://github.com/icysaif7"
                twitterUrl="https://x.com/numbinsan"
            />
          </div>

          <div className="animate-fadeInRight">
            <TeamMember
                name="Vasu Gupta"
                role="Samsung R&D Intern"
                secondaryRole="Final Year @BMSCE"
                image="/uploads/websiteAboutUsVasu.jpeg"
                linkedinUrl="https://www.linkedin.com/in/icvasu/"
                instagramUrl="https://www.instagram.com/"
                githubUrl="https://github.com/icvasu"
                twitterUrl="https://x.com/"
            />
          </div>  

          <div className="animate-fadeInLeft">
            <TeamMember
                name="Kumar Aditya"
                role="Final Year @BMSCE"
                secondaryRole="Aspiring Software Developer"
                image="/uploads/websiteAboutUsAditya.jpeg"
                linkedinUrl="https://www.linkedin.com/in/kumar-aditya-08b762251/"
                instagramUrl="https://www.instagram.com/k.aditya07/"
                githubUrl="https://github.com/adityainhub"
                twitterUrl="https://x.com/k07aditya"
            />
          </div>
        </div>
      </div>
  );
};

const TeamMember = ({ name, role, secondaryRole, image, linkedinUrl, instagramUrl, githubUrl, twitterUrl }) => {
  return (
      <div className="flex flex-col items-center text-center">
        <div className="h-64 w-64 rounded-lg overflow-hidden mb-6">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        <h3 className="text-xl font-bold mb-4">{name}</h3>

        <div className="flex items-center justify-center space-x-4 mb-4">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1e1e1e] h-8 w-8 rounded-full flex items-center justify-center border border-[#333]">
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1e1e1e] h-8 w-8 rounded-full flex items-center justify-center border border-[#333]">
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1e1e1e] h-8 w-8 rounded-full flex items-center justify-center border border-[#333]">
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1e1e1e] h-8 w-8 rounded-full flex items-center justify-center border border-[#333]">
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
        </div>

        <p className="text-gray-400">{role}</p>
        <p className="text-gray-400">{secondaryRole}</p>
      </div>
  );
};

const FAQSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      <div className="flex justify-center mb-12">
        <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block animate-fadeInUp">
          <span className="text-white text-lg font-medium">Need to Know</span>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeInUp">
        Frequently Asked Questions
      </h2>
      
      <div className="max-w-3xl mx-auto animate-fadeInUp">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border border-[#333] rounded-lg overflow-hidden bg-[#1a1a1a]">
            <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
            What is this platform, and what is its purpose?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-400">
            This platform helps identify how similar code submissions are during live contests. It provides an easy-to-use interface where users can search for participants and see how their codes compare with others. Additionally, it allows users to report suspicious similarities, promoting fair competition and discouraging unethical practices.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border border-[#333] rounded-lg overflow-hidden bg-[#1a1a1a]">
            <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
            Are we reporting the users displayed here?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-400">
            No, our platform's purpose is solely to show code similarity between participants. Whether to report a user or not is entirely up to the individuals using this platform. We do not take responsibility for any actions taken based on the displayed results.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border border-[#333] rounded-lg overflow-hidden bg-[#1a1a1a]">
            <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
            I believe I've been incorrectly listed on the website. What should I do?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-400">
            We're sorry for any confusion! Please email us at similarity.help@gmail.com, and we'll look into the issue as soon as possible.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="border border-[#333] rounded-lg overflow-hidden bg-[#1a1a1a]">
            <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
            What's next for this platform?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-400">
            We're working on expanding support to more coding contest platforms, improving detection accuracy, and adding new features to enhance transparency and fairness in competitive programming. Stay tuned for updates!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus({
        type: 'success', 
        message: 'Message sent successfully!'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      <div className="flex justify-center mb-12">
        <div className="rounded-full bg-[#1e1e1e] px-8 py-2 inline-block animate-fadeInUp">
          <span className="text-white text-lg font-medium">Let's Connect</span>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-fadeInUp">
        Get in Touch
      </h2>
      
      <div className="max-w-2xl mx-auto animate-fadeInUp">
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden p-8 relative">
          {/* Terminal dots */}
          <div className="flex space-x-2 absolute top-4 left-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="mt-8 text-center mb-8">
            <p className="text-gray-400">
            Got questions or feedback? Whether you're here to explore, report issues, or just say hi, feel free to drop a message!
            </p>
          </div>
          
          {submitStatus.type && (
            <div className={`mb-6 p-4 rounded ${
              submitStatus.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <Input 
                id="name" 
                placeholder="Your Full Name" 
                className="bg-[#222] border-[#333] text-white"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Your Email" 
                className="bg-[#222] border-[#333] text-white"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Your Message</label>
              <Textarea 
                id="message" 
                placeholder="Share your thoughts, feedback, or questions here!" 
                className="bg-[#222] border-[#333] text-white min-h-[120px]"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#f59f00] hover:bg-[#e67700] text-black font-medium py-5 rounded-md text-base flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight size={16} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
