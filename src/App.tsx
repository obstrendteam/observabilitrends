import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";

import Index from "./pages/Index.tsx";
import Articles from "./pages/Articles.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Contact from "./pages/Contact.tsx";
import Community from "./pages/Community.tsx";
import NotFound from "./pages/NotFound.tsx";

import Resources from "./pages/Resources.tsx";
import ResourcePage from "./pages/ResourcePage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:slug" element={<ArticlePage />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/:slug" element={<ResourcePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/community" element={<Community />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
