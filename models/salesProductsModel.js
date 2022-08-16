const connection = require('./connection');

const addSalesProducts = async (sale, saleId) => {
  const query = `
    INSERT INTO StoreManager.sales_products
    (product_Id, sale_id, quantity)
    VALUES ?;`;
  const sales = sale.map((el) => [el.productId, saleId.id, el.quantity]);
  await connection.query(query, [sales]);
};

const getSalesProducts = async ({ id }) => {
  const [result] = await connection.execute(`
  SELECT product_Id, quantity
  FROM StoreManager.sales_products
  WHERE sale_id = (?);`, [id]);
  return result;
};

module.exports = {
  addSalesProducts,
  getSalesProducts,
};