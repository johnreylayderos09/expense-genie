import { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses/display-expense", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setExpenses(data.expenses);
      } else {
        alert("Failed to fetch expenses");
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
      alert("An error occurred while fetching expenses.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <>
      {/* Dashboard section */}
      <section className="rounded-lg bg-white p-6 shadow w-full flex flex-col items-center">
        <h3 className="mb-2 text-2xl font-semibold text-slate-900 text-center">
          Dashboard
        </h3>
        <p className="text-slate-700 text-center mb-4">
          Overview of spending, income, and budget progress.
        </p>

        <button
          onClick={toggleForm}
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition mb-6"
        >
          {showForm ? "Cancel" : "Add Expense"}
        </button>

        {/* Expense Form */}
        {showForm && <AddExpenseForm onExpenseAdded={fetchExpenses} />}
      </section>

      {/* Expenses section */}
      <section className="rounded-lg bg-white p-6 shadow w-full flex flex-col items-center mt-6 max-w-7xl mx-auto">
        <h4 className="mb-4 text-lg font-semibold text-center">Expenses</h4>
        <ExpenseList
          expenses={expenses}
          loading={loading}
          refreshExpenses={fetchExpenses}
        />
      </section>
    </>
  );
};

export default Dashboard;
