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
    <main className="page max-w-7xl">
      <div className="page-header">
        <h1 className="page-title">Current Employees</h1>
        <p className="page-subtitle">{employees.length} employee{employees.length === 1 ? "" : "s"} registered.</p>
      </div>

      <div className="card overflow-hidden">
        <DataTable columns={columns} data={employees}/>
      </div>
    </main>
  )
}

export default EmployeeList;
