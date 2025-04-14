import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import ContestSelection from "./pages/ContestSelection";
import QuestionSelection from "./pages/QuestionSelection";
import RankingsPage from "./pages/RankingsPage";
import SolutionDetailsPage from "./pages/SolutionDetailsPage";
import WhyUsPage from "./pages/WhyUsPage";
import MissionPage from "./pages/MissionPage";
import AboutUsPage from "./pages/AboutUsPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import SearchTypeSelection from "./pages/SearchTypeSelection";
import UsernameSearch from "./pages/UsernameSearch";
import QuestionSelectionUserName from "./pages/QuestionSelectionUserName";
import SolutionDetailsPageUserName from "./pages/SolutionDetailsPageUserName";

const queryClient = new QueryClient();

// Scroll to hash component
const ScrollToHash = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Remove the # character
      const id = location.hash.substring(1);
      
      // Find element and scroll to it
      const element = document.getElementById(id);
      if (element) {
        // Add a slight delay to ensure the page has fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/') {
      // Scroll to top when navigating to home without hash
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchTypeSelection />} />
            <Route path="/contests" element={<ContestSelection />} />
            <Route path="/username-search" element={<UsernameSearch />} />
            <Route path="/username-search/:username" element={<UsernameSearch />} />
            <Route path="/username-search/:username/:contestId" element={<QuestionSelectionUserName />} />
            <Route path="/username-search/:username/:contestId/:questionId/solution" element={<SolutionDetailsPageUserName />} />
            <Route path="/contest/:contestId/questions" element={<QuestionSelection />} />
            <Route path="/contest/:contestId/question/:questionId" element={<RankingsPage />} />
            <Route path="/contest/:contestId/question/:questionId/solution/:userId" element={<SolutionDetailsPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

//edit