const mysql = require('mysql2');
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

// TO DO THIS UPDATE FUNCTION I GOT HELP FROM THE FOLLOWING LINK: https://stackoverflow.com/questions/25552115/updating-multiple-rows-with-node-mysql-nodejs-and-q/29519758#29519758

const update = async (id, sale) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
  if (result.length === 0) return null;

  let queries = '';
  const sales = sale.map((el) => [el.productId, el.quantity, Number(id), el.productId]);
  sales.forEach((el) => {
    queries += mysql.format(`UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ? AND product_id = ?; `, el);
  });
  await connection.query(queries);

  return sale;
};

module.exports = {
  addSalesProducts,
  getSalesProducts,
  update,
};