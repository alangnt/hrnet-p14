import { useMemo, useState } from "react";

export type Column<T> = {
  title: string;
  data: keyof T & string;
}

type SortState<T> = {
  key: keyof T & string;
  direction: "asc" | "desc";
}

type DataTableProps<T extends { id: string }> = {
  columns: Column<T>[];
  data: T[];
  pageSizes?: number[];
}

function DataTable<T extends { id: string }>({ columns, data, pageSizes = [10, 25, 50, 100] }: DataTableProps<T>) {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortState<T> | null>(null);
  const [pageSize, setPageSize] = useState<number>(pageSizes[0]);
  const [page, setPage] = useState<number>(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data;
    return data.filter((row) => (
      columns.some((column) => String(row[column.data] ?? "").toLowerCase().includes(query))
    ));
  }, [data, columns, search]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => (
      String(a[sort.key] ?? "").localeCompare(String(b[sort.key] ?? ""), undefined, { numeric: true, sensitivity: "base" }) * factor
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
    <div className="w-full flex flex-col gap-y-4 px-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-x-2 m-0">
          Show
          <select
            className="form-input"
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

        <label className="flex items-center gap-x-2 m-0">
          Search:
          <input
            type="search"
            className="form-input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => {
                const direction = sort?.key === column.data ? sort.direction : null;
                return (
                  <th
                    key={column.data}
                    scope="col"
                    aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
                  >
                    <button type="button" className="sort-button" onClick={() => toggleSort(column.data)}>
                      {column.title}
                      <span aria-hidden="true">{direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  {data.length === 0 ? "No data available in table" : "No matching records found"}
                </td>
              </tr>
            ) : rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.data}>{String(row[column.data] ?? "")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p role="status">
          {sorted.length === 0
            ? "Showing 0 to 0 of 0 entries"
            : `Showing ${start + 1} to ${start + rows.length} of ${sorted.length} entries`}
          {sorted.length !== data.length && ` (filtered from ${data.length} total entries)`}
        </p>

        <nav aria-label="Pagination" className="flex items-center gap-x-2">
          <button type="button" className="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
            Previous
          </button>
          <span>Page {currentPage} of {pageCount}</span>
          <button type="button" className="button" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}

export default DataTable;
