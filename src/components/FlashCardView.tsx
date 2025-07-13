import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FlashCard, Category } from '../data/vocabulary';
import { LearningProgress } from '../data/learningProgress';
import './FlashCardView.css';

interface FlashCardViewProps {
  cards: FlashCard[];
  category: Category | null;
  mode: 'view' | 'learn';
  onBack: () => void;
}

const FlashCardView: React.FC<FlashCardViewProps> = ({ cards, category, mode, onBack }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Learning mode specific state
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentSessionCards, setCurrentSessionCards] = useState<FlashCard[]>([]);
  const [revisedInSession, setRevisedInSession] = useState<Set<string>>(new Set());
  
  // Filter cards based on mode
  const filteredCards = useMemo(() => {
    if (mode === 'view') {
      return cards;
    } else {
      // Learning mode: exclude learned words and create random order
      const unlearnedCards = LearningProgress.getUnlearnedCards(cards);
      return [...unlearnedCards].sort(() => Math.random() - 0.5);
    }
  }, [cards, mode]);

  // Get available cards for current session (excluding revised ones in learn mode)
  const availableCards = useMemo(() => {
    if (mode === 'view') {
      return filteredCards;
    } else {
      return currentSessionCards.filter(card => 
        !revisedInSession.has(`${card.czech}-${card.category}`)
      );
    }
  }, [filteredCards, currentSessionCards, revisedInSession, mode]);

  const currentCard = availableCards[currentCardIndex];
  const progress = availableCards.length > 0 ? ((currentCardIndex + 1) / availableCards.length) * 100 : 0;

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowTranslation(false);
    setShowSuccess(false);
    setRevisedInSession(new Set());
    
    if (mode === 'learn') {
      setCurrentSessionCards(filteredCards);
    }
  }, [cards, mode, filteredCards]);

  const handleCardFlip = () => {
    if (mode === 'view') {
      setIsFlipped(!isFlipped);
    }
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
  };

  const handleLearningAction = (action: 'learned' | 'revised' | 'no-idea') => {
    if (!currentCard) return;

    const cardKey = `${currentCard.czech}-${currentCard.category}`;

    if (action === 'learned') {
      // Mark as learned and remove from rotation
      LearningProgress.markAsLearned(currentCard);
      setCurrentSessionCards(prev => 
        prev.filter(card => `${card.czech}-${card.category}` !== cardKey)
      );
    } else if (action === 'revised') {
      // Don't show in current session
      setRevisedInSession(prev => new Set([...prev, cardKey]));
    }
    // For 'no-idea', just continue to next card

    // Move to next card or show success
    const remainingCards = currentSessionCards.filter(card => {
      const key = `${card.czech}-${card.category}`;
      return key !== cardKey && !revisedInSession.has(key) && (action !== 'revised' || key !== cardKey);
    });

    if (action === 'revised') {
      remainingCards.splice(remainingCards.findIndex(card => 
        `${card.czech}-${card.category}` === cardKey
      ), 1);
    }

    if (remainingCards.length === 0 || currentCardIndex >= remainingCards.length - 1) {
      setShowSuccess(true);
    } else {
      setCurrentCardIndex(Math.min(currentCardIndex, remainingCards.length - 1));
    }
    
    setShowTranslation(false);
  };

  const handleNext = () => {
    if (currentCardIndex < availableCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setShowTranslation(false);
    } else {
      setShowSuccess(true);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
      setShowTranslation(false);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowTranslation(false);
    setShowSuccess(false);
    setRevisedInSession(new Set());
    
    if (mode === 'learn') {
      const unlearnedCards = LearningProgress.getUnlearnedCards(cards);
      setCurrentSessionCards([...unlearnedCards].sort(() => Math.random() - 0.5));
    }
  };

  const toggleLearnedStatus = (card: FlashCard) => {
    if (LearningProgress.isLearned(card)) {
      LearningProgress.markAsNotLearned(card);
    } else {
      LearningProgress.markAsLearned(card);
    }
    // Force re-render by updating a state
    setCurrentCardIndex(prev => prev);
  };

  if (availableCards.length === 0) {
    return (
      <div className="flashcard-view">
        <div className="empty-state">
          <h2>{mode === 'learn' ? 'No words to learn!' : 'No cards available'}</h2>
          <p>
            {mode === 'learn' 
              ? 'You have learned all the words in this category! 🎉'
              : 'This category is empty.'
            }
          </p>
          <button onClick={onBack} className="back-btn">
            ← Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcard-view">
      <div className="flashcard-header">
        <button onClick={onBack} className="back-btn">
          ← Back
        </button>
        <div className="card-info">
          <h2>
            {mode === 'learn' ? '🎓 ' : '📖 '}
            {category ? category.name : 'All Categories'}
            {mode === 'learn' ? ' - Learning' : ' - Viewing'}
          </h2>
          <div className="progress-info">
            {currentCardIndex + 1} / {availableCards.length}
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            className="success-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="success-content">
              <div className="success-icon">🎉</div>
              <h2>
                {mode === 'learn' ? 'Learning Session Complete!' : 'Congratulations!'}
              </h2>
              <p>
                {mode === 'learn' 
                  ? `You've completed this learning session!`
                  : `You completed all ${availableCards.length} cards!`
                }
              </p>
              <div className="success-actions">
                <button onClick={handleRestart} className="restart-btn">
                  🔄 {mode === 'learn' ? 'Start New Session' : 'Practice Again'}
                </button>
                <button onClick={onBack} className="back-btn">
                  ← Back to Categories
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flashcard-container">
            <motion.div
              className="flashcard"
              onClick={mode === 'view' ? handleCardFlip : undefined}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flashcard-inner"
                animate={{ rotateY: (mode === 'view' && isFlipped) ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flashcard-front">
                  <div className="card-image-container">
                    <img
                      src={`${import.meta.env.BASE_URL}${currentCard.image}`}
                      alt={currentCard.czech}
                      className="card-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="czech-word">{currentCard.czech}</h3>
                    {mode === 'view' && !isFlipped && (
                      <p className="tap-hint">Tap to see translation</p>
                    )}
                    {mode === 'view' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLearnedStatus(currentCard);
                        }}
                        className={`learned-toggle ${LearningProgress.isLearned(currentCard) ? 'learned' : ''}`}
                      >
                        {LearningProgress.isLearned(currentCard) ? '✅ Learned' : '⭕ Not Learned'}
                      </button>
                    )}
                    {mode === 'learn' && !showTranslation && (
                      <button onClick={handleShowTranslation} className="show-btn">
                        Show Translation
                      </button>
                    )}
                    {mode === 'learn' && showTranslation && (
                      <div className="translation-section">
                        <h4 className="english-word">{currentCard.english}</h4>
                        <div className="learning-actions">
                          <button 
                            onClick={() => handleLearningAction('learned')}
                            className="learning-btn learned-btn"
                          >
                            ✅ Learned
                          </button>
                          <button 
                            onClick={() => handleLearningAction('revised')}
                            className="learning-btn revised-btn"
                          >
                            📝 Revised
                          </button>
                          <button 
                            onClick={() => handleLearningAction('no-idea')}
                            className="learning-btn no-idea-btn"
                          >
                            ❓ No Idea
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {mode === 'view' && (
                  <div className="flashcard-back">
                    <div className="card-content">
                      <h3 className="english-word">{currentCard.english}</h3>
                      <p className="czech-word-small">{currentCard.czech}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLearnedStatus(currentCard);
                        }}
                        className={`learned-toggle ${LearningProgress.isLearned(currentCard) ? 'learned' : ''}`}
                      >
                        {LearningProgress.isLearned(currentCard) ? '✅ Learned' : '⭕ Not Learned'}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {mode === 'view' && (
              <div className="flashcard-controls">
                <button
                  onClick={handlePrevious}
                  disabled={currentCardIndex === 0}
                  className="control-btn prev-btn"
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNext}
                  className="control-btn next-btn"
                >
                  {currentCardIndex === availableCards.length - 1 ? 'Finish' : 'Next →'}
                </button>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlashCardView;
