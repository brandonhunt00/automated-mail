
import { Email, mockEmails } from '../utils/mockData';
import { analyzeEmail } from './aiService';

export type EmailProvider = 'gmail' | 'outlook' | 'custom';
export type EmailCredentials = {
  email: string;
  password: string;
  provider: EmailProvider;
  customServer?: string; // For custom IMAP servers
};

// Simulated email service
export const emailService = {
  // Fetch emails from the backend (simulated with mock data)
  fetchEmails: async (): Promise<Email[]> => {
    console.log('Fetching emails...');
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockEmails;
  },

  // Connect to email provider (simulated)
  connectEmailProvider: async (credentials: EmailCredentials): Promise<{ success: boolean, message: string }> => {
    console.log(`Connecting to ${credentials.provider}...`, credentials.email);
    
    // Simulate API call delay (different times for different providers)
    const delayTime = credentials.provider === 'custom' ? 3000 : 2000;
    await new Promise(resolve => setTimeout(resolve, delayTime));
    
    // Check if custom server is provided for custom email
    if (credentials.provider === 'custom' && !credentials.customServer) {
      return {
        success: false,
        message: 'Custom IMAP server address is required'
      };
    }
    
    return {
      success: true,
      message: `Successfully connected to ${credentials.provider} account`
    };
  },

  // Legacy function for backward compatibility
  connectGmail: async (credentials: { email: string, password: string }): Promise<{ success: boolean, message: string }> => {
    return emailService.connectEmailProvider({
      email: credentials.email,
      password: credentials.password,
      provider: 'gmail'
    });
  },

  // Analyze a single email
  analyzeEmail: async (emailId: string, emails: Email[]): Promise<Email[]> => {
    const emailIndex = emails.findIndex(email => email.id === emailId);
    
    if (emailIndex === -1) {
      throw new Error('Email not found');
    }
    
    const analyzedEmail = await analyzeEmail(emails[emailIndex]);
    
    // Update the email in the list
    const updatedEmails = [...emails];
    updatedEmails[emailIndex] = analyzedEmail;
    
    return updatedEmails;
  }
};
