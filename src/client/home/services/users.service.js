import HttpClient from '../../services/httpclient.service';

import CookieService from './cookie.service';
import moment from 'moment';

export default class UserService {

    privates = new WeakMap();

    constructor(){
        var privateProperties = {
            cookieService: new CookieService(),
            getUserID: () => {
                return this.privates.get(this).cookieService.getFingerPrint()
            },
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

    getUserByUserID = () => {
        return this.getHttpClient().get(`${this.getBaseUrl()}?userID=${this.privates.get(this).getUserID()}`);
    }

    createUser = () => {
        let userID = this.privates.get(this).getUserID();
        let user = this._generateUser(userID);
        return this.getHttpClient().post(`${this.getBaseUrl()}`, user);
    }

    updateUser = (user) => {
        return this.getHttpClient().put(`${this.getBaseUrl()}?userID=${this.privates.get(this).getUserID()}`, user);
    }

    _generateUser = (userID) => {
        return {
            userID: `${userID}`,
            CreatedDate: moment().toISOString(),
            LastUpdatedDate: moment().toISOString()
        };
    }

}
