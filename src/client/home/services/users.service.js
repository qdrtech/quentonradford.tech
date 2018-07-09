import HttpClient from '../../services/httpclient.service';

export default class UserService {

    privates = new WeakMap();

    constructor(){
        var privateProperties = {
            http: new HttpClient(),
            baseUrl: "https://w2650z904k.execute-api.us-east-2.amazonaws.com/Dev/api/users"
        }
        this.privates.set(this, privateProperties);
    }

    getHttpClient = () => {
        return this.privates.get(this).http;
    }

    getBaseUrl = () => {
        return this.privates.get(this).baseUrl;
    }

    getUserByUserID = (userID) => {
        return this.getHttpClient().get(`${this.getBaseUrl()}?userID=${userID}`);
    }

}
