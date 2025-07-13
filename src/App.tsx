import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { categories, vocabulary, type FlashCard, type Category } from './data/vocabulary';
import CategoryGrid from './components/CategoryGrid';
import FlashCardView from './components/FlashCardView';
import Header from './components/Header';

type AppView = 'categories' | 'flashcards';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentCards, setCurrentCards] = useState<FlashCard[]>([]);

  const handleCategorySelect = (category: Category) => {
    const categoryCards = vocabulary.filter(card => card.category === category.id);
    setCurrentCards(categoryCards);
    setSelectedCategory(category);
    setCurrentView('flashcards');
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setCurrentCards([]);
  };

  const handlePracticeAll = () => {
    setCurrentCards(vocabulary);
    setSelectedCategory(null);
    setCurrentView('flashcards');
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          {currentView === 'categories' ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CategoryGrid
                categories={categories}
                onCategorySelect={handleCategorySelect}
                onPracticeAll={handlePracticeAll}
              />
            </motion.div>
          ) : (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <FlashCardView
                cards={currentCards}
                category={selectedCategory}
                onBack={handleBackToCategories}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
