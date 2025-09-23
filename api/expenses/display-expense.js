// /api/expenses/display-expense.js

import connectToDatabase from "../../utils/db";
import Expense from "../../models/Expense";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const expenses = await Expense.find().sort({ date: -1 }); // Latest first
    res.status(200).json({ expenses });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
}
