import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Install @heroicons/react
import { ClipLoader } from "react-spinners"; // Install react-spinners

const AddExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: '',
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    const token = localStorage.getItem("token");

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/expenses/add-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({
          category: '',
          amount: '',
          description: '',
          date: '',
        });
        setIsSuccess(true);
        if (onExpenseAdded) onExpenseAdded(); // ✅ Trigger refresh in ExpenseList
        setTimeout(() => setIsSuccess(false), 2000); // Optional: fade out success
      } else {
        setError(data.message || "Error adding expense");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 p-6 border border-gray-300 rounded bg-white shadow-md relative"
      >
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select category
          </option>
          <option>Food</option>
          <option>Education</option>
          <option>Clothing</option>
          <option>Housing</option>
          <option>Personal Needs</option>
          <option>Healthcare</option>
          <option>Leisure</option>
          <option>Bills</option>
          <option>Other</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {error && (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        )}

        <div className="flex justify-center items-center gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Expense'}
          </button>

          {isLoading && <ClipLoader size={20} color="#16a34a" />}
          {isSuccess && <CheckCircleIcon className="h-6 w-6 text-green-600" />}
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
