
import supertest from 'supertest';

import jest from 'jest';

import server from'../server.js';

import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

const host = 'localhost:3000';

const request = supertest(host);

const newTestUser = {
  name: 'Billy Zane',
  age: '68',
  hobbies: ['golf','cars','girls']
};

const updatedTestUser = {
  name: 'Bill Gates',
  age: '66',
  hobbies: ['tennis','chess','running']
};

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

describe(`Scenario 3. 'Empty Space'`, () => {

    it(`GET should get 404 when id is not found`, async () => {
          let userId = '89da7309-e5ed-48a4-b4e6-ae47c947ae12';

          let userResponse = await request
            .get(`/person/${userId}`)
            .set('Accept', 'application/json')
            .expect(404)

    });


    it(`PUT should get 404 when id is not found `, async () => {
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

    expect(nameTestUser).not.to.equal('Bill Gates');
      userId = '89da7309-e5ed-48a4-b4e6-ae47c947ae12';
          
          userResponse = await request
            .put(`/person/${userId}`)
            .set('Accept', 'application/json')
            .send(updatedTestUser)
            .expect(404)
    });



    it(`DELETE should get 404 when id is not found`, async () => {
    let userId = '89da7309-e5ed-48a4-b4e6-ae47c947ae12';

          let userResponse = await request
            .delete(`/person/${userId}`)
            .set('Accept', 'application/json')
            .expect(404)
    });
});