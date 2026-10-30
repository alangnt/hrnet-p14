import './App.css'
import 'hrnet-p14-modal/style.css'
import { useCallback, useState } from "react";
import { Link } from "react-router";
import { Modal } from "hrnet-p14-modal";
import type { User } from "./types/users";
import EmployeeForm from "./components/EmployeeForm.tsx";
import { useEmployeeStore } from "./store/employees.ts";

function App() {
  const [isEmployeeCreated, setIsEmployeeCreated] = useState<boolean>(false);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const saveEmployee = useCallback((employee: Omit<User, "id">) => {
    addEmployee(employee);
    setIsEmployeeCreated(true);
  }, [addEmployee]);

  const closeModal = useCallback(() => setIsEmployeeCreated(false), []);

  return (
    <>
      <header className="title">
        <h1>HRnet</h1>
      </header>

      <main className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
        <EmployeeForm onSubmit={saveEmployee}/>
      </main>

      <Modal isOpen={isEmployeeCreated} onClose={closeModal} ariaLabel="Employee created">
        Employee Created!
      </Modal>
    </>
  )
}

export default App
