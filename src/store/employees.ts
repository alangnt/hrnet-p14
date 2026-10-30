import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/users";

type EmployeeState = {
  employees: User[];
  addEmployee: (employee: Omit<User, "id">) => void;
}

const LEGACY_KEY = 'employees';

// Employees saved by the previous version of the app, stored as a raw array without ids
function readLegacyEmployees(): User[] {
  try {
    const stored: User[] = JSON.parse(localStorage.getItem(LEGACY_KEY) as string) || [];
    return stored.map((employee, index) => (
      employee.id ? employee : { ...employee, id: `legacy-${index}` }
    ));
  } catch {
    return [];
  }
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employees: readLegacyEmployees(),
      addEmployee: (employee) => set((state) => ({
        employees: [...state.employees, { ...employee, id: crypto.randomUUID() }],
      })),
    }),
    {
      name: 'hrnet-employees',
      partialize: (state) => ({ employees: state.employees }),
    }
  )
);
