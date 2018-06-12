import rp               from 'request-promise';
import debug            from 'debug';



const log = debug('bixi');

export class BixiService {
    constructor() {

    }

    fetchRemoteApi() {
        return rp('http://api.citybik.es/v2/networks');
    }

    getAllNetworks() {
        log('getAllBikes');
        return this.fetchRemoteApi().then( (results) => {
            return JSON.parse(results);
        });
    }
}


