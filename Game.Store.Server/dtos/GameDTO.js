/**
 * Game List DTO
 * Used for listing games with minimal data
 */
class GameListDTO {
  constructor(game) {
    this.id = game.id;
    this.title = game.title;
    this.price = game.price;
    this.image_url = game.image_url;
    this.genre = game.genre;
    this.region = game.region;
    this.rating = game.rating;
  }

  static fromEntity(game) {
    return new GameListDTO(game);
  }

  static fromEntities(games) {
    return games.map(game => GameListDTO.fromEntity(game));
  }
}

/**
 * Game Detail DTO
 * Used for single game view with full data
 */
class GameDetailDTO {
  constructor(game) {
    this.id = game.id;
    this.title = game.title;
    this.price = game.price;
    this.formattedPrice = `$${parseFloat(game.price).toFixed(2)}`;
    this.image_url = game.image_url;
    this.description = game.description;
    this.genre = game.genre;
    this.region = game.region;
    this.release_date = game.release_date;
    this.releaseYear = game.release_date ? new Date(game.release_date).getFullYear() : null;
    this.rating = game.rating;
  }

  static fromEntity(game) {
    return new GameDetailDTO(game);
  }
}

/**
 * Create Game DTO
 * Used for validating and transferring data when creating a game
 */
class CreateGameDTO {
  constructor(data) {
    this.title = data.title;
    this.price = parseFloat(data.price);
    this.image_url = data.image_url || null;
    this.description = data.description || null;
    this.genre = data.genre || null;
    this.release_date = data.release_date || null;
    this.rating = data.rating ? parseFloat(data.rating) : null;
  }

  toEntity() {
    return {
      title: this.title,
      price: this.price,
      image_url: this.image_url,
      description: this.description,
      genre: this.genre,
      release_date: this.release_date,
      rating: this.rating
    };
  }

  static fromRequest(body) {
    return new CreateGameDTO(body);
  }
}

/**
 * Update Game DTO
 * Used for validating and transferring data when updating a game
 */
class UpdateGameDTO {
  constructor(data) {
    this.title = data.title;
    this.price = parseFloat(data.price);
    this.image_url = data.image_url || null;
    this.description = data.description || null;
    this.genre = data.genre || null;
    this.release_date = data.release_date || null;
    this.rating = data.rating ? parseFloat(data.rating) : null;
  }

  toEntity() {
    return {
      title: this.title,
      price: this.price,
      image_url: this.image_url,
      description: this.description,
      genre: this.genre,
      release_date: this.release_date,
      rating: this.rating
    };
  }

  static fromRequest(body) {
    return new UpdateGameDTO(body);
  }
}

module.exports = {
  GameListDTO,
  GameDetailDTO,
  CreateGameDTO,
  UpdateGameDTO
};
