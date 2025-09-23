import { useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  // Dummy expense data
  const [expenses, setExpenses] = useState([
    {
      category: "Food",
      amount: 45.75,
      description: "Groceries at Walmart",
      date: "2025-09-18",
    },
    {
      category: "Education",
      amount: 120.0,
      description: "Online course subscription",
      date: "2025-09-15",
    },
    {
      category: "Clothing",
      amount: 80.5,
      description: "New shoes",
      date: "2025-09-12",
    },
    {
      category: "Housing",
      amount: 950,
      description: "September rent",
      date: "2025-09-01",
    },
    {
      category: "Healthcare",
      amount: 65.25,
      description: "Pharmacy bill",
      date: "2025-09-14",
    },
    {
      category: "Leisure",
      amount: 30,
      description: "Movie tickets",
      date: "2025-09-20",
    },
    {
      category: "Bills",
      amount: 110.9,
      description: "Electricity & Water",
      date: "2025-09-10",
    },
    {
      category: "Others",
      amount: 20,
      description: "Random spending",
      date: "2025-09-17",
    },
        {
      category: "Food",
      amount: 45.75,
      description: "Groceries at Walmart",
      date: "2025-09-18",
    },
    {
      category: "Education",
      amount: 120.0,
      description: "Online course subscription",
      date: "2025-09-15",
    },
    {
      category: "Clothing",
      amount: 80.5,
      description: "New shoes",
      date: "2025-09-12",
    },
    {
      category: "Housing",
      amount: 950,
      description: "September rent",
      date: "2025-09-01",
    },
    {
      category: "Healthcare",
      amount: 65.25,
      description: "Pharmacy bill",
      date: "2025-09-14",
    },
    {
      category: "Leisure",
      amount: 30,
      description: "Movie tickets",
      date: "2025-09-20",
    },
    {
      category: "Bills",
      amount: 110.9,
      description: "Electricity & Water",
      date: "2025-09-10",
    },
    {
      category: "Others",
      amount: 20,
      description: "Random spending",
      date: "2025-09-17",
    },
        {
      category: "Food",
      amount: 45.75,
      description: "Groceries at Walmart",
      date: "2025-09-18",
    },
    {
      category: "Education",
      amount: 120.0,
      description: "Online course subscription",
      date: "2025-09-15",
    },
    {
      category: "Clothing",
      amount: 80.5,
      description: "New shoes",
      date: "2025-09-12",
    },
    {
      category: "Housing",
      amount: 950,
      description: "September rent",
      date: "2025-09-01",
    },
    {
      category: "Healthcare",
      amount: 65.25,
      description: "Pharmacy bill",
      date: "2025-09-14",
    },
    {
      category: "Leisure",
      amount: 30,
      description: "Movie tickets",
      date: "2025-09-20",
    },
    {
      category: "Bills",
      amount: 110.9,
      description: "Electricity & Water",
      date: "2025-09-10",
    },
    {
      category: "Others",
      amount: 20,
      description: "Random spending",
      date: "2025-09-17",
    },
        {
      category: "Food",
      amount: 45.75,
      description: "Groceries at Walmart",
      date: "2025-09-18",
    },
    {
      category: "Education",
      amount: 120.0,
      description: "Online course subscription",
      date: "2025-09-15",
    },
    {
      category: "Clothing",
      amount: 80.5,
      description: "New shoes",
      date: "2025-09-12",
    },
    {
      category: "Housing",
      amount: 950,
      description: "September rent",
      date: "2025-09-01",
    },
    {
      category: "Healthcare",
      amount: 65.25,
      description: "Pharmacy bill",
      date: "2025-09-14",
    },
    {
      category: "Leisure",
      amount: 30,
      description: "Movie tickets",
      date: "2025-09-20",
    },
    {
      category: "Bills",
      amount: 110.9,
      description: "Electricity & Water",
      date: "2025-09-10",
    },
    {
      category: "Others",
      amount: 20,
      description: "Random spending",
      date: "2025-09-17",
    },
        {
      category: "Food",
      amount: 45.75,
      description: "Groceries at Walmart",
      date: "2025-09-18",
    },
    {
      category: "Education",
      amount: 120.0,
      description: "Online course subscription",
      date: "2025-09-15",
    },
    {
      category: "Clothing",
      amount: 80.5,
      description: "New shoes",
      date: "2025-09-12",
    },
    {
      category: "Housing",
      amount: 950,
      description: "September rent",
      date: "2025-09-01",
    },
    {
      category: "Healthcare",
      amount: 65.25,
      description: "Pharmacy bill",
      date: "2025-09-14",
    },
    {
      category: "Leisure",
      amount: 30,
      description: "Movie tickets",
      date: "2025-09-20",
    },
    {
      category: "Bills",
      amount: 110.9,
      description: "Electricity & Water",
      date: "2025-09-10",
    },
    {
      category: "Others",
      amount: 20,
      description: "Random spending",
      date: "2025-09-17",
    },
        {
      category: "Food",
      amount: 45.75,
      description: "Groceries at Walmart",
      date: "2025-09-18",
    },
    {
      category: "Education",
      amount: 120.0,
      description: "Online course subscription",
      date: "2025-09-15",
    },
    {
      category: "Clothing",
      amount: 80.5,
      description: "New shoes",
      date: "2025-09-12",
    },
    {
      category: "Housing",
      amount: 950,
      description: "September rent",
      date: "2025-09-01",
    },
    {
      category: "Healthcare",
      amount: 65.25,
      description: "Pharmacy bill",
      date: "2025-09-14",
    },
    {
      category: "Leisure",
      amount: 30,
      description: "Movie tickets",
      date: "2025-09-20",
    },
    {
      category: "Bills",
      amount: 110.9,
      description: "Electricity & Water",
      date: "2025-09-10",
    },
    {
      category: "Others",
      amount: 20,
      description: "Random spending",
      date: "2025-09-17",
    },
        {
      category: "Food",
      amount: 45.75,
      description: "Groceries at Walmart",
      date: "2025-09-18",
    },
    {
      category: "Education",
      amount: 120.0,
      description: "Online course subscription",
      date: "2025-09-15",
    },
    {
      category: "Clothing",
      amount: 80.5,
      description: "New shoes",
      date: "2025-09-12",
    },
    {
      category: "Housing",
      amount: 950,
      description: "September rent",
      date: "2025-09-01",
    },
    {
      category: "Healthcare",
      amount: 65.25,
      description: "Pharmacy bill",
      date: "2025-09-14",
    },
    {
      category: "Leisure",
      amount: 30,
      description: "Movie tickets",
      date: "2025-09-20",
    },
    {
      category: "Bills",
      amount: 110.9,
      description: "Electricity & Water",
      date: "2025-09-10",
    },
    {
      category: "Others",
      amount: 20,
      description: "Random spending",
      date: "2025-09-17",
    },
        {
      category: "Food",
      amount: 45.75,
      description: "Groceries at Walmart",
      date: "2025-09-18",
    },
    {
      category: "Education",
      amount: 120.0,
      description: "Online course subscription",
      date: "2025-09-15",
    },
    {
      category: "Clothing",
      amount: 80.5,
      description: "New shoes",
      date: "2025-09-12",
    },
    {
      category: "Housing",
      amount: 950,
      description: "September rent",
      date: "2025-09-01",
    },
    {
      category: "Healthcare",
      amount: 65.25,
      description: "Pharmacy bill",
      date: "2025-09-14",
    },
    {
      category: "Leisure",
      amount: 30,
      description: "Movie tickets",
      date: "2025-09-20",
    },
    {
      category: "Bills",
      amount: 110.9,
      description: "Electricity & Water",
      date: "2025-09-10",
    },
    {
      category: "Others",
      amount: 20,
      description: "Random spending",
      date: "2025-09-17",
    }
  ]);

  // Toggle form
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // Add expense
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
    setShowForm(false);
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
        {showForm && (
        <AddExpenseForm addExpense={addExpense} />
        )}
      </section>

      {/* Expenses section — NO extra div here */}
   <section className="rounded-lg bg-white p-6 shadow w-full flex flex-col items-center mt-6 max-w-7xl mx-auto">
       <h4 className="mb-4 text-lg font-semibold text-center">Expenses</h4>
        <ExpenseList expenses={expenses} />
      </section>
    </>
  );
};

export default Dashboard;
