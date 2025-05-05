
import { useState, useEffect } from 'react';
import { Email } from '@/utils/mockData';
import { emailService } from '@/services/emailService';
import ConnectEmailModal from '@/components/ConnectEmailModal';
import EmailAnalysis from '@/components/EmailAnalysis';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    // Get user from localStorage
    const userJson = localStorage.getItem('user');
    if (userJson) {
      setUser(JSON.parse(userJson));
    }
    
    const fetchInitialEmails = async () => {
      setIsLoading(true);
      try {
        const initialEmails = await emailService.fetchEmails();
        setEmails(initialEmails);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch emails",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialEmails();
  }, [toast]);

  const handleConnect = () => {
    setShowConnectModal(true);
  };

  const handleConnectSuccess = () => {
    setIsConnected(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Inbox Shield</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <span className="hidden md:inline text-sm text-muted-foreground">
                {user.email}
              </span>
            )}
            <Button
              onClick={handleConnect}
              variant={isConnected ? "secondary" : "default"}
            >
              {isConnected ? 'Email Connected' : 'Connect Email'}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-16 w-16 rounded-full loading-animation mb-4" />
            <div className="h-6 w-48 rounded loading-animation" />
            <div className="h-4 w-32 rounded loading-animation mt-2" />
          </div>
        ) : (
          <EmailAnalysis 
            emails={emails} 
            onEmailsChange={setEmails} 
            isConnected={isConnected} 
          />
        )}
      </main>
      
      <footer className="bg-card border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Inbox Shield - AI-powered email analysis</p>
        </div>
      </footer>

      <ConnectEmailModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onSuccess={handleConnectSuccess}
      />
    </div>
  );
};

export default Index;
