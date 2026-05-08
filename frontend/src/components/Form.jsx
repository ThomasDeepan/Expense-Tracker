import React, { useState } from "react";
import { useGlobalContext } from "../context/useGlobalContext";

const Form = ({ type }) => {
  // Destructure addExpense from context
  const { addIncome, addExpense, setError } = useGlobalContext();

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
    const formattedData = { ...inputState, amount: parseFloat(amount) };

    if (!title || !amount || !date || !category) {
      alert("Please fill in all required fields!");
      return;
    }

    // 🔥 SWITCH LOGIC: Call the correct function based on the type prop
    if (type === "income") {
      addIncome(formattedData);
    } else {
      addExpense(formattedData);
    }

    // Reset form
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  // 🎨 Dynamic UI adjustments
  const isIncome = type === "income";
  const themeColor = isIncome ? "green" : "red";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={title}
          placeholder="Title"
          className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-400 outline-none transition-all`}
          onChange={handleInput("title")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="number"
          value={amount}
          placeholder="Amount"
          className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-400 outline-none transition-all`}
          onChange={handleInput("amount")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="date"
          value={date}
          className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-400 outline-none transition-all text-gray-500`}
          onChange={handleInput("date")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <select
          required
          value={category}
          name="category"
          className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-400 outline-none transition-all text-gray-500`}
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Category
          </option>
          {isIncome ? (
            <>
              <option value="salary">Salary</option>
              <option value="freelancing">Freelancing</option>
              <option value="stocks">Stocks/Trading</option>
              <option value="other">Other</option>
            </>
          ) : (
            <>
              <option value="education">Education</option>
              <option value="groceries">Groceries</option>
              <option value="health">Health</option>
              <option value="subscriptions">Subscriptions</option>
              <option value="travelling">Travelling</option>
              <option value="other">Other</option>
            </>
          )}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          value={description}
          placeholder="Description (Optional)"
          rows="3"
          className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-400 outline-none transition-all resize-none`}
          onChange={handleInput("description")}
        />
      </div>

      <button
        className={`w-full py-4 bg-${themeColor}-500 text-white font-bold rounded-xl shadow-lg shadow-${themeColor}-200 hover:bg-${themeColor}-600 active:scale-95 transition-all`}
      >
        {isIncome ? "➕ Add Income" : "➖ Add Expense"}
      </button>
    </form>
  );
};

export default Form;
