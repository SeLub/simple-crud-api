
import supertest from 'supertest';

import server from'./server.js';

//import chai from 'chai';

//const expect = chai.expect;
//const assert = chai.assert;


// it('should return Hello Test', function (done) {
//   
//   request(server)
//   	.get('/person').
//     .expect(200)
//     .end(done);
// 
// });

const host = 'localhost:3000';

const request = supertest(host);

console.log(request)

  describe('GET', () => {
    
    it('should get stCode 200', async () => {

      const usersResponse = await request
        .get('/person')
        .expect(200)
	console.log(usersResponse.text)

      //expect(usersResponse.status).to.equal(200);
      //expect(Array.isArray(JSON.parse(usersResponse.text))).to.be.true();
    });

    it('should get statusCoode 404 get a user by id', async () => {
      // Setup:
      let nonExistsUserId = '89da7309-e5ed-48a4-b4e6-ae47c947ae13';

      // Test:
      const userResponse = await request
        .get(`/person/${nonExistsUserId}`)
        .expect(404)
    });

    it('should get statusCoode 200 get a user by id', async () => {
      // Setup:
      let existsUserId = '89da7309-e5ed-48a4-b4e6-ae47c947ae12';

      // Test:
      const userResponse = await request
        .get(`/person/${existsUserId}`)
        .expect(200)

    });

    it(`should get 'coding' as second el in array 'hobbies'`, async () => {
      // Setup:
      let userId;

      // Test:
      const userResponse = await request
        .get('/person/89da7309-e5ed-48a4-b4e6-ae47c947ae12')
        .expect(200)
        .then(res => { userId = JSON.parse(JSON.stringify(res))})
        .then(res => userId = JSON.parse(userId.text).hobbies[1])

      expect(userId).to.equal('coding');

    });













//  it("should create person", async () => {
//    const { body } = await fetch(url, {
//      method: "POST",
//      data: createData,
//    });
//    expect(body).toEqual(
//      expect.objectContaining({ id: expect.any(String), ...createData })
//    );
//
//    personId = body.id;
//  });
});