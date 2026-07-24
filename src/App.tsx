import './App.css'
import { states } from "./utils/states.ts";
import { useState } from "react";
import type { User } from "./types/users";

function App() {
  const [isEmployeeCreated, setIsEmployeeCreated] = useState<boolean>(false);

  function saveEmployee(data: FormData) {
    const employees: User[] = JSON.parse(localStorage.getItem('employees') as string) || [];

    const employee: User = {
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
  }

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>

      <div className="container">
        <a href="/employee-list">View Current Employees</a>
        <h2>Create Employee</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveEmployee(new FormData(e.currentTarget));
          }}
        >
          <label htmlFor="first-name">First Name</label>
          <input type="text" name={"firstName"}/>

          <label htmlFor="last-name">Last Name</label>
          <input type="text" name={"lastName"}/>

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input type="date" name={"dateOfBirth"}/>

          <label htmlFor="start-date">Start Date</label>
          <input type="date" name={"startDate"}/>

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input type="text" name={"street"}/>

            <label htmlFor="city">City</label>
            <input type="text" name={"city"}/>

            <label htmlFor="state">State</label>
            <select name="state">
              {states.map((state, index) => (
                <option key={index} value={state.abbreviation}>{state.name}</option>
              ))}
            </select>

            <label htmlFor="zip-code">Zip Code</label>
            <input type="number" name={"zipCode"}/>
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>

          <button type={"submit"}>Save</button>
        </form>
      </div>

      {isEmployeeCreated && <div id="confirmation" className="modal">Employee Created!</div>}
    </>
  )
}

export default App
