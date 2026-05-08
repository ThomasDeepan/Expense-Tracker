const {
  addIncome,
  getIncomes,
  deleteIncome,
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/transactionController");

const router = require("express").Router();

// Income Routes
router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome);

// Expense Routes
router
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpenses)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
