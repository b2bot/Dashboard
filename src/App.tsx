import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { FiltersProvider } from "@/hooks/useFilters";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { SettingsProvider } from "@/hooks/useSettings";
import { useClientManager } from "@/hooks/useClientManager";

const queryClient = new QueryClient();

const App = () => {
  const { currentClientId } = useClientManager();
  useEffect(() => {
    // Apply theme class to html element on mount
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SettingsProvider clientId={currentClientId}>
        <FiltersProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/dashboard/">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </FiltersProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;