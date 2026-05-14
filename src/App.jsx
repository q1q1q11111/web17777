import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudiosPage from './pages/StudiosPage';
import JiebierPage from './pages/JiebierPage';
import CenterPage from './pages/CenterPage';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const links = [
    { to: '/', label: '首页' },
    { to: '/studios', label: '委员工作室' },
    { to: '/jiebier', label: '界别情况' },
    { to: '/center', label: '协商民主' },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="header-brand">
          <div className="header-emblem">协</div>
          <div>
            <div className="header-title">上城政协</div>
            <div className="header-subtitle">SHANGCHENG CPPCC</div>
          </div>
        </NavLink>
        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">上城区政协</div>
        <div className="footer-divider" />
        <div className="footer-info">
          杭州市上城区政协委员会 · 委员工作室履职平台
        </div>
        <div className="footer-copyright">
          © 2026 上城区政协委员会
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <main className="page-enter">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/studios" element={<StudiosPage />} />
            <Route path="/jiebier" element={<JiebierPage />} />
            <Route path="/center" element={<CenterPage />} />
          </Routes>
        </main>
        <Footer />
        <button
          className={`back-to-top ${showTop ? 'visible' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      </div>
    </Router>
  );
}

export default App;
