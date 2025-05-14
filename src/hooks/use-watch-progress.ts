
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface WatchProgress {
  id: string;
  contentId: string;
  progress: number;
  timestamp: string;
  duration: number;
  currentTime: number;
  title?: string;
  posterUrl?: string;
}

export const useWatchProgress = (contentId: string, duration: number = 0) => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    if (contentId && isLoggedIn) {
      // Load saved progress
      const savedProgress = getSavedProgress(contentId);
      if (savedProgress) {
        setProgress(savedProgress.progress);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [contentId, isLoggedIn]);
  
  const updateProgress = (currentProgress: number, currentTime?: number, title?: string, posterUrl?: string) => {
    if (!isLoggedIn || !contentId) return;
    
    setProgress(currentProgress);
    
    // Save progress to localStorage
    const progressData: WatchProgress = {
      id: `${contentId}-${Date.now()}`,
      contentId,
      progress: currentProgress,
      timestamp: new Date().toISOString(),
      duration,
      currentTime: currentTime || (duration * (currentProgress / 100)),
      title,
      posterUrl
    };
    
    saveProgress(progressData);
  };
  
  const getSavedProgress = (id: string): WatchProgress | null => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return null;
    
    const progressKey = `watch_progress_${currentUser.id}`;
    const progressList = JSON.parse(localStorage.getItem(progressKey) || '[]');
    
    const contentProgress = progressList.find((p: WatchProgress) => p.contentId === id);
    return contentProgress || null;
  };
  
  const saveProgress = (progressData: WatchProgress) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return;
    
    const progressKey = `watch_progress_${currentUser.id}`;
    let progressList = JSON.parse(localStorage.getItem(progressKey) || '[]');
    
    // Remove any existing progress for this content
    progressList = progressList.filter((p: WatchProgress) => p.contentId !== progressData.contentId);
    
    // Add new progress
    progressList.unshift(progressData);
    
    // Keep only most recent 50 items
    if (progressList.length > 50) {
      progressList = progressList.slice(0, 50);
    }
    
    localStorage.setItem(progressKey, JSON.stringify(progressList));
  };

  const getAllProgress = (): WatchProgress[] => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return [];
    
    const progressKey = `watch_progress_${currentUser.id}`;
    return JSON.parse(localStorage.getItem(progressKey) || '[]');
  };

  const clearProgress = (id?: string) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return;
    
    const progressKey = `watch_progress_${currentUser.id}`;
    
    if (id) {
      // Clear specific progress
      let progressList = JSON.parse(localStorage.getItem(progressKey) || '[]');
      progressList = progressList.filter((p: WatchProgress) => p.contentId !== id);
      localStorage.setItem(progressKey, JSON.stringify(progressList));
      setProgress(0);
    } else if (id === contentId) {
      setProgress(0);
    }
  };
  
  return {
    progress,
    updateProgress,
    clearProgress,
    getAllProgress,
    isLoading
  };
};
