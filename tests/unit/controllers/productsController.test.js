const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { before, after } = require('mocha');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const ApplicationError = require('../../../errors/ApplicationError');

// TESTS FOR GETALL FUNCTION

describe('Controller get all products from StoreManager.products with getAll', () => {

  describe('when there are no products', () => {

    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves([]);
    });
    after(() => {
      productsService.getAll.restore();
    });

    it('status 200 is called', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('calls json method with an empty array', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith([])).to.be.equal(true);
    });

  });

  describe('when there are products', () => {

    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves([{ "id": 1, "name": "Martelo de Thor" }]);
    });
    after(() => {
      productsService.getAll.restore();
    });

    it('status 200 is called', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('calls json method with data', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith([{ "id": 1, "name": "Martelo de Thor" }])).to.be.equal(true);
    });

  });
});

// TESTS FOR GETBYID FUNCTION

describe('Service get only one product from StoreManager.products with get by id', () => {

  describe('when there is no product with the informed id', () => {

    const res = {};
    const req = {};
    before(() => {
      req.params = { id: 5 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves(null);
    })
    after(() => {
      productsService.getById.restore();
    });

    it('throws an application error', async () => {
      return expect(productsController.getById(req, res)).to.eventually.be.rejectedWith('Product not found');
    });

  });

  describe('when there is a product with the informed id', () => {

    const res = {};
    const req = {};
    before(() => {
      req.params = { id: 1 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves([{ "id": 1, "name": "Martelo de Thor" }]);
    });
    after(() => {
      productsService.getById.restore();
    });

    it('calls json method with data', async () => {
      await productsController.getById(req, res);
      expect(res.json.calledWith([{ "id": 1, "name": "Martelo de Thor" }])).to.be.equal(true);
    });

  });

});

