/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { response } from 'express';
import app from '../index';

const { duties } = require('../models');

chai.should();
chai.use(chaiHttp);

const validLogin = {
  email: 'shizzy@gmail.com',
  password: 'shizzy',
};
const invalidLogin = {
  email: 'shizzii@gmail.com',
  password: 'shizzii',
};
const validDuty = {
  name: 'this is a test duty',
  content: 'lets test this duty',
  dutyid: '2',
};
const validUpdateDuty = {
  name: 'this is an update of duty',
  content: 'lets test this duty update',
  dutyid: '2',
};
const invalidDuty = {
  name: '',
  content: '',
  dutyid: '',
};
const invalidName = {
  name: '',
  content: 'lets test this duty',
  dutyid: '2',
};
describe('test duty endpoints', () => {
  it('should add a duty', async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send(validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .post('/duty').set('authorization', `Bearer ${res.body.token}`).send(validDuty);
    response.should.have.status(201);
    response.body.should.be.a('object');
    response.body.should.have.property('message');
    response.body.should.have.property('duty');
    duties.destroy({
      where: { dutyid: validDuty.dutyid },
    });
  });
  it('It should not create a duty when password is below 6 or null', async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send(validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .post('/duty').set('authorization', `Bearer ${res.body.token}`).send(invalidName);
    response.should.have.status(500);
    response.body.should.be.a('object');
    response.body.should.have.property('status');
    response.body.should.have.property('message');
  });
  it('It should not create a duty when input are incorrect', async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send(validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .post('/duty').set('authorization', `Bearer ${res.body.token}`).send(invalidDuty);
    response.should.have.status(500);
    response.body.should.be.a('object');
    response.body.should.have.property('status');
    response.body.should.have.property('message');
  });
  it('It should not create a duty when user is not logged in or when user is not registered', async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send(invalidLogin);
    res.should.have.status(500);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
  });
  it('It should not display a duties when user is not logged in or when user is not registered', async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send(invalidLogin);
    res.should.have.status(500);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');

    const response = await chai.request(app)
      .get('/duty');
    response.body.should.be.a('object');
    response.body.should.have.property('message');
  });
  it('It should display user duties', async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send(validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .get('/duty').set('authorization', `Bearer ${res.body.token}`);
    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.should.have.property('status');
    response.body.should.have.property('message');
    response.body.should.have.property('userDuties');
  });
  it('It should not update user duties with wrong id', async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send(validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .post('/duty').set('authorization', `Bearer ${res.body.token}`).send(validDuty);
    response.should.have.status(201);
    response.body.should.be.a('object');
    response.body.should.have.property('message');
    response.body.should.have.property('duty');
    duties.destroy({
      where: { dutyid: validDuty.dutyid },
    });

    const id = '14';

    const response1 = await chai.request(app)
      .patch(`/duty/${id}`).set('authorization', `Bearer ${res.body.token}`).send(validUpdateDuty);
    response1.should.have.status(500);
    response1.body.should.be.a('object');
    response1.body.should.have.property('status');
    response1.body.should.have.property('message');
  });
});
