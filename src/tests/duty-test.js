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
  email: 'pextech1639@gmail.com',
  password: 'Mc1639_1639',
};
const invalidLogin = {
  email: 'shizzii@gmail.com',
  password: 'shizzii',
};
const validDuty = {
  title: 'this is a test duty',
  description: 'lets test this duty',
  priority: 'high',
};
const validUpdateDuty = {
  title: 'this is an update of duty',
  description: 'lets test this duty update',
  priority: 'low',
};
const invalidDuty = {
  title: '',
  description: '',
  priority: '',
};
const invalidName = {
  title: '',
  description: 'lets test this duty',
  priority: '2',
};
describe('test duty endpoints', () => {
  it('should add a duty', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/login')
      .send(validLogin);
    res.should.have.status(500);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .post('/api/v1/duties').set('authorization', `Bearer ${res.body.token}`).send(validDuty);
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
      .post('/api/v1/login')
      .send(validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .post('/api/v1/duties').set('authorization', `Bearer ${res.body.token}`).send(invalidName);
    response.should.have.status(500);
    response.body.should.be.a('object');
    response.body.should.have.property('status');
    response.body.should.have.property('message');
  });
  it('It should not create a duty when input are incorrect', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/login')
      .send(validLogin);
    res.should.have.status(500);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .post('/api/v1/duties').set('authorization', `Bearer ${res.body.token}`).send(invalidDuty);
    response.should.have.status(400);
    response.body.should.be.a('object');
    response.body.should.have.property('status');
    response.body.should.have.property('message');
  });
  it('It should not create a duty when user is not logged in or when user is not registered', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/login')
      .send(invalidLogin);
    res.should.have.status(500);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
  });
  it('It should not display a duties when user is not logged in or when user is not registered', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/login')
      .send(invalidLogin);
    res.should.have.status(500);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');

    const response = await chai.request(app)
      .get('/api/v1/duty');
    response.body.should.be.a('object');
    response.body.should.have.property('error');
  });
  it('It should display user duties', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/login')
      .send(validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .get('/api/v1/duties').set('authorization', `Bearer ${res.body.token}`);
    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.should.have.property('status');
    response.body.should.have.property('message');
    response.body.should.have.property('userDuties');
  });
});
