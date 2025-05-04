
import { Email, mockEmails } from '../utils/mockData';
import { analyzeEmail } from './aiService';

// Simulated email service
export const emailService = {
  // Fetch emails from the backend (simulated with mock data)
  fetchEmails: async (): Promise<Email[]> => {
    console.log('Fetching emails...');
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockEmails;
  },

  // Connect to Gmail (simulated)
  connectGmail: async (credentials: { email: string, password: string }): Promise<{ success: boolean, message: string }> => {
    console.log('Connecting to Gmail...', credentials.email);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      message: 'Successfully connected to Gmail account'
    };
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
