import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'; // Correct import path

const ExpenseList = ({ expenses, setSelectedExpense, deleteExpense }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Limit to 10 items per page

  // Calculate the index of the first and last expense for pagination
  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  // Calculate total pages
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full overflow-x-auto">
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
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-3 text-center">{expense.category}</td>
              <td className="p-3 text-center">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                  minimumFractionDigits: 2,
                }).format(expense.amount)}
              </td>
              <td className="p-3 text-center">{expense.description}</td>
              <td className="p-3 text-center">{expense.date}</td>
              <td className="p-3 text-center space-x-3">
                {/* Edit Button */}
                <button
                  onClick={() => setSelectedExpense(expense)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                {/* Delete Button */}
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          &lt; {/* Symbol for Previous */}
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-400`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          &gt; {/* Symbol for Next */}
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
