
import supertest from 'supertest';

import jest from 'jest';

import server from'../server.js';

import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

const host = 'localhost:3000';

const request = supertest(host);

const newTestUser = {
  name: 'Bill Gates',
  age: '66',
  hobbies: ['tennis','chess','running']
};

const updatedTestUser ={
  name: 'William Henry Gates III',
  hobbies: ['tennis','chess','running']  
};

let notValidId = 12, 
validNotExistsId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b1';

if (typeof afterAll === 'function') {


afterAll(done => {
  
  try{
    
    server.close(done);
    done();

  } catch(error){

    done(error);

  }

});


}
describe(`Scenario 2. 'Validation Hell 400'`, () => {

    it(`GET should get 400 when not valid id`, async () => {

          let userResponse = await request
            .get(`/person/${notValidId}`)
            .expect(400)
    });

    it(`POST should get 400 without all mandatory fields in request`, async () => {
          let userResponse = await request
            .post('/person')
            .set('Accept', 'application/json')
            .send(updatedTestUser)
            .expect(400)
    });
    
    it(`PUT should get 400 when not valid id`, async () => {

          let userResponse = await request
            .put(`/person/${notValidId}`)
            .expect(400)
    });

    it(`DELETE should get 400 when not valid id`, async () => {

          let userResponse = await request
            .delete(`/person/${notValidId}`)
            .expect(400)
    });
    
});