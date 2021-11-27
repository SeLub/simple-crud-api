
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
  name: 'William Henry Gates III',
  age: '66',
  hobbies: ['tennis','chess','running']  
};


afterAll(() => {
  server.close();
});


describe(`Scenario 1. 'Hacker scope'`, () => {

    it(`should status code 404`, async () => {
          const usersResponse = await request
            .get('/person')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);

    let isResposeArray = JSON.parse(usersResponse.text);

    expect(isResposeArray).to.be.an('array').that.is.empty;

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

          let nameTestUser = JSON.parse(userResponse.text).name;

    expect(nameTestUser).to.equal('Bill Gates');
          
          userResponse = await request
            .put(`/person/${userId}`)
            .set('Accept', 'application/json')
            .send(updatedTestUser)
            .expect(200)
            .expect('Content-Type', /json/)

          nameTestUser = JSON.parse(userResponse.text).name;
          let idTestUser = JSON.parse(userResponse.text).id;

    expect(nameTestUser).to.equal('William Henry Gates III');
    expect(idTestUser).to.equal(userId);

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