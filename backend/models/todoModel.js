const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const getTodosByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM todos WHERE user_id = $1', [userId]);
  return result.rows;
};

const createTodo = async (userId, task) => {
  const result = await pool.query('INSERT INTO todos (user_id, task) VALUES ($1, $2) RETURNING *', [userId, task]);
  return result.rows[0];
};

const updateTodo = async (id, task, completed) => {
  const result = await pool.query('UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *', [task, completed, id]);
  return result.rows[0];
};

const deleteTodo = async (id) => {
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
};

module.exports = {
  getTodosByUserId,
  createTodo,
  updateTodo,
  deleteTodo,
};
