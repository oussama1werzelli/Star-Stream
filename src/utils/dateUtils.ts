
/**
 * Formats a date to show how long ago it was (e.g. "2 minutes ago", "3 days ago")
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return 'الآن';
  }
  
  // Less than an hour
  if (diffInSeconds < 60 * 60) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
  }
  
  // Less than a day
  if (diffInSeconds < 60 * 60 * 24) {
    const hours = Math.floor(diffInSeconds / (60 * 60));
    return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
  }
  
  // Less than a week
  if (diffInSeconds < 60 * 60 * 24 * 7) {
    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
  }
  
  // Format as date
  return date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format duration from seconds to a readable format (e.g. "1h 30m")
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
}
