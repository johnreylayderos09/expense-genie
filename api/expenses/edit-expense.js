// /api/expenses/edit-expense.js

import connectToDatabase from "../../utils/db.js";
import Expense from "../../models/Expense.js";

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, category, amount, description, date } = req.body;

  if (!id || !category || amount == null || !description || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await connectToDatabase();

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { category, amount, description, date },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
}
