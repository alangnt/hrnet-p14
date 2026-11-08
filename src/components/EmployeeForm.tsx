import { memo, type ReactNode } from "react";
import type { User } from "../types/users";
import { states } from "../utils/states.ts";
import { departments } from "../utils/departments.ts";
import { DateInput, type DateInputProps } from "hrnet-p14-date-input";
import { Select, type SelectProps } from "hrnet-p14-select";
import TextInput from "./TextInput.tsx";

type EmployeeFormProps = {
  onSubmit: (employee: Omit<User, "id">) => void;
}

const stateOptions = states.map((state) => ({ value: state.abbreviation, label: state.name }));

// Reuse the app's field styles on the hrnet-p14-* components
const fieldClassNames = { className: "field", labelClassName: "field-label" };
const AppDateInput = (props: DateInputProps) => <DateInput {...fieldClassNames} inputClassName="form-input" {...props}/>;
const AppSelect = (props: SelectProps) => <Select {...fieldClassNames} selectClassName="form-input" {...props}/>;

function FormSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <fieldset className="form-section">
      <div>
        <legend className="form-section-title">{title}</legend>
        <p className="form-section-description">{description}</p>
      </div>
      <div className="form-grid">{children}</div>
    </fieldset>
  )
}

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
      className="card overflow-hidden"
    >
      <FormSection title="Personal information" description="The employee's identity.">
        <TextInput id="first-name" name="firstName" label="First Name" required autoComplete="given-name"/>
        <TextInput id="last-name" name="lastName" label="Last Name" required autoComplete="family-name"/>
        <AppDateInput id="date-of-birth" name="dateOfBirth" label="Date of Birth" max={new Date()} required/>
      </FormSection>

      <FormSection title="Address" description="Where the employee lives.">
        <div className="sm:col-span-2">
          <TextInput id="street" name="street" label="Street" required autoComplete="street-address"/>
        </div>
        <TextInput id="city" name="city" label="City" required autoComplete="address-level2"/>
        <AppSelect id="state" name="state" label="State" options={stateOptions}/>
        <TextInput
          id="zip-code"
          name="zipCode"
          label="Zip Code"
          inputMode="numeric"
          pattern="\d{5}"
          title="5 digits zip code"
          placeholder="12345"
          required
          autoComplete="postal-code"
        />
      </FormSection>

      <FormSection title="Employment" description="Role and contract details.">
        <AppSelect id="department" name="department" label="Department" options={departments}/>
        <AppDateInput id="start-date" name="startDate" label="Start Date" required/>
      </FormSection>

      <div className="form-actions">
        <button type="reset" className="button button-secondary">Clear</button>
        <button type="submit" className="button button-primary">Save</button>
      </div>
    </form>
  )
}

export default memo(EmployeeForm);
