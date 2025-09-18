import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CounselorLayout } from "@/components/layout/CounselorLayout";
import CounselorDashboard from "./pages/CounselorDashboard";
import StudentRiskPrediction from "./pages/StudentRiskPrediction";
import CounselingSessions from "./pages/CounselingSessions";
import CounselorNotifications from "./pages/CounselorNotifications";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import CounselorSettings from "./pages/CounselorSettings";
import CounselingRequest from "./pages/CounselingRequest";
import Profile from "./pages/Profile";
import Students from "./pages/Students";
import Sessions from "./pages/Sessions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CounselorLayout />}>
            <Route index element={<CounselorDashboard />} />
            <Route path="risk-prediction" element={<StudentRiskPrediction />} />
            <Route path="sessions" element={<CounselingSessions />} />
            <Route path="notifications" element={<CounselorNotifications />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="reports-analytics" element={<ReportsAnalytics />} />
            <Route path="settings" element={<CounselorSettings />} />
            <Route path="counseling-request" element={<CounselingRequest />} />
            <Route path="profile" element={<Profile />} />
            <Route path="students" element={<Students />} />
            <Route path="all-sessions" element={<Sessions />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
