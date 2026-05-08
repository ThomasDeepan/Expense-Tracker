import React, { useEffect, useState } from "react";
// ADD THIS LINE:
import { useGlobalContext } from "./context/GlobalContext";

// Also import your other components
import Summary from "./components/Summary";
import Form from "./components/Form";
import History from "./components/History";
function App() {
  const [active, setActive] = useState(1); // 1 for Income, 2 for Expense
  const { getIncomes, getExpenses } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-800">
            TRACKER<span className="text-green-500">.TOM</span>
          </h1>
        </header>

        <Summary />

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActive(1)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${active === 1 ? "bg-slate-800 text-white" : "bg-white text-slate-500"}`}
          >
            Incomes
          </button>
          <button
            onClick={() => setActive(2)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${active === 2 ? "bg-slate-800 text-white" : "bg-white text-slate-500"}`}
          >
            Expenses
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold mb-6 text-slate-700">
              {active === 1 ? "Add New Income" : "Add New Expense"}
            </h2>
            {/* Pass the type to a single form or use two different forms */}
            <Form type={active === 1 ? "income" : "expense"} />
          </div>

          <div className="lg:col-span-7">
            <History type={active === 1 ? "income" : "expense"} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
