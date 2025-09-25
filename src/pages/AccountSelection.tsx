import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building2, CreditCard } from "lucide-react";

const AccountSelection = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const navigate = useNavigate();

  // Mock bank accounts linked to the phone number
  const bankAccounts = [
    {
      id: "sbi-001",
      bankName: "State Bank of India",
      accountNumber: "****1234",
      accountType: "Savings",
      balance: "₹25,640.50"
    },
    {
      id: "hdfc-002", 
      bankName: "HDFC Bank",
      accountNumber: "****5678",
      accountType: "Current",
      balance: "₹1,12,890.75"
    },
    {
      id: "icici-003",
      bankName: "ICICI Bank", 
      accountNumber: "****9012",
      accountType: "Savings",
      balance: "₹45,230.20"
    }
  ];

  const handleContinue = () => {
    if (!selectedAccount) return;
    navigate("/pin-confirmation");
  };

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <CardTitle className="text-xl">Select Bank Account</CardTitle>
              <CardDescription>Choose an account to continue</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup value={selectedAccount} onValueChange={setSelectedAccount}>
            {bankAccounts.map((account) => (
              <div key={account.id} className="flex items-center space-x-3">
                <RadioGroupItem value={account.id} id={account.id} />
                <Label 
                  htmlFor={account.id} 
                  className="flex-1 cursor-pointer"
                >
                  <Card className="p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-lg p-2">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{account.bankName}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CreditCard className="h-3 w-3" />
                            <span>{account.accountNumber}</span>
                            <span>•</span>
                            <span>{account.accountType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{account.balance}</p>
                        <p className="text-xs text-muted-foreground">Available</p>
                      </div>
                    </div>
                  </Card>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button 
            onClick={handleContinue}
            disabled={!selectedAccount}
            className="w-full"
            size="lg"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSelection;