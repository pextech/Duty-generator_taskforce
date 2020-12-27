/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const validData = {
  names: 'karyuriguri',
  email: 'karyuriguri@gmail.com',
  password: 'karyuriguri',
};
const invalidData = {
  names: 'karyuriguri',
  email: 'karyuriguri',
  password: 'karyu',
};
const invalidPassword = {
  names: 'karyuriguri@gmail.cm',
  email: 'karyuriguri',
  password: 'karyu',
};
const invalidEmail = {
  names: 'karyuriguri',
  email: 'karyuriguri',
  password: 'karyuririr',
};

describe('Test user registration', () => {
  it('It should not create user with invalid parameters', (done) => {
    chai.request(app)
      .post('/signUp').send(invalidData)
      .end((err, response) => {
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        done();
      });
  });
  it('It should not create user passwords is below 6 values', (done) => {
    chai.request(app)
      .post('/signUp').send(invalidPassword)
      .end((err, response) => {
        response.should.have.status(500);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        done();
      });
  });
  it('It should not create user when email is invalid', (done) => {
    chai.request(app)
      .post('/signUp').send(invalidEmail)
      .end((err, response) => {
        response.should.have.status(500);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        done();
      });
  });
  it('It should create user', (done) => {
    chai.request(app)
      .post('/signUp').send(validData)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        done();
      });
  });
});
