import type { InputHTMLAttributes } from "react";

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> & {
  id: string;
  label: string;
}

// Native date input: keyboard accessible, localized and works on mobile without any JS
function DateInput({ id, label, className = "", ...props }: DateInputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type="date" id={id} className={`form-input ${className}`.trim()} {...props}/>
    </>
  )
}

export default DateInput;
