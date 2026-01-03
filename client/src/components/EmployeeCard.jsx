import React from "react";

const EmployeeCard = () => {
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
      id: 1,
      name: "Arjun Rampal",
      serialNo: "ODARRA20000001",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8MHwwfHx8MA%3D%3D",
      status: "present",
      email: "arjun@rampal.com",
      phone: "123-456-7890",
      gender: "Male",
      dateOfBirth: "01-Jan-1990",
      department: "Software Developer",
      salary: "50000",
    },
    {
      id: 1,
      name: "Arjun Rampal",
      serialNo: "ODARRA20000001",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8MHwwfHx8MA%3D%3D",
      status: "leave",
      email: "arjun@rampal.com",
      phone: "123-456-7890",
      gender: "Male",
      dateOfBirth: "01-Jan-1990",
      department: "Software Developer",
      salary: "50000",
    },
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
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10">
      {employeeData.map((employee) => (
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
