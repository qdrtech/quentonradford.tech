import Fingerprint from 'fingerprintjs';


export default class CookieService {

    private = new WeakMap();

    constructor(){
        var privateProperties = {
            fingerprint: new Fingerprint().get(),
            gCookie : () => {
                
            }
        }
        this.private.set(this, privateProperties);
    }

    getCookie = () => {
        return this.private.get(this).gCookie();
    }

    getFingerPrint = () => {
        return this.private.get(this).fingerprint;
    }
}

