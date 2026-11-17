import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import employeesSlice, { saveEmployees } from "./employees.ts";

const rootReducer = combineSlices(employeesSlice);

export type RootState = ReturnType<typeof rootReducer>;

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({ reducer: rootReducer, preloadedState });

  // Persist the employees in localStorage whenever they change
  let previousEmployees = store.getState().employees.employees;
  store.subscribe(() => {
    const { employees } = store.getState().employees;
    if (employees !== previousEmployees) {
      previousEmployees = employees;
      saveEmployees(employees);
    }
  });

  return store;
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
