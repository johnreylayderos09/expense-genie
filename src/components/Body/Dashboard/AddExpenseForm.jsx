import { useState } from "react";

const AddExpenseForm = ({ addExpense }) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }
    addExpense(formData);
    setFormData({ category: '', amount: '', description: '', date: '' });
  };

  return (
    
    <div className="flex justify-center items-center w-full"> 
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 p-6 border border-gray-300 rounded bg-white shadow-md">
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
          <option>Others</option>
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Submit Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
