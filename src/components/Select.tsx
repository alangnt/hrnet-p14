import type { SelectHTMLAttributes } from "react";

type Option = {
  value: string;
  label: string;
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
  id: string;
  label: string;
  options: Option[];
}

function Select({ id, label, options, className = "", ...props }: SelectProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} className={`form-input ${className}`.trim()} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </>
  )
}

export default Select;
