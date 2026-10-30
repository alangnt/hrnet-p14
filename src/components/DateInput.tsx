import type { InputHTMLAttributes } from "react";

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> & {
  id: string;
  label: string;
}

// Native date input: keyboard accessible, localized and works on mobile without any JS
function DateInput({ id, label, className = "", ...props }: DateInputProps) {
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">{label}</label>
      <input type="date" id={id} className={`form-input ${className}`.trim()} {...props}/>
    </div>
  )
}

export default DateInput;
