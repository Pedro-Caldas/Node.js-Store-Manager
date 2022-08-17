const { expect } = require('chai');
const { before, after } = require('mocha');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

// TESTS FOR GETALL FUNCTION

describe('Model get all products from StoreManager.products with getAll', () => {

  describe('when there are no products', () => {

    before(() => {
      const execute = [[], []];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });

    it('returns an array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    });

    it('the array is empty', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.empty;
    });
    
  });

  describe('when there are products', () => {

    before(() => {
      const execute = [[{ "id": 1, "name": "Martelo de Thor" }], []];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });

    it('returns an array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    });

    it('the array is not empty', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.not.empty;
    });

    it('the array contains an object', async () => {
      const result = await productsModel.getAll();
      expect(result[0]).to.be.an('object');
    });

    it('the object has id and name as props', async () => {
      const result = await productsModel.getAll();
      expect(result[0]).to.include.all.keys('id', 'name');
    });

  });
});

// TESTS FOR GETBYID FUNCTION

describe('Model get only one product from StoreManager.products with get by id', () => {

  describe('when there is no product with the informed id', () => {

    before(async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(async () => {
      connection.execute.restore();
    });

    it('returns null', async () => {
      const result = await productsModel.getById(5);
      expect(result).to.be.equal(null);
    });

  });

  describe('when there is a product with the informed id', () => {

    before(async () => {
      const execute = [[{ "id": 1, "name": "Martelo de Thor" }]];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(async () => {
      connection.execute.restore();
    });

    it('returns an object', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.be.an('object');
    });

    it('the returned object is not empty', async () => {
      const result = await productsModel.getById(1);
      expect(result).not.to.be.empty;
    });

    it('the returned object has the correct props id and name', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.include.all.keys('id', 'name');
    });

  });

});

// TESTS FOR REMOVE FUNCTION

describe('Model delete product from StoreManager.products with id', () => {

  describe('when there is no product with the informed id', () => {

    before(async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(async () => {
      connection.execute.restore();
    });

    // it('returns null', async () => {
    //   const { result } = await productsModel.remove(5);
    //   expect(result).to.be.equal(null);
    // });

  });

  describe('when there is a product with the informed id', () => {

    before(async () => {
      const execute = [[{ "id": 1, "name": "Martelo de Thor" }]];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(async () => {
      connection.execute.restore();
    });

    it('returns an object', async () => {
      const result = await productsModel.remove(1);
      expect(result).to.be.an('object');
    });

    it('the returned object is not empty', async () => {
      const result = await productsModel.remove(1);
      expect(result).not.to.be.empty;
    });

    it('the returned object has the correct prop id', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.include.all.keys('id');
    });

  });

});