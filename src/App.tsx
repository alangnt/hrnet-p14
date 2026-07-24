import './App.css'
import { states } from "./utils/states.ts";
import { useState } from "react";

function App() {
  const [isEmployeeCreated, setIsEmployeeCreated] = useState<boolean>(false);

  const employeeForm = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    department: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  }

  function saveEmployee() {
    const employees = JSON.parse(localStorage.getItem('employees') as string) || [];

    employees.push(employeeForm);
    localStorage.setItem('employees', JSON.stringify(employees));

    setIsEmployeeCreated(true);
  }

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <a href="/employee-list">View Current Employees</a>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name"/>

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name"/>

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input id="date-of-birth" type="date"/>

          <label htmlFor="start-date">Start Date</label>
          <input id="start-date" type="date"/>

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text"/>

            <label htmlFor="city">City</label>
            <input id="city" type="text"/>

            <label htmlFor="state">State</label>
            <select name="state" id="state">
              {states.map((state, index) => (
                <option key={index} value={state.abbreviation}>{state.name}</option>
              ))}
            </select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number"/>
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
        </form>

        <button onClick={() => saveEmployee()}>Save</button>
      </div>

      {isEmployeeCreated && <div id="confirmation" className="modal">Employee Created!</div>}
    </>
  )
}

export default App
