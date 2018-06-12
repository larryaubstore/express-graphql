
import express          from 'express';
import debug            from 'debug';
import async            from 'async';
import graphqlHTTP      from '../src/';
import { buildSchema }  from 'graphql';

import { BixiService }  from '../src/services/bixi';
import { YahooService } from '../src/services/yahoo';

const bixiService = new BixiService();
const yahooService = new YahooService();
const log = debug('quiz');


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    allNetworks: Bixi
    networkByCity(city: String): [Networks]
    quizOne(city: String, country: String): [QuizOne]
  }


  type QuizOne {
    name: String
    location: Location
    condition: Condition

  }

  type Networks {
      name: String
      location: Location
  }
  
  type Bixi {
    networks: [Networks]
  }

  

  type Location {
      city: String
      country: String
      latitude: Float
      longitude: Float
  }

  type Condition {
      date: String
      temp: String
      text: String
  }

`);

// The root provides a resolver function for each API endpoint
var root = {
  allNetworks: () => bixiService.getAllNetworks(),
  networkByCity: (args) => {
    if (args && args.city) {
        let city = args.city;
        return bixiService.getAllNetworks().then( (allNetworks) => {
            let results = [];

            allNetworks.networks.forEach(element => {
                if (element.location && element.location.city &&  element.location.city.indexOf(city) > -1) {
                    results.push(element);
                } 
            });
            return results;
        });
    } else {
        return [];
    }
  },
  quizOne: (args) => {
    
    log('quizOne');

    let city = null;
    let country = null;
    if (args && args.city) {
        city = args.city;
    }

    if (args && args.country) {
        country = args.country;
    }

    log('city    ==> ' + city);
    log('country ==> ' +  country);
        
    let networksFounded = null;
    return bixiService.getAllNetworks().then( (allNetworks) => {
        let results = [];

        allNetworks.networks.forEach(element => {
            if (city !== null && element.location && element.location.city &&  element.location.city.indexOf(city) > -1) {
                results.push(element);
            } else if ( country !== null && element.location && element.location.country === country) {
                results.push(element);
            }
        });
        return results;
    }).then( (allNetworks) => {
        
        log(allNetworks);
        networksFounded = allNetworks;
        if (allNetworks.length > 0 && city !== null) {
            return yahooService.getByCity(city);
        } else if (allNetworks.length > 0 && country !== null) {

            return new Promise( (resolve, reject) => {
                async.eachSeries(networksFounded, (networks, eachCb) => {
                    log('eachOf');
    
                    let cityFormatted = networks.location.city;
                    let commaPosition = networks.location.city.indexOf(',');
    
                    if (commaPosition > -1) {
                        cityFormatted = networks.location.city.substr(0, commaPosition);
                    }
    
                    yahooService.getByCity(cityFormatted).then( (condition) => {
                        networks.condition = condition;
                        eachCb(null);
                    }).catch( (err) => {
                        // On ignore les erreurs
                        eachCb(null);
                    });
    
                }, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(null);
                    }
                });
            });
        } else {
            return null;
        }
    }).then( ( condition) => {
        if (condition !== null) {
            networksFounded.forEach( (networkFounded) => {
                networkFounded.condition = condition;
            });
            return networksFounded;
        } else {
            return networksFounded;
        }
    });
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
