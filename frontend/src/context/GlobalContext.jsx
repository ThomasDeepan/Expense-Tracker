import React, { createContext, useState, useContext } from "react";
import api from "../utils/api";

// 1. Export the context so the other file can use it
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // --- INCOMES ---
  const getIncomes = async () => {
    try {
      const response = await api.get("/get-incomes");
      setIncomes(response.data || []);
    } catch (err) {
      setError("Could not fetch incomes");
    }
  };

  const addIncome = async (income) => {
    try {
      await api.post("/add-income", income);
      await getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await api.delete(`/delete-income/${id}`);
      await getIncomes();
    } catch (err) {
      setError("Failed to delete income");
    }
  };

  // --- EXPENSES ---
  const getExpenses = async () => {
    try {
      const response = await api.get("/get-expenses");
      setExpenses(response.data || []);
    } catch (err) {
      setError("Could not fetch expenses");
    }
  };

  const addExpense = async (expense) => {
    try {
      await api.post("/add-expense", expense);
      await getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/delete-expense/${id}`);
      await getExpenses();
    } catch (err) {
      setError("Failed to delete expense");
    }
  };

  // --- CALCULATIONS ---
  const totalIncome = () => {
    return incomes.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  };

  const totalExpense = () => {
    return expenses.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  };

  const totalBalance = () => totalIncome() - totalExpense();

  // Clear Error helper
  const clearError = () => setError(null);

  const contextValue = {
    incomes,
    expenses,
    addIncome,
    getIncomes,
    deleteIncome,
    addExpense,
    getExpenses,
    deleteExpense,
    totalIncome,
    totalExpense,
    totalBalance,
    error,
    setError,
    clearError,
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        addIncome,
        getIncomes,
        deleteIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalBalance,
        totalIncome,
        totalExpense,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
