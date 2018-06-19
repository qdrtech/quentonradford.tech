import HttpClient from '../../services/httpclient.service';

class BackgroundImageService{
    constructor() {
        this.httpclient = new HttpClient();
    }

    getBackgroundImage = () => {
        return this.httpclient.get("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1");
    };
}

export default BackgroundImageService;