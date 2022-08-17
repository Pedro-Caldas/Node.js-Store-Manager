const { expect } = require('chai');
const { before, after } = require('mocha');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

// TESTS FOR GETALL FUNCTION

describe('Service get all sales from StoreManager.sales with getAll', () => {

  describe('when there are no sales', () => {

    before(() => {
      const response = [];
      sinon.stub(salesModel, 'getAll').resolves(response);
    });
    after(() => {
      salesModel.getAll.restore();
    });

    it('returns an array', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });

    it('the array is empty', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.empty;
    });

  });

  describe('when there are sales', () => {

    before(() => {
      const response = [{
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }];
      sinon.stub(salesModel, 'getAll').resolves(response);
    });
    after(() => {
      salesModel.getAll.restore();
    });

    it('returns an array', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });

    it('the array is not empty', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.not.empty;
    });

    it('the array contains an object', async () => {
      const [result] = await salesService.getAll();
      expect(result).to.be.an('object');
    });

    it('the object has saleId, date, productId and quantity as props', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });

  });
});

// TESTS FOR GETBYID FUNCTION

describe('Service get only one sale from StoreManager.sales with get by id', () => {

  describe('when there is no sale with the informed id', () => {

    before(async () => {
      const response = null;
      sinon.stub(salesModel, 'getById').resolves(response);
    })
    after(async () => {
      salesModel.getById.restore();
    });

    it('returns null', async () => {
      const result = await salesService.getById(5);
      expect(result).to.be.equal(null);
    });

  });

  describe('when there is a sale with the informed id', () => {

    before(async () => {
      const response = {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      };
      sinon.stub(salesModel, 'getById').resolves(response);
    })
    after(async () => {
      salesModel.getById.restore();
    });

    it('returns an object', async () => {
      const result = await salesService.getById(1);
      expect(result).to.be.an('object');
    });

    it('the returned object is not empty', async () => {
      const result = await salesService.getById(1);
      expect(result).not.to.be.empty;
    });

    it('the object has saleId, date, productId and quantity as props', async () => {
      const result = await salesService.getById(1);
      expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });

  });

});

