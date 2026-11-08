# hrnet-p14-select

An accessible React select (dropdown) with a label, for forms. It replaces the jQuery UI `selectmenu` plugin used in the HRnet application.

It's built on the native `<select>`. Keyboard navigation, screen reader support, mobile pickers and form submission all work out of the box, without any JavaScript dependency.

- Label linked to the select
- Options as plain strings or `{ value, label, disabled }` objects
- Optional placeholder option, which forces a choice when combined with `required`
- Optional hint text linked with `aria-describedby`
- Every native `<select>` prop is supported (`name`, `value`, `onChange`, `required`…), and the component works controlled or uncontrolled
- Ships plain CSS with a custom arrow, or bring your own styles

## Installation

```bash
npm install hrnet-p14-select
```

Peer dependencies: `react` and `react-dom`.

## Usage

```tsx
import { Select } from "hrnet-p14-select";
import "hrnet-p14-select/style.css";

const states = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
];

function Example() {
  return (
    <form>
      <Select id="department" name="department" label="Department" options={["Sales", "Marketing", "Engineering"]}/>

      <Select id="state" name="state" label="State" options={states} placeholder="Choose a state" required/>
    </form>
  );
}
```

Controlled:

```tsx
const [department, setDepartment] = useState("Sales");

<Select
  id="department"
  label="Department"
  options={["Sales", "Legal"]}
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
/>
```

## Props

Every `<select>` attribute is accepted, except `children`, which is generated from `options`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | — | Id of the select, used to link the label (required) |
| `label` | `ReactNode` | — | Visible label |
| `options` | `(string \| { value, label, disabled? })[]` | — | Options of the select |
| `placeholder` | `string` | — | Adds a first empty option, selected by default. It's disabled when `required` |
| `hint` | `ReactNode` | — | Helper or error text under the select |
| `className` | `string` | — | Extra classes for the wrapper |
| `labelClassName` | `string` | — | Extra classes for the label |
| `selectClassName` | `string` | — | Extra classes for the `<select>` |
| `hintClassName` | `string` | — | Extra classes for the hint |

## Styling

Import `hrnet-p14-select/style.css` for the default theme, or style these classes yourself: `.hrnet-select`, `.hrnet-select__label`, `.hrnet-select__control`, `.hrnet-select__hint`.

## License

MIT
