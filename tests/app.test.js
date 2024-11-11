const request = require('supertest');
let { app } = require('../index.js');
let { getAllMovies, getMovieById } = require('../controllers/index.js');
const http = require('http');
jest.mock('../controllers/index.js', () => ({
  ...jest.requireActual('../controllers/index.js'),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn(),
}));

describe('Controller Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all movies', () => {
    const mockedMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];
    getAllMovies.mockReturnValue(mockedMovies);
    const result = getAllMovies();
    expect(result).toEqual(mockedMovies);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints tests', () => {
  it('GET API /movies should get all movies', async () => {
    const mockedMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];

    getAllMovies.mockResolvedValue(mockedMovies);

    const res = await request(app).get('/Movies');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movies: mockedMovies,
    });
    expect(res.body.movies.length).toBe(3);
  });

  it('GET /movies/details/:id should get an movies by ID', async () => {
    const mockedMovies = {
      movieId: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan',
    };

    getMovieById.mockResolvedValue(mockedMovies);

    const res = await request(app).get('/movies/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movies: mockedMovies,
    });
  });
});
