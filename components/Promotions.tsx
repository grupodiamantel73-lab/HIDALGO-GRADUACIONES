import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  Share2, 
  Instagram, 
  Twitter, 
  Facebook, 
  Music, 
  Clock, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Send,
  Loader2,
  Image as ImageIcon,
  Video as VideoIcon
} from 'lucide-react';
import { generateSocialMediaStrategy, generateImagePrompt, generateVideoPrompt } from '../services/geminiService';
import { SocialMediaPost, PromotionCampaign, AISuggestion } from '../types';

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  'Instagram': <Instagram className="w-5 h-5 text-pink-500" />,
  'Twitter': <Twitter className="w-5 h-5 text-blue-400" />,
  'Facebook': <Facebook className="w-5 h-5 text-blue-600" />,
  'TikTok': <Music className="w-5 h-5 text-black" />,
  'LinkedIn': <Share2 className="w-5 h-5 text-blue-700" />
};

export const Promotions: React.FC = () => {
  const [campaign, setCampaign] = useState<PromotionCampaign>({
    id: '1',
    title: '',
    description: '',
    releaseDate: '',
    targetAudience: '',
    posts: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingPrompts, setGeneratingPrompts] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'create' | 'schedule'>('create');

  const handleGenerateStrategy = async () => {
    if (!campaign.title || !campaign.description) {
      alert("Please provide a title and description for your release.");
      return;
    }

    setIsGenerating(true);
    try {
      const suggestions = await generateSocialMediaStrategy(
        campaign.title,
        campaign.description,
        campaign.releaseDate,
        campaign.targetAudience
      );

      const newPosts: SocialMediaPost[] = suggestions.map((s, index) => ({
        id: Math.random().toString(36).substr(2, 9),
        platform: s.platform as any,
        content: s.contentDraft,
        suggestedTime: s.bestTime,
        status: 'draft',
        hashtags: s.hashtags
      }));

      setCampaign(prev => ({
        ...prev,
        posts: [...prev.posts, ...newPosts]
      }));
      setActiveTab('schedule');
    } catch (error) {
      console.error("Error generating strategy:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImagePrompt = async (postId: string, content: string) => {
    setGeneratingPrompts(prev => ({ ...prev, [postId]: true }));
    try {
      const prompt = await generateImagePrompt(content);
      setCampaign(prev => ({
        ...prev,
        posts: prev.posts.map(p => p.id === postId ? { ...p, imagePrompt: prompt } : p)
      }));
    } catch (error) {
      console.error("Error generating image prompt:", error);
    } finally {
      setGeneratingPrompts(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleSchedulePost = (postId: string) => {
    setCampaign(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === postId ? { ...p, status: 'scheduled' } : p)
    }));
  };

  const handleDeletePost = (postId: string) => {
    setCampaign(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== postId)
    }));
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-brand-dark/50 backdrop-blur-xl rounded-3xl border border-brand-primary/20 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-primary/10 rounded-2xl border border-brand-primary/30">
            <Sparkles className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">AI Promotions Hub</h2>
            <p className="text-brand-muted text-sm">Generate and schedule your release strategy</p>
          </div>
        </div>

        <div className="flex bg-brand-surface rounded-xl p-1 border border-white/5">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'create' ? 'bg-brand-primary text-brand-dark shadow-lg' : 'text-brand-muted hover:text-white'}`}
          >
            Create
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'schedule' ? 'bg-brand-primary text-brand-dark shadow-lg' : 'text-brand-muted hover:text-white'}`}
          >
            Schedule
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'create' ? (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-brand-primary uppercase tracking-widest">Release Title</label>
                <input
                  type="text"
                  value={campaign.title}
                  onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
                  placeholder="e.g., Midnight Echoes"
                  className="bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-brand-primary uppercase tracking-widest">Description / Mood</label>
                <textarea
                  value={campaign.description}
                  onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
                  placeholder="Describe your release, the mood, or key lyrics..."
                  rows={4}
                  className="bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-brand-primary uppercase tracking-widest">Release Date</label>
                <input
                  type="date"
                  value={campaign.releaseDate}
                  onChange={(e) => setCampaign({ ...campaign, releaseDate: e.target.value })}
                  className="bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-brand-primary uppercase tracking-widest">Target Audience</label>
                <input
                  type="text"
                  value={campaign.targetAudience}
                  onChange={(e) => setCampaign({ ...campaign, targetAudience: e.target.value })}
                  placeholder="e.g., Gen Z, Lo-fi lovers, Indie fans"
                  className="bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all"
                />
              </div>

              <button
                onClick={handleGenerateStrategy}
                disabled={isGenerating}
                className="mt-4 w-full py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-dark font-black rounded-xl shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Trends...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate AI Strategy
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-4"
          >
            {campaign.posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-brand-muted gap-4">
                <Calendar className="w-12 h-12 opacity-20" />
                <p>No posts scheduled yet. Go to 'Create' to generate your strategy.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaign.posts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-brand-surface/50 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 group hover:border-brand-primary/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {PLATFORM_ICONS[post.platform] || <Share2 className="w-5 h-5" />}
                        <span className="text-xs font-bold text-white">{post.platform}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        {post.suggestedTime}
                      </div>
                    </div>

                    <p className="text-sm text-brand-light line-clamp-4 leading-relaxed">
                      {post.content}
                    </p>

                    {post.imagePrompt && (
                      <div className="p-3 bg-brand-primary/5 border border-brand-primary/20 rounded-xl">
                        <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">AI Image Prompt</p>
                        <p className="text-[10px] text-brand-light italic leading-tight">{post.imagePrompt}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {post.hashtags.map((tag, i) => (
                        <span key={i} className="text-[10px] text-brand-muted">#{tag}</span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleGenerateImagePrompt(post.id, post.content)}
                          disabled={generatingPrompts[post.id]}
                          className={`p-2 hover:bg-white/5 rounded-lg transition-all ${post.imagePrompt ? 'text-brand-primary' : 'text-brand-muted hover:text-white'}`}
                          title="Generate Image Prompt"
                        >
                          {generatingPrompts[post.id] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <ImageIcon className="w-4 h-4" />
                          )}
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-brand-muted hover:text-white transition-all">
                          <VideoIcon className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-brand-muted hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {post.status === 'scheduled' ? (
                          <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 px-3 py-2 bg-emerald-500/10 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                            Scheduled
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSchedulePost(post.id)}
                            className="px-4 py-2 bg-brand-primary text-brand-dark text-xs font-black rounded-lg hover:scale-105 transition-all"
                          >
                            Schedule
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
