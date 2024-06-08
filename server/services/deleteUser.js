// db.js (assuming it contains the database connection logic)
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

// deleteUser.js
const db = require("../db");

const deleteUser = async (userId) => {
  try {
    const query = "DELETE FROM users WHERE id = $1";
    await db.query(query, [userId]);
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user", error);
    throw new Error("Error deleting user");
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  deleteUserController,
};
