import { beforeEach, describe, expect, it } from 'vitest';
import { useEmployeeStore } from './employees.ts';

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

describe('useEmployeeStore', () => {
  beforeEach(() => {
    useEmployeeStore.setState({ employees: [] });
  });

  it('adds an employee with a generated id', () => {
    useEmployeeStore.getState().addEmployee(employee);

    const { employees } = useEmployeeStore.getState();
    expect(employees).toHaveLength(1);
    expect(employees[0]).toMatchObject(employee);
    expect(employees[0].id).toEqual(expect.any(String));
  });

  it('persists employees in localStorage', () => {
    useEmployeeStore.getState().addEmployee(employee);

    const stored = JSON.parse(localStorage.getItem('hrnet-employees') as string);
    expect(stored.state.employees[0]).toMatchObject(employee);
  });
});
