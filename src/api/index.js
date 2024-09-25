import axios from 'axios'
class Api {
    constructor(baseUrl = '', cleanReq = false) {
        this.URL = baseUrl
        this.cleanReq = cleanReq
    }

    get({ url, headers }) {
        return this.#configureRequest({ url, headers })
    }

    post({ url, body, headers }) {
        return this.#configureRequest({
            url,
            body,
            method: 'post',
            headers,
        })
    }
    patch({ url, body, headers }) {
        return this.#configureRequest({
            url,
            body,
            method: 'patch',
            headers,
        })
    }

    #configureRequest = async ({
        url = '',
        method = 'get',
        body,
        headers = {},
    }) => {
        url = `${this.cleanReq ? this.URL : 'http://autohackers.am:3000/api'}${this.URL
            }${url}`

        const options = {
            method,
            headers: {
                'content-type': 'application/json',
                ...headers,
            },
        }

        if (body) {
            if (body instanceof FormData) {
                options.headers['Content-Type'] = 'multipart/form-data'
            }

            options.data = body
        }

        return axios(url, options)
    };
}

export default Api
