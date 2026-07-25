import { memo } from "react";
import { states } from "../utils/states.ts";

type EmployeeFormProps = {
  onSubmit: (data: FormData) => void;
}

function EmployeeForm({ onSubmit }: EmployeeFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(new FormData(e.currentTarget));
      }}
    >
      <label htmlFor="first-name">First Name</label>
      <input type="text" id="first-name" name={"firstName"}/>

      <label htmlFor="last-name">Last Name</label>
      <input type="text" id="last-name" name={"lastName"}/>

      <label htmlFor="date-of-birth">Date of Birth</label>
      <input type="date" id="date-of-birth" name={"dateOfBirth"}/>

      <label htmlFor="start-date">Start Date</label>
      <input type="date" id="start-date" name={"startDate"}/>

      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input type="text" id="street" name={"street"}/>

        <label htmlFor="city">City</label>
        <input type="text" id="city" name={"city"}/>

        <label htmlFor="state">State</label>
        <select id="state" name="state">
          {states.map((state) => (
            <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
          ))}
        </select>

        <label htmlFor="zip-code">Zip Code</label>
        <input type="number" id="zip-code" name={"zipCode"}/>
      </fieldset>

      <label htmlFor="department">Department</label>
      <select id="department" name="department">
        <option>Sales</option>
        <option>Marketing</option>
        <option>Engineering</option>
        <option>Human Resources</option>
        <option>Legal</option>
      </select>

      <button type={"submit"}>Save</button>
    </form>
  )
}

export default memo(EmployeeForm);
