
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { emailService, EmailProvider } from '@/services/emailService';
import { Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConnectEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ConnectEmailModal = ({ isOpen, onClose, onSuccess }: ConnectEmailModalProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [customServer, setCustomServer] = useState('');
  const [provider, setProvider] = useState<EmailProvider>('gmail');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setCustomServer('');
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please provide both email and password",
        variant: "destructive"
      });
      return;
    }

    if (provider === 'custom' && !customServer) {
      toast({
        title: "Missing information",
        description: "Please provide the custom IMAP server address",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const result = await emailService.connectEmailProvider({ 
        email, 
        password, 
        provider,
        customServer: provider === 'custom' ? customServer : undefined 
      });
      
      if (result.success) {
        toast({
          title: "Connected successfully",
          description: result.message
        });
        resetForm();
        onSuccess();
        onClose();
      } else {
        toast({
          title: "Connection failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "An error occurred while connecting to your email provider",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const getProviderLabel = () => {
    switch (provider) {
      case 'gmail':
        return 'Gmail';
      case 'outlook':
        return 'Outlook';
      case 'custom':
        return 'Custom Email';
      default:
        return 'Email Provider';
    }
  };

  const getProviderPasswordLabel = () => {
    return provider === 'gmail' ? 'App Password' : 'Password';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect Email Account</DialogTitle>
          <DialogDescription>
            Enter your email credentials to connect your account.
            {provider === 'gmail' && (
              <span> For Gmail, use an App Password instead of your main password for security.</span>
            )}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="gmail" onValueChange={(v) => setProvider(v as EmailProvider)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="gmail">Gmail</TabsTrigger>
            <TabsTrigger value="outlook">Outlook</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleConnect}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                  placeholder={`your.email@${provider === 'gmail' ? 'gmail.com' : provider === 'outlook' ? 'outlook.com' : 'example.com'}`}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  {getProviderPasswordLabel()}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                  placeholder={provider === 'gmail' ? '16-character app password' : '••••••••'}
                />
              </div>
              
              {provider === 'custom' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="server" className="text-right">
                    IMAP Server
                  </Label>
                  <Input
                    id="server"
                    type="text"
                    value={customServer}
                    onChange={(e) => setCustomServer(e.target.value)}
                    className="col-span-3"
                    placeholder="imap.example.com:993"
                  />
                </div>
              )}
              
              {provider === 'gmail' && (
                <div className="col-span-full">
                  <p className="text-sm text-muted-foreground mt-2">
                    <a 
                      href="https://support.google.com/accounts/answer/185833" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Learn how to create an App Password
                    </a>
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : `Connect ${getProviderLabel()} Account`}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectEmailModal;
