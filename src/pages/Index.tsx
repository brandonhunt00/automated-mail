
import { useState, useEffect } from 'react';
import { Email } from '@/utils/mockData';
import { emailService } from '@/services/emailService';
import ConnectGmailModal from '@/components/ConnectGmailModal';
import EmailAnalysis from '@/components/EmailAnalysis';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  
  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Inbox Shield</h1>
          </div>
          
          <Button
            onClick={handleConnect}
            variant={isConnected ? "secondary" : "default"}
          >
            {isConnected ? 'Connected to Gmail' : 'Connect Gmail'}
          </Button>
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

      <ConnectGmailModal 
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onSuccess={handleConnectSuccess}
      />
    </div>
  );
};

export default Index;
