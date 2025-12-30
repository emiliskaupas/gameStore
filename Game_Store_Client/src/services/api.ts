import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Game {
  region: string;
  id: number;
  title: string;
  price: number;
  image_url: string;
  genre: string;
  rating: number;
  description?: string;
  release_date?: string;
  formattedPrice?: string;
  releaseYear?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export const gameAPI = {
  // Get all games or search games
  getGames: async (search?: string): Promise<Game[]> => {
    const params = search ? { search } : {};
    const response = await api.get<ApiResponse<Game[]>>('/list', { params });
    return response.data.data;
  },

  // Get a single game by ID
  getGameById: async (id: number): Promise<Game> => {
    const response = await api.get<ApiResponse<Game>>(`/games/${id}`);
    return response.data.data;
  },

  // Create a new game
  createGame: async (gameData: Omit<Game, 'id'>): Promise<Game> => {
    const response = await api.post<ApiResponse<Game>>('/games', gameData);
    return response.data.data;
  },

  // Update a game
  updateGame: async (id: number, gameData: Partial<Game>): Promise<Game> => {
    const response = await api.put<ApiResponse<Game>>(`/games/${id}`, gameData);
    return response.data.data;
  },

  // Delete a game
  deleteGame: async (id: number): Promise<void> => {
    await api.delete(`/games/${id}`);
  },
};

export default api;
