/**
 * Utility functions for shuffling arrays
 * Uses the Fisher-Yates (Knuth) shuffle algorithm
 */

/**
 * Shuffles an array in-place using Fisher-Yates algorithm
 * @param {Array} array The array to shuffle
 * @returns {Array} The same array, shuffled
 */
export function shuffleArray(array) {
  // Make a copy of the array to avoid mutating the original
  const shuffled = [...array];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}