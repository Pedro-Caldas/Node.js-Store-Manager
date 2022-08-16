const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT sale_id AS saleId,
    date,
    product_id AS productId,
    quantity
  FROM StoreManager.sales_products
  INNER JOIN StoreManager.sales
  ON StoreManager.sales_products.sale_id = StoreManager.sales.id;`;

  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `
  SELECT date,
    product_id AS productId,
    quantity
  FROM StoreManager.sales_products
  INNER JOIN StoreManager.sales
  ON StoreManager.sales_products.sale_id = StoreManager.sales.id
  WHERE sale_id = ?;`;

  const [result] = await connection.execute(query, [id]);
  if (result.length === 0) return null;
  return result;
};

const addSale = async () => {
  const [result] = await connection
    .execute('INSERT INTO StoreManager.sales () VALUES ();');
  return { id: result.insertId };
};

const remove = async (id) => {
  const [removedSale] = await connection
    .execute('DELETE FROM StoreManager.sales WHERE id = ?;', [id]);
  if (removedSale.affectedRows === 0) return null;
  return { id };
};

module.exports = {
  getAll,
  getById,
  addSale,
  remove,
};