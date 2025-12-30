const GameService = require('../services/GameService');

class GameController {
  /**
   * Get all games or search games
   * Handles both /list and /list?search=<gamename>
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async list(req, res) {
    try {
      const { search } = req.query;
      const games = await GameService.getGames(search);

      res.status(200).json({
        success: true,
        count: games.length,
        data: games
      });
    } catch (error) {
      console.error('Error in GameController.list:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching games',
        error: error.message
      });
    }
  }

  /**
   * Get a single game by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const game = await GameService.getGameById(id);

      res.status(200).json({
        success: true,
        data: game
      });
    } catch (error) {
      console.error('Error in GameController.getById:', error);
      
      if (error.message === 'Game not found' || error.message === 'Invalid game ID') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error fetching game',
        error: error.message
      });
    }
  }

  /**
   * Create a new game
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async create(req, res) {
    try {
      const game = await GameService.createGame(req.body);

      res.status(201).json({
        success: true,
        message: 'Game created successfully',
        data: game
      });
    } catch (error) {
      console.error('Error in GameController.create:', error);
      
      // Handle validation errors with 400 status
      if (error.message.includes('required') || 
          error.message.includes('Invalid') || 
          error.message.includes('must be')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error creating game',
        error: error.message
      });
    }
  }

  /**
   * Update a game
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const game = await GameService.updateGame(id, req.body);

      res.status(200).json({
        success: true,
        message: 'Game updated successfully',
        data: game
      });
    } catch (error) {
      console.error('Error in GameController.update:', error);
      
      // Handle validation errors with 400 status
      if (error.message.includes('required') || 
          error.message.includes('Invalid') || 
          error.message.includes('must be')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      // Handle not found errors with 404 status
      if (error.message === 'Game not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error updating game',
        error: error.message
      });
    }
  }

  /**
   * Delete a game
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await GameService.deleteGame(id);

      res.status(200).json({
        success: true,
        message: 'Game deleted successfully'
      });
    } catch (error) {
      console.error('Error in GameController.delete:', error);
      
      // Handle not found errors with 404 status
      if (error.message === 'Game not found' || error.message === 'Invalid game ID') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error deleting game',
        error: error.message
      });
    }
  }
}

module.exports = GameController;
