import rp               from 'request-promise';
import debug            from 'debug';

const log = debug('yahoo');





export class YahooService {
    constructor() {

    }

    fetchRemoteApi(city) {
        return rp('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city +'")&format=json&env=store://datatables.org/alltableswithkeys');
    }

    getByCity(city) {
        log('getByCity ==> ' + city);
        return this.fetchRemoteApi(city).then( (results) => {

            let json = JSON.parse(results);

            log(json);

            if (json 
                && json.query
                && json.query.results 
                && json.query.results.channel
                && json.query.results.channel.item
                && json.query.results.channel.item.condition) {

                return json.query.results.channel.item.condition;
            } else {
                return null;
            }
        });
    }


}


