import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, Eye, EyeOff, RefreshCw } from "lucide-react";

const CheckBalance = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock account data
  const accountData = {
    accountNumber: "****1234",
    bankName: "State Bank of India",
    balance: "25,640.50",
    availableBalance: "25,140.50",
    currency: "₹"
  };

  // Mock recent transactions
  const recentTransactions = [
    {
      id: "1",
      type: "credit",
      amount: "5,500.00",
      description: "Salary Credit",
      date: "Today",
      time: "10:30 AM"
    },
    {
      id: "2", 
      type: "debit",
      amount: "850.00",
      description: "ATM Withdrawal",
      date: "Yesterday",
      time: "3:45 PM"
    },
    {
      id: "3",
      type: "debit", 
      amount: "299.00",
      description: "Online Payment",
      date: "2 days ago",
      time: "11:20 AM"
    }
  ];

  useEffect(() => {
    // Simulate loading balance data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const formatBalance = (amount: string) => {
    return showBalance ? `${accountData.currency}${amount}` : "••••••";
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
                onClick={() => navigate("/main-options")}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle className="text-xl">Account Balance</CardTitle>
                <CardDescription>{accountData.bankName}</CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Balance Card */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <span className="text-sm opacity-90">Current Balance</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-primary-foreground hover:bg-white/20 p-1"
                >
                  {showBalance ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-8 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/10 rounded w-2/3 animate-pulse"></div>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {formatBalance(accountData.balance)}
                  </h2>
                  <p className="text-sm opacity-80">
                    Available: {formatBalance(accountData.availableBalance)}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    Account: {accountData.accountNumber}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">Recent Transactions</h3>
            
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                    </div>
                    <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date} • {transaction.time}
                      </p>
                    </div>
                    <div className={`text-right ${
                      transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                    }`}>
                      <p className="font-semibold text-sm">
                        {transaction.type === 'credit' ? '+' : '-'}
                        {showBalance ? `₹${transaction.amount}` : '••••'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button 
            onClick={() => navigate("/main-options")}
            variant="outline"
            className="w-full"
          >
            Back to Main Menu
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckBalance;