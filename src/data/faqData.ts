export interface FAQItem {
  id: string;
  category: 'Orders & Payments' | 'Delivery & Activations' | 'Warranties & Support' | 'Account Usage';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Orders & Payments',
    question: 'How do I purchase a tool or subscription on ToolClubPK?',
    answer: 'You can browse our official catalog of tools on ToolClubPK, click "Order Now" or "Purchase", and proceed to checkout on our official store (toolclubpk.com) or connect directly with our dispatch team on WhatsApp. Once payment is confirmed, an Order ID (e.g. TC-XXXX) is issued and your fulfillment begins.'
  },
  {
    id: 'faq-2',
    category: 'Delivery & Activations',
    question: 'How is my digital order delivered?',
    answer: 'Because all products are digital tools and subscriptions, delivery is 100% digital. We provision your account or invite link, perform quality checks, and upload a verified fulfillment screenshot directly to our verification portal (toolclubpk.shop/proof/TC-XXXX). Your credentials and instructions are sent immediately via WhatsApp or Email.'
  },
  {
    id: 'faq-3',
    category: 'Delivery & Activations',
    question: 'How long does activation take?',
    answer: 'Most standard activations (such as ChatGPT, CapCut Pro, and VPN subscriptions) are fulfilled within 15 to 45 minutes during our working hours (10:00 AM – 11:00 PM PKT). Complex activations like custom email upgrades may take up to 2 to 4 hours. Maximum turnaround time is 24 hours.'
  },
  {
    id: 'faq-4',
    category: 'Delivery & Activations',
    question: 'How can I verify my delivery screenshot on this portal?',
    answer: 'Enter your Customer ID (e.g. TC-4185) into the verification search bar on ToolClubPK, or visit your direct link (toolclubpk.shop/proof/YOUR-ID). You will see the authentic fulfillment screenshot, activation timestamp, service name, and cryptographic verification hash.'
  },
  {
    id: 'faq-5',
    category: 'Orders & Payments',
    question: 'What happens immediately after I submit my payment?',
    answer: 'Once payment screenshot is received, our order desk generates a unique Customer ID, initiates subscription provisioning on the official server, records delivery proof, and dispatches your login instructions.'
  },
  {
    id: 'faq-6',
    category: 'Warranties & Support',
    question: 'What is ToolClubPK\'s warranty and replacement policy?',
    answer: 'All subscriptions come with a full-term operational replacement warranty. If you experience an access interruption, password reset, or activation error during your active plan, our support team will troubleshoot or issue replacement credentials within 12–24 hours free of charge.'
  },
  {
    id: 'faq-7',
    category: 'Warranties & Support',
    question: 'When are refunds available?',
    answer: 'Refunds are provided if ToolClubPK is unable to fulfill or activate your purchased service within our stated SLA (24 hours), or if a service becomes permanently discontinued and cannot be replaced. Because digital accounts are provisioned upon delivery, refunds are not available for change of mind after successful delivery.'
  },
  {
    id: 'faq-8',
    category: 'Account Usage',
    question: 'Can I use my subscription on multiple devices?',
    answer: 'Device limits depend on the specific plan. Personal / Private plans (like Surfshark VPN or private accounts) permit multi-device logins. Shared or single-user profiles are strictly limited to one device at a time to prevent session conflicts. Specific limits are listed on each product page.'
  },
  {
    id: 'faq-9',
    category: 'Warranties & Support',
    question: 'What should I do if I encounter an issue with my tool?',
    answer: 'Reach out to our support team immediately at toolclubpk@gmail.com or via WhatsApp with your Customer ID (e.g. TC-XXXX) and a screenshot of the error. We verify your record on our system and resolve the issue promptly.'
  },
  {
    id: 'faq-10',
    category: 'Account Usage',
    question: 'Can I change the password on my account?',
    answer: 'For personal upgrade invitations (e.g. YouTube Premium or personal email upgrades), you retain full control over your personal account. For shared or pre-configured team accounts, modifying passwords or recovery emails is strictly prohibited and voids your replacement warranty.'
  }
];
