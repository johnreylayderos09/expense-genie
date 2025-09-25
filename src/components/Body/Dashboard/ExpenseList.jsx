import { useEffect, useState, useMemo } from "react";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const ExpenseList = ({ refreshFlag }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const itemsPerPage = 10;

  const token = localStorage.getItem("token");

  // Fetch expenses
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

  // Re-fetch on mount or when refreshFlag changes
  useEffect(() => {
    fetchExpenses();
    setCurrentPage(1); // reset page on refresh
  }, [refreshFlag]);

  // Delete expense
  const deleteExpense = async (expense) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

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
        fetchExpenses();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete expense");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting expense");
    }
  };

  // Update expense
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
        fetchExpenses();
        setSelectedExpense(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update expense");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating expense");
    }
  };

  // Sort handler
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter + sort
  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (expense) =>
          expense.category.toLowerCase().includes(lowerSearch) ||
          expense.description.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "date") {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        if (sortConfig.key === "amount") {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [expenses, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedExpenses.length / itemsPerPage);
  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = filteredAndSortedExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // EditExpenseForm component inside modal
  const EditExpenseForm = ({ expense }) => {
    const [formData, setFormData] = useState({
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
      date: expense.date.split("T")[0], // format yyyy-mm-dd
      id: expense._id,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setError("");
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (Number(formData.amount) <= 0) {
        setError("Please enter a valid amount greater than 0.");
        return;
      }

      try {
        await updateExpense(formData);
      } catch {
        setError("Error updating expense");
      }
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-lg w-full max-w-md"
        >
          <h3 className="mb-4 text-lg font-semibold">Edit Expense</h3>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mb-3"
          >
            <option value="" disabled>Select category</option>
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
            className="w-full p-2 border border-gray-300 rounded mb-3"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-3"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mb-3"
          />

          {error && (
            <p className="text-red-600 font-semibold mb-3">{error}</p>
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setSelectedExpense(null)}
              className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by category or description..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md p-2 border border-gray-300 rounded"
        />
      </div>

      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <>
          <table className="w-full table-auto border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-gray-100 cursor-pointer select-none">
              <tr>
                <th
                  className="text-center p-3 font-medium text-gray-700"
                  onClick={() => requestSort("category")}
                >
                  Category
                  {sortConfig.key === "category" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
                </th>
                <th
                  className="text-center p-3 font-medium text-gray-700"
                  onClick={() => requestSort("amount")}
                >
                  Amount
                  {sortConfig.key === "amount" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
                </th>
                <th className="text-center p-3 font-medium text-gray-700">Description</th>
                <th
                  className="text-center p-3 font-medium text-gray-700"
                  onClick={() => requestSort("date")}
                >
                  Date
                  {sortConfig.key === "date" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
                </th>
                <th className="text-center p-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentExpenses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                currentExpenses.map((expense) => (
                  <tr key={expense._id} className="hover:bg-gray-50">
                    <td className="text-center p-3">{expense.category}</td>
                    <td className="text-center p-3">{Number(expense.amount).toFixed(2)}</td>
                    <td className="text-center p-3">{expense.description || "-"}</td>
                    <td className="text-center p-3">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="text-center p-3 space-x-2">
                      <button
                        onClick={() => setSelectedExpense(expense)}
                        className="text-blue-600 hover:text-blue-800"
                        aria-label="Edit Expense"
                        title="Edit"
                      >
                        <PencilSquareIcon className="inline-block w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteExpense(expense)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete Expense"
                        title="Delete"
                      >
                        <TrashIcon className="inline-block w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Edit Modal */}
          {selectedExpense && <EditExpenseForm expense={selectedExpense} />}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
