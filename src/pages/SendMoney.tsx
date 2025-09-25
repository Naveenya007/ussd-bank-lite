import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, User, Phone, Banknote, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SendMoney = () => {
  const [step, setStep] = useState(1); // 1: Enter details, 2: Confirm, 3: Success
  const [formData, setFormData] = useState({
    receiverName: "",
    receiverPhone: "",
    amount: "",
    remarks: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validation
    if (!formData.receiverName || !formData.receiverPhone || !formData.amount) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.receiverPhone.length !== 10) {
      toast({
        title: "Invalid Phone Number", 
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(formData.amount) <= 0 || parseFloat(formData.amount) > 50000) {
      toast({
        title: "Invalid Amount",
        description: "Amount should be between ₹1 and ₹50,000",
        variant: "destructive"
      });
      return;
    }

    setStep(2);
  };

  const handleConfirmTransfer = async () => {
    setIsLoading(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      toast({
        title: "Transfer Successful",
        description: `₹${formData.amount} sent to ${formData.receiverName}`,
      });
    }, 2000);
  };

  const handleNewTransfer = () => {
    setStep(1);
    setFormData({
      receiverName: "",
      receiverPhone: "",
      amount: "",
      remarks: ""
    });
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-accent flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-6">
            <div className="mx-auto bg-success rounded-full p-4 w-20 h-20 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-success-foreground" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-success">Transfer Complete!</h2>
              <p className="text-muted-foreground">
                Your money has been sent successfully
              </p>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-semibold">₹{formData.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">To</span>
                <span className="font-medium">{formData.receiverName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="font-mono text-sm">+91 {formData.receiverPhone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-sm">TXN{Date.now().toString().slice(-8)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={handleNewTransfer} className="w-full">
                Send Another Transfer
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/main-options")}
                className="w-full"
              >
                Back to Main Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => step === 1 ? navigate("/main-options") : setStep(1)}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-xl">
                {step === 1 ? "Send Money" : "Confirm Transfer"}
              </CardTitle>
              <CardDescription>
                {step === 1 ? "Enter recipient details" : "Review transaction details"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="receiverName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Recipient Name *
                </Label>
                <Input
                  id="receiverName"
                  placeholder="Enter full name"
                  value={formData.receiverName}
                  onChange={(e) => handleInputChange("receiverName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiverPhone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Mobile Number *
                </Label>
                <Input
                  id="receiverPhone"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.receiverPhone}
                  onChange={(e) => handleInputChange("receiverPhone", e.target.value.replace(/\D/g, '').slice(0, 10))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  Amount (₹) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  min="1"
                  max="50000"
                />
                <p className="text-xs text-muted-foreground">
                  Daily limit: ₹50,000
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <Textarea
                  id="remarks"
                  placeholder="Purpose of transfer"
                  value={formData.remarks}
                  onChange={(e) => handleInputChange("remarks", e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={handleNext} className="w-full" size="lg">
                Review Transfer
              </Button>
            </>
          ) : (
            <>
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <h3 className="font-semibold text-warning mb-2">Confirm Transfer Details</h3>
                <p className="text-sm text-warning/80">
                  Please verify all details before confirming
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Recipient</span>
                  <span className="font-medium">{formData.receiverName}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Mobile</span>
                  <span className="font-mono">+91 {formData.receiverPhone}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="font-bold text-lg text-primary">₹{formData.amount}</span>
                </div>
                
                {formData.remarks && (
                  <div className="p-3 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground block mb-1">Remarks</span>
                    <span className="text-sm">{formData.remarks}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleConfirmTransfer}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? "Processing..." : "Confirm & Send"}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full"
                >
                  Edit Details
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoney;