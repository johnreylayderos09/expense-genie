import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const ExpenseList = () => {
  // States
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null); // For editing
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Categories list for dropdown
  const categories = [
    "Food",
    "Education",
    "Clothing",
    "Housing",
    "Personal Needs",
    "Healthcare",
    "Leisure",
    "Bills",
    "Other",
  ];

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Fetch expenses from backend
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
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong while fetching expenses");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Delete expense handler
  const deleteExpense = async (expense) => {
    const confirmed = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/expenses/delete-expense", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: expense._id }),
      });

      if (res.ok) {
        fetchExpenses(); // Refresh after delete
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete expense");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting expense");
    }
  };

  // Update expense handler (called from edit form)
  const updateExpense = async (updatedExpense) => {
    try {
      const res = await fetch("/api/expenses/edit-expense", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedExpense),
      });

      if (res.ok) {
        fetchExpenses(); // Refresh after update
        setSelectedExpense(null); // Close form
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update expense");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating expense");
    }
  };

  // Pagination calculations
  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // --- Edit Form Component ---
  const EditExpenseForm = ({ expense }) => {
    const [formData, setFormData] = useState({
      id: expense._id,
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
      date: expense.date.split("T")[0], // assuming ISO date string
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // You can add validation here if needed
      updateExpense(formData);
    };

    return (
      <>
        {/* Subtle overlay behind form */}
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-40"
          onClick={() => setSelectedExpense(null)}
        />

        {/* Modal form container */}
        <form
          onSubmit={handleSubmit}
          className="fixed z-50 top-1/2 left-1/2 max-w-md w-full bg-white rounded-lg shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside form
        >
          <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>

          <label className="block mb-2">
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-2">
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </label>

          <label className="block mb-2">
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </label>

          <label className="block mb-4">
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </label>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setSelectedExpense(null)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <>
          <table className="w-full table-auto border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-center p-3 font-medium text-gray-700">Category</th>
                <th className="text-center p-3 font-medium text-gray-700">Amount</th>
                <th className="text-center p-3 font-medium text-gray-700">Description</th>
                <th className="text-center p-3 font-medium text-gray-700">Date</th>
                <th className="text-center p-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentExpenses.map((expense, idx) => (
                <tr key={expense._id || idx} className="hover:bg-gray-50">
                  <td className="p-3 text-center">{expense.category}</td>
                  <td className="p-3 text-center">
                    {new Intl.NumberFormat('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                      minimumFractionDigits: 2,
                    }).format(expense.amount)}
                  </td>
                  <td className="p-3 text-center">{expense.description}</td>
                  <td className="p-3 text-center">{expense.date.split("T")[0]}</td>
                  <td className="p-3 text-center space-x-3">
                    <button
                      onClick={() => setSelectedExpense(expense)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteExpense(expense)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`p-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } hover:bg-blue-400`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </>
      )}

      {/* Show edit form if expense is selected */}
      {selectedExpense && <EditExpenseForm expense={selectedExpense} />}
    </div>
  );
};

export default ExpenseList;
