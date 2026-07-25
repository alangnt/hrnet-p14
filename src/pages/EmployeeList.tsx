import '../App.css'
import { useMemo } from "react";
import { Link } from "react-router";
import type { User } from "../types/users";

type Column = {
  title: string;
  data: keyof User;
}

const columns: Column[] = [
  { title: 'First Name', data: 'firstName' },
  { title: 'Last Name', data: 'lastName' },
  { title: 'Start Date', data: 'startDate' },
  { title: 'Department', data: 'department' },
  { title: 'Date of Birth', data: 'dateOfBirth' },
  { title: 'Street', data: 'street' },
  { title: 'City', data: 'city' },
  { title: 'State', data: 'state' },
  { title: 'Zip Code', data: 'zipCode' },
];

function EmployeeList() {
  const employees = useMemo<User[]>(() => {
    const stored: User[] = JSON.parse(localStorage.getItem('employees') as string) || [];
    return stored.map((employee, index) => (
      employee.id ? employee : { ...employee, id: `legacy-${index}` }
    ));
  }, []);

  return (
    <main id="employee-div" className="container">
      <h1>Current Employees</h1>

      <table id="employee-table" className="display">
        <thead>
          <tr>
            {columns.map((column: Column) => (
              <th key={column.data} scope="col">{column.title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {employees.map((employee: User) => (
            <tr key={employee.id}>
              {columns.map((column: Column) => (
                <td key={column.data}>{employee[column.data]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/">Home</Link>
    </main>
  )
}

export default EmployeeList;
