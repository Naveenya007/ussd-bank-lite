import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wallet, Send, AlertTriangle, LogOut } from "lucide-react";

const MainOptions = () => {
  const navigate = useNavigate();

  const mainOptions = [
    {
      id: "balance",
      title: "Check Balance",
      description: "View account balance and recent transactions",
      icon: Wallet,
      route: "/check-balance",
      className: "bg-warning text-warning-foreground hover:bg-warning/90"
    },
    {
      id: "send-money",
      title: "Send Money",
      description: "Transfer funds to another account",
      icon: Send,
      route: "/send-money", 
      className: "bg-success text-success-foreground hover:bg-success/90"
    },
    {
      id: "fraud-alert",
      title: "Fraud Alert",
      description: "Report suspicious activity or view alerts",
      icon: AlertTriangle,
      route: "/fraud-alert",
      className: "bg-warning text-warning-foreground hover:bg-warning/90"
    }
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/pin-confirmation")}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle className="text-xl">Banking Services</CardTitle>
                <CardDescription>Choose a service to continue</CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="p-2"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {mainOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.id}
                onClick={() => navigate(option.route)}
                className={`w-full h-auto p-0 ${option.className}`}
                variant="default"
              >
                <Card className="w-full bg-transparent border-0 shadow-none">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 rounded-lg p-3">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-base">{option.title}</h3>
                        <p className="text-sm opacity-90 mt-1">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Button>
            );
          })}

          <div className="mt-6 pt-4 border-t border-border/20">
            <div className="text-center space-y-1">
              <p className="text-sm font-medium">Welcome back!</p>
              <p className="text-xs text-muted-foreground">
                Last login: Today, 2:45 PM
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainOptions;