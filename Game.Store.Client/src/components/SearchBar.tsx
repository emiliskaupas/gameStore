import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <TextField
        variant="outlined"
        placeholder="Search games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          width: { xs: 220, sm: 350, md: 500, lg: 600 },
          maxWidth: '100%',
          borderRadius: 0,
          boxShadow: '0 2px 12px rgba(91,0,180,0.10)',
          border: '2.5px solid #ffffffff',
          input: {
            fontWeight: 700,
            fontSize: 20,
            color: '#ffffffff',
            letterSpacing: 0.5,
            padding: '12px 10px',
            borderRadius: 0,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {query && (
                <IconButton onClick={handleClear} size="medium" sx={{ color: '#ff2e9a' }}>
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton type="submit" size="medium" sx={{ color: '#ffffffff' }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;
