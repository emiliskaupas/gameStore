import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameList from './pages/GameList';
import GameDetail from './pages/GameDetail';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
