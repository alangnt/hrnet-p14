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
| `src/store/employees.ts` | Global state (Zustand) persisted to `localStorage`. Migrates data saved by the jQuery version |
| `src/components/Layout.tsx` | Shared header and navigation |
| `src/components/EmployeeForm.tsx` | Employee form with native HTML validation |
| `src/components/DataTable.tsx` | Generic table: search, sorting, page size, pagination |
| `src/components/TextInput.tsx` / `DateInput.tsx` / `Select.tsx` | Form fields (label + input) |
| `packages/react-modal/` | Modal component, published on npm as [`hrnet-p14-modal`](https://www.npmjs.com/package/hrnet-p14-modal) |

## Replacing the jQuery plugins

| jQuery plugin | Replacement |
| --- | --- |
| `jquery.modal.js` | **Converted** into its own React component and published on npm: [`hrnet-p14-modal`](https://www.npmjs.com/package/hrnet-p14-modal). Includes `role="dialog"`, focus trap and restore, Escape to close, and body scroll lock |
| DataTables | `DataTable` component: search, sorting by column (`aria-sort`), 10/25/50/100 entries per page, pagination |
| Date picker | `DateInput`: native `<input type="date">`. It is accessible, localized and mobile-friendly, and adds no JS |
| Dropdown menus (selectmenu) | `Select`: native `<select>`, styled and fully keyboard accessible |

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
| Speed Index | 0.6 s | **0.3 s** | 0.5 s | **0.3 s** |
| Total Blocking Time | 0 ms | 0 ms | 0 ms | 0 ms |
| Cumulative Layout Shift | 0.006 | **0** | 0 | 0 |
| Network requests | 12 | **6** | 9 | **6** |
| Total transfer size | 260 KiB | **85 KiB** | 64 KiB | 86 KiB |

The jQuery app was served as static files from its original repository. It loads jQuery, jQuery UI, DataTables, jquery.modal and the datetimepicker from several CDNs. The React app ships one JS bundle and one CSS file. The Employee List page is lazy-loaded, so after the first visit it only adds a 1.4 kB chunk.
