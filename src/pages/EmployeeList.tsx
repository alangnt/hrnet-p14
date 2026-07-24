import '../App.css'
import type { User } from "../types/users";

type Column = {
  title: string;
  data: string;
}

function EmployeeList() {
  const employees: User[] = JSON.parse(localStorage.getItem('employees') as string) || [];

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
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <table id="employee-table" className="display">
        <tbody>
          <tr>
            {columns.map((column: Column, index: number) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>

          {employees.map((employee: User, index: number) => (
            <tr key={index}>
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
      <a href="/">Home</a>
    </div>
  )
}

export default EmployeeList;