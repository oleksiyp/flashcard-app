import './Header.css';

interface HeaderProps {
  // Add any props if needed in the future
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="flag">🇨🇿</span>
          Czech Flashcards
        </h1>
        <p className="header-subtitle">Learn Czech vocabulary with interactive flashcards</p>
      </div>
    </header>
  );
};

export default Header;
