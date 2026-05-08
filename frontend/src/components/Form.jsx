import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const Form = () => {
  const { addIncome, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation: Ensure amount is treated as a number
    const formattedData = { ...inputState, amount: parseFloat(amount) };

    if (!title || !amount || !date || !category) {
      alert("Please fill in all required fields!");
      return;
    }

    addIncome(formattedData);

    // Reset form after submission
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={title}
          placeholder="Title (e.g. Salary, Stock Profit)"
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition-all"
          onChange={handleInput("title")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="number"
          value={amount}
          placeholder="Amount"
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition-all"
          onChange={handleInput("amount")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="date"
          value={date}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition-all text-gray-500"
          onChange={handleInput("date")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <select
          required
          value={category}
          name="category"
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition-all text-gray-500"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks/Trading</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          value={description}
          placeholder="Description (Optional)"
          rows="3"
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition-all resize-none"
          onChange={handleInput("description")}
        />
      </div>

      <button className="w-full py-4 bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:bg-green-600 active:scale-95 transition-all">
        ➕ Add Transaction
      </button>
    </form>
  );
};

export default Form;
