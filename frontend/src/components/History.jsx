import React from "react";
import { useGlobalContext } from "../context/useGlobalContext";

const History = ({ type }) => {
  const { incomes, expenses, deleteIncome, deleteExpense } = useGlobalContext();

  // 1. Determine which data and function to use
  const data = type === "income" ? incomes : expenses;
  const deleteItem = type === "income" ? deleteIncome : deleteExpense;

  // 2. Dynamic styling
  const isIncome = type === "income";
  const icon = isIncome ? "💰" : "💸";
  const textColor = isIncome ? "text-green-600" : "text-red-500";
  const bgColor = isIncome ? "bg-green-100" : "bg-red-100";
  const symbol = isIncome ? "+" : "-";

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-slate-700 capitalize">
        {type} History
      </h2>

      {data.length === 0 && <p className="text-gray-400">No {type}s found.</p>}

      {data.map((item) => {
        const { _id, title, amount, date, category } = item;
        return (
          <div
            key={_id}
            className={`bg-white border border-gray-100 shadow-sm p-4 rounded-xl flex justify-between items-center transition-all hover:border-slate-200`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
              >
                {icon}
              </div>
              <div>
                <h5 className="font-bold text-slate-800">{title}</h5>
                <p className="text-xs text-gray-500">
                  {new Date(date).toLocaleDateString()} • {category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className={`font-bold ${textColor}`}>
                {symbol}₹{amount}
              </p>
              <button
                onClick={() => deleteItem(_id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
