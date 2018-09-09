//services
import HttpClient from './httpclient.service';

export default class AffirmationService {
    privates = new WeakMap();

    constructor(){
        var privateProperties = {
            http: new HttpClient(),
            baseUrl: "https://w2650z904k.execute-api.us-east-2.amazonaws.com/Dev/api/item"
        }
        this.privates.set(this, privateProperties);
    }

    getHttpClient = () => {
        return this.privates.get(this).http;
    }

    getBaseUrl = () => {
        return this.privates.get(this).baseUrl;
    }

    getAffirmation = () => {
        return this.getHttpClient().get(this.getBaseUrl());
    }

    postAffirmation = (data) => {
        return this.getHttpClient().post(this.getBaseUrl(), data);
    }
}