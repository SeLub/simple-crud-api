
import supertest from 'supertest';

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
  name: 'William Henry Gates III',
  age: '66',
  hobbies: ['tennis','chess','running']  
};


describe('Scenario 1. GET', () => {

    it('should get all users, [] expected', async () => {
          const usersResponse = await request
            .get('/person')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);

    let isResposeArray = JSON.parse(usersResponse.text);

    expect(isResposeArray).to.be.an('array').that.is.empty;
    });

});

describe('Scenario 2. POST', () => {

    it(`should create new user 'Bill Gates'`, async () => {

          let userId;
    
          await request
            .post('/person')
            .set('Accept', 'application/json')
            .send(newTestUser)
            .expect(201)
            .expect('Content-Type', /json/)
            .then(res => { userId = JSON.parse(res.text).id;
            });


          const userResponse = await request
            .get(`/person/${userId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);

          let nameTestUser = JSON.parse(userResponse.text).name;

    expect(nameTestUser).to.equal('Bill Gates');

    });

});

describe('Scenario 3. GET', () => {

    it(`should get just created user 'Bill Gates' by id`, async () => {

          let userId;
    
          await request
            .post('/person')
            .set('Accept', 'application/json')
            .send(newTestUser)
            .expect(201)
            .expect('Content-Type', /json/)
            .then(res => { userId = JSON.parse(res.text).id;
            });

          const userResponse = await request
            .get(`/person/${userId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);

          let nameTestUser = JSON.parse(userResponse.text).name;

    expect(nameTestUser).to.equal('Bill Gates');
    });

});

describe('Scenario 4. PUT', () => {

    it(`should change name of just created user 'Bill Gates' to 'William Henry Gates III' `, async () => {

          let userId;
    
          await request
            .post('/person')
            .set('Accept', 'application/json')
            .send(newTestUser)
            .expect(201)
            .expect('Content-Type', /json/)
            .then(res => { userId = JSON.parse(res.text).id;
            });


          const userResponse = await request
            .put(`/person/${userId}`)
            .set('Accept', 'application/json')
            .send(updatedTestUser)
            .expect(200)
            .expect('Content-Type', /json/)

          let nameTestUser = JSON.parse(userResponse.text).name;

    expect(nameTestUser).to.equal('William Henry Gates III');
    });
});




describe('Scenario 5. DELETE', () => {

    it(`should delete just created user `, async () => {

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

          await request
            .delete(`/person/${userId}`)
            .set('Accept', 'application/json')
            .expect(204)

          userResponse = await request
            .get(`/person/${userId}`)
            .set('Accept', 'application/json')
            .expect(404)

    });

    
});