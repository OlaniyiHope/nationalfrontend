import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";

import NotFound from "./pages/NotFound";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import { ScrollToTop } from "./components/ScrollToTop";

import { JournalProvider } from "./context/JournalContext";

import MetroPlus from "./pages/MetroPlus";
import TopVideos from "./pages/TopVideos";


import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

import Business from "./pages/Business";
import CallsForPapers from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Policies from "./pages/Policies";

import CheckoutPage from "./pages/CheckoutPage";
import Special from "./pages/Special";
import CategoryPage from "./pages/CategoryPage";
import SinglePage from "./pages/SinglePage";
import AboutUsPage from "./pages/AboutUsPage";
import Contact from "./pages/Contact";
import AdvertisePage from "./pages/AdvertisePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>



            <JournalProvider>


      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/request-submitted" element={<TopVideos />} />
        
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/privacy" element={<Privacy />} />
         
          <Route path="/instituition/apply" element={<Business />} />
        
          <Route path="/dashboard/generate" element={<Special />} />
          <Route path="/instituition" element={<MetroPlus />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/register" element={<Register />} />
      
          <Route path="/login" element={<Login />} />
 
  <Route path="/single/:slug" element={<SinglePage />} />
       
          <Route path="/calls-for-paper" element={<CallsForPapers />} />
          <Route path="/instituitional-access" element={<Business />} />
        
          <Route path="/policies" element={<Policies />} />

         <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/advertise" element={<AdvertisePage />} />
       
        
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
                  </JournalProvider>
                        </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
