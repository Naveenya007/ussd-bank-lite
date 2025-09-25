import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, Shield, Eye, Phone, MessageSquare } from "lucide-react";

const FraudAlert = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock fraud alerts
  const fraudAlerts = [
    {
      id: "alert-001",
      type: "suspicious_login",
      title: "Suspicious Login Attempt",
      description: "Login attempt from new device detected",
      location: "Mumbai, Maharashtra",
      time: "2 hours ago",
      severity: "high",
      status: "active",
      details: {
        device: "Unknown Android Device",
        ipAddress: "103.xx.xx.xx",
        timestamp: "Today, 12:30 PM",
        action: "Login attempt blocked automatically"
      }
    },
    {
      id: "alert-002", 
      type: "unusual_transaction",
      title: "Unusual Transaction Pattern",
      description: "Multiple small transactions detected",
      location: "Online",
      time: "1 day ago",
      severity: "medium",
      status: "reviewed",
      details: {
        transactionCount: "5 transactions",
        totalAmount: "₹2,450",
        timeframe: "Within 30 minutes",
        action: "Transactions were legitimate - No action needed"
      }
    },
    {
      id: "alert-003",
      type: "phishing_attempt",
      title: "Phishing Attempt Blocked",
      description: "Fake banking website blocked",
      location: "Web Browser",
      time: "3 days ago", 
      severity: "high",
      status: "resolved",
      details: {
        website: "fake-bank-site.com",
        browser: "Chrome Mobile",
        timestamp: "Monday, 9:15 AM",
        action: "Website blocked and reported to authorities"
      }
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-destructive/10 text-destructive border-destructive/20";
      case "reviewed": return "bg-warning/10 text-warning border-warning/20";
      case "resolved": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const handleViewDetails = (alertId: string) => {
    setSelectedAlert(selectedAlert === alertId ? null : alertId);
  };

  const handleReportFraud = () => {
    // In real app, would open fraud reporting form
    alert("Fraud reporting feature would open here");
  };

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/main-options")}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="h-5 w-5 text-warning" />
                Fraud Alerts
              </CardTitle>
              <CardDescription>Security notifications and alerts</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Security Status */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Account Security</span>
            </div>
            <p className="text-sm text-primary/80">
              Your account is protected with advanced fraud detection
            </p>
          </div>

          {/* Alert List */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">Recent Alerts</h3>
            
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className="space-y-2">
                <Card className="border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            <h4 className="font-medium text-sm">{alert.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {alert.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{alert.location}</span>
                            <span>•</span>
                            <span>{alert.time}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(alert.status)}>
                            {alert.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(alert.id)}
                        className="w-full"
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Alert Details */}
                {selectedAlert === alert.id && (
                  <Card className="border-l-4 border-l-warning bg-warning/5">
                    <CardContent className="p-4 space-y-3">
                      <h5 className="font-medium text-sm">Alert Details</h5>
                      
                      <div className="space-y-2 text-xs">
                        {Object.entries(alert.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>

                      {alert.status === "active" && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-destructive font-medium">
                            Action Required: Please review this alert
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>

          {/* Report Fraud */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-sm text-muted-foreground">Report Suspicious Activity</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleReportFraud}
                className="h-auto p-3 flex flex-col items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                <span className="text-xs">Call Helpline</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleReportFraud}
                className="h-auto p-3 flex flex-col items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">Report Online</span>
              </Button>
            </div>
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

export default FraudAlert;