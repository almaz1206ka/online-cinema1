const ACCOUNT_ID = 20967720;

export const APIS = {
    API_GENRES: 'https://api.themoviedb.org/3/genre/movie/list',
    API_SEARCH: 'https://api.themoviedb.org/3/search/movie?query=',
    API_SEARCH_OPTIONS: '&include_adult=false&language=en-US&page=',
    API_RATED: 'https://api.themoviedb.org/3/movie/{movie_id}/rating',
    API_RATED_LIST: `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/rated/movies?language=en-US&page=`,
    IMAGE_URL_DESKTOP: 'https://image.tmdb.org/t/p/w185',
    IMAGE_URL_MOBILE: 'https://image.tmdb.org/t/p/w92'
};