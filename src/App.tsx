import './App.css'
import { useCallback, useState } from "react";
import { Link } from "react-router";
import type { User } from "./types/users";
import { X } from "lucide-react"
import EmployeeForm from "./components/EmployeeForm.tsx";

function App() {
  const [isEmployeeCreated, setIsEmployeeCreated] = useState<boolean>(false);

  const saveEmployee = useCallback((data: FormData) => {
    const employees: User[] = JSON.parse(localStorage.getItem('employees') as string) || [];

    const employee: User = {
      id: crypto.randomUUID(),
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      dateOfBirth: data.get("dateOfBirth") as string,
      startDate: data.get("startDate") as string,
      department: data.get("department") as string,
      street: data.get("street") as string,
      city: data.get("city") as string,
      state: data.get("state") as string,
      zipCode: data.get("zipCode") as string
    }

    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));

    setIsEmployeeCreated(true);
  }, []);

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>

      <div className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
        <EmployeeForm onSubmit={saveEmployee}/>
      </div>

      {isEmployeeCreated && (
        <div className="absolute w-screen h-screen bg-gray-900/80 backdrop-blur-xs pointer-events-none z-30 flex justify-center items-center top-0 left-0 overflow-hidden">
          <div className="fade-in bg-white px-12 py-4 rounded-lg relative z-40 pointer-events-auto">
            <button className="absolute top-2 right-2 cursor-pointer hover:text-black transition" onClick={() => setIsEmployeeCreated(false)}>
              <X className={"h-4 w-4"}></X>
            </button>
            Employee Created!
          </div>
        </div>
      )}
    </>
  )
}

export default App
