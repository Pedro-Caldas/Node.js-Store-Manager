const { expect } = require('chai');
const { before, after } = require('mocha');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

// TESTS FOR GETALL FUNCTION

describe('Model get all sales from StoreManager.sales with getAll', () => {

  describe('when there are no sales', () => {

    before(() => {
      const execute = [[], []];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });

    it('returns an array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    });

    it('the array is empty', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.empty;
    });

  });

  describe('when there are sales', () => {

    before(() => {
      const execute = [[{
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }], []];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });

    it('returns an array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    });

    it('the array is not empty', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.not.empty;
    });

    it('the array contains an object', async () => {
      const result = await salesModel.getAll();
      expect(result[0]).to.be.an('object');
    });

    it('the object has saleId, date, productId and quantity as props', async () => {
      const result = await salesModel.getAll();
      expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });

  });
});

// TESTS FOR GETBYID FUNCTION

describe('Model get only one sale from StoreManager.sales with get by id', () => {

  describe('when there is no sale with the informed id', () => {

    before(async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(async () => {
      connection.execute.restore();
    });

    it('returns null', async () => {
      const result = await salesModel.getById(5);
      expect(result).to.be.equal(null);
    });

  });

  describe('when there is a sale with the informed id', () => {

    before(() => {
      const execute = [{
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('returns an object', async () => {
      const result = await salesModel.getById(1);
      expect(result).to.be.an('object');
    });

    it('the returned object is not empty', async () => {
      const result = await salesModel.getById(1);
      expect(result).not.to.be.empty;
    });

    it('the object has saleId, date, productId and quantity as props', async () => {
      const result = await salesModel.getById(1);
      expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });

  });

});