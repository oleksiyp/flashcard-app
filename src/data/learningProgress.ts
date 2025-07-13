import type { FlashCard } from './vocabulary';

const LEARNED_WORDS_KEY = 'flashcard-learned-words';

export interface LearnedWord {
  czech: string;
  english: string;
  category: string;
  learnedAt: string;
}

export class LearningProgress {
  private static getLearnedWords(): LearnedWord[] {
    try {
      const stored = localStorage.getItem(LEARNED_WORDS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading learned words from localStorage:', error);
      return [];
    }
  }

  private static saveLearnedWords(words: LearnedWord[]): void {
    try {
      localStorage.setItem(LEARNED_WORDS_KEY, JSON.stringify(words));
    } catch (error) {
      console.error('Error saving learned words to localStorage:', error);
    }
  }

  static markAsLearned(card: FlashCard): void {
    const learnedWords = this.getLearnedWords();
    const existingIndex = learnedWords.findIndex(
      w => w.czech === card.czech && w.category === card.category
    );

    const learnedWord: LearnedWord = {
      czech: card.czech,
      english: card.english,
      category: card.category,
      learnedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      learnedWords[existingIndex] = learnedWord;
    } else {
      learnedWords.push(learnedWord);
    }

    this.saveLearnedWords(learnedWords);
  }

  static markAsNotLearned(card: FlashCard): void {
    const learnedWords = this.getLearnedWords();
    const filteredWords = learnedWords.filter(
      w => !(w.czech === card.czech && w.category === card.category)
    );
    this.saveLearnedWords(filteredWords);
  }

  static isLearned(card: FlashCard): boolean {
    const learnedWords = this.getLearnedWords();
    return learnedWords.some(
      w => w.czech === card.czech && w.category === card.category
    );
  }

  static getUnlearnedCards(cards: FlashCard[]): FlashCard[] {
    return cards.filter(card => !this.isLearned(card));
  }

  static getLearnedCardsCount(): number {
    return this.getLearnedWords().length;
  }

  static getLearnedCardsByCategory(categoryId: string): LearnedWord[] {
    return this.getLearnedWords().filter(w => w.category === categoryId);
  }

  static getAllLearnedWords(): LearnedWord[] {
    return this.getLearnedWords();
  }

  static clearAllProgress(): void {
    localStorage.removeItem(LEARNED_WORDS_KEY);
  }
}
