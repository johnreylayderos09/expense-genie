import connectToDatabase from '../../utils/db.js';
import Expense from '../../models/Expense.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { category, amount, description, date } = req.body;

    if (!category || !amount || !description || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const expense = new Expense({
      category,
      amount,
      description,
      date: new Date(date),
    });

    await expense.save();

    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
