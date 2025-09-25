import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AccountSelection from "./pages/AccountSelection";
import PinConfirmation from "./pages/PinConfirmation";
import MainOptions from "./pages/MainOptions";
import CheckBalance from "./pages/CheckBalance";
import SendMoney from "./pages/SendMoney";
import FraudAlert from "./pages/FraudAlert";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/account-selection" element={<AccountSelection />} />
          <Route path="/pin-confirmation" element={<PinConfirmation />} />
          <Route path="/main-options" element={<MainOptions />} />
          <Route path="/check-balance" element={<CheckBalance />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/fraud-alert" element={<FraudAlert />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
