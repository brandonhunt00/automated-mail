
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Email } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Mail, MailOpen } from 'lucide-react';
import { emailTypes } from '@/utils/mockData';

interface EmailCardProps {
  email: Email;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const EmailCard = ({ 
  email, 
  isExpanded, 
  onToggleExpand, 
  onAnalyze, 
  isAnalyzing 
}: EmailCardProps) => {
  const [copied, setCopied] = useState(false);

  // Find the matching email type
  const emailType = emailTypes.find(
    type => email.analysis?.type.toLowerCase() === type.value
  ) || emailTypes[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const copyToClipboard = () => {
    if (email.analysis?.suggestedReply) {
      navigator.clipboard.writeText(email.analysis.suggestedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className={`email-card mb-4 ${isExpanded ? 'border-primary' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          {email.unread ? 
            <Mail className="h-5 w-5 text-primary" /> : 
            <MailOpen className="h-5 w-5 text-muted-foreground" />
          }
          <div>
            <div className="font-medium">{email.from.name}</div>
            <div className="text-sm text-muted-foreground">{email.from.email}</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDate(email.date)}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <h3 className="text-lg font-medium mb-1">{email.subject}</h3>
        {!isExpanded ? (
          <p className="text-muted-foreground line-clamp-2">{email.snippet}</p>
        ) : (
          <>
            <div className="whitespace-pre-wrap text-sm mb-4">{email.body}</div>
            
            {email.analysis ? (
              <div className="mt-4 bg-secondary p-4 rounded-md animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">AI Analysis</h4>
                  <Badge className={emailType.color}>{emailType.label}</Badge>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2">Summary:</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {email.analysis.summary.map((point, index) => (
                      <li key={index} className="text-sm">{point}</li>
                    ))}
                  </ul>
                </div>
                
                {email.analysis.suggestedReply && (
                  <div>
                    <h5 className="text-sm font-medium mb-2">Suggested Reply:</h5>
                    <div className="bg-background p-3 rounded border text-sm whitespace-pre-wrap">
                      {email.analysis.suggestedReply}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center mt-4">
                <Button 
                  onClick={onAnalyze} 
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between py-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleExpand}
        >
          {isExpanded ? 'Collapse' : 'Expand'} 
          <ArrowRight className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </Button>
        
        {isExpanded && email.analysis?.suggestedReply && (
          <Button 
            size="sm" 
            onClick={copyToClipboard}
            variant={copied ? "secondary" : "default"}
          >
            {copied ? 'Copied!' : 'Copy Reply'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EmailCard;
