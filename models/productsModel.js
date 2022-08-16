const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');
  return result;
};

const getById = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  if (result.length === 0) return null;
  return result[0];
};

const create = async (name) => {
  const [result] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?);', [name]);
  return { id: result.insertId, name };
};

const update = async (id, name) => {
  const [updatedProduct] = await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?;', [name, id]);
  if (updatedProduct.affectedRows === 0) return null;
  return { id, name };
};

const remove = async (id) => {
  const [removedProduct] = await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?;', [id]);
  if (removedProduct.affectedRows === 0) return null;
  return { id };
};

const search = async (q) => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');
  const filteredProducts = result.filter((el) => el.name.includes(q));
  if (filteredProducts.length === 0) return result;
  return filteredProducts;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  search,
};