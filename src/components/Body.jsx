import { useEffect, useState } from 'react';

const Body = () => {
  const menuItems = ["Dashboard", "Insights", "Trends", "Other Info"];
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    category: '',
    amount: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User";
    setUsername(storedUsername);
  }, []);

  const handleAdd = () => {
    if (!showForm) {
      setExpenseForm(form => ({
        ...form,
        date: new Date().toISOString().slice(0, 10),
      }));
    } else {
      setExpenseForm({
        category: '',
        amount: '',
        description: '',
        date: '',
      });
    }
    setShowForm(!showForm);
  };

  const handleView = () => alert("View");

  const handleSummary = () => alert("Generating Summary");

  const handleChange = e => {
    const { name, value } = e.target;
    setExpenseForm(form => ({ ...form, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (expenseForm.amount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    try {
      const response = await fetch('/api/expenses/add-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseForm),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Expense Added Successfully:
  Category: ${data.expense.category}
  Amount: ${data.expense.amount}
  Date: ${new Date(data.expense.date).toLocaleDateString()}
  Description: ${data.expense.description || 'N/A'}
        `);

        setExpenseForm({
          category: '',
          amount: '',
          description: '',
          date: '',
        });
        setShowForm(false);
      } else {
        alert(`❌ Failed to add expense: ${data.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ An unexpected error occurred.");
    }
  };


  const renderContent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return (
          <section className="rounded-lg bg-white p-6 shadow w-full flex flex-col items-center">
            <h3 className="mb-2 text-2xl font-semibold text-slate-900 text-center">Dashboard</h3>
            <p className="text-slate-700 text-center mb-4">
              Overview of your spending, income, and budget progress.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
              <button
                onClick={handleAdd}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition w-full md:w-auto mb-4 md:mb-0"
              >
                {showForm ? "Cancel" : "Add Expense"}
              </button>
              <button
                onClick={handleView}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition w-full md:w-auto mb-4 md:mb-0"
              >
                View Expense
              </button>
              <button
                onClick={handleSummary}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition w-full md:w-auto"
              >
                Generate Summary
              </button>
            </div>

            {/* Form Centered */}
            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg space-y-4"
              >
                <div className="flex flex-col gap-4">
                  <label htmlFor="category" className="sr-only">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={expenseForm.category}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
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
                    <option>Others</option>
                  </select>

                  <label htmlFor="amount" className="sr-only">Amount</label>
                  <input
                    id="amount"
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={expenseForm.amount}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                  />

                  <label htmlFor="description" className="sr-only">Description</label>
                  <input
                    id="description"
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={expenseForm.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />

                  <label htmlFor="date" className="sr-only">Date</label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={expenseForm.date}
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
                </div>
              </form>
            )}
          </section>
        );
      default:
        return null;
    }
  };


  return (
    <main className="flex flex-col min-h-screen bg-slate-50 pt-12">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow flex flex-col overflow-y-auto">
          <div className="text-center px-6 py-6 border-b border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Welcome back, <span className="text-blue-600">{username}</span>!
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-700">
              Your personal assistant for managing expenses effortlessly.
            </p>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 text-center">Menu</h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedItem(item);
                    setShowForm(false); // Close form on menu change
                  }}
                  className={`cursor-pointer border border-slate-200 rounded-md px-4 py-2 transition-all
                    ${selectedItem === item
                      ? 'bg-blue-100 border-blue-400 text-blue-700 font-semibold'
                      : 'hover:bg-slate-100 text-slate-700'
                    }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default Body;