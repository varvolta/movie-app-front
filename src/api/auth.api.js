import Api from './index';

class Auth extends Api {
    constructor() {
        super('/user');
    }

    signin(body) {
        return this.post({ url: '/login', body });
    }
}

const auth = new Auth();

export default auth;
