
import { Email } from '../utils/mockData';

// This would normally connect to a backend API, but for the MVP we'll simulate AI analysis
export const analyzeEmail = async (email: Email): Promise<Email> => {
  console.log('Analyzing email:', email.id);
  
  // Simulated API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Predefined analysis responses based on email content patterns
  let type: string = 'other';
  let summary: string[] = [];
  let suggestedReply: string = '';
  
  // Determine email type
  if (email.subject.toLowerCase().includes('position') || email.body.toLowerCase().includes('opportunity') && email.body.toLowerCase().includes('experience')) {
    type = 'job offer';
    summary = [
      `Recruiter from ${email.from.name} is offering a position`,
      'Position requires experience with specific technologies',
      'They want to schedule a call to discuss'
    ];
    suggestedReply = `Dear ${email.from.name},\n\nThank you for reaching out about the position. I'm interested in learning more about this opportunity. I'd be happy to schedule a call to discuss the details further.\n\nPlease let me know what times would work best for you in the coming week.\n\nBest regards,\n[Your Name]`;
  } 
  else if (email.subject.toLowerCase().includes('boost') || email.subject.toLowerCase().includes('revenue') || email.body.toLowerCase().includes('sales')) {
    type = 'marketing';
    summary = [
      `${email.from.name} is offering a SaaS solution to increase revenue`,
      'They claim to provide specific measurable results',
      'They are requesting a response for a demo'
    ];
    suggestedReply = `Hello ${email.from.name},\n\nThank you for your email about your SaaS solution. While I appreciate the information, at this time we're not looking to implement new tools in this area.\n\nI'll keep your contact information should our needs change in the future.\n\nBest regards,\n[Your Name]`;
  }
  else if (email.subject.toLowerCase().includes('subscription') || email.from.email.includes('support')) {
    type = 'support';
    summary = [
      'Notification about subscription renewal',
      'Subscription expires in 5 days',
      'Special discount offered for renewal'
    ];
    suggestedReply = `Hello Support Team,\n\nThank you for the reminder about my subscription renewal. I'd like to take advantage of the 15% discount offer for the annual plan.\n\nCould you please provide instructions on how to apply the RENEW15 code during checkout?\n\nThanks,\n[Your Name]`;
  }
  else if (email.subject.toLowerCase().includes('collaboration') || email.body.toLowerCase().includes('partnership')) {
    type = 'cold email';
    summary = [
      `${email.from.name} has been following your work and is impressed`,
      'They want to discuss a potential collaboration',
      'They are requesting a 30-minute call next week'
    ];
    suggestedReply = `Hi ${email.from.name},\n\nThank you for reaching out about a potential collaboration. I'd be interested in learning more about your project and how we might work together.\n\nI'm available for a call next week. Would Tuesday or Thursday afternoon work for you?\n\nLooking forward to our conversation.\n\nBest regards,\n[Your Name]`;
  }
  else if (email.subject.toLowerCase().includes('weekly') || email.from.email.includes('newsletter')) {
    type = 'newsletter';
    summary = [
      'Weekly tech news roundup with focus on AI advancements',
      'Information about industry trends in edge computing',
      'List of upcoming tech events and conferences'
    ];
    suggestedReply = ``;  // No reply needed for newsletters
  }

  // Return the email with analysis added
  return {
    ...email,
    analysis: {
      type,
      summary,
      suggestedReply,
      analyzed: true
    }
  };
};
