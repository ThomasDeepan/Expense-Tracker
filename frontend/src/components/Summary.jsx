import React from "react";
import { useGlobalContext } from "../context/useGlobalContext";

const Summary = () => {
  const { totalIncome, totalExpense, totalBalance } = useGlobalContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      {/* Total Balance */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          Total Balance
        </span>
        <p
          className={`text-3xl font-black mt-1 ${totalBalance() >= 0 ? "text-slate-800" : "text-red-500"}`}
        >
          ₹{totalBalance()}
        </p>
      </div>

      {/* Income Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
        <span className="text-green-500 text-xs font-bold uppercase tracking-widest">
          Incomes
        </span>
        <p className="text-3xl font-black mt-1 text-green-600">
          +₹{totalIncome()}
        </p>
      </div>

      {/* Expense Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
        <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
          Expenses
        </span>
        <p className="text-3xl font-black mt-1 text-red-500">
          -₹{totalExpense()}
        </p>
      </div>
    </div>
  );
};

export default Summary;
