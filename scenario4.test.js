
import supertest from 'supertest';

import jest from 'jest';

import server from'./server.js';

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
  name: 'Bill Gates',
  age: '66',
  hobbies: ['running','golf','swimming']
};

const emptyHobbiesUser ={
  name: 'Bill Gates',
  age: '66',
  hobbies: []
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

describe(`Scenario 4. 'Deep Learning'`, () => {

    it(`POST should create new user with 'hobbies[1]' = 'chess'`, async () => {
          let userId;

          await request
            .post('/person')
            .set('Accept', 'application/json')
            .send(newTestUser)
            .expect(201)
            .expect('Content-Type', /json/)
            .then(res => { userId = JSON.parse(res.text).id;
            });

          let userResponse = await request
            .get(`/person/${userId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);

          let nameTestUser = JSON.parse(userResponse.text).hobbies[1];

    expect(nameTestUser).to.equal('chess');

    });
    
    it(`PUT should change 'hobbies[1]' from 'chess' to 'golf' `, async () => {
          let userId;

          await request
            .post('/person')
            .set('Accept', 'application/json')
            .send(newTestUser)
            .expect(201)
            .expect('Content-Type', /json/)
            .then(res => { userId = JSON.parse(res.text).id;
            });

          let userResponse = await request
            .put(`/person/${userId}`)
            .set('Accept', 'application/json')
            .send(updatedTestUser)
            .expect(200)
            .expect('Content-Type', /json/)

          let newHobbies = JSON.parse(userResponse.text).hobbies[1];
          let idTestUser = JSON.parse(userResponse.text).id;

    expect(newHobbies).to.equal('golf');
    expect(idTestUser).to.equal(userId);

    });

    it(`PUT should change delete all hobies, expected 'hobbies = []'`, async () => {
          let userId;

          await request
            .post('/person')
            .set('Accept', 'application/json')
            .send(newTestUser)
            .expect(201)
            .expect('Content-Type', /json/)
            .then(res => { userId = JSON.parse(res.text).id;
            });

          let userResponse = await request
            .put(`/person/${userId}`)
            .set('Accept', 'application/json')
            .send(emptyHobbiesUser)
            .expect(200)
            .expect('Content-Type', /json/)

          let newHobbies = JSON.parse(userResponse.text).hobbies;
          let idTestUser = JSON.parse(userResponse.text).id;

    expect(newHobbies).to.be.an('array').that.is.empty;
    expect(idTestUser).to.equal(userId);

    });
    
});