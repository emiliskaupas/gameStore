import { useState, useEffect } from 'react';
import { gameAPI } from '../services/api';
import type { Game } from '../services/api';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';


const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line
  }, [searchQuery]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await gameAPI.getGames(searchQuery || undefined);
      setGames(data);
    } catch (err: any) {
      const errorMessage = err.response
        ? 'Failed to fetch games from server. Please try again later.'
        : 'Cannot connect to backend server. Make sure the server is running on http://localhost:5000';
      setError(errorMessage);
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Container maxWidth={false} sx={{
      px: { xs: 0.5, sm: 1, md: 2, lg: 4 },
      py: 2,
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 900,
          mb: 2,
          background: 'linear-gradient(135deg, #fff 40%, #00e1ff 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 1,
          fontSize: { xs: 20, sm: 26, md: 32 },
          textTransform: 'uppercase',
        }}
      >
        Games store
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, width: '100%' }}>
        <Box sx={{
          borderRadius: 3,
          boxShadow: '0 4px 24px rgba(91,0,180,0.13)',
          p: 3,
          minWidth: 340,
          maxWidth: 700,
          width: '100%',
        }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
      </Box>
      {loading && (
        <Typography align="center" sx={{ py: 6, color: '#00e1ff', fontWeight: 600, fontSize: 22 }}>
          Loading games...
        </Typography>
      )}
      {error && (
        <Alert severity="error" sx={{ my: 4, background: '#1a0033', color: '#ff2e9a', border: '1.5px solid #ff2e9a', fontWeight: 700 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && games.length === 0 && (
        <Alert severity="info" sx={{ my: 4, background: '#1a0033', color: '#00e1ff', border: '1.5px solid #00e1ff', fontWeight: 700 }}>
          {searchQuery ? `No games found for "${searchQuery}"` : 'No games available'}
        </Alert>
      )}
      {!loading && !error && games.length > 0 && (
        <>
          <Typography align="center" sx={{ mb: 2, fontSize: 20, color: '#fff', fontWeight: 600, letterSpacing: 1 }}>
            {searchQuery ? `Found ${games.length} game(s) for "${searchQuery}"` : `Showing all ${games.length} game(s)`}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: { xs: 2, sm: 3 },
              justifyContent: 'center',
              alignItems: 'start',
              pb: 4,
              width: '100%',
              maxWidth: 1000,
              borderRadius: 6,
              boxShadow: '0 0 0 0',
            }}
          >
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};

export default GameList;
