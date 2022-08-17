const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { before, after } = require('mocha');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

// TESTS FOR GETALL FUNCTION

describe('Controller get all sales from StoreManager.sales with getAll', () => {

  describe('when there are no sales', () => {

    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([]);
    });
    after(() => {
      salesService.getAll.restore();
    });

    it('status 200 is called', async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('calls json method with an empty array', async () => {
      await salesController.getAll(req, res);
      expect(res.json.calledWith([])).to.be.equal(true);
    });

  });

  describe('when there are sales', () => {

    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([{
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }]);
    });
    after(() => {
      salesService.getAll.restore();
    });

    it('status 200 is called', async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('calls json method with data', async () => {
      await salesController.getAll(req, res);
      expect(res.json.calledWith([{
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }])).to.be.equal(true);
    });

  });
});

// TESTS FOR GETBYID FUNCTION

describe('Service get only one sale from StoreManager.sales with get by id', () => {

  describe('when there is no sale with the informed id', () => {

    const res = {};
    const req = {};
    before(() => {
      req.params = { id: 5 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves(null);
    })
    after(() => {
      salesService.getById.restore();
    });

    it('throws an application error', async () => {
      return expect(salesController.getById(req, res)).to.eventually.be.rejectedWith('Sale not found');
    });

  });

  describe('when there is a sale with the informed id', () => {

    const res = {};
    const req = {};
    before(() => {
      req.params = { id: 1 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves([{
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }]);
    });
    after(() => {
      salesService.getById.restore();
    });

    it('calls json method with data', async () => {
      await salesController.getById(req, res);
      expect(res.json.calledWith([{
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }])).to.be.equal(true);
    });

  });

});

// TESTS FOR UPDATE FUNCTION

// describe('Controller update sale from StoreManager.sale with id', () => {

//   describe('when there is a sale with the informed id', () => {

//     const res = {};
//     const req = {};
//     before(() => {
//       req.params = { id: 1 }
//       res.status = sinon.stub().returns(res);
//       res.json = sinon.stub().returns();
//       sinon.stub(salesService, 'update').resolves([{
//         "name": "Martelo do Batman"
//       }]);
//     });
//     after(() => {
//       salesService.update.restore();
//     });

//     it('calls json method with data', async () => {
//       await salesController.update(req, res);
//       expect(res.json.calledWith([{
//         "saleId": 1,
//         "date": "2021-09-09T04:54:29.000Z",
//         "productId": 1,
//         "quantity": 2
//       }])).to.be.equal(true);
//     });

//   });

// });

// TESTS FOR REMOVE FUNCTION

describe('Controller delete sale from StoreManager.sales with id', () => {

  describe('when there is no sale with the informed id', () => {

    const res = {};
    const req = {};
    before(() => {
      req.params = { id: 5 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'remove').resolves(null);
    })
    after(() => {
      salesService.remove.restore();
    });

    it('throws an application error', async () => {
      return expect(salesController.remove(req, res)).to.eventually.be.rejectedWith('Sale not found');
    });

  });

});