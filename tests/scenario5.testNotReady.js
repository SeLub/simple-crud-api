
import supertest from 'supertest';

import jest from 'jest-mock';

import server from'../server.js';

import personsDB from'./personsDB.js';

import sinon from 'sinon';


const host = 'localhost:3000';

const request = supertest(host);


let userId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b1';

if (typeof afterAll === 'function') {
  afterAll(done => {
    try{
      server.close(done);
      done();
    } catch(error){
      done(error);
    }
  });
};


describe(`Scenario 5. 'Creative Coding'`, () => {

    it(`GET should get 500 when 'in-mamory DB' = 'undefined'`, async () => {

      sinon.stub(personsDB, "doSomething").returns(undefined);

          let userResponse = await request
            .get(`/person/${userId}`)
            .set('Accept', 'application/json')
            .expect(500)

    });
    
});