const { expect } = require('chai');
const { before, after } = require('mocha');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

// TESTS FOR GETALL FUNCTION

describe('Service get all products from StoreManager.products with getAll', () => {

  describe('when there are no products', () => {

    before(() => {
      const response = [];
      sinon.stub(productsModel, 'getAll').resolves(response);
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('returns an array', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    });

    it('the array is empty', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.empty;
    });

  });

  describe('when there are products', () => {

    before(() => {
      const response = [{ "id": 1, "name": "Martelo de Thor" }, {"id": 2, "name": "Traje de encolhimento" }];
      sinon.stub(productsModel, 'getAll').resolves(response);
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('returns an array', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    });

    it('the array is not empty', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.not.empty;
    });

    it('the array contains an object', async () => {
      const [result] = await productsService.getAll();
      expect(result).to.be.an('object');
    });

    it('the object has id and name as props', async () => {
      const [result] = await productsService.getAll();
      expect(result).to.include.all.keys('id', 'name');
    });

  });
});

// TESTS FOR GETBYID FUNCTION

describe('Service get only one product from StoreManager.products with get by id', () => {

  describe('when there is no product with the informed id', () => {

    before(async () => {
      const response = null;
      sinon.stub(productsModel, 'getById').resolves(response);
    })
    after(async () => {
      productsModel.getById.restore();
    });

    it('returns null', async () => {
      const result = await productsService.getById(5);
      expect(result).to.be.equal(null);
    });

  });

  describe('when there is a product with the informed id', () => {

    before(async () => {
      const response = { "id": 1, "name": "Martelo de Thor" };
      sinon.stub(productsModel, 'getById').resolves(response);
    })
    after(async () => {
      productsModel.getById.restore();
    });

    it('returns an object', async () => {
      const result = await productsService.getById(1);
      expect(result).to.be.an('object');
    });

    it('the returned object is not empty', async () => {
      const result = await productsService.getById(1);
      expect(result).not.to.be.empty;
    });

    it('the returned object has the correct props id and name', async () => {
      const result = await productsService.getById(1);
      expect(result).to.include.all.keys('id', 'name');
    });

  });

});

