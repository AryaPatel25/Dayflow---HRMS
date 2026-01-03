import React, { useMemo } from "react";
import Fuse from "fuse.js";

const EmployeeCard = ({ searchQuery }) => {
  const employeeData = [
    {
      id: 1,
      name: "Arjun Rampal",
      serialNo: "ODARRA20000001",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8MHwwfHx8MA%3D%3D",
      status: "absent",
      email: "arjun@rampal.com",
      phone: "123-456-7890",
      gender: "Male",
      dateOfBirth: "01-Jan-1990",
      department: "Software Developer",
      salary: "50000",
    },
  {
    id: 2,
    name: "Priya Sharma",
    serialNo: "ODARRA20000002",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MHwwfHx8MA%3D%3D",
    status: "present",
    email: "priya@sharma.com",
    phone: "987-654-3210",
    gender: "Female",
    dateOfBirth: "15-Mar-1992",
    department: "UI/UX Designer",
    salary: "45000",
  },
  {
    id: 3,
    name: "Rahul Verma",
    serialNo: "ODARRA20000003",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8MHwwfHx8MA%3D%3D",
    status: "leave",
    email: "rahul@verma.com",
    phone: "555-123-4567",
    gender: "Male",
    dateOfBirth: "22-Jul-1988",
    department: "Project Manager",
    salary: "60000",
  },
  {
    id: 4,
    name: "Sneha Patel",
    serialNo: "ODARRA20000004",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8MHwwfHx8MA%3D%3D",
    status: "present",
    email: "sneha@patel.com",
    phone: "444-555-6666",
    gender: "Female",
    dateOfBirth: "10-Dec-1995",
    department: "Quality Assurance",
    salary: "42000",
  }
  ,
    {
      id: 5,
      name: "Vikram Singh",
      serialNo: "ODARRA20000005",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8MHwwfHx8MA%3D%3D",
      status: "present",
      email: "vikram@singh.com",
      phone: "777-888-9999",
      gender: "Male",
      dateOfBirth: "05-Sep-1991",
      department: "Backend Developer",
      salary: "52000",
    },
    {
      id: 6,
      name: "Ananya Kapoor",
      serialNo: "ODARRA20000006",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfDB8MHx8fDA%3D",
      status: "absent",
      email: "ananya@kapoor.com",
      phone: "333-222-1111",
      gender: "Female",
      dateOfBirth: "18-Apr-1993",
      department: "HR Manager",
      salary: "48000",
    }
  ];

  // Fuse.js configuration
  const fuseOptions = {
    keys: [
      { name: "name", weight: 0.3 },
      { name: "serialNo", weight: 0.2 },
      { name: "email", weight: 0.2 },
      { name: "department", weight: 0.15 },
      { name: "phone", weight: 0.1 },
      { name: "status", weight: 0.05 }
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 1,
  };

  // Filter employees based on search query using Fuse.js
  const filteredEmployees = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      return employeeData;
    }

    const fuse = new Fuse(employeeData, fuseOptions);
    const results = fuse.search(searchQuery);
    return results.map(result => result.item);
  }, [searchQuery]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10">
      {filteredEmployees.length === 0 && searchQuery && (
        <div className="col-span-full text-center text-zinc-400 py-20">
          <p className="text-xl">No employees found matching "{searchQuery}"</p>
        </div>
      )}
      {filteredEmployees.map((employee) => (
        <div
          key={employee.id}
          className="w-100 bg-zinc-900 border border-zinc-700 rounded-2xl hover:border-zinc-400 cursor-pointer transition-all duration-150"
        >
          <div className="relative w-full h-40 bg-zinc-800 rounded-t-2xl overflow-hidden">
            <img
              src={employee.image}
              alt="Profile"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col p-4 ">
            <div className="flex justify-between text-[1rem]">
              <h1 className="leading-none font-bold">{employee.name}</h1>
              <div className="flex items-center justify-between">
                <p className="font-bold">Status: </p>
                <div
                  className={`size-6 rounded-full border border-zinc-700 ml-2 flex items-center justify-center ${
                    employee.status === "absent"
                      ? "bg-red-500"
                      : employee.status === "present"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {employee.status === "leave" && <PlaneIcon />}
                </div>
              </div>
            </div>
            <p className="text-sm text-zinc-500 font-medium">
              Serial No.: {employee.serialNo}
            </p>
            <div className="flex flex-col gap-1 text-sm text-zinc-300 mt-4">
              <h3>
                <span className="font-bold">Email:</span>{" "}
                <span className="font-medium text-zinc-400">
                  {employee.email}
                </span>
              </h3>
              <h3>
                <span className="font-bold">Phone No.:</span>{" "}
                <span className="font-medium text-zinc-400">
                  {employee.phone}
                </span>
              </h3>
              <h3>
                <span className="font-bold">Gender:</span>{" "}
                <span className="font-medium text-zinc-400">
                  {employee.gender}
                </span>
              </h3>
              <h3>
                <span className="font-bold">Date of Birth:</span>{" "}
                <span className="font-medium text-zinc-400">
                  {employee.dateOfBirth}
                </span>
              </h3>
              <h3>
                <span className="font-bold">Department:</span>{" "}
                <span className="font-medium text-zinc-400">
                  {employee.department}
                </span>
              </h3>
              <h3>
                <span className="font-bold">Salary:</span>{" "}
                <span className="font-medium text-zinc-400">
                  {`Rs. ${employee.salary}`}
                </span>
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeCard;

const PlaneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="black"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-plane-departure size-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14.639 10.258l4.83 -1.294a2 2 0 1 1 1.035 3.863l-14.489 3.883l-4.45 -5.02l2.897 -.776l2.45 1.414l2.897 -.776l-3.743 -6.244l2.898 -.777l5.675 5.727" />
      <path d="M3 21h18" />
    </svg>
  );
};
