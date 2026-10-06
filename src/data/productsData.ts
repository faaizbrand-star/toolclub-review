export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'AI Tools' | 'Creative & Video' | 'VPN & Security' | 'Productivity & Media';
  tagline: string;
  price: string;
  originalPrice?: string;
  duration: string;
  image: string;
  accentColor: string;
  description: string;
  features: string[];
  whatsIncluded: string[];
  deliveryTime: string;
  warranty: string;
  importantConditions: string[];
  refundPolicySummary: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-claude-pro',
    slug: 'claude-pro',
    name: 'Claude Pro / Team Plan',
    category: 'AI Tools',
    tagline: 'Access Claude 3.5 Sonnet, Claude 3 Opus, and higher usage limits for advanced reasoning and coding.',
    price: 'Rs. 2,499',
    originalPrice: 'Rs. 3,500',
    duration: '1 Month / 3 Months',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D97706',
    description: 'Get uninterrupted access to Anthropic\'s Claude 3.5 Sonnet, the industry-leading model for software development, writing, and analytical tasks. ToolClubPK provides direct activation with guaranteed replacement warranty.',
    features: [
      'Access to Claude 3.5 Sonnet & Claude 3 Opus',
      '5x more usage compared to free tier',
      'Priority access during high-traffic periods',
      'Artifacts feature for live coding and previewing',
      'Early access to new experimental features'
    ],
    whatsIncluded: [
      'Official subscription activation on provided profile',
      'Full replacement warranty throughout active period',
      'Direct customer support via WhatsApp & Email',
      'Verified screenshot delivery receipt'
    ],
    deliveryTime: 'Instant to 60 Minutes (Max 4 Hours)',
    warranty: 'Full Duration Replacement Warranty',
    importantConditions: [
      'Must follow Anthropic acceptable use guidelines.',
      'Do not share credentials beyond agreed profiles.',
      'Password changes without admin permission void warranty.'
    ],
    refundPolicySummary: 'Full replacement or refund if credentials cannot be provisioned within SLA.'
  },
  {
    id: 'prod-chatgpt-plus',
    slug: 'chatgpt-plus',
    name: 'ChatGPT Plus (GPT-4o & Canvas)',
    category: 'AI Tools',
    tagline: 'OpenAI official model access with GPT-4o, DALL·E 3, Voice Mode, and Custom GPTs.',
    price: 'Rs. 1,999',
    originalPrice: 'Rs. 2,999',
    duration: '1 Month / 3 Months',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    accentColor: '#10B981',
    description: 'Unlock OpenAI\'s state-of-the-art GPT-4o intelligence, custom GPT agents, code interpreter, and interactive canvas tools. Available in shared, semi-private, and private options to match your budget.',
    features: [
      'Full access to GPT-4o, GPT-4, and OpenAI o1',
      'Advanced Data Analysis & Python code execution',
      'DALL·E 3 high-definition image generation',
      'Access to thousands of community Custom GPTs',
      'Browsing with real-time web search capabilities'
    ],
    whatsIncluded: [
      'Instant login credentials with clean session setup',
      'Prompt replacement support in case of access resets',
      'Delivery verification proof recorded on ToolClubPK portal',
      '24/7 dedicated troubleshooting assistance'
    ],
    deliveryTime: '15 Minutes to 2 Hours',
    warranty: 'Full Term Operational Guarantee',
    importantConditions: [
      'Single device login for shared plans; multi-device on private plans.',
      'Strictly prohibited to change recovery email on shared plans.'
    ],
    refundPolicySummary: 'Replacement provided within 12 hours if any access disruption occurs.'
  },
  {
    id: 'prod-capcut-pro',
    slug: 'capcut-pro',
    name: 'CapCut Pro (PC & Mobile)',
    category: 'Creative & Video',
    tagline: 'Professional AI video editing, auto-captions, background removal, and 4K 60FPS exports.',
    price: 'Rs. 999',
    originalPrice: 'Rs. 1,800',
    duration: '1 Month / 1 Year',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    accentColor: '#3B82F6',
    description: 'Elevate your TikTok, Instagram Reels, and YouTube video editing with CapCut Pro. Unlock thousands of premium transitions, AI noise reduction, custom font presets, and commercial audio tracks.',
    features: [
      'All Pro filters, templates, and video transitions',
      'AI smart cutout and background remover',
      'Auto-captions in multiple languages with animated styling',
      '4K 60FPS high-bitrate watermark-free export',
      'Smooth slow-motion optical flow processing'
    ],
    whatsIncluded: [
      'Direct account authorization for Windows, Mac, iOS, and Android',
      'Full catalog of Pro cloud effects and sound effects',
      'Immediate delivery with step-by-step setup guide',
      'Active term warranty'
    ],
    deliveryTime: 'Instant to 30 Minutes',
    warranty: 'Full Duration Warranty',
    importantConditions: [
      'Compatible with latest CapCut desktop and mobile applications.',
      'Do not modify the account email.'
    ],
    refundPolicySummary: 'Full warranty support. If login fails, a replacement is delivered promptly.'
  },
  {
    id: 'prod-surfshark-vpn',
    slug: 'surfshark-vpn',
    name: 'Surfshark VPN Premium',
    category: 'VPN & Security',
    tagline: 'Unlimited device connections, CleanWeb ad-blocking, and high-speed global servers.',
    price: 'Rs. 1,299',
    originalPrice: 'Rs. 2,200',
    duration: '2 Months / 6 Months / 1 Year',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    accentColor: '#06B6D4',
    description: 'Keep your internet browsing encrypted and unblock global streaming catalogs (Netflix US, BBC iPlayer, Disney+) with Surfshark VPN. High-speed WireGuard protocol servers located in 100+ countries.',
    features: [
      '3,200+ fast RAM-only servers in 100 countries',
      'CleanWeb built-in ad, tracker, and malware blocker',
      'Bypasser split-tunneling for banking & local apps',
      'Strict zero-logs policy audited by Deloitte',
      'Camouflage Mode to disguise VPN traffic from ISPs'
    ],
    whatsIncluded: [
      'Premium login credentials for Windows, Mac, Android, iOS, and FireTV',
      'Unrestricted streaming speeds with no data caps',
      'Verified delivery receipt hash',
      'Full replacement coverage throughout the plan period'
    ],
    deliveryTime: '15 Minutes to 1 Hour',
    warranty: 'Full Duration Replacement Warranty',
    importantConditions: [
      'Do not resell credentials or use for illegal activities.'
    ],
    refundPolicySummary: 'Immediate account re-issue if connection issue cannot be resolved.'
  },
  {
    id: 'prod-nord-vpn',
    slug: 'nordvpn-premium',
    name: 'NordVPN Premium Plan',
    category: 'VPN & Security',
    tagline: 'Ultra-fast NordLynx encryption, Threat Protection, and dedicated streaming IP pools.',
    price: 'Rs. 1,499',
    originalPrice: 'Rs. 2,499',
    duration: '3 Months / 1 Year',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    accentColor: '#4F46E5',
    description: 'Ranked #1 for VPN speed and privacy protection. Enjoy seamless 4K streaming, secure file downloads, and Dark Web Monitor alerts with NordVPN\'s global server network.',
    features: [
      'NordLynx proprietary protocol for maximum speed',
      'Threat Protection blocks malware before downloading',
      'Double VPN routing for military-grade encryption',
      'Obfuscated servers to bypass strict school/office firewalls',
      '6,000+ optimized streaming servers worldwide'
    ],
    whatsIncluded: [
      'Official NordVPN account login',
      'Access across PC, Mac, Android, iOS, and Browser Extensions',
      'Verified fulfillment record on ToolClubPK portal',
      'Active replacement warranty'
    ],
    deliveryTime: '15 to 45 Minutes',
    warranty: 'Full Term Warranty',
    importantConditions: [
      'Strict adherence to standard usage policies.'
    ],
    refundPolicySummary: 'Replacement guaranteed if credentials become inactive during plan term.'
  },
  {
    id: 'prod-gemini-advanced',
    slug: 'gemini-advanced',
    name: 'Google Gemini Advanced',
    category: 'AI Tools',
    tagline: 'Access Gemini 1.5 Pro with 1 Million token context window and Google Workspace integration.',
    price: 'Rs. 1,899',
    originalPrice: 'Rs. 2,800',
    duration: '1 Month / 3 Months',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8B5CF6',
    description: 'Harness Google\'s most capable AI model for analyzing huge PDF documents, videos, and complex codebases with its massive 1M token context window. Includes integration with Docs, Gmail, and Drive.',
    features: [
      'Gemini 1.5 Pro model with 1,000,000 token context window',
      'Upload and analyze books, research papers, and 1-hour videos',
      'Native Google Workspace integration (Docs, Gmail, Drive)',
      'Advanced Python code execution in live sandbox',
      'Google DeepMind state-of-the-art multimodal reasoning'
    ],
    whatsIncluded: [
      'Direct account authorization',
      'Access to Gemini Advanced web interface and mobile app',
      'ToolClubPK verification certificate',
      'Full replacement warranty'
    ],
    deliveryTime: '30 Minutes to 2 Hours',
    warranty: 'Active Term Replacement Warranty',
    importantConditions: [
      'Must follow Google AI acceptable use policy.'
    ],
    refundPolicySummary: 'Full replacement if access cannot be verified.'
  },
  {
    id: 'prod-adobe-cc',
    slug: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud (All Apps)',
    category: 'Creative & Video',
    tagline: 'Photoshop, Illustrator, Premiere Pro, After Effects, and 20+ desktop creative apps.',
    price: 'Rs. 3,499',
    originalPrice: 'Rs. 6,000',
    duration: '1 Month / 3 Months / 1 Year',
    image: 'https://images.unsplash.com/photo-1542744094-3a31727221eb?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EC4899',
    description: 'The industry-standard suite for graphic designers, video editors, and UI/UX creators. Access the genuine Adobe Creative Cloud suite with Firefly generative AI credits and Adobe Fonts.',
    features: [
      'Access to Photoshop, Premiere Pro, Illustrator, After Effects, Audition',
      'Adobe Firefly Generative Fill and Generative Expand',
      'Adobe Fonts catalog with 20,000+ commercial fonts',
      'Cloud libraries sync across desktop and iPad',
      'Regular software updates directly via Adobe Desktop app'
    ],
    whatsIncluded: [
      'Genuine subscription linked to your email/profile',
      'Full Creative Cloud app access on Windows and macOS',
      'Customer delivery screenshot & record on ToolClubPK',
      'Complete warranty during plan duration'
    ],
    deliveryTime: '1 Hour to 4 Hours',
    warranty: 'Full Duration Warranty',
    importantConditions: [
      'Must be logged in via official Adobe Creative Cloud manager.',
      '2 active computer activations allowed simultaneously.'
    ],
    refundPolicySummary: 'Full warranty support throughout active period.'
  },
  {
    id: 'prod-yt-premium',
    slug: 'youtube-premium',
    name: 'YouTube Premium & Music',
    category: 'Productivity & Media',
    tagline: 'Ad-free YouTube playback, background video playing, offline downloads, and YouTube Music.',
    price: 'Rs. 799',
    originalPrice: 'Rs. 1,499',
    duration: '3 Months / 6 Months / 12 Months',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EF4444',
    description: 'Say goodbye to interruptions. Enjoy completely ad-free video watching on smart TVs, phones, tablets, and laptops, plus offline downloads and the complete YouTube Music catalog.',
    features: [
      'Zero ads before or during any YouTube video',
      'Background play while using other apps or screen is locked',
      'Download videos for offline viewing in full resolution',
      'YouTube Music Premium included with high-bitrate audio',
      'Works seamlessly across Smart TVs, iOS, Android, and PC'
    ],
    whatsIncluded: [
      'Direct upgrade invitation to your personal Google email',
      'No password required — personal account upgrade',
      '12-Month continuous uninterrupted coverage',
      'Delivery proof confirmed on ToolClubPK verification portal'
    ],
    deliveryTime: '15 Minutes to 1 Hour',
    warranty: '100% Term Guarantee',
    importantConditions: [
      'Google account must not have active family group restrictions.',
      'Region transfer assistance provided if needed.'
    ],
    refundPolicySummary: '100% replacement guarantee if plan is interrupted.'
  }
];
