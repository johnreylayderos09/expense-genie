import React, { useEffect, useState } from "react";

const LandingPage = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername);
  }, []);

  return (
    <>
      <main className="flex-grow bg-slate-50 pt-16">
        <div className="mx-auto max-w-6xl p-4">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            {username ? `Welcome back, ${username}!` : "Welcome to Expense Genie"}
          </h2>
          <p className="mb-6 text-lg text-slate-700">
            Your personal assistant for managing expenses effortlessly.
          </p>

          <div className="space-y-6">
            <section className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-2 text-2xl font-semibold text-slate-900">
                Track Expenses
              </h3>
              <p className="text-slate-700">
                Easily log and categorize your expenses to keep track of your spending habits.
              </p>
            </section>

            <section className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-2 text-2xl font-semibold text-slate-900">
                Generate Reports
              </h3>
              <p className="text-slate-700">
                Create detailed reports to analyze your expenses over time.
              </p>
            </section>

            <section className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-2 text-2xl font-semibold text-slate-900">
                Set Budgets
              </h3>
              <p className="text-slate-700">
                Define budgets for different categories and monitor your progress.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
