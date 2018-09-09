import axios from 'axios';


class HttpClient {
    constructor() {
        let service = axios.create({
            headers: { "Accept": "*", "Content-Type": "aplication/json", "x-api-key": "HcAOoHXlxf7cOhXUBiM8k3iVxn124f912BKJc39h" }
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    handleSuccess = (response) => {
        return response;
    };

    handleError = (error) => {
        return;
        switch (error.response.status) {
            case 401:
                this.redirectTo(document, '/')
                break;
            case 404:
                this.redirectTo(document, '/404')
                break;
            default:
                this.redirectTo(document, '/500')
                break;
        }
        return Promise.reject(error);
    };

    redirectTo = (document, path) => {
        document.location = path;
    }

    get = (url, callback) => {
        return this.service.get(url);
    }

    post = (url, data, callback) => {
        return this.service.post(url,data);
    }

    put = (url, data, callback) => {
        return this.service.put(url,data);
    }
}

export default HttpClient;