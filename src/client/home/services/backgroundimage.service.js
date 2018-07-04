import HttpClient from '../../services/httpclient.service';
import Configurations from '../helpers/configurations';

class BackgroundImageService {
    constructor() {
        this.configurations = new Configurations();
        this.httpclient = new HttpClient();
    }

    getBackgroundImage = () => {
        return this.httpclient.get(this.configurations.BING_API);
    };
}

export default BackgroundImageService;