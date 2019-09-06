const app = require('../src/server');

describe('GET', () => {
  it('GET /cat', () => {
    return supertest(app)
      .get('/api/cat')
      .expect(200)
      .expect(res=>{
        if(res.body!==null){
          expect(res.body['imageURL']).to.not.equal(undefined);
          expect(res.body['name']).to.not.equal(undefined);
          expect(res.body['sex']).to.not.equal(undefined);
          expect(res.body['age']).to.not.equal(undefined);
          expect(res.body['breed']).to.not.equal(undefined);
          expect(res.body['story']).to.not.equal(undefined);
        }
      });
  });
  it('GET /dog', () => {
    return supertest(app)
      .get('/api/dog')
      .expect(200)
      .expect(res=>{
        if(res.body!==null){
          expect(res.body['imageURL']).to.not.equal(undefined);
          expect(res.body['name']).to.not.equal(undefined);
          expect(res.body['sex']).to.not.equal(undefined);
          expect(res.body['age']).to.not.equal(undefined);
          expect(res.body['breed']).to.not.equal(undefined);
          expect(res.body['story']).to.not.equal(undefined);
        }
      });
  });
});

describe('DELETE', () => {
  it('DELETE /cat, the test first get ALL, then deletes, then get all again, and does a quick check that the second cat in the first get all, is the first cat in the second get all', () => {
    return supertest(app)
      .get('/api/cat/all')
      //This test is sort of silly, makes the assumption that the first and second pet has some different property. should honestly be using uuid.
      .then(firstres=>{

        return supertest(app)
          .delete('/api/cat')
          .then(()=>{

            return supertest(app)
              .get('/api/cat/all')
              .then(secondres=>{
                expect(firstres.body).to.be.an('array');
                expect(secondres.body).to.be.an('array');
                expect(firstres.body[1]).to.eql(secondres.body[0]);
              });
          });
      });
  });
  it('DELETE /dog', () => {
    return supertest(app)
      .get('/api/dog/all')
      .then(firstres=>{

        return supertest(app)
          .delete('/api/dog')
          .then(()=>{

            return supertest(app)
              .get('/api/dog/all')
              .then(secondres=>{
                expect(firstres.body).to.be.an('array');
                expect(secondres.body).to.be.an('array');
                expect(firstres.body[1]).to.eql(secondres.body[0]);
              });
          });
      });
  });
});


describe('POST /api/cat', ()=>{
  const requiredFields=['name','sex','age','breed','story','imageURL'];
  requiredFields.forEach(field => {
    const newCat={
      'imageURL': 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
      'imageDescription': 'A smiling golden-brown golden retreiver listening to music.',
      'name': 'Zeus',
      'sex': 'Male',
      'age': 3,
      'breed': 'Golden Retriever',
      'story': 'Owner Passed away'
    };

    it(`responds with 400 and an error message when the '${field}' is missing`, () => {
      delete newCat[field];
      return supertest(app)
        .post('/api/cat')
        .send(newCat)
        .expect(400, {
          error: `Missing '${field}' in request body`,
        });
    });

  });

  const newCat={
    'imageURL': 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    'imageDescription': 'A smiling golden-brown golden retreiver listening to music.',
    'name': 'wowowow',
    'sex': 'Male',
    'age': 3,
    'breed': 'Golden Retriever',
    'story': 'Owner Passed away'
  };
  it('POST /api/cat successfully',()=>{
    return supertest(app)
      .post('/api/cat')
      .send(newCat)
      .then(res=>{
        return supertest(app)
          .get('/api/cat/all')
          .expect(secres=>{
            expect(secres.body[secres.body.length-1]).to.eql(res.body);
          });
      });
  });

});


describe('POST /api/dog', ()=>{
  const requiredFields=['name','sex','age','breed','story','imageURL'];
  requiredFields.forEach(field => {
    const newCat={
      'imageURL': 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
      'imageDescription': 'A smiling golden-brown golden retreiver listening to music.',
      'name': 'Zeus',
      'sex': 'Male',
      'age': 3,
      'breed': 'Golden Retriever',
      'story': 'Owner Passed away'
    };

    it(`responds with 400 and an error message when the '${field}' is missing`, () => {
      delete newCat[field];
      return supertest(app)
        .post('/api/dog')
        .send(newCat)
        .expect(400, {
          error: `Missing '${field}' in request body`,
        });
    });

  });

  const newCat={
    'imageURL': 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    'imageDescription': 'A smiling golden-brown golden retreiver listening to music.',
    'name': 'wowowow',
    'sex': 'Male',
    'age': 3,
    'breed': 'Golden Retriever',
    'story': 'Owner Passed away'
  };
  it('POST /api/dog successfully',()=>{
    return supertest(app)
      .post('/api/dog')
      .send(newCat)
      .then(res=>{
        return supertest(app)
          .get('/api/dog/all')
          .expect(secres=>{
            expect(secres.body[secres.body.length-1]).to.eql(res.body);
          });
      });
  });

});

