import { memo } from "react";
import type { User } from "../types/users";
import { states } from "../utils/states.ts";
import { departments } from "../utils/departments.ts";
import DateInput from "./DateInput.tsx";
import Select from "./Select.tsx";

type EmployeeFormProps = {
  onSubmit: (employee: Omit<User, "id">) => void;
}

const stateOptions = states.map((state) => ({ value: state.abbreviation, label: state.name }));
const departmentOptions = departments.map((department) => ({ value: department, label: department }));

function EmployeeForm({ onSubmit }: EmployeeFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);

        onSubmit({
          firstName: (data.get("firstName") as string).trim(),
          lastName: (data.get("lastName") as string).trim(),
          dateOfBirth: data.get("dateOfBirth") as string,
          startDate: data.get("startDate") as string,
          department: data.get("department") as string,
          street: (data.get("street") as string).trim(),
          city: (data.get("city") as string).trim(),
          state: data.get("state") as string,
          zipCode: data.get("zipCode") as string,
        });

        form.reset();
      }}
      className={"flex flex-col justify-center gap-y-4"}
    >
      <div className={"flex items-center gap-x-4"}>
        <div className={"w-full"}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name={"firstName"} className={"form-input"} required autoComplete="given-name"/>
        </div>

        <div className={"w-full"}>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name={"lastName"} className={"form-input"} required autoComplete="family-name"/>
        </div>
      </div>

      <div className={"flex items-center gap-x-4"}>
        <div className={"w-full"}>
          <DateInput id="date-of-birth" name={"dateOfBirth"} label="Date of Birth" required/>
        </div>

        <div className={"w-full"}>
          <DateInput id="start-date" name={"startDate"} label="Start Date" required/>
        </div>
      </div>

      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input type="text" id="street" name={"street"} className={"form-input"} required autoComplete="street-address"/>

        <label htmlFor="city">City</label>
        <input type="text" id="city" name={"city"} className={"form-input"} required autoComplete="address-level2"/>

        <Select id="state" name="state" label="State" options={stateOptions}/>

        <label htmlFor="zip-code">Zip Code</label>
        <input
          type="text"
          id="zip-code"
          name={"zipCode"}
          className={"form-input"}
          inputMode="numeric"
          pattern="\d{5}"
          title="5 digits zip code"
          required
          autoComplete="postal-code"
        />
      </fieldset>

      <div>
        <Select id="department" name="department" label="Department" options={departmentOptions}/>
      </div>

      <div>
        <button type={"submit"} className={"button"}>Save</button>
      </div>
    </form>
  )
}

export default memo(EmployeeForm);
