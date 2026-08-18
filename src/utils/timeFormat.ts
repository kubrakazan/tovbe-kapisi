/**
 * Formats elapsed time in minutes and seconds in Turkish
 */
export function formatDuration(startTime: number, endTime?: number): string {
  if (!startTime) return '1 saniye';
  const end = endTime && endTime > startTime ? endTime : Date.now();
  const totalSeconds = Math.max(1, Math.floor((end - startTime) / 1000));
  
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes} dakika ${seconds} saniye`;
  }
  return `${seconds} saniye`;
}
