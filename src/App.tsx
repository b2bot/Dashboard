import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { FiltersProvider } from "@/hooks/useFilters";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { SettingsProvider } from "@/hooks/useSettings";
import { useClientManager } from "@/hooks/useClientManager";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Register from "@/pages/Register";

const queryClient = new QueryClient();

const App = () => {
  const { currentClientId } = useClientManager();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter basename="/dashboard">
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Rotas públicas */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Rotas protegidas */}
                {currentClientId && (
                  <>
                    <Route
                      path="admin"
                      element={
                        <SettingsProvider clientId={currentClientId}>
                          <FiltersProvider>
                            <ProtectedRoute role="admin">
                              <Admin />
                            </ProtectedRoute>
                          </FiltersProvider>
                        </SettingsProvider>
                      }
                    />
                    <Route
                      index
                      element={
                        <SettingsProvider clientId={currentClientId}>
                          <FiltersProvider>
                            <ProtectedRoute>
                              <Index />
                            </ProtectedRoute>
                          </FiltersProvider>
                        </SettingsProvider>
                      }
                    />
                  </>
                )}

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
