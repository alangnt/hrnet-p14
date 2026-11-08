# hrnet-p14-date-input

An accessible React date field with a label. It replaces the jQuery `datetimepicker` plugin used in the HRnet application.

It's built on the native `<input type="date">`, so it uses the browser's and operating system's date picker. It is keyboard accessible, displayed in the user's locale, and works on mobile, without shipping any JavaScript calendar.

- Label linked to the input
- `min` and `max` accept a `Date` or a `YYYY-MM-DD` string
- Optional hint text linked with `aria-describedby`
- Every native `<input>` prop is supported (`name`, `value`, `onChange`, `required`…), and the component works controlled or uncontrolled
- The value is always an ISO `YYYY-MM-DD` string, whatever the display locale
- Ships plain CSS, or bring your own styles

## Installation

```bash
npm install hrnet-p14-date-input
```

Peer dependencies: `react` and `react-dom`.

## Usage

```tsx
import { DateInput } from "hrnet-p14-date-input";
import "hrnet-p14-date-input/style.css";

function Example() {
  return (
    <form>
      <DateInput id="date-of-birth" name="dateOfBirth" label="Date of Birth" max={new Date()} required/>

      <DateInput id="start-date" name="startDate" label="Start Date" hint="First day at work"/>
    </form>
  );
}
```

Controlled:

```tsx
const [startDate, setStartDate] = useState("");

<DateInput id="start-date" label="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
```

The package also exports `toDateValue(date)`. It formats a `Date` as `YYYY-MM-DD` in local time, for example to set a default value.

## Props

Every `<input>` attribute is accepted, except `type`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | — | Id of the input, used to link the label (required) |
| `label` | `ReactNode` | — | Visible label |
| `min` | `Date \| string` | — | Earliest selectable date |
| `max` | `Date \| string` | — | Latest selectable date |
| `hint` | `ReactNode` | — | Helper or error text under the input |
| `className` | `string` | — | Extra classes for the wrapper |
| `labelClassName` | `string` | — | Extra classes for the label |
| `inputClassName` | `string` | — | Extra classes for the `<input>` |
| `hintClassName` | `string` | — | Extra classes for the hint |

## Styling

Import `hrnet-p14-date-input/style.css` for the default theme, or style these classes yourself: `.hrnet-date-input`, `.hrnet-date-input__label`, `.hrnet-date-input__control`, `.hrnet-date-input__hint`.

## License

MIT
