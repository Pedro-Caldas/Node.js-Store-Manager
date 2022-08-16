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
  console.log(updatedProduct);
  if (updatedProduct.affectedRows === 0) return null;
  console.log(updatedProduct.affectedRows.length);
  return { id, name };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};