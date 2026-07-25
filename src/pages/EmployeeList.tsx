import '../App.css'
import { Link } from "react-router";
import type { User } from "../types/users";

type Column = {
  title: string;
  data: string;
}

function EmployeeList() {
  const stored: User[] = JSON.parse(localStorage.getItem('employees') as string) || [];
  const employees: User[] = stored.map((employee, index) => (
    employee.id ? employee : { ...employee, id: `legacy-${index}` }
  ));

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

  return (
    <main id="employee-div" className="container">
      <h1>Current Employees</h1>
      <table id="employee-table" className="display">
        <tbody>
          <tr>
            {columns.map((column: Column) => (
              <th key={column.data}>{column.title}</th>
            ))}
          </tr>

          {employees.map((employee: User) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.street}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">Home</Link>
    </main>
  )
}

export default EmployeeList;