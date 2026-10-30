import '../App.css'
import { Link } from "react-router";
import type { User } from "../types/users";
import DataTable, { type Column } from "../components/DataTable.tsx";
import { useEmployeeStore } from "../store/employees.ts";

const columns: Column<User>[] = [
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
  const employees = useEmployeeStore((state) => state.employees);

  return (
    <main id="employee-div" className="container">
      <h1>Current Employees</h1>

      <DataTable columns={columns} data={employees}/>

      <Link to="/" className="my-6">Home</Link>
    </main>
  )
}

export default EmployeeList;
