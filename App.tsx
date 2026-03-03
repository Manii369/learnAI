import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import RecommendationsPage from "@/pages/RecommendationsPage";
import DoubtSessionPage from "@/pages/DoubtSessionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  const dashboardMap = {
    student: <StudentDashboard />,
    teacher: <TeacherDashboard />,
    admin: <AdminDashboard />,
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={dashboardMap[user!.role]} />
      <Route path="/recommendations" element={<RecommendationsPage />} />
      <Route path="/doubts" element={<DoubtSessionPage />} />
      <Route path="/students" element={<TeacherDashboard />} />
      <Route path="/resources" element={<RecommendationsPage />} />
      <Route path="/analytics" element={<AdminDashboard />} />
      <Route path="/users" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
