import React from "react";

const SalaryInfo = () => {
  // Sample salary data - replace with actual data from API
  const salaryData = {
    monthWage: 50000,
    yearlyWage: 600000,
    workingDaysPerWeek: "",
    breakTime: "",
  };

  const salaryComponents = [
    {
      name: "Basic Salary",
      amount: 25000.0,
      percentage: 50.0,
      description:
        "Define Basic salary from company cost compute it based on monthly Wages",
    },
    {
      name: "House Rent Allowance",
      amount: 12500.0,
      percentage: 50.0,
      description: "HRA provided to employees 50% of the basic salary",
    },
    {
      name: "Standard Allowance",
      amount: 4167.0,
      percentage: 16.67,
      description:
        "A standard allowance is a predetermined, Fixed amount provided to employee as part of their salary",
    },
    {
      name: "Performance Bonus",
      amount: 2082.5,
      percentage: 8.33,
      description:
        "Variable amount paid during payroll, The value defined by the company and calculated as a % of the basic salary",
    },
    {
      name: "Leave Travel Allowance",
      amount: 2082.5,
      percentage: 8.33,
      description:
        "LTA is paid by the company to employees to cover their travel expenses, and calculated as a % of the basic salary",
    },
    {
      name: "Fixed Allowance",
      amount: 2918.0,
      percentage: 11.67,
      description:
        "Fixed allowance portion of wages is determined after calculating all salary components",
    },
  ];

  const providentFund = {
    employee: { amount: 3000.0, percentage: 12.0 },
    employer: { amount: 3000.0, percentage: 12.0 },
  };

  const taxDeductions = [
    {
      name: "Professional Tax",
      amount: 200.0,
      description: "Professional Tax deducted from the Gross salary",
    },
  ];

  return (
    <div className="p-10 space-y-8">
      {/* Top Section - Wage Info */}
      <div className="grid grid-cols-2 gap-40 pb-8 border-b border-zinc-700">
        {/* Left - Wages */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <label className="text-lg w-40">Month Wage</label>
            <div className="flex-1 border-b border-zinc-600 pb-1">
              <span className="text-2xl font-bold">{salaryData.monthWage}</span>
            </div>
            <span className="text-zinc-400">/ Month</span>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg w-40">Yearly wage</label>
            <div className="flex-1 border-b border-zinc-600 pb-1">
              <span className="text-2xl font-bold">{salaryData.yearlyWage}</span>
            </div>
            <span className="text-zinc-400">/ Yearly</span>
          </div>
        </div>

        {/* Right - Working Days */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <label className="text-lg flex-1">No of working days in a week:</label>
            <input
              type="text"
              className="flex-1 bg-transparent border-b border-zinc-600 pb-1 outline-none focus:border-zinc-400"
              placeholder=""
            />
            <span className="text-zinc-400">/hrs</span>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg flex-1">Break Time:</label>
            <input
              type="text"
              className="flex-1 bg-transparent border-b border-zinc-600 pb-1 outline-none focus:border-zinc-400"
              placeholder=""
            />
            <span className="text-zinc-400">/hrs</span>
          </div>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-2 gap-40">
        {/* Left Column - Salary Components */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold pb-2 border-b border-zinc-700">
            Salary Components
          </h2>

          {salaryComponents.map((component, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-base">{component.name}</label>
                <div className="flex items-center gap-4">
                  <span className="border-b border-zinc-600 px-2 pb-1">
                    {component.amount.toFixed(2)}
                  </span>
                  <span className="text-zinc-400 text-sm">₹ / month</span>
                  <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                    {component.percentage.toFixed(2)}
                  </span>
                  <span className="text-zinc-400 text-sm">%</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{component.description}</p>
            </div>
          ))}
        </div>

        {/* Right Column - PF & Tax */}
        <div className="space-y-8">
          {/* Provident Fund Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold pb-2 border-b border-zinc-700">
              Provident Fund (PF) Contribution
            </h2>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-base">Employee</label>
                <div className="flex items-center gap-4">
                  <span className="border-b border-zinc-600 px-2 pb-1">
                    {providentFund.employee.amount.toFixed(2)}
                  </span>
                  <span className="text-zinc-400 text-sm">₹ / month</span>
                  <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                    {providentFund.employee.percentage.toFixed(2)}
                  </span>
                  <span className="text-zinc-400 text-sm">%</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500">
                PF is calculated based on the basic salary
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-base">Employer</label>
                <div className="flex items-center gap-4">
                  <span className="border-b border-zinc-600 px-2 pb-1">
                    {providentFund.employer.amount.toFixed(2)}
                  </span>
                  <span className="text-zinc-400 text-sm">₹ / month</span>
                  <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                    {providentFund.employer.percentage.toFixed(2)}
                  </span>
                  <span className="text-zinc-400 text-sm">%</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500">
                PF is calculated based on the basic salary
              </p>
            </div>
          </div>

          {/* Tax Deductions Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold pb-2 border-b border-zinc-700">
              Tax Deductions
            </h2>

            {taxDeductions.map((tax, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-base">{tax.name}</label>
                  <div className="flex items-center gap-4">
                    <span className="border-b border-zinc-600 px-2 pb-1">
                      {tax.amount.toFixed(2)}
                    </span>
                    <span className="text-zinc-400 text-sm">₹ / month</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">{tax.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryInfo;