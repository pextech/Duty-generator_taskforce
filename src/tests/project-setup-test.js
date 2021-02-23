/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {} from 'dotenv/config';

chai.use(chaiHttp);
const { expect } = chai;
const chaiReq = chai.request(app);

describe('API Root', () => {
  it('should display content', async () => {
    const res = await chaiReq.get('/api/v1/');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.status(200);
    expect(res.body).to.not.be.null;
  });
});
