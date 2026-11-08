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
| `src/components/TextInput.tsx` | Text field (label + input) |
| `packages/` | The four React components that replace the jQuery plugins, each published on npm (see below) |

## npm packages

Each jQuery plugin is replaced by a standalone React component. Each one lives in `packages/`, has its own README, tests and default CSS, and is published on npm:

| Package | Replaces | Folder |
| --- | --- | --- |
| [`hrnet-p14-modal`](https://www.npmjs.com/package/hrnet-p14-modal) | `jquery.modal.js` | [`packages/react-modal`](./packages/react-modal) |
| [`hrnet-p14-data-table`](https://www.npmjs.com/package/hrnet-p14-data-table) | DataTables | [`packages/data-table`](./packages/data-table) |
| [`hrnet-p14-select`](https://www.npmjs.com/package/hrnet-p14-select) | jQuery UI selectmenu | [`packages/select`](./packages/select) |
| [`hrnet-p14-date-input`](https://www.npmjs.com/package/hrnet-p14-date-input) | jQuery datetimepicker | [`packages/date-input`](./packages/date-input) |

```bash
npm install hrnet-p14-modal hrnet-p14-data-table hrnet-p14-select hrnet-p14-date-input
```

The HRnet app installs them from npm like any other consumer. It doesn't import their default CSS: it adds its Tailwind styles through each component's `className` / `classNames` props.

## Publishing a package to npm

Run these commands from the package's folder (`packages/react-modal`, `packages/data-table`, `packages/select` or `packages/date-input`):

```bash
cd packages/data-table

npm login                  # log in to your npm account (Bun has no login command)
bun pm whoami              # check which account you are logged in as

bun pm version patch       # bump the version (patch | minor | major)
bun publish                # builds dist/ through prepublishOnly, then publishes
```

`bun publish` reuses the credentials that `npm login` saves in `~/.npmrc`. Alternatively, set the `NPM_CONFIG_TOKEN` environment variable to an npm access token, which also works in CI without npm.

`bun publish --dry-run` lists the files that would be published without uploading anything. The registry refuses to publish a version that already exists, so bump the version before each publish (except the very first publish of a package at `1.0.0`).

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
| Speed Index | 0.6 s | **0.3 s** | 0.5 s | **0.3 s** |
| Total Blocking Time | 0 ms | 0 ms | 0 ms | 0 ms |
| Cumulative Layout Shift | 0.006 | **0** | 0 | 0 |
| Network requests | 12 | **6** | 9 | **6** |
| Total transfer size | 260 KiB | **85 KiB** | 64 KiB | 86 KiB |

The jQuery app was served as static files from its original repository. It loads jQuery, jQuery UI, DataTables, jquery.modal and the datetimepicker from several CDNs. The React app ships one JS bundle and one CSS file. The Employee List page is lazy-loaded, so after the first visit it only adds a 1.4 kB chunk.
