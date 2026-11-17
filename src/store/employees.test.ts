import { describe, expect, it } from 'vitest';
import { addEmployee, selectEmployees } from './employees.ts';
import { setupStore } from './store.ts';

const employee = {
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  startDate: '2024-05-01',
  department: 'Sales',
  street: '1 Main St',
  city: 'Boston',
  state: 'MA',
  zipCode: '02108',
};

describe('employees store', () => {
  it('adds an employee with a generated id', () => {
    const store = setupStore();
    store.dispatch(addEmployee(employee));

    const employees = selectEmployees(store.getState());
    expect(employees).toHaveLength(1);
    expect(employees[0]).toMatchObject(employee);
    expect(employees[0].id).toEqual(expect.any(String));
  });

  it('persists employees in localStorage', () => {
    const store = setupStore();
    store.dispatch(addEmployee(employee));

    const stored = JSON.parse(localStorage.getItem('hrnet-employees') as string);
    expect(stored.employees[0]).toMatchObject(employee);
  });

  it('restores the employees saved in localStorage', () => {
    localStorage.setItem('hrnet-employees', JSON.stringify({ employees: [{ ...employee, id: '1' }] }));

    expect(selectEmployees(setupStore().getState())).toEqual([{ ...employee, id: '1' }]);
  });

  it('migrates the data saved by the previous Zustand store', () => {
    localStorage.setItem('hrnet-employees', JSON.stringify({ state: { employees: [{ ...employee, id: '1' }] }, version: 0 }));

    expect(selectEmployees(setupStore().getState())).toEqual([{ ...employee, id: '1' }]);
  });

  it('migrates the data saved by the jQuery version', () => {
    localStorage.setItem('employees', JSON.stringify([employee]));

    expect(selectEmployees(setupStore().getState())).toEqual([{ ...employee, id: 'legacy-0' }]);
  });
});
