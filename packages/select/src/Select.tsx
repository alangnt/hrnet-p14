import type { ReactNode, SelectHTMLAttributes } from "react";

export type SelectOption = string | {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "children"> & {
  /** Id of the select, linked to its label */
  id: string;
  /** Visible label */
  label: ReactNode;
  /** Options, as plain strings or `{ value, label }` objects */
  options: SelectOption[];
  /** Adds a first empty option with this text (use with `required` to force a choice) */
  placeholder?: string;
  /** Helper or error text displayed under the select, linked with `aria-describedby` */
  hint?: ReactNode;
  /** Class names of the wrapper (`className`), label and select */
  labelClassName?: string;
  selectClassName?: string;
  hintClassName?: string;
}

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

function Select({
  id,
  label,
  options,
  placeholder,
  hint,
  className,
  labelClassName,
  selectClassName,
  hintClassName,
  ...props
}: SelectProps) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={cx("hrnet-select", className)}>
      <label htmlFor={id} className={cx("hrnet-select__label", labelClassName)}>{label}</label>
      <select
        id={id}
        className={cx("hrnet-select__control", selectClassName)}
        aria-describedby={cx(hintId, props["aria-describedby"]) || undefined}
        defaultValue={placeholder !== undefined && props.value === undefined && props.defaultValue === undefined ? "" : undefined}
        {...props}
      >
        {placeholder !== undefined && <option value="" disabled={props.required}>{placeholder}</option>}
        {options.map((option) => {
          const { value, label: optionLabel, disabled } = typeof option === "string"
            ? { value: option, label: option, disabled: false }
            : option;
          return <option key={value} value={value} disabled={disabled}>{optionLabel}</option>;
        })}
      </select>
      {hint && <p id={hintId} className={cx("hrnet-select__hint", hintClassName)}>{hint}</p>}
    </div>
  )
}

export default Select;
