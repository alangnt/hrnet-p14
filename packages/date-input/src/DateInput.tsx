import type { InputHTMLAttributes, ReactNode } from "react";
import { toDateValue } from "./toDateValue.js";

export type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type" | "min" | "max"> & {
  /** Id of the input, linked to its label */
  id: string;
  /** Visible label */
  label: ReactNode;
  /** Earliest selectable date, as a `Date` or a `YYYY-MM-DD` string */
  min?: Date | string;
  /** Latest selectable date, as a `Date` or a `YYYY-MM-DD` string */
  max?: Date | string;
  /** Helper or error text displayed under the input, linked with `aria-describedby` */
  hint?: ReactNode;
  /** Class names of the wrapper (`className`), label and input */
  labelClassName?: string;
  inputClassName?: string;
  hintClassName?: string;
}

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

// Native date input: keyboard accessible, localized and uses the platform picker on mobile, without any JS
function DateInput({
  id,
  label,
  min,
  max,
  hint,
  className,
  labelClassName,
  inputClassName,
  hintClassName,
  ...props
}: DateInputProps) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={cx("hrnet-date-input", className)}>
      <label htmlFor={id} className={cx("hrnet-date-input__label", labelClassName)}>{label}</label>
      <input
        type="date"
        id={id}
        min={toDateValue(min)}
        max={toDateValue(max)}
        className={cx("hrnet-date-input__control", inputClassName)}
        aria-describedby={cx(hintId, props["aria-describedby"]) || undefined}
        {...props}
      />
      {hint && <p id={hintId} className={cx("hrnet-date-input__hint", hintClassName)}>{hint}</p>}
    </div>
  )
}

export default DateInput;
