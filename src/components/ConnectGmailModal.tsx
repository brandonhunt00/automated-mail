
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
import { emailService } from '@/services/emailService';

interface ConnectGmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ConnectGmailModal = ({ isOpen, onClose, onSuccess }: ConnectGmailModalProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

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
    
    setIsConnecting(true);
    
    try {
      const result = await emailService.connectGmail({ email, password });
      
      if (result.success) {
        toast({
          title: "Connected successfully",
          description: result.message
        });
        setEmail('');
        setPassword('');
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
        description: "An error occurred while connecting to Gmail",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Gmail Account</DialogTitle>
          <DialogDescription>
            Enter your Gmail credentials to connect your account.
            For security, use an App Password instead of your main password.
          </DialogDescription>
        </DialogHeader>
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
                placeholder="your.email@gmail.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                App Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                placeholder="16-character app password"
              />
            </div>
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
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect Account'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectGmailModal;
