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
      className={"flex flex-col justify-center gap-y-4"}
    >
      <div className={"flex items-center gap-x-4"}>
        <div className={"w-full"}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name={"firstName"} className={"form-input"}/>
        </div>

        <div className={"w-full"}>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name={"lastName"} className={"form-input"}/>
        </div>
      </div>

      <div className={"flex items-center gap-x-4"}>
        <div className={"w-full"}>
          <label htmlFor="date-of-birth">Date of Birth</label>
          <input type="date" id="date-of-birth" name={"dateOfBirth"} className={"form-input"}/>
        </div>

        <div className={"w-full"}>
          <label htmlFor="start-date">Start Date</label>
          <input type="date" id="start-date" name={"startDate"} className={"form-input"}/>
        </div>
      </div>

      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input type="text" id="street" name={"street"} className={"form-input"}/>

        <label htmlFor="city">City</label>
        <input type="text" id="city" name={"city"} className={"form-input"}/>

        <label htmlFor="state">State</label>
        <select id="state" name="state"  className={"form-input"}>
          {states.map((state) => (
            <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
          ))}
        </select>

        <label htmlFor="zip-code">Zip Code</label>
        <input type="number" id="zip-code" name={"zipCode"} className={"form-input"}/>
      </fieldset>

      <div>
        <label htmlFor="department">Department</label>
        <select id="department" name="department" className={"form-input"}>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
      </div>

      <div>
        <button type={"submit"} className={"button"}>Save</button>
      </div>
    </form>
  )
}

export default memo(EmployeeForm);
