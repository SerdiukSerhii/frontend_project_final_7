import { create } from 'zustand';
import type { Article } from '@/types/articles';

interface ArticleState {
  editingArticle: Article | null;
  setEditingArticle: (article: Article | null) => void;
  clearEditingArticle: () => void;
}

export const useArticleStore = create<ArticleState>(set => ({
  editingArticle: null,
  setEditingArticle: article => set({ editingArticle: article }),
  clearEditingArticle: () => set({ editingArticle: null }),
}));
