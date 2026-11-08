import { useId, useMemo, useState, type ReactNode } from "react";

export type Column<T> = {
  /** Header text */
  title: string;
  /** Key of the row property displayed in this column */
  data: keyof T & string;
  /** Custom cell content (search and sort still use the raw value) */
  render?: (row: T) => ReactNode;
  /** Allow sorting on this column (default: true) */
  sortable?: boolean;
}

export type DataTableClassNames = Partial<Record<
  "root" | "toolbar" | "length" | "search" | "select" | "input" | "scroll" | "table" | "sortButton" | "empty" | "footer" | "info" | "pagination" | "button",
  string
>>;

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  /** Unique key of a row (default: `row.id`, then the row index) */
  getRowId?: (row: T, index: number) => string;
  /** Choices of the "Show N entries" select (default: 10, 25, 50, 100) */
  pageSizes?: number[];
  /** Show the search field (default: true) */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Message when `data` is empty */
  emptyMessage?: ReactNode;
  /** Message when the search matches nothing */
  noResultsMessage?: ReactNode;
  /** Accessible caption of the table, visually hidden */
  caption?: string;
  /** Extra class names added to each part of the table */
  classNames?: DataTableClassNames;
}

type SortState<T> = {
  key: keyof T & string;
  direction: "asc" | "desc";
}

const cx = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" ");

const toText = (value: unknown) => (value === null || value === undefined ? "" : String(value));

function defaultRowId<T>(row: T, index: number) {
  const id = (row as { id?: unknown }).id;
  return id === undefined || id === null ? String(index) : String(id);
}

function DataTable<T>({
  columns,
  data,
  getRowId = defaultRowId,
  pageSizes = [10, 25, 50, 100],
  searchable = true,
  searchPlaceholder,
  emptyMessage = "No data available in table",
  noResultsMessage = "No matching records found",
  caption,
  classNames = {},
}: DataTableProps<T>) {
  const id = useId();
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortState<T> | null>(null);
  const [pageSize, setPageSize] = useState<number>(pageSizes[0]);
  const [page, setPage] = useState<number>(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data;
    return data.filter((row) => (
      columns.some((column) => toText(row[column.data]).toLowerCase().includes(query))
    ));
  }, [data, columns, search]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => (
      toText(a[sort.key]).localeCompare(toText(b[sort.key]), undefined, { numeric: true, sensitivity: "base" }) * factor
    ));
  }, [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const rows = sorted.slice(start, start + pageSize);

  const toggleSort = (key: keyof T & string) => {
    setSort((current) => {
      if (current?.key !== key) return { key, direction: "asc" };
      return { key, direction: current.direction === "asc" ? "desc" : "asc" };
    });
  };

  return (
    <div className={cx("hrnet-table", classNames.root)}>
      <div className={cx("hrnet-table__toolbar", classNames.toolbar)}>
        <label className={cx("hrnet-table__length", classNames.length)} htmlFor={`${id}-length`}>
          Show
          <select
            id={`${id}-length`}
            className={cx("hrnet-table__select", classNames.select)}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {pageSizes.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
          entries
        </label>

        {searchable && (
          <label className={cx("hrnet-table__search", classNames.search)} htmlFor={`${id}-search`}>
            Search
            <input
              id={`${id}-search`}
              type="search"
              className={cx("hrnet-table__input", classNames.input)}
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </label>
        )}
      </div>

      <div className={cx("hrnet-table__scroll", classNames.scroll)}>
        <table className={cx("hrnet-table__table", classNames.table)}>
          {caption && <caption className="hrnet-table__caption">{caption}</caption>}
          <thead>
            <tr>
              {columns.map((column) => {
                const direction = sort?.key === column.data ? sort.direction : null;
                if (column.sortable === false) {
                  return <th key={column.data} scope="col">{column.title}</th>;
                }
                return (
                  <th
                    key={column.data}
                    scope="col"
                    aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
                  >
                    <button type="button" className={cx("hrnet-table__sort", classNames.sortButton)} onClick={() => toggleSort(column.data)}>
                      {column.title}
                      <span aria-hidden="true" className="hrnet-table__sort-icon">
                        {direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={cx("hrnet-table__empty", classNames.empty)}>
                  {data.length === 0 ? emptyMessage : noResultsMessage}
                </td>
              </tr>
            ) : rows.map((row, index) => (
              <tr key={getRowId(row, start + index)}>
                {columns.map((column) => (
                  <td key={column.data}>{column.render ? column.render(row) : toText(row[column.data])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={cx("hrnet-table__footer", classNames.footer)}>
        <p role="status" className={cx("hrnet-table__info", classNames.info)}>
          {sorted.length === 0
            ? "Showing 0 to 0 of 0 entries"
            : `Showing ${start + 1} to ${start + rows.length} of ${sorted.length} entries`}
          {sorted.length !== data.length && ` (filtered from ${data.length} total entries)`}
        </p>

        <nav aria-label="Pagination" className={cx("hrnet-table__pagination", classNames.pagination)}>
          <button type="button" className={cx("hrnet-table__button", classNames.button)} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
            Previous
          </button>
          <span className="hrnet-table__page">Page {currentPage} of {pageCount}</span>
          <button type="button" className={cx("hrnet-table__button", classNames.button)} disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}

export default DataTable;
