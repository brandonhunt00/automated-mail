
import { useState, useEffect } from 'react';
import { Email, emailTypes } from '@/utils/mockData';
import EmailCard from './EmailCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { emailService } from '@/services/emailService';
import { useToast } from '@/hooks/use-toast';
import { Inbox } from 'lucide-react';

interface EmailAnalysisProps {
  emails: Email[];
  onEmailsChange: (emails: Email[]) => void;
  isConnected: boolean;
}

const EmailAnalysis = ({ emails, onEmailsChange, isConnected }: EmailAnalysisProps) => {
  const { toast } = useToast();
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);
  const [analyzingEmailId, setAnalyzingEmailId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const handleToggleExpand = (emailId: string) => {
    setExpandedEmailId(expandedEmailId === emailId ? null : emailId);
  };

  const handleAnalyzeEmail = async (emailId: string) => {
    setAnalyzingEmailId(emailId);
    try {
      const updatedEmails = await emailService.analyzeEmail(emailId, emails);
      onEmailsChange(updatedEmails);
      toast({
        title: "Analysis Complete",
        description: "Email has been analyzed successfully"
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze email",
        variant: "destructive"
      });
    } finally {
      setAnalyzingEmailId(null);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const freshEmails = await emailService.fetchEmails();
      onEmailsChange(freshEmails);
      toast({
        title: "Emails Refreshed",
        description: "Fetched the latest emails from your inbox"
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh emails",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter emails based on search term and selected type
  const filteredEmails = emails.filter(email => {
    const matchesSearch = searchTerm === '' || 
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || 
      (email.analysis && email.analysis.type.toLowerCase() === selectedType);

    return matchesSearch && (selectedType === 'all' || matchesType);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Inbox</h2>
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing || !isConnected}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Inbox'}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {emailTypes.map((type) => (
            <Badge
              key={type.value}
              className={`cursor-pointer ${
                selectedType === type.value ? type.color : 'bg-secondary hover:bg-secondary/80'
              }`}
              onClick={() => setSelectedType(type.value)}
            >
              {type.label}
            </Badge>
          ))}
        </div>
      </div>

      {filteredEmails.length > 0 ? (
        <div className="space-y-4">
          {filteredEmails.map((email) => (
            <EmailCard
              key={email.id}
              email={email}
              isExpanded={expandedEmailId === email.id}
              onToggleExpand={() => handleToggleExpand(email.id)}
              onAnalyze={() => handleAnalyzeEmail(email.id)}
              isAnalyzing={analyzingEmailId === email.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Inbox className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">No emails found</h3>
          <p className="text-muted-foreground mt-2">
            {isConnected 
              ? "No emails match your current filters."
              : "Connect your Gmail account to start analyzing emails."}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailAnalysis;
