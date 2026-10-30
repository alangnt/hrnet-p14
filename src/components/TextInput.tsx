import type { InputHTMLAttributes } from "react";

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
}

function TextInput({ id, label, className = "", type = "text", ...props }: TextInputProps) {
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">{label}</label>
      <input type={type} id={id} className={`form-input ${className}`.trim()} {...props}/>
    </div>
  )
}

export default TextInput;
