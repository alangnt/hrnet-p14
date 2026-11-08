# hrnet-p14-data-table

A lightweight React data table with no dependencies, and accessible. It replaces the jQuery [DataTables](https://datatables.net/) plugin used in the HRnet application.

- Search across all columns
- Click a column header to sort it ascending, then descending. The current order is exposed with `aria-sort`
- "Show N entries" selector and Previous / Next pagination
- "Showing x to y of z entries" summary, announced to screen readers
- Custom cell rendering, non-sortable columns, custom messages
- Fully typed: column keys are checked against your row type
- Ships plain CSS, or bring your own styles with `classNames`

## Installation

```bash
npm install hrnet-p14-data-table
```

Peer dependencies: `react` and `react-dom`.

## Usage

```tsx
import { DataTable, type Column } from "hrnet-p14-data-table";
import "hrnet-p14-data-table/style.css";

type Employee = { id: string; firstName: string; lastName: string; department: string };

const columns: Column<Employee>[] = [
  { title: "First Name", data: "firstName" },
  { title: "Last Name", data: "lastName" },
  { title: "Department", data: "department", render: (row) => <strong>{row.department}</strong> },
];

function EmployeeTable({ employees }: { employees: Employee[] }) {
  return <DataTable columns={columns} data={employees} caption="Current employees"/>;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `Column<T>[]` | — | Columns to display, in order |
| `data` | `T[]` | — | Rows |
| `getRowId` | `(row, index) => string` | `row.id`, then the index | Unique key of a row |
| `pageSizes` | `number[]` | `[10, 25, 50, 100]` | Choices of the "Show N entries" select. The first one is the default |
| `searchable` | `boolean` | `true` | Show the search field |
| `searchPlaceholder` | `string` | — | Placeholder of the search field |
| `emptyMessage` | `ReactNode` | `"No data available in table"` | Shown when `data` is empty |
| `noResultsMessage` | `ReactNode` | `"No matching records found"` | Shown when the search matches nothing |
| `caption` | `string` | — | Accessible name of the table, visually hidden |
| `classNames` | `DataTableClassNames` | `{}` | Extra classes for each part (see below) |

### `Column<T>`

| Key | Type | Description |
| --- | --- | --- |
| `title` | `string` | Header text |
| `data` | `keyof T` | Row property shown in the column |
| `render` | `(row: T) => ReactNode` | Custom cell content. Search and sort still use the raw value |
| `sortable` | `boolean` | Set to `false` to disable sorting on this column |

Sorting compares values as text with natural number ordering, so `2` comes before `10`. ISO dates (`YYYY-MM-DD`) sort chronologically.

## Styling

Import `hrnet-p14-data-table/style.css` for the default theme, or skip it and write your own CSS. Every element has a stable class:

`.hrnet-table`, `.hrnet-table__toolbar`, `.hrnet-table__length`, `.hrnet-table__search`, `.hrnet-table__select`, `.hrnet-table__input`, `.hrnet-table__scroll`, `.hrnet-table__table`, `.hrnet-table__sort`, `.hrnet-table__sort-icon`, `.hrnet-table__empty`, `.hrnet-table__caption`, `.hrnet-table__footer`, `.hrnet-table__info`, `.hrnet-table__pagination`, `.hrnet-table__page`, `.hrnet-table__button`

To reuse existing classes, such as Tailwind utilities, pass them with `classNames`. They are added to the default ones:

```tsx
<DataTable
  columns={columns}
  data={employees}
  classNames={{ input: "form-input", select: "form-input", button: "btn btn-secondary" }}
/>
```

Available keys: `root`, `toolbar`, `length`, `search`, `select`, `input`, `scroll`, `table`, `sortButton`, `empty`, `footer`, `info`, `pagination`, `button`.

## License

MIT
