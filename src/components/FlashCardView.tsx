import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FlashCard, Category } from '../data/vocabulary';
import './FlashCardView.css';

interface FlashCardViewProps {
  cards: FlashCard[];
  category: Category | null;
  onBack: () => void;
}

const FlashCardView: React.FC<FlashCardViewProps> = ({ cards, category, onBack }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentCard = cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [cards]);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // Completed all cards
      setShowSuccess(true);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowSuccess(false);
  };

  if (cards.length === 0) {
    return (
      <div className="flashcard-view">
        <div className="empty-state">
          <h2>No cards available</h2>
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
          <h2>{category ? category.name : 'All Categories'}</h2>
          <div className="progress-info">
            {currentCardIndex + 1} / {cards.length}
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
              <h2>Congratulations!</h2>
              <p>You completed all {cards.length} cards!</p>
              <div className="success-actions">
                <button onClick={handleRestart} className="restart-btn">
                  🔄 Practice Again
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
              onClick={handleCardFlip}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flashcard-inner"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
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
                    <p className="tap-hint">Tap to see translation</p>
                  </div>
                </div>

                <div className="flashcard-back">
                  <div className="card-content">
                    <h3 className="english-word">{currentCard.english}</h3>
                    <p className="czech-word-small">{currentCard.czech}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

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
                {currentCardIndex === cards.length - 1 ? 'Finish' : 'Next →'}
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlashCardView;
