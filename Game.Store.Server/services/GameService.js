const GameRepository = require('../repositories/GameRepository');
const { GameListDTO, GameDetailDTO, CreateGameDTO, UpdateGameDTO } = require('../dtos/GameDTO');

class GameService {
  /**
   * Get all games or search games based on query
   * @param {string|null} searchTerm - Optional search term
   * @returns {Promise<Array>} Array of GameListDTO objects
   */
  async getGames(searchTerm = null) {
    try {
      let games;
      
      if (searchTerm && searchTerm.trim()) {
        // Perform fuzzy search if search term is provided
        games = await GameRepository.search(searchTerm.trim());
      } else {
        // Return all games if no search term
        games = await GameRepository.getAll();
      }
      
      // Convert to DTOs
      return GameListDTO.fromEntities(games);
    } catch (error) {
      console.error('Error in GameService.getGames:', error);
      throw new Error('Failed to retrieve games');
    }
  }

  /**
   * Get a single game by ID
   * @param {number} id - Game ID
   * @returns {Promise<GameDetailDTO>} Game detail DTO
   * @throws {Error} If game not found
   */
  async getGameById(id) {
    try {
      // Validate ID
      if (!id || isNaN(id)) {
        throw new Error('Invalid game ID');
      }

      const game = await GameRepository.getById(id);
      
      if (!game) {
        throw new Error('Game not found');
      }

      // Convert to detailed DTO
      return GameDetailDTO.fromEntity(game);
    } catch (error) {
      console.error('Error in GameService.getGameById:', error);
      throw error;
    }
  }

  /**
   * Create a new game from request
   * @returns {Promise<GameDetailDTO>} Created game DTO
   * @throws {Error} If validation fails
   */
  async createGame(gameData) {
    try {
      // Create DTO from request
      const createDTO = CreateGameDTO.fromRequest(gameData);
      // Convert DTO to entity and wrap in GameModel
      const gameModel = new (require('../models/GameModel'))(createDTO.toEntity());
      // Validate using GameModel
      const errors = gameModel.validate();
      if (errors.length > 0) {
        throw new Error(errors.join(' '));
      }
      // Create in DB
      const createdGame = await GameRepository.create(gameModel);
      // Return as detailed DTO
      return GameDetailDTO.fromEntity(createdGame);
    } catch (error) {
      console.error('Error in GameService.createGame:', error);
      throw error;
    }
  }

  /**
   * Update an existing game
   * @param {number} id - Game ID
   * @param {Object} gameData - Updated game data from request
   * @returns {Promise<GameDetailDTO>} Updated game DTO
   * @throws {Error} If validation fails or game not found
   */
  async updateGame(id, gameData) {
    try {
      // Validate ID
      if (!id || isNaN(id)) {
        throw new Error('Invalid game ID');
      }

      // Create DTO from request
      const updateDTO = UpdateGameDTO.fromRequest(gameData);
      // Convert DTO to entity and wrap in GameModel
      const gameModel = new (require('../models/GameModel'))(updateDTO.toEntity());
      // Validate using GameModel
      const errors = gameModel.validate();
      if (errors.length > 0) {
        throw new Error(errors.join(' '));
      }
      // Update in DB
      const updatedGame = await GameRepository.update(id, gameModel);
      if (!updatedGame) {
        throw new Error('Game not found');
      }
      // Return as detailed DTO
      return GameDetailDTO.fromEntity(updatedGame);
    } catch (error) {
      console.error('Error in GameService.updateGame:', error);
      throw error;
    }
  }

  /**
   * Delete a game
   * @param {number} id - Game ID
   * @returns {Promise<boolean>} True if deleted
   * @throws {Error} If game not found
   */
  async deleteGame(id) {
    try {
      // Validate ID
      if (!id || isNaN(id)) {
        throw new Error('Invalid game ID');
      }

      const deleted = await GameRepository.delete(id);
      
      if (!deleted) {
        throw new Error('Game not found');
      }

      return true;
    } catch (error) {
      console.error('Error in GameService.deleteGame:', error);
      throw error;
    }
  }

  // Validation now handled by GameModel
}

module.exports = new GameService();
