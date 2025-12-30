import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameList from './pages/GameList';
import GameDetail from './pages/GameDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
