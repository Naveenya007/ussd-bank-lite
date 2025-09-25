import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PinConfirmation = () => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const maxAttempts = 3;

  const handleVerifyPin = async () => {
    if (pin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "Please enter your 4-digit banking PIN",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate PIN verification
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, accept "1234" as correct PIN
      if (pin === "1234") {
        toast({
          title: "PIN Verified",
          description: "Access granted to banking services",
        });
        navigate("/main-options");
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= maxAttempts) {
          toast({
            title: "Account Locked",
            description: "Too many incorrect attempts. Please contact your bank.",
            variant: "destructive"
          });
          // In real app, would redirect to contact page or lock account
        } else {
          toast({
            title: "Incorrect PIN",
            description: `${maxAttempts - newAttempts} attempts remaining`,
            variant: "destructive"
          });
        }
        setPin("");
      }
    }, 1500);
  };

  const handlePinChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '').slice(0, 4);
    setPin(numbersOnly);
  };

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/account-selection")}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center">
              <div className="mx-auto bg-primary rounded-full p-3 w-12 h-12 flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">Security Verification</CardTitle>
              <CardDescription>Enter your 4-digit banking PIN</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-warning text-sm">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Security Notice</span>
              </div>
              <p className="text-sm text-warning/80 mt-1">
                Your PIN is required before accessing any banking services
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin">Banking PIN</Label>
              <div className="relative">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => handlePinChange(e.target.value)}
                  className="text-center text-2xl tracking-[1em] font-mono pr-12"
                  maxLength={4}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {attempts > 0 && (
              <div className="text-center text-sm text-destructive">
                {maxAttempts - attempts} attempts remaining
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleVerifyPin}
              disabled={isLoading || pin.length !== 4 || attempts >= maxAttempts}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Verifying..." : "Verify PIN"}
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                size="sm"
                className="text-muted-foreground"
              >
                Forgot PIN?
              </Button>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>For demo purposes, use PIN: 1234</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PinConfirmation;