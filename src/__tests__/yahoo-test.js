import { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';

import { YahooService } from '../services/yahoo';


describe('Bixi service', () => {
    it('tester réponse vide', (done) => {

        const yahooService = new YahooService();

        sinon.stub(yahooService, "fetchRemoteApi").callsFake( () => {
            return new Promise( (resolve, reject) => {
                resolve(null);
            });
        });

        yahooService.getByCity("Montreal").then( (result) => {
            expect(result).to.equal(null);
            done();
        });
    });


    it('tester réponse non-vide', (done) => {

        const yahooService = new YahooService();

        sinon.stub(yahooService, "fetchRemoteApi").callsFake( () => {
            return new Promise( (resolve, reject) => {
                resolve(JSON.stringify({
                        query: {
                            results: {
                                channel: {
                                    item: {
                                        condition: {
                                            date: "Tue, 12 Jun 2018 12:00 PM AEST",
                                            temp: "56",
                                            text: "Breezy"
                                  
                                        }
                                    }
                                }
                            }
                        }
       
                }));
            });
        });

        yahooService.getByCity("Montreal").then( (result) => {
            expect(result).to.not.equal(null);
            expect(result.temp).to.equal("56");
            done();
        });
    });


});
  