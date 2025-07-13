# Czech Flashcards 🇨🇿

A modern, responsive Progressive Web App (PWA) for learning Czech vocabulary through interactive flashcards.

## 🚀 Features

- **12 Vocabulary Categories**: Family, Food, Animals, Colors, Numbers, Body, Clothing, House, Transport, Weather, Work, and Time
- **Progressive Web App**: Install on your device and use offline
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Interactive Flashcards**: Tap to flip cards and reveal translations
- **Smooth Animations**: Beautiful transitions and gestures using Framer Motion
- **Progress Tracking**: Track your learning progress through each category
- **Offline Support**: Works without internet connection once installed
- **GitHub Pages Ready**: Easy deployment to GitHub Pages

## 🛠️ Technology Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Framer Motion** for smooth animations
- **PWA** capabilities with service worker
- **CSS Modules** for styling
- **GitHub Actions** for automated deployment

## 📱 Installation

### As a Web App
1. Visit the deployed app URL
2. Look for the "Install" prompt in your browser
3. Click "Install" to add to your home screen

### For Development
```bash
# Clone the repository
git clone https://github.com/[username]/flashcard-app.git
cd flashcard-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment to GitHub Pages

1. **Fork or create the repository** on GitHub
2. **Update package.json**: Replace `[username]` with your GitHub username
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"
4. **Push your code**: The GitHub Action will automatically deploy your app

### Manual Deployment
```bash
# Build and deploy manually
npm run build
# Upload the dist/ folder contents to your web server
```

## 🎯 Usage

1. **Choose a Category**: Select from 12 different vocabulary categories
2. **Study Flashcards**: Tap cards to flip between Czech and English
3. **Navigate**: Use Previous/Next buttons to move through cards
4. **Track Progress**: See your progress with the progress bar
5. **Practice All**: Study all vocabulary words together

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── CategoryGrid.tsx # Category selection grid
│   ├── FlashCardView.tsx# Flashcard display and interaction
│   └── Header.tsx       # App header
├── data/
│   └── vocabulary.ts    # Czech vocabulary data
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## 🖼️ Adding Your Own Images

The app currently uses Unsplash images. To add your own images:

1. **Replace image URLs** in `src/data/vocabulary.ts`
2. **Use the download script** (if you have one) to fetch images locally
3. **Update image paths** to point to local files in the `public/` directory

## 🔧 Customization

### Adding New Categories
1. Add new category to `categories` array in `src/data/vocabulary.ts`
2. Add corresponding vocabulary items to `vocabulary` array
3. The app will automatically include the new category

### Styling
- Update CSS files in `src/components/` for component-specific styles
- Modify `src/App.css` for global styles
- Change color scheme in the CSS custom properties

## 🌐 Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile browsers** on iOS and Android
- **PWA features** supported on most modern mobile browsers

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Issues

If you find any bugs or have suggestions, please open an issue on GitHub.

---

**Happy Learning! 🎓**
