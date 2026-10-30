import 'hrnet-p14-modal/style.css'
import { useCallback, useState } from "react";
import { Link } from "react-router";
import { Modal } from "hrnet-p14-modal";
import { CircleCheck } from "lucide-react";
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
    <main className="page">
      <div className="page-header">
        <h1 className="page-title">Create Employee</h1>
        <p className="page-subtitle">Fill in the form below to add a new employee to HRnet.</p>
      </div>

      <EmployeeForm onSubmit={saveEmployee}/>

      <Modal isOpen={isEmployeeCreated} onClose={closeModal} ariaLabelledBy="employee-created-title" className="success-modal">
        <CircleCheck aria-hidden="true" className="mx-auto mb-4 h-12 w-12 text-emerald-500"/>
        <h2 id="employee-created-title" className="text-lg font-semibold text-slate-900">Employee Created!</h2>
        <p className="mt-2 text-sm text-slate-600">The employee has been added to the list.</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link to="/employee-list" className="button button-primary">View current employees</Link>
          <button type="button" className="button button-secondary" onClick={closeModal}>Create another</button>
        </div>
      </Modal>
    </main>
  )
}

export default App
