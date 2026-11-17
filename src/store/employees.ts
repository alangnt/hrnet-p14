import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/users";

export type EmployeesState = {
  employees: User[];
}

export const STORAGE_KEY = 'hrnet-employees';
const LEGACY_KEY = 'employees';

function readJson(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) as string);
  } catch {
    return null;
  }
}

// Employees saved by the jQuery version of the app, stored as a raw array without ids
function readLegacyEmployees(): User[] {
  const stored = readJson(LEGACY_KEY);
  if (!Array.isArray(stored)) return [];
  return stored.map((employee: User, index) => (
    employee.id ? employee : { ...employee, id: `legacy-${index}` }
  ));
}

// Reads the saved employees, falling back to the data of the jQuery version on first launch.
// Also accepts the { state: { employees } } shape written by the previous Zustand store.
export function loadEmployees(): User[] {
  const stored = readJson(STORAGE_KEY) as { employees?: User[]; state?: { employees?: User[] } } | null;
  const employees = stored?.employees ?? stored?.state?.employees;
  return Array.isArray(employees) ? employees : readLegacyEmployees();
}

export function saveEmployees(employees: User[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ employees }));
  } catch {
    // Storage full or unavailable: the data stays in memory for this session
  }
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState: (): EmployeesState => ({ employees: loadEmployees() }),
  reducers: {
    addEmployee: {
      reducer: (state, action: PayloadAction<User>) => {
        state.employees.push(action.payload);
      },
      prepare: (employee: Omit<User, "id">) => ({
        payload: { ...employee, id: crypto.randomUUID() },
      }),
    },
  },
  selectors: {
    selectEmployees: (state) => state.employees,
  },
});

export const { addEmployee } = employeesSlice.actions;
export const { selectEmployees } = employeesSlice.selectors;
export default employeesSlice;
