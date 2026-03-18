export interface SocialMediaPost {
  id: string;
  platform: 'Instagram' | 'Twitter' | 'Facebook' | 'TikTok' | 'LinkedIn';
  content: string;
  suggestedTime: string;
  status: 'draft' | 'scheduled' | 'posted';
  hashtags: string[];
  imagePrompt?: string;
  videoPrompt?: string;
}

export interface PromotionCampaign {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  targetAudience: string;
  posts: SocialMediaPost[];
}

export interface AISuggestion {
  platform: string;
  bestTime: string;
  reason: string;
  contentDraft: string;
  hashtags: string[];
}
