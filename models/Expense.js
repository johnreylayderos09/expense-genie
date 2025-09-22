import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
    collection: 'Expenses',
  }
);

// Prevent model overwrite in serverless environments
const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

export default Expense;
