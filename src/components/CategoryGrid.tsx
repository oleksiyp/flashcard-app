import { motion } from 'framer-motion';
import type { Category } from '../data/vocabulary';
import './CategoryGrid.css';

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  onPracticeAll: () => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onCategorySelect,
  onPracticeAll
}) => {
  return (
    <div className="category-grid-container">
      <div className="intro-section">
        <h2>Choose a Category</h2>
        <p>Select a category to practice vocabulary, or practice all words together.</p>
        
        <motion.button
          className="practice-all-btn"
          onClick={onPracticeAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎯 Practice All Words
        </motion.button>
      </div>

      <div className="category-grid">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className="category-card"
            style={{ backgroundColor: category.color }}
            onClick={() => onCategorySelect(category)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-english">{category.englishName}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
