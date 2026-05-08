import React from "react";
import { useGlobalContext } from "../context/GlobalContext";

const History = () => {
  const { incomes, deleteIncome } = useGlobalContext();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-slate-700">Transaction History</h2>
      {incomes.length === 0 && (
        <p className="text-gray-400">No transactions yet.</p>
      )}

      {incomes.map((income) => {
        const { _id, title, amount, date, category } = income;
        return (
          <div
            key={_id}
            className="bg-white border border-gray-100 shadow-sm p-4 rounded-xl flex justify-between items-center hover:border-green-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                💰
              </div>
              <div>
                <h5 className="font-bold text-slate-800">{title}</h5>
                <p className="text-xs text-gray-500">
                  {new Date(date).toLocaleDateString()} • {category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="font-bold text-green-600">+₹{amount}</p>
              <button
                onClick={() => deleteIncome(_id)}
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
