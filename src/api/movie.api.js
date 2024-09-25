import Api from './index';

class Movie extends Api {
    constructor() {
        super('/movies');
    }

    getMovies(offset = 1, limit = 8) {
        return this.get({ url: `/?limit=${limit}&offset=${offset}` });
    }
    addMovie(body) {
        return this.post({ body });
    }
    edit(id, body) {
        return this.patch({ url: `/${id}`, body });
    }
}

const movieApi = new Movie();

export default movieApi;
