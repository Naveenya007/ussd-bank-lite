import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Shield, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिंदी (Hindi)" },
    { value: "ta", label: "தமிழ் (Tamil)" }
  ];

  const handleSendOtp = async () => {
    if (!selectedLanguage || !phoneNumber) {
      toast({
        title: "Required Fields",
        description: "Please select language and enter phone number",
        variant: "destructive"
      });
      return;
    }

    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setShowOtp(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: "Please enter the 6-digit OTP sent to your phone",
      });
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome to Digital Banking",
      });
      navigate("/account-selection");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Digital Banking</CardTitle>
          <CardDescription>Secure USSD-style banking access</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!showOtp ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="language" className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  Select Language
                </Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your preferred language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Mobile Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="text-center text-lg tracking-wider"
                />
              </div>

              <Button 
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  OTP sent to +91 {phoneNumber}
                </p>
                <p className="text-xs text-muted-foreground">
                  Enter the 6-digit code below
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-xl tracking-[0.5em] font-mono"
                />
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleVerifyOtp}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowOtp(false)}
                  className="w-full"
                >
                  Change Phone Number
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;