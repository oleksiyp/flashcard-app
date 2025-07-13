import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { categories, vocabulary, type FlashCard, type Category } from './data/vocabulary';
import CategoryGrid from './components/CategoryGrid';
import FlashCardView from './components/FlashCardView';
import Header from './components/Header';

type AppView = 'categories' | 'flashcards';
type AppMode = 'view' | 'learn';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('categories');
  const [appMode, setAppMode] = useState<AppMode>('view');
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

  const toggleMode = () => {
    setAppMode(appMode === 'view' ? 'learn' : 'view');
  };

  return (
    <div className="app">
      <Header />
      
      <div className="mode-toggle">
        <button 
          onClick={toggleMode}
          className={`mode-btn ${appMode === 'view' ? 'active' : ''}`}
        >
          📖 View Words
        </button>
        <button 
          onClick={toggleMode}
          className={`mode-btn ${appMode === 'learn' ? 'active' : ''}`}
        >
          🎓 Learn Words
        </button>
      </div>
      
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
                mode={appMode}
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
