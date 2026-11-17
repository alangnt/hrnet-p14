# HRnet (React)

HRnet is WealthHealth's internal tool for creating employee records and browsing the current employees. This repository is a React + TypeScript rewrite of the original jQuery application.

## Getting started

```bash
bun install
bun run dev       # development server
bun run build     # production build in dist/
bun run preview   # serve the production build
bun run test      # unit tests (Vitest + Testing Library)
bun run lint
```

## Architecture

| Path | Role |
| --- | --- |
| `src/App.tsx` | "Create Employee" page |
| `src/pages/EmployeeList.tsx` | "Current Employees" page (lazy-loaded route) |
| `src/store/store.ts` | Redux store (Redux Toolkit), typed `useAppDispatch` / `useAppSelector` hooks, persistence to `localStorage` |
| `src/store/employees.ts` | `employees` slice (`addEmployee`, `selectEmployees`). Migrates data saved by the jQuery version |
| `src/components/Layout.tsx` | Shared header and navigation |
| `src/components/EmployeeForm.tsx` | Employee form with native HTML validation (no digits in names and city, 5-digit zip code) |
| `src/components/TextInput.tsx` | Text field (label + input) |

## npm packages

Each jQuery plugin is replaced by a standalone React component published on npm. Their source code, tests and publishing instructions live in a separate repository: `hrnet-p14-components`.

| Package | Replaces |
| --- | --- |
| [`hrnet-p14-modal`](https://www.npmjs.com/package/hrnet-p14-modal) | `jquery.modal.js` |
| [`hrnet-p14-data-table`](https://www.npmjs.com/package/hrnet-p14-data-table) | DataTables |
| [`hrnet-p14-select`](https://www.npmjs.com/package/hrnet-p14-select) | jQuery UI selectmenu |
| [`hrnet-p14-date-input`](https://www.npmjs.com/package/hrnet-p14-date-input) | jQuery datetimepicker |

The HRnet app installs them from npm like any other consumer. It doesn't import their default CSS: it adds its Tailwind styles through each component's `className` / `classNames` props.

## Replacing the jQuery plugins

| jQuery plugin | Replacement |
| --- | --- |
| `jquery.modal.js` | [`hrnet-p14-modal`](https://www.npmjs.com/package/hrnet-p14-modal): `role="dialog"`, focus trap and restore, Escape to close, body scroll lock |
| DataTables | [`hrnet-p14-data-table`](https://www.npmjs.com/package/hrnet-p14-data-table): search, sorting by column (`aria-sort`), 10/25/50/100 entries per page, pagination, custom cell rendering |
| Date picker | [`hrnet-p14-date-input`](https://www.npmjs.com/package/hrnet-p14-date-input): native `<input type="date">`. It is accessible, localized and mobile-friendly, and adds no JS calendar |
| Dropdown menus (selectmenu) | [`hrnet-p14-select`](https://www.npmjs.com/package/hrnet-p14-select): native `<select>` with a label, placeholder and hint, styled and fully keyboard accessible |

## Lighthouse audits

Audits ran on the **production build** (`bun run build && bun run preview`) with the desktop preset. The reports are in [`lighthouse/`](./lighthouse).

| Metric | Create Employee – jQuery | Create Employee – React | Employee List – jQuery | Employee List – React |
| --- | --- | --- | --- | --- |
| Performance | 100 | 100 | 100 | 100 |
| Accessibility | 91 | **100** | 96 | **100** |
| Best Practices | 85 | **100** | 85 | **100** |
| SEO | 90 | **100** | 90 | **100** |
| First Contentful Paint | 0.6 s | **0.3 s** | 0.5 s | **0.3 s** |
| Largest Contentful Paint | 0.6 s | **0.3 s** | 0.5 s | **0.4 s** |
| Speed Index | 0.6 s | **0.4 s** | 0.5 s | **0.3 s** |
| Total Blocking Time | 0 ms | 0 ms | 0 ms | 0 ms |
| Cumulative Layout Shift | 0.006 | **0** | 0 | 0 |
| Network requests | 12 | **6** | 9 | **6** |
| Total transfer size | 260 KiB | **94 KiB** | 64 KiB | 96 KiB |

The jQuery app was served as static files from its original repository. It loads jQuery, jQuery UI, DataTables, jquery.modal and the datetimepicker from several CDNs. The React app ships one JS bundle and one CSS file. The Employee List page is lazy-loaded, so after the first visit it only adds a 1.8 kB chunk (gzipped).
