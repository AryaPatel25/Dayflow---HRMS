import React from "react";

const SalaryInfo = ({ user }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Salary & Benefits Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Salary Info */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h3 className="font-semibold mb-4 text-lg">Compensation</h3>
          <div className="space-y-4 text-zinc-400">
            <p className="mb-4">Salary information is confidential and maintained by the HR department.</p>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-zinc-400">Base Salary</label>
                <p className="text-zinc-500 text-sm">Contact HR for details</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Pay Grade</label>
                <p className="text-zinc-500 text-sm">Contact HR for details</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Payment Frequency</label>
                <p className="text-zinc-500 text-sm">Monthly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employment Status */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h3 className="font-semibold mb-4 text-lg">Employment Status</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Employee Type</label>
              <p className="text-white font-medium capitalize">{user?.role?.toLowerCase() || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Joined Date</label>
              <p className="text-white font-medium">{user?.yearOfJoining ? `${user.yearOfJoining}` : 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Current Status</label>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  user?.isActive ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <span className="text-white font-medium">
                  {user?.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Information */}
      <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
        <h3 className="font-semibold mb-4 text-lg">Benefits & Allowances</h3>
        <div className="text-zinc-400">
          <p className="mb-4">Employee benefits and allowances information is managed by the HR department.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Health Insurance</label>
              <p className="text-zinc-500 text-sm">Contact HR for details</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Paid Time Off</label>
              <p className="text-zinc-500 text-sm">Contact HR for details</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Retirement Plan</label>
              <p className="text-zinc-500 text-sm">Contact HR for details</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Other Benefits</label>
              <p className="text-zinc-500 text-sm">Contact HR for details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  // Auto-calculate all components when monthWage changes
  useEffect(() => {
    // Basic Salary = 50% of wage
    const basic = monthWage * 0.5;
    setBasicSalary(basic);

    // HRA = 50% of Basic
    const hraAmount = basic * 0.5;
    setHra(hraAmount);

    // Performance Bonus = 8.33% of Basic
    const bonus = basic * 0.0833;
    setPerformanceBonus(bonus);

    // Leave Travel Allowance = 8.33% of Basic
    const ltaAmount = basic * 0.0833;
    setLta(ltaAmount);

    // Fixed Allowance = wage - (basic + hra + standard + bonus + lta)
    const fixed =
      monthWage - (basic + hraAmount + standardAllowance + bonus + ltaAmount);
    setFixedAllowance(fixed);
  }, [monthWage, standardAllowance]);

  const yearlyWage = monthWage * 12;

  // Calculate PF amounts
  const pfEmployee = (basicSalary * pfRate) / 100;
  const pfEmployer = (basicSalary * pfRate) / 100;

  // Calculate percentages
  const basicPercentage = (basicSalary / monthWage) * 100;
  const hraPercentage = (hra / basicSalary) * 100;
  const standardPercentage = (standardAllowance / monthWage) * 100;
  const bonusPercentage = (performanceBonus / basicSalary) * 100;
  const ltaPercentage = (lta / basicSalary) * 100;
  const fixedPercentage = (fixedAllowance / monthWage) * 100;

  const taxDeductions = [
    {
      name: "Professional Tax",
      amount: professionalTax,
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
              <input
                type="number"
                value={monthWage}
                onChange={(e) => setMonthWage(Number(e.target.value))}
                className="text-2xl font-bold bg-transparent outline-none w-full"
              />
            </div>
            <span className="text-zinc-400">/ Month</span>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg w-40">Yearly wage</label>
            <div className="flex-1 border-b border-zinc-600 pb-1">
              <span className="text-2xl font-bold">{yearlyWage}</span>
            </div>
            <span className="text-zinc-400">/ Yearly</span>
          </div>
        </div>

        {/* Right - Working Days */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <label className="text-lg flex-1">
              No of working days in a week:
            </label>
            <input
              type="text"
              value={workingDaysPerWeek}
              onChange={(e) => setWorkingDaysPerWeek(e.target.value)}
              className="flex-1 bg-transparent border-b border-zinc-600 pb-1 outline-none focus:border-zinc-400"
              placeholder=""
            />
            <span className="text-zinc-400">/hrs</span>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg flex-1">Break Time:</label>
            <input
              type="text"
              value={breakTime}
              onChange={(e) => setBreakTime(e.target.value)}
              className="flex-1 bg-transparent border-b border-zinc-600 pb-1 outline-none focus:border-zinc-400"
              placeholder=""
            />
            <span className="text-zinc-400">/hrs</span>
          </div>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="space-y-8 mt-20">
        <h2 className="text-xl font-bold pb-2 border-b border-zinc-700">
          Salary Components
        </h2>
      </div>

      {/* Left Column - Salary Components */}
      <div className="grid grid-cols-2 gap-20">
        {/* Basic Salary */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-base">Basic Salary</label>
            <div className="flex items-center gap-4">
              <span className="border-b border-zinc-600 px-2 pb-1">
                {basicSalary.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">₹ / month</span>
              <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                {basicPercentage.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">%</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            Define Basic salary from company cost compute it based on monthly
            Wages
          </p>
        </div>

        {/* House Rent Allowance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-base">House Rent Allowance</label>
            <div className="flex items-center gap-4">
              <span className="border-b border-zinc-600 px-2 pb-1">
                {hra.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">₹ / month</span>
              <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                {hraPercentage.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">%</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            HRA provided to employees 50% of the basic salary
          </p>
        </div>

        {/* Standard Allowance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-base">Standard Allowance</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={standardAllowance}
                onChange={(e) => setStandardAllowance(Number(e.target.value))}
                className="border-b border-zinc-600 px-2 pb-1 bg-transparent outline-none w-20 text-right"
              />
              <span className="text-zinc-400 text-sm">₹ / month</span>
              <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                {standardPercentage.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">%</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            A standard allowance is a predetermined, Fixed amount provided to
            employee as part of their salary
          </p>
        </div>

        {/* Performance Bonus */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-base">Performance Bonus</label>
            <div className="flex items-center gap-4">
              <span className="border-b border-zinc-600 px-2 pb-1">
                {performanceBonus.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">₹ / month</span>
              <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                {bonusPercentage.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">%</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            Variable amount paid during payroll, The value defined by the
            company and calculated as a % of the basic salary
          </p>
        </div>

        {/* Leave Travel Allowance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-base">Leave Travel Allowance</label>
            <div className="flex items-center gap-4">
              <span className="border-b border-zinc-600 px-2 pb-1">
                {lta.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">₹ / month</span>
              <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                {ltaPercentage.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">%</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            LTA is paid by the company to employees to cover their travel
            expenses, and calculated as a % of the basic salary
          </p>
        </div>

        {/* Fixed Allowance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-base">Fixed Allowance</label>
            <div className="flex items-center gap-4">
              <span className="border-b border-zinc-600 px-2 pb-1">
                {fixedAllowance.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">₹ / month</span>
              <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                {fixedPercentage.toFixed(2)}
              </span>
              <span className="text-zinc-400 text-sm">%</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            Fixed allowance portion of wages is determined after calculating all
            salary components
          </p>
        </div>
      </div>

      {/* Right Column - PF & Tax */}
      <div className="space-y-8 mt-20">
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
                  {pfEmployee.toFixed(2)}
                </span>
                <span className="text-zinc-400 text-sm">₹ / month</span>
                <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                  {pfRate.toFixed(2)}
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
                  {pfEmployer.toFixed(2)}
                </span>
                <span className="text-zinc-400 text-sm">₹ / month</span>
                <span className="border-b border-zinc-600 px-2 pb-1 min-w-[60px] text-right">
                  {pfRate.toFixed(2)}
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
        <div className="space-y-4 mt-20">
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
  );
};

export default SalaryInfo;
