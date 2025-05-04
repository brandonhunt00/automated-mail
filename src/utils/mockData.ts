
export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  snippet: string;
  body: string;
  date: string;
  unread: boolean;
  analysis?: {
    type: string;
    summary: string[];
    suggestedReply: string;
    analyzed: boolean;
  };
}

export const mockEmails: Email[] = [
  {
    id: "1",
    from: { name: "John Recruitment", email: "john@techrecruiters.com" },
    subject: "Senior Developer Position at Innovative Tech",
    snippet: "We have an exciting opportunity that matches your profile...",
    body: `
Dear [Name],

I hope this email finds you well. I am reaching out because I came across your profile and was impressed by your skills and experience.

We have an opening for a Senior Developer position at Innovative Tech, a rapidly growing startup in the fintech space. The role offers competitive compensation and the chance to work with cutting-edge technologies.

Key Requirements:
- 5+ years of experience in frontend development
- Proficiency with React, TypeScript, and modern JavaScript
- Experience with cloud services and serverless architecture

Would you be interested in learning more about this opportunity? If so, I'd be happy to schedule a call to discuss the details.

Best regards,
John Smith
Tech Recruiters Inc.
    `,
    date: "2023-05-03T09:30:00",
    unread: true
  },
  {
    id: "2",
    from: { name: "Marketing Automation", email: "marketing@salescompany.com" },
    subject: "Boost Your Revenue with Our SaaS Solution",
    snippet: "Our AI-powered platform has been helping companies like yours...",
    body: `
Hello there,

Are you looking to increase your company's revenue? Our AI-powered SaaS solution has been helping businesses like yours achieve remarkable results.

Key benefits:
- 30% average increase in conversion rates
- Automated customer journey mapping
- Real-time analytics and insights

Our clients, including Fortune 500 companies, have seen significant ROI within just 3 months of implementation.

Would you be interested in a free demo? Just reply to this email, and we'll set it up right away.

Best,
Mark Johnson
Sales Representative
SalesCompany Inc.
    `,
    date: "2023-05-02T14:15:00",
    unread: true
  },
  {
    id: "3",
    from: { name: "Support Team", email: "support@yourservice.com" },
    subject: "Your Subscription Renewal",
    snippet: "Your subscription is about to expire in 5 days...",
    body: `
Hi there,

This is a friendly reminder that your Premium subscription will expire in 5 days.

To ensure uninterrupted access to all Premium features, please renew your subscription before the expiration date. You can do this by logging into your account and navigating to the Billing section.

As a valued customer, we're offering you a 15% discount on your renewal if you choose the annual plan. Just use code RENEW15 at checkout.

If you have any questions or need assistance, please don't hesitate to contact our support team.

Thank you for being a loyal customer!

Best regards,
Support Team
YourService
    `,
    date: "2023-05-01T11:45:00",
    unread: true
  },
  {
    id: "4",
    from: { name: "Alex Partner", email: "alex@potentialclient.com" },
    subject: "Potential collaboration opportunity",
    snippet: "I've been following your work and would love to discuss...",
    body: `
Hello,

I've been following your company's work for some time and I'm impressed by the projects you've completed, especially your recent work with AI integration solutions.

Our company is looking to implement similar technologies, and I believe there might be a great opportunity for collaboration. We have a specific project in mind that would benefit from your expertise.

Would you be available for a 30-minute call next week to discuss this potential partnership? I'm flexible with timing and can work around your schedule.

Looking forward to your response,

Alex Partner
Business Development
PotentialClient Inc.
    `,
    date: "2023-04-30T16:20:00",
    unread: true
  },
  {
    id: "5",
    from: { name: "Newsletter", email: "newsletter@techblog.com" },
    subject: "Weekly Tech News: AI Breakthroughs & More",
    snippet: "This week's top stories include major advancements in AI technology...",
    body: `
# Weekly Tech Roundup

## Top Stories This Week

1. **OpenAI Unveils New Language Model**
   The latest model shows unprecedented reasoning capabilities and reduced hallucination rates.

2. **Tech Giant Announces Quantum Computing Milestone**
   Researchers achieved stable qubits at room temperature, potentially accelerating quantum computing adoption.

3. **New Privacy Regulations Coming into Effect**
   Companies will face stricter data handling requirements starting next month.

## Industry Insights

The shift toward edge computing continues to accelerate, with new frameworks making deployment easier than ever. Our analysis shows a 40% increase in edge computing implementations compared to last year.

## Upcoming Events

- AI Developer Conference: May 15-17, Virtual
- Cloud Innovation Summit: May 20, New York
- Open Source Contributors Meetup: May 25, Online

Stay curious!
Tech Blog Team
    `,
    date: "2023-04-29T08:00:00",
    unread: true
  }
];

export const emailTypes = [
  { value: "all", label: "All", color: "bg-gray-100 text-gray-800" },
  { value: "job offer", label: "Job Offer", color: "bg-green-100 text-green-800" },
  { value: "cold email", label: "Cold Email", color: "bg-blue-100 text-blue-800" },
  { value: "support", label: "Support", color: "bg-purple-100 text-purple-800" },
  { value: "marketing", label: "Marketing", color: "bg-orange-100 text-orange-800" },
  { value: "newsletter", label: "Newsletter", color: "bg-yellow-100 text-yellow-800" },
  { value: "spam", label: "Spam", color: "bg-red-100 text-red-800" }
];
